const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please enter the name of product"]
    },
    description:{
        type: String,
        required: [true,"Please enter a little description of product"]
    },
    price:{
        type: Number,
        required: [true,"Please enter the price of product"],
        maxlength: [8,"price cannot be more than 99999999"]
    },
    ratings:{
        type: Number,
        default: 0
    },
    images:[
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required: [true,"Please enter product category"]
    },
    Stock:{
        type: Number,
        required:[true,"Please enter product stock"],
        default: 0
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                required: true,
                ref: "user"
            },
            name:{
                type: String,
                required: false
            },
            rating:{
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "user"
    },
    createdAt:{
        type: Date,
        default: Date.now   
    }
})

module.exports = mongoose.model("Product",productSchema);