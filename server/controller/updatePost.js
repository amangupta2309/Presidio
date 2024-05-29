import Post from '../model/posts.js';


export const updatePost = async(req, res)=>{
    try {
        console.log("Updating post");
        
        const postId = req.body.newValues.postId;

        const updateData = {
            title: req.body.newValues.title,
            description: req.body.newValues.description,
            location: req.body.newValues.location,
            price: req.body.newValues.price,
            BHK: req.body.newValues.BHK
        }
        const updatedPost = await Post.findByIdAndUpdate(postId, updateData, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}