'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export const logIn = async (formData: FormData) => {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  await supabase.auth.signInWithPassword(data)

  redirect('/')
}

