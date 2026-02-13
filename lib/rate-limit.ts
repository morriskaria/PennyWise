/**
 * Simple in-memory rate limiter for API endpoints
 * Prevents brute-force attacks by limiting requests per IP address
 * 
 * Note: For production with multiple servers, consider using Redis
 */

interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    };
}

const store: RateLimitStore = {};

/**
 * Rate limit configuration
 */
const RATE_LIMIT = {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10, // 10 requests per window
};

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (usually IP address)
 * @returns true if request should be blocked, false otherwise
 */
export function isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const record = store[identifier];

    // If no record exists or the window has expired, create a new record
    if (!record || now > record.resetTime) {
        store[identifier] = {
            count: 1,
            resetTime: now + RATE_LIMIT.windowMs,
        };
        return false;
    }

    // Increment the count
    record.count++;

    // Check if limit exceeded
    if (record.count > RATE_LIMIT.maxRequests) {
        return true;
    }

    return false;
}

/**
 * Get the client IP address from a request
 * @param request - Next.js request object
 * @returns IP address string
 */
export function getClientIp(request: Request): string {
    // Try to get IP from various headers (for proxies/load balancers)
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');

    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    if (realIp) {
        return realIp;
    }

    // Fallback (won't work behind proxies)
    return 'unknown';
}

/**
 * Clean up expired entries from the store (should be called periodically)
 */
export function cleanupRateLimitStore(): void {
    const now = Date.now();
    Object.keys(store).forEach((key) => {
        if (store[key].resetTime < now) {
            delete store[key];
        }
    });
}

// Cleanup every 5 minutes
if (typeof window === 'undefined') {
    setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}
