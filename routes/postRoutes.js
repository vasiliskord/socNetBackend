const express = require("express");
const router = express.Router();
const {getPosts,createPost,editPost,deletePost} =require('../controllers/postController')
const {protect} = require('../middleware/authMiddleware')
router.route("/").get(getPosts).post(protect,createPost)
router.route("/:id").put(protect,editPost).delete(protect,deletePost)

module.exports = router