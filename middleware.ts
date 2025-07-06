import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login') &&
    !request.nextUrl.pathname.startsWith('/admin/setup') &&
    !request.nextUrl.pathname.startsWith('/admin/test-login') &&
    !request.nextUrl.pathname.startsWith('/admin/debug')
  ) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.set('admin_token', '', {
        httpOnly: true,
        maxAge: 0,
        path: '/',
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};