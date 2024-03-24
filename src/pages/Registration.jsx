import React, { useState } from 'react'
import  { Link, useNavigate }  from 'react-router-dom';
import { FadeLoader } from 'react-spinners'
import { motion } from 'framer-motion'

import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile 
} from "firebase/auth";

import  ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { darkLogo } from '../assets/index'

const Registration = () => {
    const navigate = useNavigate()
    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    // Error Message start
    const [errClientName, setErrClientName] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [errCPassword, setErrCPassword] = useState("");
    const [firebaseErr, setFirebaseErr] = useState("");

    // Loading State srart
    const [loading, setLoading] = useState("");
    const [successMag, setSuccessMag] = useState("");


    // Firabes
    const auth = getAuth();

    // Handle function start
    const handleName = (e) => {
        setClientName(e.target.value);
        setErrClientName("")
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setErrEmail("")
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrPassword("")
    }

    const handleCPassword = (e) => {
        setCPassword(e.target.value);
        setErrCPassword("")
    }

    // Email validation start
    const emailValidation = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    }

    // Submit button start
    const handleRegistration = (e) => {
        e.preventDefault();
        if(!clientName) {
            setErrClientName("Enter your name")
        }
        if(!email) {
            setErrEmail("Enter your email and mobile phone number")
            setFirebaseErr("Email Alredy in use, Try aouther one")
        } else {
            if(!emailValidation(email)) {
               setErrEmail("Enter a valid email") 
            }
        }
        if(!password) {
            setErrPassword("Enter your password")
        }else {
            if(password.length < 6) {
                setErrPassword("Passwords must be at least 6 characters")
            }
        }
        if(!cPassword) {
            setErrCPassword('Please repeat your password')
        } else {
            if(cPassword !== password) {
                setErrCPassword("Password not matched")
            }
        }

        if  (
                clientName && 
                email && 
                emailValidation(email) && 
                password && 
                password.length >= 6 && 
                cPassword && 
                cPassword === password 
            ) {
                setLoading(true) 
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: clientName,
                        photoURL: 
                            'https://wac-cdn.atlassian.com/ru/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1473'
                    })
                    const user = userCredential.user;
                    console.log(user)
                    setLoading(false)
                    setSuccessMag("Account Create Suuccessfully!")
                    setTimeout(() => {
                        navigate("/signin")
                    }, 3000)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode.includes("auth/email-already-in-use")) {
                        setFirebaseErr("Email Already in use, Try another one")
                    }
                });

                // ================ Firebace Registration End here =================
                setClientName("");
                setEmail("");
                setPassword("");
                setCPassword("");
                setErrCPassword("");
                setFirebaseErr("");
            }    
    }

  return (
    <div className='w-full '>
        <div className='w-full bg-gray-100 pb-10'>
            <form  className='w-[350px] mx-auto flex flex-col items-center'>  
                <img className='w-32' src={darkLogo} alt="darkLogo" />
                <div className='w-full border border-zinc-200 p-6'>
                    <h2 className='font-titleFont text-3xl font-medium mb-4'>
                        Create Account
                    </h2>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-2'>
                           <p className='text-sm font-medium'>
                                Your name
                           </p>
                           <input 
                                onChange={handleName}
                                value={clientName}
                                type="text" 
                                className='w-full py-1  border 
                                border-zinc-400 px-2  duration-100
                                text-base rounded-sm outline-none 
                                focus-within:border-[#e77600] 
                                focus-within:shadow-amazonInput' 
                            />
                            {
                              errClientName && (
                                <p className='text-red-600 text-xs font-semibold tracking-wide 
                                             flex items-center gap-2 -mt-1.5'>
                                    <span className='italic font-titleFont font-extrabold text-base'>!</span>
                                    {errClientName}
                                </p>
                              )  
                            }
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-medium'>
                                Email or mobile phone number
                            </p>
                            <input
                                onChange={handleEmail} 
                                value={email}
                                type="email" 
                                className='w-full  py-1  border 
                                border-zinc-400 px-2  duration-100
                                text-base rounded-sm outline-none 
                                focus-within:border-[#e77600] 
                                focus-within:shadow-amazonInput' 
                            />
                            {
                              errEmail && (
                                <p className='text-red-600 text-xs font-semibold tracking-wide 
                                             flex items-center gap-2 -mt-1.5'>
                                    <span className='italic font-titleFont font-extrabold text-base'>!</span>
                                    {errEmail}
                                </p>
                              )  
                            }
                            {
                              firebaseErr && (
                                <p className='text-red-600 text-xs font-semibold tracking-wide 
                                             flex items-center gap-2 -mt-1.5'>
                                    <span className='italic font-titleFont font-extrabold text-base'>!</span>
                                    {firebaseErr}
                                </p>
                              )  
                            }
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-medium'>
                                Password
                            </p>
                            <input 
                                onChange={handlePassword}
                                value={password}
                                type="password" 
                                className='w-full lowercase py-1  border 
                                border-zinc-400 px-2  duration-100
                                text-base rounded-sm outline-none 
                                focus-within:border-[#e77600] 
                                focus-within:shadow-amazonInput' 
                            />
                            {
                              errPassword && (
                                <p className='text-red-600 text-xs font-semibold tracking-wide 
                                             flex items-center gap-2 -mt-1.5'>
                                    <span className='italic font-titleFont font-extrabold text-base'>!</span>
                                    {errPassword}
                                </p>
                              )  
                            }
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-medium'>
                                Re-enter Password
                            </p>
                            <input 
                                onChange={handleCPassword}
                                value={cPassword}
                                type="password" 
                                className='w-full lowercase py-1  border 
                                border-zinc-400 px-2  duration-100
                                text-base rounded-sm outline-none 
                                focus-within:border-[#e77600] 
                                focus-within:shadow-amazonInput' 
                            />

                            {
                              errCPassword && (
                                <p className='text-red-600 text-xs font-semibold tracking-wide 
                                             flex items-center gap-2 -mt-1.5'>
                                    <span className='italic font-titleFont font-extrabold text-base'>!</span>
                                    {errCPassword}
                                </p>
                              )  
                            }

                            <p className='text-xs text-gray-600'>
                                Password must be at lest 6 charactes
                            </p>
                        </div>

                        <button 
                            onClick={handleRegistration}
                            className='w-full py-1.5 text-sm 
                            font-normal rounded-sm bg-gradient-to-t
                            from-[#f7dfa5] to-[#f0c14b] 
                             hover:bg-gradient-to-t-b border
                           border-zinc-400 active:border-yellow-800 
                            active:shadow-amazonInput'>
                                Continue
                        </button>
                        {
                            loading && (
                                <div className='flex justify-center'>
                                    <FadeLoader
                                        color="#febd69"
                                       
                                    />
                                </div>
                            )
                        }
                        {
                            successMag && (
                                <div>
                                    <motion.p 
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5}}
                                        className='text-base text-center front-titleFont font-semibold text-green-500 border-[1px]'>
                                        {successMag}
                                    </motion.p>
                                </div>
                            )
                        }
                    </div>
                    <p className='text-xs text-black leading-4 mt-4'>
                        By Continuing, you agree to Amazon's 
                        <span className='text-blue-600 '>
                            Conditions of Use{" "}
                        </span>
                        and {" "}
                        <span className='text-blue-600 '>
                            Privace Notice
                        </span>
                     </p>
                     <div>
                        <p className='text-xs text-black'>
                            Already have an account? {" "}
                           <Link to="/signin">
                                <span className='text-sm text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>
                                    Sign in {"  "}
                                    <span>
                                        <ArrowRightIcon /> 
                                    </span>
                                </span>
                           </Link>
                        </p>
                        <p className='text-xs text-black  -mt-1'>
                            Buying for work?{" "}
                            <span className='text  text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>
                                Create a free business account 
                            </span>
                        </p>
                     </div>
                </div>
            </form>
        </div>

        <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 h-20 flex flex-col gap-4 justify-center items-center py-10'>
            <div className='flex items-center gap-6'>
            <p className='text-sm text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>
                Conditions of Use
            </p>
            <p className='text-sm text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>
                Privace Notice
            </p>
            <p className='text-sm text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>
                Conditions of Use
            </p>
            </div>
            <p className='text-sm text-gray-600'> 
            @ 1996-2024, ReactBd.com, Inc. or its affiliates
            </p>
        </div>

    </div>
  )
}


export default Registration