import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Middleware to protect routes
 * Redirects unauthenticated users to the login page
 */
export async function middleware(request: NextRequest) {
    // Get the pathname
    const { pathname } = request.nextUrl;

    // Check if the route is protected
    const isProtectedRoute = pathname.startsWith('/dashboard');

    if (isProtectedRoute) {
        // Get the token from the request
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // If no token, redirect to auth page
        if (!token) {
            const url = new URL('/auth', request.url);
            url.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

/**
 * Configure which routes to run middleware on
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - auth (auth page itself)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
    ],
};
