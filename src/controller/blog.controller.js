import blogModel from "../models/blog.model";
import HttpException from "../exceptions/HttpException";
import HttpResponse from "../response/HttpResponse";

export const createPosts = async (req, res, next) => {
    try {
        const Post = await blogModel.create(req.body);
        if (Post)
            return res.status(200).send(new HttpResponse("success", "Post created"));
    } catch (err) {
        next(err);
    }
};

export const getAllPosts = async (req, res, next) => {
    try {
        const Post = await blogModel.find();
        if (Post)
            return res.status(200).send(new HttpResponse("success", "Posts", Post));
    } catch (err) {
        next(err);
    }
};

export const getPost = async (req, res, next) => {
    try {
        const { id } = req.params;

        const Post = await blogModel.findById(id);
        if (!Post) throw new HttpException(404, "Post not found");
        return res.status(200).send(new HttpResponse("success", "Posts", Post));
    } catch (err) {
        next(err);
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const Post = await blogModel.findById(id);
        if (!Post) throw new HttpException(404, "Post not found");
        Post.delete()
        return res.status(200).send(new HttpResponse("success", "deleted Post"));
    } catch (err) {
        next(err);
    }
};

export const updatePost = async (req, res, next) => {
    try {
        const data = req.body;
        const { id } = req.params;
        let Post = await blogModel.findById(id);
        if (!Post) throw new HttpException(404, "Post not found");

        await Post.update(data);
        return res.status(200).send(new HttpResponse("success", "Post updated"));
    } catch (err) {
        next(err);
    }
};
