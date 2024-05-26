import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button"
import { Avatar, Skeleton } from '@mui/material';
import CreatePostForm from '@/components/createPostForm';
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
import { getAllPosts } from '@/store/userActions';
import { useSelector } from 'react-redux';


const Landing = () =>{
    const [loader, setLoader] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    const isAuth = Boolean(useSelector((state) => state.token));
  
    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const allPosts = await getAllPosts();
                setAllPosts(allPosts);
            } catch (error) {
                console.error('Failed to fetch posts', error);
            } finally {
                setLoader(false);
            }
        };
        fetchPosts();
    }, []);
    console.log(allPosts)
    return(
        <div className='flex flex-col items-center w-full pt-4 overflow-auto'>
            <div className='flex flex-col items-center justify-center w-[30rem] gap-4'>
                <Dialog>
                    <DialogTrigger className="flex justify-center w-full">
                        <Button className='flex items-center justify-center h-[4rem] w-full bg-red-900'>
                            Create post for sale
                        </Button>
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
                {loader && <Skeleton className='w-full'/>}
                {loader && <Skeleton className='w-full'/>}
                {loader && <Skeleton className='w-full'/>}
                {loader && <Skeleton className='w-full'/>}

                {allPosts && allPosts.map((posts) => (
                <Card key={posts._id} className='flex flex-col p-2 w-full h-[24rem]'>
                    <CardHeader className="">
                        <Dialog>
                            <DialogTrigger className="flex flex-row gap-4 items-center">
                                <Avatar />
                            <CardTitle>{posts.userId.firstName}</CardTitle>
                            </DialogTrigger>
                            <DialogContent className='overflow-x-auto'>
                                <DialogHeader>
                                <DialogTitle>Seller Details</DialogTitle>
                                </DialogHeader>
                                <div className='name'>{posts.userId.firstName}</div>
                                <table  className="min-w-full bg-white mb-4">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">FirstName</th>
                                            <th className="py-2 px-4 border-b">LastName</th>
                                            <th className="py-2 px-4 border-b">Email</th>
                                            <th className="py-2 px-4 border-b">Password</th>
                                            <th className="py-2 px-4 border-b">Phone Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 border-b">{posts.userId?.firstName || 'N/A'}</td>
                                            <td className="py-2 px-4 border-b">{posts.userId?.lastName || 'N/A'}</td>
                                            <td className="py-2 px-4 border-b">{posts.userId?.email || 'N/A'}</td>
                                            <td className="py-2 px-4 border-b">{posts.userId?.password || 'N/A'}</td>
                                            <td className="py-2 px-4 border-b">{posts.userId?.phoneNumber || 'N/A'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <div className='flex m-4'><h3>Location => </h3> {posts.location}</div> 
                        <div className='flex m-4'><h3>Description => </h3> {posts.description}</div> 
                        <div className='flex m-4'><h3>Price => </h3> {posts.price}</div> 
                        <div className='flex m-4'><h3>landsize => </h3> {posts.landsize}</div> 
                    </CardContent>
                    <CardFooter>
                    <div className='flex m-4'><h3>Likes => </h3> {posts.likes}</div> 
                    </CardFooter>
                </Card>
                ))}
            </div>
        </div>
    )
}

export default Landing;