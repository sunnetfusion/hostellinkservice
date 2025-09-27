
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // This is a mock authentication check. In a real application, you would
  // verify a token or session here.
  const isAdmin = false; // Replace with your actual authentication logic

  if (pathname.startsWith('/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
