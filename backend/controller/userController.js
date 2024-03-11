const ErrorHandler= require("../utils/errorHandler");
const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const User= require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");

//Register a user
exports.registerUser = catchAsyncErrors( async(req, res, next) => {

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepicurl"
        }
    });

    sendToken(user, 201, res);
 });

 //Login User
 exports.loginUser= catchAsyncErrors( async(req, res, next) => {
    
    const {email, password} = req.body;

    //whether both email and password are provided or not
    if (!email || !password){
        return next(new ErrorHandler("Please Enter Email ID and Password",400));
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid EMAIL ID or Password",401));
    }

    const isPasswordMatched = await user.comparePassword( password );

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email ID or PASSWORD",401));
    }

    sendToken(user, 200, res);
 });

 //Log Out User
 exports.logOut = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date( Date.now() ),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
 })

 //forgot password
 exports.forgotPassword = catchAsyncErrors( async(req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    //get resetPasswordtoken
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- /n/n ${resetPasswordUrl}`;

    try{

        await sendEmail({
            email: user.email,
            subject: 'Ecommerce password receovery',
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
 })