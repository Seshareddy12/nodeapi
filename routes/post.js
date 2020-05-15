const express = require("express");

const postController=require("../controllers/post");
const {userById} = require("../controllers/user")
const {requireSign} = require("../controllers/auth");

const router=express.Router();

const validator = require("../validators");
router.put("/post/like",requireSign,postController.like)
router.put("/post/unlike",requireSign,postController.unlike)

router.put("/post/comment",requireSign,postController.comment)
router.put("/post/uncomment",requireSign,postController.uncomment)

router.get('/posts',postController.getPosts);
router.put("/post/:postId",requireSign,postController.isPoster,postController.updatePost);
router.get('/post/:postId',postController.singlePost);
router.post('/post/new/:userId',requireSign,postController.createPost,validator.createPostValidator);
router.param("userId",userById)
router.get("/posts/by/:userId",requireSign,postController.postsByUser)
router.param("userId",userById);
router.param("postId",postController.postById);
router.get("/post/photo/:postId",postController.photo);
router.delete('/post/:postId',requireSign,postController.isPoster,postController.deletePost)
module.exports=router;