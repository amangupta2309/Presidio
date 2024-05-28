import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button"
import { Skeleton, TextField } from '@mui/material';
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
import { searchHelper } from '@/utils/searchHelper';
import Pagination from '@/components/pagination';
import { pageSize } from '@/utils/pageSIze';
import NoteAddIcon from '@mui/icons-material/NoteAdd';


const Landing = () =>{
    const [loader, setLoader] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(1);

    const isAuth = Boolean(useSelector((state) => state.token));
    console.log(allPosts);
    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const allPosts = await getAllPosts();
                allPosts.map((posts)=>{
                    posts.visible = true;
                    return posts;
                })
                setAllPosts(allPosts);
            } catch (error) {
                console.error('Failed to fetch posts', error);
            } finally {
                setLoader(false);
            }
        };
        fetchPosts();
    }, []);
    let postLength = 0;
    allPosts.map((post)=>{
        if(post.visible){
        postLength += 1;
        }
    })
    let totalPage = Math.ceil(postLength/`${pageSize}`);

    const searchPosts = (e)=>{
        setAllPosts(searchHelper(e.target.value, allPosts));
        setPage(1);
    }
    let index = (page-1)*`${pageSize}`;
    var postsOnPage = allPosts.filter((post)=> post.visible).slice(index, index+`${pageSize}`);
    return(
        <div className='flex flex-col items-center w-full pt-4 overflow-auto'>
            <div className='flex justify-end w-full pr-4'>
                <input
                type="text"
                placeholder="Search Keywords based on location, price and BHK size"
                onChange={searchPosts}
                className='outline-blue-500 p-2'
                />
            </div>
            <div className='flex flex-col items-center justify-center w-[30rem] gap-4'>
                <Dialog>
                    <DialogTrigger className="flex justify-center w-full">
                        <Button className='flex items-center justify-center h-[4rem] w-full bg-blue-300'>
                            <NoteAddIcon/>Create post for sale
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

                {postsOnPage && postsOnPage.map((post) => (
                    <Post key={post._id} post={post}  />
                ))}
            </div>
            {postsOnPage.length && <div className="ml-auto">
              <Pagination page={page} setPage={setPage} postLength={postLength} />
            </div> }
        </div>
    )
}

export default Landing;