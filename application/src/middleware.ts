// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export function middleware(req: NextRequest) {
  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};