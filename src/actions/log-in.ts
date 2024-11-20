'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { logInSchema } from './schemas'
import { createServerAction, ServerActionError } from '@/utils/action-utils'

export const logIn = createServerAction(async (data: z.infer<typeof logInSchema>) => {
  const supabase = createClient()

  const parsedData = logInSchema.parse(data)

  const {error} = await supabase.auth.signInWithPassword(parsedData)
  if (error) {
    console.log("error: ", error?.message)
    throw new ServerActionError(error.message || "Failed to login")
  }

  redirect('/')  
})

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