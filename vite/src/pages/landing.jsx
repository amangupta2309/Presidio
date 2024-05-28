import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button"
import { Skeleton } from '@mui/material';
import CreatePostForm from '@/components/createPostForm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { getAllPosts } from '@/store/userActions';
import { useSelector } from 'react-redux';
import Post from '@/components/post';


const Landing = () =>{
    const [loader, setLoader] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    const isAuth = Boolean(useSelector((state) => state.token));
    console.log(allPosts);
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
    
    return(
        <div className='flex flex-col items-center w-full pt-4 overflow-auto'>
            <div className='flex flex-col items-center justify-center w-[30rem] gap-4'>
                <Dialog>
                    <DialogTrigger className="flex justify-center w-full">
                        <Button className='flex items-center justify-center h-[4rem] w-full bg-blue-300'>
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
                {/* {loader && <Skeleton className='w-full'/>}
                {loader && <Skeleton className='w-full'/>}
                {loader && <Skeleton className='w-full'/>}
                {loader && <Skeleton className='w-full'/>} */}

                {allPosts && allPosts.map((post) => (
                    <Post key={post._id} post={post}  />
                ))}
            </div>
        </div>
    )
}

export default Landing;