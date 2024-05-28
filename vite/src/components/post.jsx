import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Avatar } from "@mui/material";
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { like } from "@/store/userActions";
import { useNavigate } from "react-router-dom";

const Post = ({post})=>{

    const postId = post._id;
    
    const isAuth = Boolean(useSelector((state) => state.token));
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const handleLike = async()=>{
        if(!isAuth){
            navigate('/login');
        }
        // const userId = useSelector((state)=> state.user.userId);
        // const updatedPost = await like({userId, postId});
        // console.log(updatedPost);
        // setAllPosts({post: updatedPost});
    }
    const openDialog = () => {
        if(!isAuth){
            navigate('/login');
        }
        setIsOpen(true);
    };
    return(
        <Card key={post._id} className='flex flex-col p-2 w-full h-[24rem]'>
                    <CardHeader>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogContent className='overflow-x-auto'>
                                <DialogHeader>
                                <DialogTitle>Seller Details</DialogTitle>
                                </DialogHeader>
                                <div className='name'>{post.userId.firstName}</div>
                                <table  className="min-w-full bg-white mb-4">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">FirstName</th>
                                            <th className="py-2 px-4 border-b">LastName</th>
                                            <th className="py-2 px-4 border-b">Email</th>
                                            <th className="py-2 px-4 border-b">Phone Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 border-b">{post.userId?.firstName || 'N/A'}</td>
                                            <td className="py-2 px-4 border-b">{post.userId?.lastName || 'N/A'}</td>
                                            <td className="py-2 px-4 border-b">{post.userId?.email || 'N/A'}</td>
                                            <td className="py-2 px-4 border-b">{post.userId?.phoneNumber || 'N/A'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </DialogContent>
                        </Dialog>
                        <div className="flex flex-row gap-4 items-center">
                            <Avatar />
                            <CardTitle>{post.userId.firstName}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='flex m-4'><h3>Location = </h3> {post.location}</div> 
                        <div className='flex m-4'><h3>Description = </h3> {post.description}</div> 
                        <div className='flex m-4'><h3>Price = </h3> {post.price}</div> 
                        <div className='flex m-4'><h3>BHK = </h3> {post.BHK}</div> 
                    </CardContent>
                    <CardFooter>
                        <div className='flex justify-between w-full'>
                            <div>
                                <FavoriteIcon className='m-2 cursor-pointer' color="primary" onClick={handleLike}/>
                                {/* {post.likes.length} */}
                            </div>
                            <Button onClick={openDialog}>Interested</Button>
                            
                        </div>
                    </CardFooter>
                </Card>
    )
}

export default Post;