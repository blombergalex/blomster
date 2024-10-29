'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signUpSchema } from './schemas'

// så next ser att det är server actions

export const signUp = async (formData: FormData) => {
  const data = {
    email: formData.get('email') as string,
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  }

  const supabase = createClient()

  const parsedData = signUpSchema.parse(data)

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(parsedData)

  if ( error ) {
    throw error
  }

  console.log({user, error})

  if (user && user.email) { //om vi lyckades skapa en användare
    await supabase.from('users').insert([
      {id: user.id, email: user.email, username: data.username}
    ])
    console.log('new user:', {data, error})
  } else {
    console.log('user not registered', {error})
  }

  redirect('/')
}
