"use client"; 
import AdminSiteCard from '@/components/AdminSiteCard';
import Navbar from '@/components/Navbar'
import { siteData } from '@/models/frontendModels';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'

const AdminHomePage = () => {
  const [loading,setLoading] = useState(false);
  // const [error,setError] = useState(null);
  const [data,setData] = useState<siteData[]>([]);

  useEffect(()=>{
    getData();
  },[]);

  const getData = async () => {
    setLoading(true); 
    try {
      const res = await axios.get('/api/site/clientsite')
      console.log(res.data);
      setData(res.data.data as siteData[]); 
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
    finally{
      setLoading(false);
    }
  }

  const removeDeletedSite = (id: string) => {
    setLoading(true); 
    setData(data.filter((site) => site._id !== id));
    setLoading(false); 
  }


  return (
    <div className='w-full h-screen grid grid-cols-12 grid-rows-12 gap-1'>

        <div className='col-span-12 row-span-1 '>
            <Navbar/>
        </div>
      
        <form className="col-span-12 row-span-1 sm:max-w-md  mx-auto sm:m-4 max-sm:mx-2">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="mt-2 block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                <button type="submit" className="text-white absolute end-0 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>

      
      {
        loading?
        <div className='col-span-12 flex items-center justify-center'>
          <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
        :
        <div className='col-span-12 row-span-10 grid grid-cols-4 max-sm:grid-cols-1 gap-4 p-4'>
          {data.map((obj: siteData) => (
          <div className='col-span-1 w-full' key={obj._id}>
            <AdminSiteCard site={obj} handleDelete={removeDeletedSite}/>
          </div>
          ))}  
        </div>
      }
      
    </div>
  )
}

export default AdminHomePage
