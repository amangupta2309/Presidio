import Post from '../model/posts.js';
import User from '../model/user.js';

export const getAllPosts = async(req, res)=>{
    try{
        const posts = await Post.find().populate('userId', 'firstName lastName email phoneNumber').lean();
        res.status(200).json(posts);

    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}