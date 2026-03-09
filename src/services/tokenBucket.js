const { redisClient } = require("../config/redis");

async function consumeToken(identifier, capacity, refillRate, prefix) {
    
    const key = `${prefix}:${identifier}`;
    const now = Date.now();

    let bucket;

    const data = await redisClient.get(key);

    if(!data) {
        bucket = {
            tokens: capacity,
            lastRefill: now
        };
    } else{
        bucket = JSON.parse(data);
    }
    
    const elapsed = (now - bucket.lastRefill) / 1000;
    const tokenToAdd = elapsed * refillRate;

    if(tokenToAdd > 0) {
        bucket.tokens = Math.min(
            capacity,
            bucket.tokens + tokenToAdd
        );
        bucket.lastRefill = now;
    }

    if(bucket.tokens >= 1) {
        bucket.tokens -= 1;

        await redisClient.set(key, JSON.stringify(bucket), {
            EX: 3600
        });

        return {
            allowed: true,
            remaining: bucket.tokens
        };
    }

    const retryAfter = Math.ceil((1 - bucket.tokens) / refillRate);

    return {
        allowed: false,
        retryAfter
    };
}

module.exports = { consumeToken };