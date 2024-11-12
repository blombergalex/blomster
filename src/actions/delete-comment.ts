"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export const deleteComment = async (postId: string) => {
  const supabase = createClient()
  
  // kolla att användaren antingen är ägare till post eller ägare till comment
  // alltså author.id eq post_author.id eller comment-author.id eq comment author.id
  
  // behöver: post author 
  // behöver: comment author
  
  console.log("running delete comment action")

  const {data: comment} = await supabase
  .from("comments")
  .select("user")
  .eq("id", postId) //check that comment id equals postId
  .single()

//  const {data: {user}} = await supabase.auth.getUser()

//  const isAuthor = user && user.id === comment?.user.id

//  if (isAuthor ||  )

const { data: post, error: postError } = await supabase
    .from("posts")
    .select("slug")
    .eq("id", postId)
    .single();

  if (postError || !post) {
    throw new Error("Associated post not found");
  }

  await supabase.from("comments").delete().eq("id", postId).throwOnError()

  //revalidatePath like in create comment, get slug from post
  // revalidatePath(`/post/${post?.slug}`);
}