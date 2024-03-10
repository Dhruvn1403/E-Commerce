const ErrorHandler= require("../utils/errorHandler");
const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const User= require("../models/userModel");
const sendToken = require("../utils/jwtToken");

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
