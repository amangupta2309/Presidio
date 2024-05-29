import crypto from 'crypto';
import User from '../model/user.js';
import Post from '../model/posts.js';


export const likePost = async(req, res)=>{
    try{
        const {userId, postId} = req.body;

        const post = await Post.findById(postId);

        const isLiked = post.likes.get(userId);
      
        if(isLiked){
            post.likes.delete(userId);
        }
        else post.likes.set(userId, true);

        const updatedPost = await Post.findByIdAndUpdate(postId, {likes: post.likes}, {new: true});
        
        const newUpdatedPost = await Post.findById(postId).populate('userId', 'firstName lastName email phoneNumber').lean();

        res.status(200).json(newUpdatedPost);
    }
    catch(err){
        res.status(404).json({error: err.message});
    }
}