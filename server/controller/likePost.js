import crypto from 'crypto';
import User from '../model/user.js';
import Post from '../model/posts.js';


export const likePost = async(req, res)=>{
    try{
        const {userId, postId} = req.body;

        console.log(userId);
        console.log(postId);

        const post = await Post.findById(postId);
        console.log(post);

        const isLiked = post.likes.get(userId);
        console.log(isLiked);
        if(isLiked){
            post.likes.delete(userId);
        }
        else post.likes.set(userId);

        const updatedPost = await Post.findByIdAndUpdate(postId, {likes: post.likes}, {new: true});

        res.status(200).json(updatedPost);
    }
    catch(err){
        res.status(404).json({error: err.message});
    }
}