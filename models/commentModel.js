//many to many relationship between comment and replies and user
const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:"User"
    },

    post:{
        type : mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:"Post"
    },
    value:{
        type:String,
        // required:[true,"Please add a comment"]
    },
    replies:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }
},{timestamps:true})

module.exports = mongoose.model('Comment',commentSchema)