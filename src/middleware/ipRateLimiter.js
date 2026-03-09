const { redisClient } = require("../config/redis");
const { consumeToken } = require("../services/tokenBucket");

const MAX_CAPACITY = 5;
const REFILL_RATE = 0.5;

async function ipRateLimiter(req, res, next) {
    try{
        let bucket;
        const identifier = req.ip;
        console.log("IP Rate Limiter running for:", req.ip);

        const result = await consumeToken(
            identifier,
            MAX_CAPACITY,
            REFILL_RATE,
            "rate_limit:ip"
        );

        if(result.allowed) {
            res.set("X-RateLimit-Limit", MAX_CAPACITY);
            res.set("X-RateLimit-Remaining", Math.floor(result.remaining));

            return next();
        }

        res.setHeader("Retry-After", result.retryAfter);
        return res.status(429).json({
            error: "Rate limit exceeded"
        });
    } catch (err) {
        console.error("Redis limiter error:", err);
        next();
    }
}

module.exports = ipRateLimiter;