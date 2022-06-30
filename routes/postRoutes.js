const express = require("express");
const router = express.Router();
const {getPosts,createPost,editPost,deletePost,getPostById,createComment,createReplyComment,getComments,getReplyComments } =require('../controllers/postController')
const {protect} = require('../middleware/authMiddleware')
router.route("/").get(getPosts).post(protect,createPost)
router.route("/:id").put(protect,editPost).delete(protect,deletePost).get(getPostById)
router.route("/:id/comments").post(createComment).get(getComments)
router.route("/:id/comments/:commentId/reply").post(protect,createReplyComment).get(getReplyComments)

module.exports = router