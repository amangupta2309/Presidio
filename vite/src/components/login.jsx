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



const Login = ()=>{
    const [pageType, setPageType] = useState("login");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    var isLogin = pageType === "login";
    var isregister = pageType === "register";
    const navigate = useNavigate();

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const registerSchema = yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string(),
        email: yup.string().email("invalid email").required("required"),
        password: yup.string().required("required"),
        phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("phone number is required")
      });
      
      const loginSchema = yup.object().shape({
        email: yup.string().email("invalid email").required("required"),
        password: yup.string().required("required"),
      });
      
      const initialValuesRegister = {
        firstName: "",
        lastName:"",
        email: "",
        password: "",
        phoneNumber: "",
      };
      
      const initialValuesLogin = {
        email: "",
        password: "",
      };
      const handleFormSubmit = async(values, onSubmitProp)=>{
        
        if(isLogin){
            await login(values, navigate, setMessage, dispatch);
            // console.log(selector.user);
        }
        else await register(values, navigate, setMessage);
        console.log(message);
        toast(message);
        // onSubmitProp.resetForm();
      }
   
    return(
        <Formik
            onSubmit={handleFormSubmit}
            enableReinitialize
            initialValues={pageType==="login" ? initialValuesLogin : initialValuesRegister}
            validationSchema={pageType==="login" ? loginSchema : registerSchema}
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
                <div className='flex items-center justify-center flex-col gap-4 p-4'>
                    <div className='text-2xl'>
                        {isLogin ? "Login Now" : " Register Here"}
                    </div>
                    <div className='flex flex-col gap-4 items-center justify-center'>
                        {isregister && (
                        <>
                            <TextField
                                label = "First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                values ={values.firstName}
                                name="firstName"
                                error={
                                    Boolean(touched.firstName) && Boolean(errors.firstName)
                                }
                                helperText={touched.firstName && errors.firstName}
                                fullWidth
                            />
                            <TextField
                                label = "Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                values ={values.lastName}
                                name="lastName"
                                error={
                                    Boolean(touched.lastName) && Boolean(errors.lastName)
                                }
                                helperText={touched.lastName && errors.lastName}
                                fullWidth
                            />
                            <TextField
                                label = "Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                values ={values.email}
                                name="email"
                                error={
                                    Boolean(touched.email) && Boolean(errors.email)
                                }
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                label = "Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                values ={values.password}
                                type="password"
                                name="password"
                                error={
                                    Boolean(touched.password) && Boolean(errors.password)
                                }
                                helperText={touched.password && errors.password}
                            />
                            <TextField
                                label = "Phone Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                values ={values.phoneNumber}
                                name="phoneNumber"
                                error={
                                    Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                                }
                                helperText={touched.phoneNumber && errors.phoneNumber}
                            />
                        </>
                        )
                        }
                        {isLogin && (
                        <>
                            <TextField
                                label = "Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                values ={values.email}
                                name="email"
                                error={
                                    Boolean(touched.email) && Boolean(errors.email)
                                }
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                label = "Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                values ={values.password}
                                name="password"
                                error={
                                    Boolean(touched.password) && Boolean(errors.password)
                                }
                                helperText={touched.password && errors.password}
                            />
                            
                        </>
                        )
                        }
                        <div className='flex justify-center items-center'>
                            <Button type="submit" >
                                {isLogin ? "Login" : "register"}
                            </Button>
                        </div>
                        <div className='flex justify-center items-center' onClick={() => {setPageType(isLogin ? "register" : "login"); resetForm();}} >
                            <Button variant='ghost'>
                                {isLogin ? "Don't have account? register Here" : "Already have account? Login Now"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        )

        }
        
        </Formik>
    )
}

export default Login;