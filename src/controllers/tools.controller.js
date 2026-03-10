const crypto = require("crypto");

function generateUUID(req, res) {
    const uuid = crypto.randomUUID();

    res.json({
        uuid
    });
}

function getTimeStamp(req, res) {
    res.json({
        timeStamp: Date.now()
    });
}

function hashValue(req, res) {
    const { value } = req.body;

    if(!value) {
        return res.status(400).json({
            error: "value is required"
        });
    }

    const hash = crypto.createHash("sha256")
        .update(value)
        .digest("hex");

    res.json({
        hash
    });
}

module.exports = {
    generateUUID,
    getTimeStamp,
    hashValue
};