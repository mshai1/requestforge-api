const express = require("express");
const morgan = require("morgan");

const requestLogger = require("../middleware/requestLogger");
const ipRateLimiter = require("../middleware/ipRateLimiter");

module.exports = function loadExpress(app) {
    app.use(express.json());

    //request handling
    app.use(morgan("dev"));

    //custom request logger
    app.use(requestLogger);

    //rate limiter
    app.use(ipRateLimiter);    
};