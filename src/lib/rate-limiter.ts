interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private limit: number;
  private windowMs: number;

  constructor(limit: number = 20, windowMs: number = 24 * 60 * 60 * 1000) {
    // 20 requests per day
    this.limit = limit;
    this.windowMs = windowMs;
  }

  isAllowed(ip: string): boolean {
    const now = Date.now();
    const userLimit = this.store[ip];

    if (!userLimit) {
      this.store[ip] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return true;
    }

    if (now > userLimit.resetTime) {
      // Reset the limit
      this.store[ip] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return true;
    }

    if (userLimit.count >= this.limit) {
      return false;
    }

    userLimit.count++;
    return true;
  }

  getRemainingRequests(ip: string): number {
    const userLimit = this.store[ip];
    if (!userLimit) return this.limit;

    const now = Date.now();
    if (now > userLimit.resetTime) return this.limit;

    return Math.max(0, this.limit - userLimit.count);
  }

  getResetTime(ip: string): number {
    const userLimit = this.store[ip];
    if (!userLimit) return 0;
    return Math.max(0, userLimit.resetTime - Date.now());
  }
}

export const rateLimiter = new RateLimiter();
