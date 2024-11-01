'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { logInSchema } from './schemas'

export const logIn = async (data: z.infer<typeof logInSchema>) => {
  const supabase = createClient()

  const parsedData = logInSchema.parse(data)

  const {data: signInData, error} = await supabase.auth.signInWithPassword(parsedData)
  if (error) {
    throw error
  }

  redirect('/')  
}

