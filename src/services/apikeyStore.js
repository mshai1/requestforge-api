const crypto = require("crypto");
const apiKeys = {
    "free_123": { plan: "free" },
    "pro_256": { plan: "pro" },
    "enterpise_789": { plan: "enterprise" }
};

function generateApiKey() {
    return crypto.randomBytes(16).toString("hex");
}

function createApiKey(plan = "free") {
    const key = generateApiKey();

    apiKeys[key] = {
        plan
    };

    return key;
}
function getApiKey(key) {
    return apiKeys[key] || null;
}

function listApiKeys() {
    return apiKeys;
}

module.exports = {
    getApiKey,
    createApiKey,
    listApiKeys
};