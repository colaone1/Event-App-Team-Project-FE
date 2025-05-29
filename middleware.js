import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/user');
  const isProtectedRoute = [
    '/create',
    '/update',
    '/delete'
  ].some((route) => request.nextUrl.pathname.startsWith(route));

  // If trying to access auth page while logged in, redirect to home
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If trying to access protected route without being logged in, redirect to unauthorized
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/create/:path*', '/update/:path*', '/delete/:path*']
}; 