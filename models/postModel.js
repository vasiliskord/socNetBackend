const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:"User"
    },
    
    title:{
        type : String,
        required: [true,"Please add a title"]
    },
    content:{
        type:String,
        required:[true,"Please add a description"]
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }
},{timestamps:true})

module.exports = mongoose.model('Post',postSchema)