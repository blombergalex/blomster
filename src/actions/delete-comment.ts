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

  

  //revalidatePath like in create comment, get slug from post
  // revalidatePath(`/post/${post?.slug}`);
}