"use client";
import axios, { AxiosError } from 'axios'
import Link from 'next/link';
import {useRouter} from "next/navigation";
import React, { useEffect, useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
    const router = useRouter();
    const [openm,setOpenm] = useState<boolean>(false);
    const [openm1,setOpenm1] = useState<boolean>(false);

    const [userData, setUserData] = useState({
    name: '',
    phno: '',
    isAdmin:false
    })

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/login')
        console.log(res.data);
        setUserData({name: res.data.data.name, phno: res.data.data.phno,isAdmin:res.data.data.isAdmin});
    }
    
    useEffect(() => {
        getUserDetails()
    },[]);

    
  const logout = async () => {
    try {
        await axios.get('/api/users/logout')
        router.push('/login')
    } catch (error: unknown) {
      console.log("Login failed", error);
      if (error instanceof AxiosError && error.response?.data?.error) {
          console.log(error.response.data.error);
      } else if (error instanceof Error) {
        console.log(error.message || "Something went wrong. Please try again.");
      } else {
        console.log("An unknown error occurred.");
      }
    }
  }

  const homeNavigate = ()=>{
    if(userData.isAdmin){
      router.push("/admin_home");
    }else{
      router.push("/home");
    }
  }

  return (
    <div className="w-full flex flex-row justify-between items-center bg-gray-100 dark:bg-slate-600 shadow-md p-3">
        <div className='relative flex flex-row justify-between items-center'>
            <div className="mr-3 flex items-center text-2xl font-semibold text-gray-900 dark:text-white hover:cursor-pointer "  onClick={homeNavigate}>
                <img className="w-8 h-6 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                AutoDS 
            </div>
            <div className='max-sm:hidden flex flex-row'>
                <Link href={"/create_site?mode=create"} className="mx-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:cursor-pointer " >
                    Add site   
                </Link>
                <Link href={"/create_cite"} className="mx-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:cursor-pointer " >
                    Add Surge
                </Link>
            </div>
            <div className='sm:hidden' >
                <button
                    type="button"
                    className="flex items-center px-2 text-gray-600 dark:text-white hover:cursor-pointer"
                    onClick={()=>{setOpenm1(!openm1)}}
                    >
                        <RiArrowDropDownLine size={44}/>
                </button>
            </div>
            <div className={`absolute top-[65px] left-[-5px] ${openm1?"":"hidden"} w-[170px] z-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2`}>
                <div className="w-full flex flex-col items-center justify-center">
                    <Link href={"/create_site?mode=create"} className="mt-2 mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:cursor-pointer " >
                        Add site
                    </Link>
                    <span className='w-full h-[1px] bg-slate-200'></span>
                    <Link href={"/create_cite"} className="mt-1 mb-2 flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:cursor-pointer " >
                        Add Surge
                    </Link>
                </div>
            </div>
        </div>
        <div className="flex flex-row dark:text-white">
            
            <label className="inline-flex items-center cursor-pointer ">
            <div className="mr-4 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>

            <div className="relative flex justify-between items-center hover:cursor-pointer" onClick={()=>{setOpenm(!openm)}}>
                <img src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" alt="user image" className="h-10 w-10 rounded-full bg-slate-50 border-2 mr-2"/>
                <div className='max-lg:hidden flex flex-col items-end'>
                    <h1>{userData.name}</h1>
                    <h1>{userData.phno}</h1>
                </div>

                <div className={`absolute top-[65px] right-[-10px] ${openm?"":"hidden"} w-[300px] z-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5`}>
                    <div className="w-full flex flex-col items-center justify-center pb-10">
                        <img className="w-fit h-24 mb-3 rounded-full shadow-lg" src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" alt="Bonnie image"/>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData.name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{userData.phno}</span>

                        <div className="flex justify-center items-center mt-4 md:mt-6">
                            {
                                userData.isAdmin&&(
                                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" disabled={true}>Admin</button>

                                )
                            }
                            <button className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-blue-400 rounded-lg border border-gray-200 hover:bg-red-600 hover:text-black-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-blue-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-red-700" >Edit</button>
                            
                            <button className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-red-400 rounded-lg border border-gray-200 hover:bg-red-600 hover:text-black-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-red-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-red-700" onClick={logout}>LogOut</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
