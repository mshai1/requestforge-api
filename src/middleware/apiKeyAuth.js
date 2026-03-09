const { getApiKey } = require("../services/apikeyStore");

function apiKeyAuth(req, res, next) {
    const apiKey = req.headers["x-api-key"];

    if(!apiKey) {
        return res.status(401).json({
            error: "API key required"
        });
    }

    const user = getApiKey(apiKey);

    if(!user) {
        return res.status(403).json({
            error: "Invalid API key"
        });
    }

    //attach user info to request
    req.user = {
        apiKey,
        plan: user.plan
    };

    next();
}

module.exports = apiKeyAuth;