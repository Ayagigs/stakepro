import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    displayname:{
        type:String,
        required:[true,"include your displayname"]
    },
    title:{
        type:String,
        required:[true,"include title"],
        trim:true
    },
    content:{
        type:String,
        required:[true,"write content"]
    },
    admin: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    photo: {
        type:String,
        required:true,
    }
}, {
    timestamps:true,
    toJSON:{virtuals:true}
})

const Post = mongoose.model('Post', blogSchema);

export default Post;