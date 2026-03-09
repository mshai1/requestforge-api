const { consumeToken } = require("../services/tokenBucket");
const { getPlan } = require("../services/planService");

async function apiRateLimiter(req,res, next) {
    try {
        const { apiKey, plan } = req.user;
        const planConfig = getPlan(plan);

        if(!planConfig) {
            return res.status(500).json({
                error:"Invalid plan configuration"
            });
        }

        const { capacity, refillRate} = planConfig;

        const result = await consumeToken(
            apiKey,
            capacity,
            refillRate,
            "rate_limit:api"
        );

        if(result.allowed) {
            res.set("X_RateLimit-Limit", capacity);
            res.set("X-RateLimit-Remaining", Math.floor(result.remaining));

            return next();
        }

        res.set("Retry-After", result.retryAfter);

        return res.status(429).json({
            error: "API rate limit exceeded"
        });


    } catch (err) {
        console.error("API limiter error:", err);
        next();
    }
}

module.exports = apiRateLimiter;
