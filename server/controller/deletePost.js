import Post from '../model/posts.js';


export const deletePost = async(req, res)=>{
    try{
        console.log(req.body.postId);
        console.log(req.body);
        const {postId} = req.body;

        console.log(postId);

        const result = await Post.findByIdAndDelete(postId);
        if (result) {
            res.status(200).send({ message: `Post with ID ${postId} deleted successfully.` });
        } else {
            res.status(404).send({ message: `Post with ID ${postId} not found.` });
        }
    } catch (error) {
        res.status(500).send({ message: 'An error occurred while trying to delete the post.', error });
    }
}