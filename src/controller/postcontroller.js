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