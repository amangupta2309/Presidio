import Post from '../model/posts.js';
import User from '../model/user.js';

export const getAllPosts = async(req, res)=>{
    try{
        const posts = await Post.find().populate('userId', 'firstName lastName email phoneNumber').lean();
        console.log(posts);
        // const posts = await Post.find().lean();
        // posts.map(async(post)=>{
        //     const userId = post.userId;

        //     const user = await User.findById(userId);

        //     post = {user, ...post};

        // })
        res.status(200).json(posts);

    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}