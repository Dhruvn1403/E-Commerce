const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server error";

    //wrong ID Error
    if(err.name === "CastError"){
        err = new ErrorHandler(`Resource not found Invalid ${err.path}`,400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};