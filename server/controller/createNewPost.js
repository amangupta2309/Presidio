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
            landsize: req.body.landsize
        })
        const savedPost = await newPost.save();
        if(savedPost){
            res.status(201).json({message: "Post created successfully."});
        }
        else res.status(400).json({message: "Post not created you can try later."})
    }
    catch(err){
        res.status(500).json({error: err.message});
        console.log("user not found");
        console.log(err.message);
    }
}