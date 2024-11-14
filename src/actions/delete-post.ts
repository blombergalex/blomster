"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deletePost = async (postId: string) => {
  const supabase = createClient();

  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", postId)
    .single();

    if (postError || !post) {
      throw new Error("Could not get post")
    }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isPostAuthor = user && user.id === post?.user_id;

  if (!isPostAuthor) {
    throw new Error("You are not allowed to delete this post");
  }

  await supabase.from("posts").delete().eq("id", postId).throwOnError();

  revalidatePath("/");
  redirect("/");
};
