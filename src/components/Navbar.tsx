"use client";
import { users } from '@/models/frontendModels';
import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from "next/navigation";
import React, { useEffect, useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
    const router = useRouter();
    const [openm1,setOpenm1] = useState<boolean>(false);

    const [userData, setUserData] = useState<users>({
        name: "",
        phno: "",
        isAdmin:false,
        site: "",
        shift: "",
        shiftTimings: "",
    });

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/login')
        console.log(res.data);
        setUserData(res.data.data as users);
    }
    
    useEffect(() => {
        getUserDetails()
    },[]);

    


  const homeNavigate = ()=>{
    if(userData.isAdmin){
      router.push("/sites_display");
    }else{
      router.push("/home");
    }
  }

  const navigateToProfile = () => {
    router.push("/profile");

  }

  return (
    <div className="w-full flex flex-row justify-between items-center bg-gray-100 dark:bg-slate-600 shadow-md p-3">
        <div className='relative flex flex-row justify-between items-center'>
            
                <div className="mr-3 flex items-center text-2xl font-semibold text-gray-900 dark:text-white hover:cursor-pointer "  onClick={homeNavigate}>
                    <Image width={10} height={10} className="w-8 h-6 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                    AutoDS 
                </div>
            
            {userData.isAdmin &&           
                <div className='max-sm:hidden flex flex-row'>
                <Link href={"/sites_display"} className="mx-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:cursor-pointer " >
                    View Sites   
                </Link>
                <Link href={"/create_site?mode=create"} className="mx-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:cursor-pointer " >
                    Add Site   
                </Link>
                <Link href={"/surges_display"} className="mx-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:cursor-pointer " >
                    view Surges
                </Link>
                <Link href={"/create_surge?mode=create"} className="mx-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:cursor-pointer " >
                    Add Surge
                </Link>
            </div>}
            {userData.isAdmin && 
            <div className='sm:hidden' >
                <button
                    type="button"
                    className="flex items-center px-2 text-gray-600 dark:text-white hover:cursor-pointer"
                    onClick={()=>{setOpenm1(!openm1)}}
                    >
                        <RiArrowDropDownLine size={44}/>
                </button>
            </div>}
            <div className={`absolute top-[65px] left-[-5px] ${openm1?"":"hidden"} w-[170px] z-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2`}>
                <div className="w-full flex flex-col items-center justify-center">
                    <Link href={"/sites_display"} className="mx-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:cursor-pointer " >
                        view Site
                    </Link>
                    <span className='w-full h-[0.5px] bg-slate-200'></span>
                    <Link href={"/create_site?mode=create"} className="mt-2 mb-2 flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:cursor-pointer " >
                        Add Site
                    </Link>
                    <span className='w-full h-[0.5px] bg-slate-200'></span>
                    <Link href={"/create_surge?mode=create"} className="mt-1 mb-2 flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:cursor-pointer " >
                        Add Surge
                    </Link>
                    <span className='w-full h-[0.5px] bg-slate-200'></span>
                    <Link href={"/surges_display"} className="mx-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:cursor-pointer " >
                        view Surge
                    </Link>
                </div>
            </div>
        </div>
        <div className="flex flex-row dark:text-white">
            
            <label className="inline-flex items-center cursor-pointer ">
            <div className="mr-4 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>

            <div className="relative flex justify-between items-center hover:cursor-pointer" onClick={navigateToProfile} >
                <Image height={10} width={10} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="user image" className="h-10 w-10 rounded-full bg-slate-50 border-2 mr-2"/>
                <div className='max-lg:hidden flex flex-col items-end'>
                    <h1>{userData.name}</h1>
                    <h1>{userData.phno}</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
