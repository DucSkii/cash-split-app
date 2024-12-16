import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log(`Middleware triggered for path ${request.nextUrl.pathname}`)

  const authToken = request.cookies.get('authToken') // Checks cookies to see if there is an auth token.
  console.log(`Auth token found: ${authToken ? 'Yes' : 'No'}`)

  const url = request.nextUrl.clone() // Clones the url so we can modify the URL without affecting the original.

  // If the user is authenticated, redirect to main page.
  if (
    authToken &&
    (url.pathname === '/' ||
      url.pathname === '/login' ||
      url.pathname === '/signup')
  ) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // If user is unauthenticated, redirect to landing page.
  if (!authToken && !['/', '/login', '/signup'].includes(url.pathname)) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next() // Allows the request to continue for other cases.
}

export const config = {
  matcher: ['/', '/login', '/signup', '/dashboard', '/settings'], // The middleware will be applied to these paths.
}
