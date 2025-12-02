import { NextRequest, NextResponse } from "next/server";

import { updateSession } from "./lib/supabase/middleware";
import { TPublicRoute, PUBLIC_ROUTES } from "./config";

const generateRegexFromRoutes = (routes: TPublicRoute) => {
  const patterns: string[] = [];

  const convertPathToRegex = (path: string) => {
    return (
      path
        .replace(/\[\[\.{3}slug\]\]/g, "(/[^/]+|.*|.*)") // Optional dynamic segments
        .replace(/\[\.{3}slug\]/g, "(/[^/]+)*") // Dynamic segments
        .replace(/\[slug\]/g, "([^/]+)") // Single dynamic segment
        .replace(/\//g, "\\/") + // Escape slashes
      "?"
    ); // Optional trailing segment
  };

  for (const base in routes) {
    routes[base as keyof TPublicRoute].forEach((path) => {
      patterns.push(convertPathToRegex(path));
    });
  }

  return new RegExp(`^(${patterns.join("|")})$`, "i");
};

export const config = {
  matcher: [
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    // "/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|sitemap/.*|site\\.webmanifest).*)",
  ],
};

export default async function proxy(req: NextRequest) {
  const reqUrl = new URL(req.url);
  const publicPathnameRegex = generateRegexFromRoutes(PUBLIC_ROUTES);

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  const { supabaseResponse, user } = await updateSession(req);

  if (!user && !isPublicPage) {
    let next = reqUrl.searchParams.get("next"); // next URL
    const loginUrl = new URL("/login", req.url);
    if (!next) {
      next = reqUrl.pathname;
    }

    loginUrl.searchParams.set("next", encodeURIComponent(next));
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}
