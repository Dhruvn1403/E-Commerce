const express=require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controller/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router=express.Router();
console.log("productRoutes")
router.route("/products").get(getAllProducts);
console.log("getallproducts called");
router.route("/products/new").post(createProduct);

router.route("/products/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router;