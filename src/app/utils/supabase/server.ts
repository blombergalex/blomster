import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

import { type Database } from "./database.types"

export const createClient = () => {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try{
            cookiesToSet.forEach(({name, options, value}) => 
              cookieStore.set(name, value, options),
          )
          } catch {  

          }
        }
      }
    }
  )
}