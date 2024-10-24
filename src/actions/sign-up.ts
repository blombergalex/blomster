// 'use server'

// import { createClient } from '@/utils/supabase/server'
// import { redirect } from 'next/navigation'

// // så next ser att det är server actions

// export const signUp = async (formData: FormData) => {
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const supabase = createClient()
//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.signUp(data)

//   if (user && user.email) { //om vi lyckades skapa en användare
//     await supabase.from('users').insert([{id: user.id, email: user.email}])
//     console.log('vår users table', {data, error})
//   }

//   console.log({user, error})

//   redirect('/')
// }
