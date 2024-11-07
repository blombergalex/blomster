"use server";


import { postSchema } from "./schemas";
import { z } from "zod";
import { revalidatePath } from "next/cache";

import { createSlug } from "@/utils/create-slug";
import { createClient } from "@/utils/supabase/server";

export const editPost = async ({ postId, data }: { 
  postId: string
  data: z.infer<typeof postSchema>
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

  if(!post) {
    throw new Error('Post not found')
  }

  const isAuthor = user && user.id === post.user_id

  if (!isAuthor) {
    throw new Error('You are not allowed to edit this post')
  }

  const { data: profile, error: profileError } = await supabase
  .from("users")
  .select("username")
  .eq("id", user.id)
  .single();

if (profileError || !profile) {
  throw new Error("User profile not found, valid user login is needed to post");
}


  const updatedSlug = createSlug(parsedData, profile.username)

  const {} = await supabase
    .from('posts')
    .update({...parsedData, user_id: user.id, updatedSlug})
    .throwOnError()

    revalidatePath("/")
};
