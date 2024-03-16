const express=require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, postReview, getProductReviews, deleteReview} = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router=express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/products/new").post(isAuthenticatedUser, authorizeRoles("admin"),  createProduct);

router.route("/admin/products/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
                            .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
                            
router.route("/products/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, postReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;