const express = require("express");
const requestLogger = require("../middleware/requestLogger");
const ipRateLimiter = require("../middleware/ipRateLimiter");

module.exports = function loadExpress(app) {
    app.use(express.json());
    app.use(requestLogger);
    app.use(ipRateLimiter);    
};