export interface RateLimiter {
  /**
   * Checks if a request is allowed.
   */
  check(key: string, limit: number, windowSeconds: number): Promise<{
    allowed: boolean;
    remaining: number;
    reset: number;
  }>;
}

/**
 * Phase 1 in-memory implementation.
 */
export class InMemoryRateLimiter implements RateLimiter {
  private hits: Record<string, { count: number; reset: number }> = {};

  async check(key: string, limit: number, windowSeconds: number): Promise<{
    allowed: boolean;
    remaining: number;
    reset: number;
  }> {
    const now = Date.now();
    const record = this.hits[key];

    if (!record || record.reset < now) {
      this.hits[key] = { count: 1, reset: now + windowSeconds * 1000 };
      return { allowed: true, remaining: limit - 1, reset: this.hits[key].reset };
    }

    if (record.count >= limit) {
      return { allowed: false, remaining: 0, reset: record.reset };
    }

    record.count++;
    return { allowed: true, remaining: limit - record.count, reset: record.reset };
  }
}

export const rateLimiter = new InMemoryRateLimiter();
