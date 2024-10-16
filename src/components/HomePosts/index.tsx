'use client'

import { useQuery } from '@tanstack/react-query'

import { getHomePosts, HomePostsType } from '@/app/utils/supabase/queries'
import { Post } from '@/components/Post'

export const HomePosts = ({initialPosts}:{initialPosts:HomePostsType}) => {
  const {data: posts} = useQuery({
    queryKey: ['home-posts'],
    queryFn: async () => {
      const {data, error} = await getHomePosts()

      if ( error ) throw error
      return data
    },
    initialData: initialPosts,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: true,
  })

  console.log({posts} )
  return (
    <section className='flex gap-2 items-center'>
      <h2>POSTS</h2>
      {/* {posts.map(({id, title, slug, users}) => {
        <Post 
          key={id}
          title={title}
          slug={slug}
          autor={users?.username || 'anonymous'}
        />
      })} */}
    </section>
  )
}