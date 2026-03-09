const apiRoutes = require("../routes/api.routes");
const authRoutes = require("../routes/auth.routes");
const ipRateLimiter = require("../middleware/ipRateLimiter");

module.exports = function loadRoutes(app) {

    // apply IP limiter globally
    app.use(ipRateLimiter);
    app.use("/api", apiRoutes);
    app.use("/auth", authRoutes);
}