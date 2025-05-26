import { useQuery } from "@tanstack/react-query";

interface RateLimitInfo {
  remaining: number;
  resetTime: number;
  resetTimeHours: number;
  isAllowed: boolean;
}

export function useRateLimit() {
  return useQuery({
    queryKey: ["rate-limit"],
    queryFn: async (): Promise<RateLimitInfo> => {
      const response = await fetch("/api/rate-limit");
      if (!response.ok) {
        throw new Error("Failed to fetch rate limit info");
      }
      return response.json();
    },
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}
