const express = require("express");
const router = express.Router();

const { createApiKey, listApiKeys } = require("../services/apikeyStore");

router.post("/apikey", (req, res) => {
    const { plan } = req.body;

    const key = createApiKey(plan || "free");

    res.json({
        apiKey: key,
        plan: plan || "free"
    });
});

router.get("/apikeys", (req, res) => {
    res.json(listApiKeys());
});

module.exports = router;