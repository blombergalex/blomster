"use server";

import { commentSchema } from "./schemas";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const createComment = async (data: z.infer<typeof commentSchema>) => {
  console.log("running create comment action")
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
  throw new Error("User profile not found, valid user login is needed to comment");
}


const {data: post} = await supabase
  .from('posts')
  .select('slug')
  .single()

  console.log(post)

  const {data: comment, error: commentError} = await supabase 
    .from('comments')
    .insert([{...parsedData, user: profile.username}])
    .single()
    
    console.log("inserting comment")

  console.log(comment)
  if (commentError || !comment) {
    console.log(comment)
    throw new Error(commentError.message)

  }

  revalidatePath(`/post/${post?.slug}`)
};