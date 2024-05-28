import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userSlice';
import {NavLink, useNavigate, Router} from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


const Nav = ()=>{
    const isAuth = Boolean(useSelector((state)=> state.token));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = ()=>{
        dispatch(userActions.logout());
        navigate('/');
    }
    const handleLogin = ()=>{
        navigate('/login');
    }
    const handleHome = ()=>{
        navigate('/');
    }

    return(
        <div className='fixed left-0 right-0 flex bg-blue-300 h-16 items-center z-10'>
            <div className='ml-4 text-white text-4xl select-none cursor-pointer' onClick={handleHome}>
                Rentify
            </div>
            <div className='flex items-center space-x-4 ml-auto mr-8'>
                {isAuth && <Button variant='ghost' onClick={()=> navigate('/sell')}>+ Sell</Button>}
                {isAuth && <DropdownMenu>
                                <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={()=> navigate('/profile')}>Profile</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>}
                {!isAuth && <Button onClick={handleLogin} variant='ghost'> Login </Button>}
            </div>
        </div>
    )
}

export default Nav;