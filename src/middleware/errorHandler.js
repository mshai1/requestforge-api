module.exports = function errorHandler(err, req, res, next) {
    console.log("Error middleware triggered!"); // <--- add this
    console.error(err);

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error"
    });
};