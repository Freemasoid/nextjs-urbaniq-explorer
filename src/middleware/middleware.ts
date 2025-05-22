import { clerkMiddleware } from "@clerk/nextjs/server";

// This array contains all public routes - paths that don't require authentication
const publicPaths = ["/sign-in*", "/sign-up*", "/"];

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next/image|_next/static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/(api|trpc)(.*)",
  ],
};
