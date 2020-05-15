const express = require("express");

const {
    signup,
    signin,
    signout,
    forgotPassword,
    resetPassword,
    socialLogin
} = require("../controllers/auth");
const {userById} = require("../controllers/user")
const router=express.Router();

//const validator = require("../validators");
const { userSignupValidator, passwordResetValidator } = require("../validators");
 
// password forgot and reset routes
router.post("/social-login", socialLogin); 
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);
router.post('/signup', userSignupValidator,signup);
router.post('/signin',signin);
router.get('/signout',signout);
router.param("userId",userById)

module.exports=router;