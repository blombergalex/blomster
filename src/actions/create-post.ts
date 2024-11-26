"use server";

import { createClient } from "@/utils/supabase/server";
import { postSchema } from "./schemas";
import { z } from "zod";
import { createSlug } from "@/utils/create-slug";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ServerActionResult } from "@/utils/action-utils";

export const createPost = async (
  data: z.infer<typeof postSchema>
): Promise<ServerActionResult> => {
  const parsedData = postSchema.parse(data);
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // throw new Error("User not authenticated");
    return { error: "User not authenticated" };
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("username")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    // throw new Error("User profile not found, valid user login is needed to post");
    return {
      error: "User profile not found, valid user login is needed to post",
    };
  }

  const slug = createSlug(parsedData, profile.username);

  const {} = await supabase
    .from("posts")
    .insert([{ ...parsedData, user_id: user.id, slug }])
    .throwOnError();

  revalidatePath("/");
  redirect("/");
};
