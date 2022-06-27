const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Post =require('../models/postModel')

//GET POSTS
// route /api/posts
// access Public

const getPosts = asyncHandler(async(req,res)=>{
    const posts= await Post.find({user:req.user.id})
    res.json(posts)
})

//Post POSTS
// route /api/posts
// access Public

const createPost = asyncHandler(async(req,res)=>{

    if (!req.body.title||!req.body.content){
        res.status(400)
        throw new Error("Please add a title and a content field")
    }
    const posts = await Post.create({title:req.body.title,content:req.body.content,user:req.user.id})
    res.json(posts)
})

//PUT POSTS
// route /api/posts/:id
// access private

const editPost=asyncHandler(async(req,res)=>{
    const posts = await Post.findById(req.params.id)
    if(!posts){
        res.status(401)
        throw new Error("Post not found")

    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if(posts.user.toString()!==user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const editedPost = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})

    res.json(editedPost)
})


const deletePost = asyncHandler(async(req,res)=>{
    const posts = await Post.findById(req.params.id)

    if(!posts){
        res.status(401)
        throw new Error('Post does not exist')
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

    await posts.remove()
    res.json({id:req.params.id})


})


module.exports = {getPosts,createPost,editPost,deletePost}