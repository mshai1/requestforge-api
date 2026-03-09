const express = require("express");
const router = express.Router();

const apiKeyAuth = require("../middleware/apiKeyAuth");
const apiRateLimiter = require("../middleware/apiRateLimiter");

router.use(apiKeyAuth);
router.use(apiRateLimiter);

router.get("/health", (req, res) => {
    res.json({
        status:"ok",
        service: "requestforge-api"
    });
});

module.exports = router;
