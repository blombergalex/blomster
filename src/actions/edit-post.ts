"use server";

import { postSchema } from "./schemas";
import { z } from "zod";
import { revalidatePath } from "next/cache";

import { createSlug } from "@/utils/create-slug";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const editPost = async ({
  postId,
  data,
}: {
  postId: string;
  data: z.infer<typeof postSchema>;
}) => {
  const parsedData = postSchema.parse(data);
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data: post } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", postId)
    .single();

  if (!post) {
    throw new Error("Post not found");
  }

  const isPostAuthor = user && user.id === post.user_id;

  if (!isPostAuthor) {
    throw new Error("You are not allowed to edit this post");
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("username")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    throw new Error(
      "User profile not found, valid user login is needed to edit and post"
    );
  }

  const slug = createSlug(parsedData, profile.username);

  const { error } = await supabase
    .from("posts")
    .update({ ...parsedData, user_id: user.id, slug })
    .eq("id", postId)
    .throwOnError();

  if (error) {
    throw new Error(`Failed to update post: ${error.message}`);
  }

  revalidatePath("/");
  redirect(`/post/${slug}`);
};
