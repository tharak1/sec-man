"use client";
import Navbar from '@/components/Navbar'
import { AcceptedSurgeRequests, users } from '@/models/frontendModels';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ProfiePage = () => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [loading1, setLoading1] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    console.log(error);

    useEffect(() => {
        getUserDetails()
    },[]);

    const [userData, setUserData] = useState<users>({
        name: "",
        phno: "",
        isAdmin:false,
        site: "",
        shift: "",
        shiftTimings: "",
        acceptedSurgeRequests:[]
    });

    const getUserDetails = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/users/login')
            console.log(res.data);
            setUserData(res.data.data as users);
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response?.data?.error) {
                setError(error.response.data.error);
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
        finally {
            setLoading(false);
        }
    }
    

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


    const openUrl = (url:string) => {
        window.open(url, "_blank");
    };


    const handleRemove = async(surgeId:string, guardAcceptedSurgeId:string) =>{
        setLoading1(true); 
        try {
            console.log(surgeId, guardAcceptedSurgeId);
          const res = await axios.post(`/api/site/add_surge_guard?surgeId=${surgeId}&guardAcceptedSurgeId=${guardAcceptedSurgeId}`);
          console.log(res.data);
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
            setLoading1(false);
            getUserDetails();
        }
    }
      

  return (
    <div className='w-full h-screen grid grid-cols-12 grid-rows-12 gap-1'>
        <div className='col-span-12 row-span-1 '>
            <Navbar/>
        </div>
        {
            loading?
            <div className='col-span-12 row-span-11 flex justify-center items-center'>
                <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
                />
                <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
                />
                </svg>
            </div>:
            <>
                <div className='col-span-6 row-span-6 row-start-2 max-sm:col-span-12  mt-5 p-4 bg-slate-200 dark:bg-gray-700 rounded-lg shadow-lg mx-2 flex flex-col items-center overflow-auto'>
                    <h1 className='text-2xl font-bold text-black dark:text-gray-200'>{userData.name}</h1>
                    <h1 className='text-2xl font-bold text-black dark:text-gray-200'>{userData.phno}</h1>
                    <button className=" px-3 py-2 text-lg font-normal text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={logout}>
                            LogOut
                        </button>

                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col p-4 '>
                            <p className='text-sm font-normal text-black dark:text-gray-200 my-2'><span className='text-lg text-black dark:text-gray-300'>Site:</span> {userData.site}</p>
                            <p className='text-sm font-normal text-black dark:text-gray-200 my-2'><span className='text-lg text-black dark:text-gray-300'>Shift:</span> {userData.shift}</p>
                            <p className='text-sm font-normal text-black dark:text-gray-200 my-2'><span className='text-lg text-black dark:text-gray-300'>Shift Timings:</span> {userData.shiftTimings}</p>
                        </div>
                    </div>

                </div>

                <div className='col-span-6 row-span-11 sm:row-start-2 max-sm:col-span-12 mt-5 bg-slate-200 dark:bg-gray-700 rounded-lg shadow-lg mx-2 mb-2 flex flex-col items-center overflow-auto p-4'>
                    <div className='mb-4'>
                        Accepted Surge requests
                    </div>
                    {
 
                        userData.acceptedSurgeRequests!.length > 0 ? (
                        <div className='col-span-4 row-span-8  bg-white dark:bg-slate-700 rounded-lg  overflow-auto mt-2 p-2 space-y-2'>
                            <div className='w-full grid grid-cols-6 max-sm:grid-cols-2 py-5'>
                                <div className='col-span-2 flex flex-col justify-start'>
                                    <div>Details</div>
                                </div>
                                <div className='col-span-2 max-sm:hidden flex flex-col justify-center items-center'>
                                    <div>Shift</div>
                                </div>
                                <div className='col-span-1 max-sm:hidden flex flex-col justify-center items-center'>
                                    <div>Location</div>
                                </div>
                                <div className='col-span-1 max-sm:hidden flex flex-col justify-center items-center'>
                                    <div>Action</div>
                                </div>
                            </div>
                            {userData.acceptedSurgeRequests!.map((obj:AcceptedSurgeRequests) => (
                                <div
                                className='w-full grid grid-cols-6 max-sm:grid-cols-2 py-5 bg-slate-200 dark:bg-slate-800 rounded-lg px-3 hover:shadow-md hover:shadow-gray-600 hover:cursor-pointer '
                                key={obj._id!}
                                >
                                    <div className='col-span-2 flex flex-col justify-start'>
                                        <h2>{obj.name}</h2>
                                        <h2>{obj.address}</h2>
                                    </div>
                                    <div className='col-span-2 max-sm:hidden flex flex-col justify-center border-l-2 border-gray-500 dark:border-gray-300 items-center'>
                                        <p>{obj.date}</p>
                                        <h2>{obj.shift}</h2>
                                        <h2>
                                            <span className='text-sm text-gray-600 dark:text-gray-400'>{obj.shift}: {obj.shiftTimings}</span>
                                        </h2>
                                    </div>
                                    <div className='col-span-1 max-sm:hidden flex flex-col justify-center items-center border-l-2 border-gray-500 dark:border-gray-300 p-2'>
                                        <button className="inline-flex items-center px-3 py-2 text-lg font-normal text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{openUrl(obj.location)}}>
                                            Location
                                        </button>
                                    </div>
                                    <div className={`col-span-1 max-sm:hidden flex flex-col justify-center items-center border-l-2 border-gray-500 dark:border-gray-300 px-3`}>
                                    <div className='w-full flex flex-col'>
                                        <button onClick={() => {handleRemove(obj.surgeId,obj._id!)}} className="inline-flex items-center px-3 py-2 text-lg font-normal text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                            {
                                            loading1?
                                            <svg
                                            aria-hidden="true"
                                            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                            />
                                            <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                            />
                                        </svg>:
                                            "Remove"
                                        }
                                            
                                        </button>
                                    </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        ) : (
                            <div className='col-span-3 row-span-8 bg-white dark:bg-slate-700 rounded-lg p-3 overflow-auto space-y-5 flex items-center justify-center dark:text-white'>
                            No Accepted surge requests found
                            </div>
                    )}
                </div>
            </>
        }
    </div>
  )
}

export default ProfiePage
