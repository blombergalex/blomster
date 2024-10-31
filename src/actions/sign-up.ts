'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { signUpSchema } from './schemas'

export const signUp = async (formData: FormData) => {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  }

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
      {id: user.id, email: user.email, username: data.username} //keep username, to insert it to the user profile!
    ])

    console.log('new user:', {data, error})
  } else {
    console.log('user not registered', {error})
  }

  redirect('/')
}
