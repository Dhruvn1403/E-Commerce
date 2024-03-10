const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser= catchAsyncErrors( async(req, res, next) => {
    console.log("here");
    const token = req.cookies;
    console.log(token);
});
