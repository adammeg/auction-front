import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of public paths that don't require authentication
const publicPaths = [
  '/',
  '/authentication',
  '/auth',
  '/register',
  '/about',
  '/help',
  '/contact',
  '/terms',
  '/privacy',
]

// List of paths that should redirect to auctions after login
const redirectPaths = [
  '/auctions',
  '/dashboard',
  '/my-bids',
  '/my-listings',
  '/search',
  '/categories',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  )
  
  // Get the token from cookies
  const token = request.cookies.get('token')?.value
  
  // If the path is not public and there's no token, redirect to login
  if (!isPublicPath && !token) {
    // Store the original URL to redirect back after login
    const url = new URL('/auth/login', request.url)
    url.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search)
    return NextResponse.redirect(url)
  }
  
  // If user is logged in and tries to access login page, redirect to auctions
  if (token && pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/auctions', request.url))
  }
  
  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (image files)
     * - api/ (API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
} 