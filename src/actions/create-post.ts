'use server'

import { createClient } from '@/utils/supabase/server'
import { createPostSchema } from './schemas'
import { z } from 'zod'
import { createSlug } from '@/utils/create-slug'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export const createPost = async (data: z.infer<typeof createPostSchema>) => {
  const parsedData = createPostSchema.parse(data)
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  // const username = data.user.username // to work username must be column of user, then pass username to createSlug together with parsedData

  const { error } = await supabase
    .from('posts')
    .insert([{ ...parsedData, user_id: user.id, slug:createSlug(parsedData) }]) // in the slugify function, I can also use a uuid
    .throwOnError()

    revalidatePath('/')
    redirect('/')
}
