"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { logInSchema } from "./schemas";
import { ServerActionResult } from "@/utils/action-utils";

export const logIn = async (
  data: z.infer<typeof logInSchema>
): Promise<ServerActionResult> => {
  const supabase = createClient();

  const parsedData = logInSchema.parse(data);

  const { error } = await supabase.auth.signInWithPassword(parsedData);
  if (error) {
    console.error("error: ", error?.message);
    // throw new ServerActionError(error.message || "Failed to login")
    return { error: error.message};
  }

  redirect("/");
};

// original:

// 'use server'

// import { z } from 'zod'
// import { redirect } from 'next/navigation'

// import { createClient } from '@/utils/supabase/server'
// import { logInSchema } from './schemas'

// export const logIn = async (data: z.infer<typeof logInSchema>) => {
//   const supabase = createClient()

//   const parsedData = logInSchema.parse(data)

//   const {error} = await supabase.auth.signInWithPassword(parsedData)
//   if (error) {
//     throw error
//   }

//   redirect('/')
// }
