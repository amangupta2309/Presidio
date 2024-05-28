import mongoose from "mongoose";

// Define the Post schema
const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    BHK: {
        type: Number,
        required: true
    },
    likes: {
        type: Map,
        of: Boolean,
      },
}
,{timestamps: true}
);


const Post = mongoose.model('Post', PostSchema);

export default Post;