'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

import { createClient } from '@/utils/supabase/server'
import { signUpSchema } from './schemas'

export const signUp = async (data: z.infer<typeof signUpSchema>) => {
  const supabase = createClient()

  const parsedData = signUpSchema.parse(data)

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(parsedData)

  if ( error ) {
    throw error  
  }

  if (user && user.email) {
    await supabase.from('users').insert([
      {id: user.id, email: user.email, username: data.username}
    ])
  }

  redirect('/')
}
