import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const token = url.searchParams.get("demo");
  const cookie = request.cookies.get("popcornia-access");

  // Allow access to the access-denied page without checks
  if (url.pathname === "/access-denied") {
    return NextResponse.next();
  }

  if (cookie?.value === "true") {
    const response = NextResponse.next();
    response.headers.set("x-debug-time", new Date().toISOString());
    return response;
  }

  if (token === process.env.DEMO_ACCESS_TOKEN) {
    const response = NextResponse.redirect(new URL("/", request.url));

    response.cookies.set("popcornia-access", "true", {
      path: "/",
    });

    return response;
  }

  return NextResponse.redirect(new URL("/access-denied", request.url));
};

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|access-denied).*)",
  ],
};
