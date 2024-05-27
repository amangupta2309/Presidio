import axios from 'axios';
import { userActions } from './userSlice';


export const register = async (data, navigate, setMessage) => {
    // this allows us to send form info with image
    axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, data)
      .then((response)=>{
        console.log(response);
        setMessage(response.data.message);
        console.log("user saved");
        navigate('/');
      })
      .catch((err)=>{
        setMessage(err.response.data.message);
        console.log(err.response.data.message);
      })
};


export const login = async( data, navigate, setMessage, dispatch) =>{
  axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data)
    .then((response)=>{
       dispatch(userActions.setLogin({token: response.data.token, user: response.data.user}));
      setMessage(response.data.message);
    })
    .catch((err)=>{
      setMessage(err.response.data.message);
      console.log(err.response.data.message);
    })
};

export const createPost = async(values, setMessage)=>{
  axios.post(`${import.meta.env.VITE_BASE_URL}/createPost`, values)
    .then((response)=>{
      console.log("post created successfully");
    })
    .catch((err)=>{
      console.log("error");
      console.log(err.response);
    })
}

export const getUserPosts = async(userId)=>{
  // console.log(userId);
  try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/getUserPosts`, { userId });
        // console.log(response.data);
        return response.data;
  }
  catch(err){
    console.log(err.message);
  }
}

export const updatePost = async(newValues, setMessage)=>{
  try{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/updatePost`, { newValues});
    // console.log(response.data);
    return response.data;
    }
    catch(err){
    console.log(err.message);
}
}
export const getAllPosts = async()=>{
  try{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getAllPosts`);
    
    return response.data;
    }
    catch(err){
    console.log(err.message);
}
}
