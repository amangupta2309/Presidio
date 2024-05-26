import React from 'react';
import Login from '../components/login';

const LoginPage = ()=>{

    return(
        <div className='flex justify-center items-center mt-5 mb-5 h-full'>
            <div className='border-2 border-black rounded-lg w-[30rem] bg-blue-100'>
                <Login />
            </div>
        </div>
    )
}

export default LoginPage;