const ErrorHandler= require("../utils/errorHandler");
const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const User= require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")

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
 });

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
            message: `Email sent to ${req.body.email} successfully`
        })

    } catch (error) {
        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
 });

 //reset password
 exports.resetPassword = catchAsyncErrors( async(req, res, next) => {

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken, //equivalent to resetPasswordToken:resetPasswordToken
        resetPasswordExpire: {$gt : Date.now()}
    }).select("+password");

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't match!", 400));
    }

    if(await user.comparePassword(req.body.password)){
        return next(new ErrorHandler("New password cannot be the same as old one!", 400));
    }
    
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
 });

 //Get User details
 exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findById(req.user.id);

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    res.status(200).json({
        success: true,
        user
    });
});

//update password
exports.updatePassword = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword( req.body.oldpassword );
    
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password incorrect!",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Passwords does not match",404));
    }

    if(await user.comparePassword(req.body.password)){
        return next(new ErrorHandler("New password cannot be the same as old one!", 400));
    }

    user.password = await req.body.password;

    await user.save();

    sendToken(user, 200, res);
});

//update profile
exports.updateProfile = catchAsyncErrors(async(req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };
    //will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        sucess:true,
        user
    });
});

//get all users --admin
exports.getAllUsers = catchAsyncErrors( async(req, res, next) => {

    const users = await User.find();
    const userCount = await User.countDocuments();

    res.status(200).json({
        success: true,
        users,
        userCount
    });
});

//get user's details --admin
exports.getSingleUser = catchAsyncErrors( async(req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not found with Id: ${req.params.id}`,201));
    }

    res.status(200).json({
        success: true,
        user
    });
});

//update user role --admin
exports.updateUserRole = catchAsyncErrors(async(req, res, next) => {
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    
    if(!user){
        return next(new ErrorHandler(`User not found with Id: ${req.params.id}`,201))
    }
   
    res.status(200).json({
        sucess:true,
        user
    });
});

//Delete user --admin
exports.deleteUser = catchAsyncErrors(async(req, res, next) => {

 
    //will remove cloudinary later

    const user = await User.findById(req.params.id);
    
    if(!user){
        return next(new ErrorHandler(`User not found with Id: ${req.params.id}`,201))
    }
    
    await User.deleteOne(user);
    
    res.status(200).json({
        sucess:true,
        message: "User deleted successfully!!"
    });
});