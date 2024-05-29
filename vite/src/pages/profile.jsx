import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Avatar } from "@mui/material";
import { useSelector } from 'react-redux';



const Landing = () =>{
    
    const user = useSelector((state)=> state.user);

    return(
        <div className='flex justify-center pt-8 w-full'>
            <Card className='flex w-[40rem]'>
                <div className='flex items-center justify-center w-[10rem] bg-blue-300 rounded-md'>
                    <Avatar />
                </div>
                <div>
                    <CardHeader>
                        <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>{user.email}</div>
                        <div>{user.phoneNumber}</div>
                    </CardContent>
                    <CardFooter>
                        
                    </CardFooter>
                </div>
            </Card>
        </div>
    )
}

export default Landing;