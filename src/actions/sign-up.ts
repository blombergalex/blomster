"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { signUpSchema } from "./schemas";

export const signUp = async (data: z.infer<typeof signUpSchema>) => {
  const supabase = createClient();

  const parsedData = signUpSchema.parse(data);

  const { data: existingUsername } = await supabase
    .from("users")
    .select("username")
    .eq("username", parsedData.username)
    .single();

  if (existingUsername) {
    throw new Error("Username already taken");
  }

  const { data: existingUserEmail } = await supabase
    .from("users")
    .select("email")
    .eq("email", parsedData.email)
    .single();

  if (existingUserEmail) {
    throw new Error("A user with this email already exists");
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.signUp(parsedData);

  if (authError) {
    throw authError;
  }

  if (user && user.email) {
    const { error: registerError } =  await supabase
      .from("users")
      .insert([{ id: user.id, email: user.email, username: data.username }])
      .select('*')

    if (registerError) {
        throw new Error('Could not register public user')
      }
  }
    
  redirect("/");

};
