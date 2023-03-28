import Post from "../models/blogmodel.js";
import userModel from "../models/user.model.js";
import HttpResponse from "../response/HttpResponse.js";
import HttpException from "../exceptions/HttpException.js";

export const writeBlog = async (req, res) => {
    const { displayname, title, content } = req.body;
    try {
        const blogPoster = await userModel.findById(req.userAuth);

        await Post.create({
            displayname, 
            title,
            content,
            admin: blogPoster._id
        });

        return res.status(201).send(new HttpResponse("success", "your blog has been posted successfully"))

    } catch (error) {
        next(error)
    }
}

export const deleteBlog = async (req, res) => {
    const blogOwner = await userModel.findById(req.userAuth);
    const blog = await Post.findById(req.params.id);

    try {
        if (blogOwner && blog) {
            await Post.findOneAndDelete({ _id: req.params.id });
            return res.status(200).send(new HttpResponse("success", "the blog post has been deleted successfully"))

        } else {
            throw new HttpException(404, "the blog post is not available");
        }
    } catch (err) {
        next(err)
    }



}

export const updateBlog = async (req, res) => {
    const blogOwner = await userModel.findById(req.userAuth);
    const blog = await Post.findById(req.params.id);
    const { displayname, title, content } = req.body;

    try {
        if (blogOwner && blog) {
            await Post.findOneAndUpdate({ _id: req.params.id }, { displayname, title, content }, { useFindAndModify: false });
            return res.status(200).send(new HttpResponse("success", "you have made changes to the blog post"))
        } else {
            throw new HttpException(404, "the blog post is not available");
        }
    } catch (err) {
        next(err)
    }

}

export const getAllBlogs = async (req, res) => {
    const blogOwner = await userModel.findById(req.userAuth);

    try {

        if (blogOwner) {
            const allPosts = await Post.find({});
            return res.status(200).send(new HttpResponse("success", "all post", allPosts))
        }
        else throw new HttpException(404, "you are not authorised");
        
    } catch (err) {
        next(err)
    }
}