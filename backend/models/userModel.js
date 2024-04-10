const mongoose= require("mongoose");
const validator = require("validator");
const dns = require('dns');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { log } = require("console");

function validateEmail(email) {
    if (!validator.isEmail(email)) {
        return false;
    }

    // Additional checks (e.g., domain existence)
    const domain = email.split('@')[1];
    return new Promise((resolve, reject) => {
        dns.resolve(domain, 'MX', (err, addresses) => {
            if (err || !addresses || addresses.length === 0) {
                resolve(false); // Domain does not exist
            } else {
                resolve(true); // Domain exists
            }
        });
    });
}


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please Enter your name"],
        maxLength: [30,"Name should not exceed 30 characters"],
        minLength: [4, "Name cannot be shorter than 4 characters"]
    },
    email:{
        type: String,
        required: [true, "Please Enter your Email"],
        validate: [validateEmail, "Plase Enter valid Email ID"],
        unique: [true ,"An account already exists with this Email id!!"]
    },
    password:{
        type: String,
        required: [true, "Please Enter the password"],
        minLength: [8, "Password should be at least of 8 characters"],
        select: false
    },
    avatar:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: "user"
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
})

//JWTToken
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

//Compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Genrating password reset token
userSchema.methods.getResetPasswordToken = function() {

    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    //hashing and adding resetPasswordToken to schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire =  Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports= mongoose.model("User",userSchema);