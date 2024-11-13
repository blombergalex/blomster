"use server";

import { commentSchema } from "./schemas";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const createComment = async (data: z.infer<typeof commentSchema>) => {
  console.log("running createComment action");
  const parsedData = commentSchema.parse(data);

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to comment");
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("username")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    throw new Error(
      "User profile not found, valid user login is needed to comment"
    );
  }

  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("slug")
    .eq("id", parsedData.post_id)
    .single();

  if (postError || !post) {
    throw new Error("Associated post not found for this comment");
  }

  const {} = await supabase
    .from("comments")
    .insert([{ ...parsedData, comment_user_id: user.id }])
    .throwOnError();

  revalidatePath(`/post/${post?.slug}`);
};
