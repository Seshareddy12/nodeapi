const express = require("express");

const {userById,allUsers,getUser,updateUser,deleteUser,userPhoto,addFollowing,addFollower,removeFollower,removeFollowing,findPeople} = require("../controllers/user")
const {requireSign} = require("../controllers/auth");
const router=express.Router();

//const validator = require("../validators");
router.put("/user/follow",requireSign,addFollowing,addFollower)
router.put("/user/unfollow",requireSign,removeFollowing,removeFollower)
router.get("/users",allUsers);
router.get("/user/:userId",requireSign,getUser);
router.put("/user/:userId",requireSign, updateUser);
router.delete("/user/:userId",requireSign,deleteUser);
router.param("userId",userById)
router.get("/user/findpeople/:userId",requireSign,findPeople)
router.get("/user/photo/:userId",userPhoto);

module.exports=router;