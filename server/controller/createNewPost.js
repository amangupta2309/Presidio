import crypto from 'crypto';
import User from '../model/user.js';
import Post from '../model/posts.js';


export const createNewPost = async(req, res)=>{
    try{
        console.log(req.body);
        const userId = req.body.userId;
        const user = await User.findOne({userId});

        const newPost = new Post({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            price: req.body.price,
            BHK: req.body.BHK,
            likes: {}
        })
        const savedPost = await newPost.save();

        res.status(201).json({message: "Post created successfully."});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}