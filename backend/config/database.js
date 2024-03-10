const mongoose=require("mongoose");const Product = require("../models/productModel");

const connectDatabase = () => {

    mongoose.connect(process.env.DB_URI).then(
        (data) => {
            console.log(`MongoDB connected to server : ${data.connection.host}`);
        });

}

module.exports = connectDatabase

