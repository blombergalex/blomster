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
    throw error  //varför kastas inte felet?
  }

  // console.log({user, error})

  if (user && user.email) {
    await supabase.from('users').insert([
      {id: user.id, email: user.email, username: data.username}
    ])

    console.log('new user:', {data, error})
  } else {
    console.log('user not registered', {error})
  }

  redirect('/')
}
