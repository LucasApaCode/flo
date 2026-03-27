import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server'

// Edge-compatible config — NO Prisma, NO bcrypt, just JWT verification
const edgeAuthConfig: NextAuthConfig = {
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnAuth =
        nextUrl.pathname.startsWith('/login') ||
        nextUrl.pathname.startsWith('/register')

      if (isOnDashboard && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl))
      }
      if (isOnAuth && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return NextResponse.next()
    },
  },
}

const { auth } = NextAuth(edgeAuthConfig)
export { auth as proxy }

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
