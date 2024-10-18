import { createClient } from "./client";
import { type QueryData } from "@supabase/supabase-js";

export const getHomePosts = () => {
  const supabase = createClient()
  return supabase
    .from('posts')
    .select('id, title, slug, users("username"), image, content')
    .order('created_at', {ascending: false})
}

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>

export const getPostsByQuery = (query: string) => { // for search bar
  const supabase = createClient()
  return supabase 
    .from('posts')
    .select('id, title, slug')
    .textSearch('title', query.replace(/ /g, '+')) //fixa så den söker med hela ord och inte bara träffen den får, använd I like!
    // check supabase textsearch in documentation

}