import { createServerClient } from "@supabase/ssr"
import { NextResponse, NextRequest } from "next/server"

export const middleware = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({request})

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({name, value}) =>
          request.cookies.set(name, value),
        )

        supabaseResponse = NextResponse.next({request})
        cookiesToSet.forEach(({name, value, options}) => 
          supabaseResponse.cookies.set(name, value, options))
        },
      }
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser() // refreshar user session = användaren uppdateras och vi ser om den är inloggad eller inte

  if (!user && protectedRoutes.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/log-in'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

// array of protected routes
const protectedRoutes = ['/create']


// the middleware is active right before a component is rendered
// in this case we want it to check that the user information is updated before rendering it
// taget från dokumentationen, såhär vill supabase att man hanterar cookien med Next

