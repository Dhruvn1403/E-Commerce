const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//Create Product
exports.createProduct =catchAsyncErrors(async(req,res,next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    });
});

//Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query;
    res.status(200).json({
        success:true, 
        products,
        productsCount
    }); 
});

//Get product details
exports.getProductDetails = catchAsyncErrors(async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        success: true,
        product
    });
});

//Update a product
exports.updateProduct = catchAsyncErrors(async(req, res, next) => {
    
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
        useFindandModify: false
    });

    res.status(200).json({
        success: true,
        product
    });
});

//Delete a product
exports.deleteProduct = catchAsyncErrors(async(req, res ,next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted succesfully"
    })
    
});

//Create new review
exports.postReview = catchAsyncErrors( async(req, res, next) => {

    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating= rating;
                rev.comment= comment;
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg=0;

    product.reviews.forEach((rev) => {
        avg+=rev.rating;
    })
    product.ratings = avg/product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })
});

//Get all reviews of a product
exports.getProductReviews = catchAsyncErrors( async(req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not Found",404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

//Delete a review
exports.deleteReview = catchAsyncErrors( async(req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not Found",404));
    }

    const reviews= product.reviews.filter((rev) => rev.user.toString() !== req.query.userid.toString());
    
    const ratings = 0;
    
    if(reviews.length !== 0){
        let avg=0;

        reviews.forEach((rev) => {
        avg+=rev.rating;
        });
        const ratings = avg/reviews.length;
    }

    const numOfReviews = product.reviews.length; 
    
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    },{
        new: true,
        runValidators: true,
        useFindandModify: false
    });
    console.log(product.reviews);
    res.status(200).json({
        success: true,
    });    
});