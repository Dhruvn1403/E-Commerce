const express = require("express");
const { registerUser, loginUser, logOut } = require("../controller/userController");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logOut);

module.exports = router;
