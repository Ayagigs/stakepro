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
    postviews: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    user: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    photo: [{
        type:String,

    }]
}, {
    timestamps:true,
    toJSON:{virtuals:true}
})

const Post = mongoose.model('Post', blogSchema);

export default Post;