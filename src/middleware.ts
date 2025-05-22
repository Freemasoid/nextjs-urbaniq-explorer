import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  // Get the pathname from the URL
  const path = req.nextUrl.pathname;

  // Check if the path is protected
  if (
    path.startsWith("/chat") ||
    path.startsWith("/tours") ||
    path.startsWith("/profile") ||
    path.startsWith("/new-tour")
  ) {
    // Check if the user is authenticated
    try {
      await auth.protect();
    } catch (error) {
      // If not authenticated, redirect to sign-in
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", path);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip static files but match everything else
    "/((?!_next/image|_next/static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    // Include API routes
    "/(api|trpc)(.*)",
    // Explicitly include protected routes
    "/chat",
    "/chat/(.*)",
    "/tours",
    "/tours/(.*)",
    "/profile",
    "/profile/(.*)",
    "/new-tour",
    "/new-tour/(.*)",
  ],
};
