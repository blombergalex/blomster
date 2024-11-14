"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache"

export const deleteComment = async (postId: string, commentUserId: string, commentId: string) => {
  const supabase = createClient();

  console.log("running delete comment action")

  // kolla att användaren antingen är ägare till post eller ägare till comment
  // alltså author.id eq post_author.id eller comment-author.id eq comment author.id

  // behöver: post author
  // behöver: comment author

  // check if logged in user is post author
  const { data: post } = await supabase
    .from("posts")
    .select("user_id, slug")
    .eq("id", postId)
    .single();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isPostAuthor = user && user.id === post?.user_id;

  if (!isPostAuthor) {
    throw new Error("You are not allowed to delete this comment");
  } 

  await supabase.from("comments").delete().eq("id", commentId).throwOnError(); //id av den kommentar som ska tas bort ska va lika med commentId som skickas in

  //revalidatePath like in create comment, get slug from post
  revalidatePath(`/post/${post?.slug}`);
};
