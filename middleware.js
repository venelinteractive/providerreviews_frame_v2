import { NextResponse } from 'next/server';

export function middleware(request) {
  // Handle provider routes
  if (request.nextUrl.pathname.startsWith('/providers/')) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/providers/:path*',
};
