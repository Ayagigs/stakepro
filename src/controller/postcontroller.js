import Post from "../models/blogmodel.js";
import userModel from "../models/user.model.js";

export const writeBlog = async (req,res) => {
    const {displayname, title, content} = req.body;
    try{
        const blogPoster = await userModel.findById(req.userAuth);
        
        await Post.create({
            displayname,
            title,
            content,
            user:blogPoster._id
            });
        res.status(201).json({
            message: "your blog has been posted successfully"
        });
            
        
        


    }catch(error) {
        res.json(error.message);
    }
}

export const deleteBlog = async (req,res) => {
    const blogOwner = await userModel.findById(req.userAuth);
    const blog = await Post.findById(req.params.id);

    try{
        if(blogOwner && blog) {
            await Post.findOneAndDelete({_id:req.params.id});
            res.json({message:"the blog has been deleted successfully"});
        }else{
            res.status(404).json({message: "the blog is not available"});
        }
    }catch(err) {
        res.json(err.message);
    }



}

export const updateBlog =async (req,res) => {
    const blogOwner = await userModel.findById(req.userAuth);
    const blog = await Post.findById(req.params.id);
    const {displayname, title, content} = req.body;

    try{
        if(blogOwner && blog) {
            await Post.findOneAndUpdate({_id:req.params.id},{displayname, title, content}, {useFindAndModify:false});
            res.json({message:"you have made changes to the blog"});
        }else{
            res.status(404).json({message:"the blog is not available"});
        }
    }catch(err) {
        res.json(err.message);
    }

}

export const getAllBlogs = async (req,res) => {
    const blogOwner = await userModel.findById(req.userAuth);

    try{
        if(blogOwner) {
            const allPosts = await Post.find({});

            res.status(200).json({
                status:"success",
                data: allPosts
            });
        }
        else {
            return res.json({
                message: "you are not authorised"
            });
        }
    }catch(err) {
        res.json(err.message);
    }
}