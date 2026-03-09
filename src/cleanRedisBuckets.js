const { redisClient } = require("./config/redis");

async function cleanBuckets() {
    try {
        const keys = await redisClient.keys("rate_limit:*");

        for (const key of keys) {
            const data = await redisClient.get(key);
            if(!data) continue;

            const bucket = JSON.parse(data);

            if("token" in bucket) {
                delete bucket.token;
                
                await redisClient.set(key, JSON.stringify(bucket), { EX: 3600 });
                console.log(`Cleaned bucket for key: ${key}`);
            }
        }
        console.log("All old buckets cleaned successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Error cleaning buckets:", err);
        process.exit(1);
    }
}

cleanBuckets();