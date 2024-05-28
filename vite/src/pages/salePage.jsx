import CreatePostForm from "@/components/createPostForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import { useSelector } from "react-redux";
import { getUserPosts } from "@/store/userActions";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { deletePost } from "@/store/userActions";


const SalesPage = ()=>{
    const [loader, setLoader] = useState(true);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const userId = useSelector((store)=> store.user.userId);
    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const allPosts = await getUserPosts(userId);
                // console.log(allPosts);
                setPosts(allPosts);
            } catch (error) {
                console.error('Failed to fetch posts', error);
            } finally {
                setLoader(false);
            }
        };
        fetchPosts();
    }, [userId]);

    const deletingPost = async(postId)=>{
        console.log(postId);
        try{
            await deletePost(postId);
            navigate(0);
        }
        catch(error){
            console.log(error.message);
        }
    }
    return(
        <div >
        <div className="flex items-center justify-center pt-[2rem]">
        <Card className='w-[30rem] hover:scale-105 transform transition-transform'>
                <Dialog>
                    <DialogTrigger className="w-full">
                            <CardHeader className="flex items-center justify-center">
                                <CardTitle>Add Item</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="flex items-center justify-center text-2xl"><AddCircleOutlineSharpIcon /></p>
                            </CardContent>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Sale your items</DialogTitle>
                        <DialogDescription>
                            Fill the the form to create post
                        </DialogDescription>
                        <CreatePostForm />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </Card>
        </div>
        <div className="text-2xl mt-2 ml-10 mr-10 rounded-md p-1 bg-blue-300">
            List of posts created
        </div>
        <div className="p-12 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {posts && posts.map((post, index) => (
            <Card key={post._id}>
                <Dialog>
                    <DialogTrigger className="w-full hover:scale-105 transform transition-transform">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle>{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="flex items-center justify-center">Update the post</p> <EditIcon />
                        </CardContent>
                    </DialogTrigger>
                    <div onClick={()=>{deletingPost(`${post._id}`)}} className="flex items-center justify-center w-full cursor-pointer hover:scale-105 transform transition-transform rounded-md bg-red-500"><DeleteIcon /></div>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{post.title}</DialogTitle>
                            <DialogDescription>
                                Update your post
                            </DialogDescription>
                            {/* Assuming CreatePostForm is a component */}
                            <CreatePostForm post={post}/>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </Card>
            ))}
             { loader &&  <Skeleton className="rounded-sm"/> }
        </div>
        </div>
    )
}
export default SalesPage;

