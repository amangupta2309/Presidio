import React, { useState } from 'react';
import { Formik } from "formik";
import * as yup from "yup";
import { TextField} from '@mui/material';
import { Button } from './ui/button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register, login} from '../store/userActions';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import state from '../store/userStore'
import { createPost } from '../store/userActions';
import store from '../store/userStore';
import { updatePost } from '../store/userActions';



const CreatePostForm = ({post})=>{
    const [message, setMessage] = useState("");
    const user = useSelector((store)=> store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const postSchema = yup.object().shape({
        title: yup.string().required("title required"),
        description: yup.string().required("description required"),
        location: yup.string().min(2).required("location details required"),
        price: yup.number().integer().required("price required"),
        landsize: yup.number().integer().required("land size is required in square meters")
      });
      
        let initialValues = {
        title: "",
        description: "",
        location: "",
        price: null,
        landsize: null
        };

        if (post) {
            initialValues = {
                title: post.title,
                description: post.description,
                location: post.location,
                price: post.price,
                landsize: post.landsize
            };
        }

      const handleFormSubmit = async(values, onSubmitProp)=>{
        try{
            
            if(post){
                const newValues = {postId: post._id, ...values};
                console.log(newValues)
                const res = await updatePost(newValues, navigate, setMessage);
                navigate(0);
            }
            else{
                const newValues = {userId: user.userId, ...values};
                const res = await createPost(newValues, setMessage);
            }
            console.log(message);
            toast(message);
            onSubmitProp.resetForm();
            // navigate(0);
        }
        catch{
            console.log("post not created");
        }   
        
      }
   
    return(
        <Formik
            onSubmit={handleFormSubmit}
            enableReinitialize
            initialValues={initialValues}
            validationSchema={postSchema}
        >
        { ({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
        })=>(
            
            <form onSubmit={handleSubmit}>
                <div className='flex items-center justify-center flex-col gap-4 p-4 '>
                    <TextField
                        label = "Title to post"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value ={values.title}
                        name="title"
                        error={
                            Boolean(touched.title) && Boolean(errors.title)
                        }
                        helperText={touched.title && errors.title}
                        fullWidth
                    />
                    <TextField
                        label = "Description of land or buliding location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value ={values.description}
                        name="description"
                        error={
                            Boolean(touched.description) && Boolean(errors.description)
                        }
                        helperText={touched.description && errors.description}
                        fullWidth
                    />
                    <TextField
                        label = "Location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value ={values.location}
                        name="location"
                        error={
                            Boolean(touched.location) && Boolean(errors.location)
                        }
                        helperText={touched.location && errors.location}
                        fullWidth
                    />
                    <TextField
                        label = "Price"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value ={values.price}
                        type="price"
                        name="price"
                        error={
                            Boolean(touched.price) && Boolean(errors.price)
                        }
                        helperText={touched.price && errors.price}
                        fullWidth
                    />
                    <TextField
                        label = "Land size in meter square"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value ={values.landsize}
                        name="landsize"
                        error={
                            Boolean(touched.landsize) && Boolean(errors.landsize)
                        }
                        helperText={touched.landsize && errors.landsize}
                        fullWidth
                    />

                    <div className='flex justify-center items-center'>
                        <Button type="submit" >
                            submit
                        </Button>
                    </div>
                </div>
            </form>
        )

        }
        </Formik>
    )
}

export default CreatePostForm;