import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookieAuth = request.cookies.get('access_token')?.value
  const tokenExpiration = request.cookies.get('tokenExpiration')?.value

  // Cek tokenExpiration
  if (tokenExpiration && parseInt(tokenExpiration) < Date.now()) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('access_token')
    response.cookies.delete('data_user')
    response.cookies.delete('tokenExpiration')
    return response
  }

  // Redirect unauthenticated users to login (except paths starting with /login, /register, /forgot-password, and /excluded-path)
  if (
    !cookieAuth &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/register') &&
    !request.nextUrl.pathname.startsWith('/forgot-password') &&
    !request.nextUrl.pathname.startsWith('/excluded-path')
  ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Check if the user is authenticated and trying to access the login page
  if (cookieAuth && request.nextUrl.pathname.startsWith('/login')) {
    // Redirect authenticated users to the home page or another suitable page
    return NextResponse.redirect(new URL('/', request.url)) // Or any other desired redirect path
  }

  return NextResponse.next()
}

// Configure paths to include or exclude from the middleware
export const config = {
  matcher: ['/((?!login|_next/static|_next/image|favicon.ico|img|icons|svg).*)'],
}
