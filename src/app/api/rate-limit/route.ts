import { NextResponse } from "next/server";
import { rateLimiter } from "@/lib/rate-limiter";
import { getClientIP } from "@/lib/get-client-ip";

export async function GET() {
  try {
    const clientIP = await getClientIP();
    const remaining = rateLimiter.getRemainingRequests(clientIP);
    const resetTime = rateLimiter.getResetTime(clientIP);

    return NextResponse.json({
      remaining,
      resetTime,
      resetTimeHours: Math.ceil(resetTime / (1000 * 60 * 60)),
      isAllowed: remaining > 0,
    });
  } catch (error) {
    console.error("Error checking rate limit:", error);
    return NextResponse.json(
      { error: "Failed to check rate limit" },
      { status: 500 }
    );
  }
}
