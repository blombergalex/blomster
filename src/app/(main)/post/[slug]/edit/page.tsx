import { createClient } from '@/utils/supabase/server'
import { EditPostForm } from './form'

import { notFound } from 'next/navigation'

export default async function EditPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createClient()
  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content, user_id')
    .eq('slug', params.slug)
    .single()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isAuthor = user && user.id === post?.user_id

  if (error || !post || !isAuthor) notFound()

  return (
    <main className="w-full px-2 flex flex-col my-4 flex-grow items-center">
      <h1 className="text-tiny text-foreground uppercase font-bold p-2">
        Edit post page
      </h1>
      <EditPostForm defaultValues={post} postId={post.id} />
    </main>
  )
}
