"use server"

import { createClient } from "@/utils/supabase/server"
import { commentSchema } from "./schemas"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createComment = async (data:z.infer<typeof commentSchema>) => {
  const parsedData = commentSchema.parse(data)
  const supabase = createClient()

  const {
    data: {user},
   } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to comment")
  }

//

  const {}
  }


// unique key contraint when adding second comment

// create policies!!!