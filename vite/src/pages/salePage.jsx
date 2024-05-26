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


const SalesPage = ()=>{
    const [loader, setLoader] = useState(true);
    const [posts, setPosts] = useState([]);
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
    return(
        <div className="p-12 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <Card className='hover:scale-105 transform transition-transform'>
                <Dialog>
                    <DialogTrigger className="w-full">
                            <CardHeader className="flex items-center justify-center">
                                <CardTitle>Add Item</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="flex items-center justify-center text-2xl">+</p>
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
            { loader &&  <Skeleton className="rounded-sm"/> }
            {posts && posts.map((post, index) => (
            <Card key={post._id} className='hover:scale-105 transform transition-transform'>
                <Dialog>
                    <DialogTrigger className="w-full">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle>{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="flex items-center justify-center">Update the post</p>
                        </CardContent>
                    </DialogTrigger>
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
        </div>
    )
}
export default SalesPage;