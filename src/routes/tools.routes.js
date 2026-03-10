const express = require("express");
const router = express.Router();

const toolsController = require("../controllers/tools.controller");

router.get("/uuid", toolsController.generateUUID);

router.get("/timestamp", toolsController.getTimeStamp);

router.post("/hash", toolsController.hashValue);

router.get("/error", (req, res, next) => {
    next(new Error("Test error"));
});

module.exports = router;