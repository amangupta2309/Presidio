import Post from '../model/posts.js';

export const getUserPosts = async(req, res)=>{
    try{
        const userId = req.body.userId;
     
        const posts = await Post.find({userId: userId}).lean();
        res.status(200).json(posts);

    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}