import { type QueryData } from "@supabase/supabase-js";

import { createClient } from "@/utils/supabase/client";

export const getHomePosts = (supabase: ReturnType<typeof createClient>) => {
  return supabase
    .from('posts')
    .select('id, title, slug, users("username"), content')
    .order('created_at', {ascending: false})
}

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>

export const getPostComments = (supabase: ReturnType<typeof createClient>) => {
  return supabase.from('comments').select('id, content').order('created_at', {ascending: true})
}

export type CommentsType = QueryData<ReturnType<typeof getHomePosts>>

