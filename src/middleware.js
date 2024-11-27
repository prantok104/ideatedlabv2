import { NextResponse } from "next/server";
import { freeRouter, LOGIN_ROUTE } from "./utils/router";
import { ACCESS_TOKEN_KEY } from "./utils/static-const";

export async function middleware(request) {
  const currentPath = request.nextUrl.pathname;

  // If the user doesn't have an access token and is not on a free or login route
  if (
    !request.cookies.get(ACCESS_TOKEN_KEY) &&
    !freeRouter.includes(currentPath) &&
    currentPath !== LOGIN_ROUTE
  ) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
