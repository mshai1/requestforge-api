const express = require("express");
const router = express.Router();

const apiKeyAuth = require("../middleware/apiKeyAuth");
const apiRateLimiter = require("../middleware/apiRateLimiter");

const toolsRouter = require("./tools.routes");

router.use(apiKeyAuth);
router.use(apiRateLimiter);

router.use("/tools", toolsRouter);

router.get("/health", (req, res) => {
    res.json({
        status:"ok",
        service: "requestforge-api"
    });
});

module.exports = router;
