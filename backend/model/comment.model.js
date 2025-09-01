import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

const Comment = mongoose.model.Comment || mongoose.model("Comment",CommentSchema)

export default Comment