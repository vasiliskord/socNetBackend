const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//GET POSTS
// route /api/posts
// access Public

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

//GET POSTS BY ID
// route /api/posts/:id
// access Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

//Post POSTS
// route /api/posts
// access Public

const createPost = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400);
    throw new Error("Please add a title and a content field");
  }
  const posts = await Post.create({
    title: req.body.title,
    content: req.body.content,
    user: req.user.id,
  });
  res.json(posts);
});

//PUT POSTS
// route /api/posts/:id
// access private

const editPost = asyncHandler(async (req, res) => {
  const posts = await Post.findById(req.params.id);
  if (!posts) {
    res.status(401);
    throw new Error("Post not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (posts.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const editedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(editedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const posts = await Post.findById(req.params.id);

  if (!posts) {
    res.status(401);
    throw new Error("Post does not exist");
  }
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (posts.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await posts.remove();
  res.json({ id: req.params.id });
});

//create comment
// route /api/posts/:id/comment
// access Public
const createComment = asyncHandler(async (req, res) => {
  // const {id}=req.params
  const { value } = req.body;

  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(401);
    throw new Error("Post not found");
  }
  const comment = await Comment.create({
    value: req.body.value,
    user: req.user,
    post: req.params.id,
  });

  res.json(comment);

  // post.comment.push(value)
  // const updatedPost = await Post.findByIdAndUpdate(id,post,{new:true})
  // res.json(updatedPost)
});

//create reply comment
// route /api/posts/:id/comment/:commentId/reply
// access Public
const createReplyComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  const post = await Post.findById(id);
  if (!post) {
    res.status(401);
    throw new Error("Post not found");
  }
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    res.status(401);
    throw new Error("Comment not found");
  }
    const replyComment = await Comment.create({
    value: req.body.value,
    user: req.user,
    post: req.params.id,
    replies: req.params.commentId,
    });
    res.json(replyComment);

});
        
//GET COMMENTS
// route /api/posts/:id/comments
// access Public
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.id });
  res.json(comments);
}
);

//GET REPLY COMMENTS
// route /api/posts/:id/comments/:commentId/replies
// access Public
const getReplyComments = asyncHandler(async (req, res) => {
  const replyComments = await Comment.find({ replies: req.params.commentId });
  res.json(replyComments);
}
);


module.exports = {
  getPosts,
  createPost,
  editPost,
  deletePost,
  getPostById,
  createComment,
  createReplyComment,
  getComments,
  getReplyComments,
};
