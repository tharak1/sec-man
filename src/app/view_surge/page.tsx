"use client";
import Navbar from '@/components/Navbar'
import { AcceptedGuard, surge } from '@/models/frontendModels';
import axios, { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci';


const ViewSurge = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ViewSurgePage />
      </Suspense>
    );
  };

const ViewSurgePage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [surgeData, setSurgeData] = useState<surge>({
            siteId: "",
            name: "",
            Address:"", 
            location: "",
            date:"",
            shift: "",
            shiftTimings: "",
            reason: "",
            requiredGuards: 0,
            acceptedGuards:[]
    });

    const openUrl = (url:string) => {
        window.open(url, "_blank");
    };



    const getSurgeData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/site/surgesite?id=${id}`);
            setSurgeData(res.data.data as surge);
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

    
    useEffect(() => {
        getSurgeData();
    },[id, searchParams, getSurgeData]);


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
                    <div className='col-span-6 row-span-5 row-start-2 mt-5 p-4 bg-slate-200 dark:bg-gray-700 rounded-lg shadow-lg mx-2 flex flex-col items-center overflow-auto'>
                        <h1 className='text-2xl font-bold text-black dark:text-gray-200'>{surgeData.name}</h1>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-col p-4 w-1/2'>
                                <p className='text-sm font-normal text-black dark:text-gray-200 my-2'><span className='text-lg text-black dark:text-gray-300'>Address:</span> {surgeData.Address}</p>
                                <p className='text-sm font-normal text-black dark:text-gray-200 my-2'><span className='text-lg text-black dark:text-gray-300'>Date:</span> {surgeData.date}</p>
                                <p className='text-sm font-normal text-black dark:text-gray-200 my-2'><span className='text-lg text-black dark:text-gray-300'>Reason:</span> {surgeData.reason}</p>
                            </div>
                            <div className='flex flex-col p-4 w-1/2'>
                                <button type="button" className="py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={()=>openUrl(surgeData.location)}>
                                    Show in maps <CiLocationOn size={24} />
                                </button>
                                <p className='text-sm font-normal text-black dark:text-gray-200 my-2'><span className='text-lg text-black dark:text-gray-300'>Shift: </span> {surgeData.shift}:{surgeData.shiftTimings}</p>
                            </div>
                        </div>
                    </div>

                    <div className='col-span-6 row-span-6 row-start-7 bg-slate-200 dark:bg-gray-700 rounded-lg shadow-lg m-2 flex flex-col items-center overflow-auto p-2'>

                    </div>
                    <div className='col-span-6 row-span-11 row-start-2 mt-5 bg-slate-200 dark:bg-gray-700 rounded-lg shadow-lg mx-2 mb-2 flex flex-col items-center overflow-auto p-4'>
                        <div className='mb-4'>
                            Accepted Guards
                        </div>
                        <div className='w-full h-full flex flex-col items-center justify-start overflow-auto'>
                            {surgeData.acceptedGuards!.map((obj:AcceptedGuard) => (
                                    <div
                                    className='w-full grid grid-cols-6 max-sm:grid-cols-2 py-5 bg-slate-200 dark:bg-slate-800 rounded-lg px-3 hover:shadow-md hover:shadow-gray-600 hover:cursor-pointer '
                                    key={obj._id!}
                                    >
                                        <div className='col-span-2 flex flex-col justify-start'>
                                            <h2>{obj.name}</h2>
                                            <h2>{obj.phno}</h2>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </>
            }
            {
              error == ""?<p></p>:
              <p className='text-red-500'>
                {error}
              </p>
            }
        </div>
  )
}

export default ViewSurge;
