"use client";
import { Surge, users } from '@/models/frontendModels';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'

interface ClientCardProps{
    surge: Surge;
}

const ClientCard:React.FC<ClientCardProps> = ({surge}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [surgePresent, setSurgePresent] = useState<boolean>(false);
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
      const res = await axios.get('/api/users/login')
      console.log(res.data);
      setUserData(res.data.data as users);
  }




    const isSurgePresent = () => {
      console.log(userData.acceptedSurgeRequests?.some((surge1) => surge1.surgeId === surge._id))
      setSurgePresent(userData.acceptedSurgeRequests?.some((surge1) => surge1.surgeId === surge._id)?? false);
    };

    const openUrl = (url:string) => {
      window.open(url, "_blank");
  };

    const handleApply = async() =>{
        setLoading(true); 
        try {
          const res = await axios.get(`/api/site/add_surge_guard?id=${surge._id}`);
          console.log(res.data);
          setSurgePresent(true);
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

    useEffect(()=>{
      getUserDetails();
    },[])
    useEffect(()=>{
      isSurgePresent();
    },[userData])
    
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{surge.name}</h5>
            
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Address: {surge.Address}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Date: {surge.date}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Reason: {surge.reason}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Shift: {surge.shift}: {surge.shiftTimings}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Required guards: {surge.requiredGuards}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Accepted: {surge.acceptedGuards!.length}</p>
        <div className='w-full flex justify-between'>
            <button className="inline-flex items-center px-3 py-2 text-lg font-normal text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{openUrl(surge.location)}}>
                Location
            </button>
            {
              surgePresent?
              <button className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={true}>
                Applied
              </button>:
            <button className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleApply}>
            {loading ? (
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
                    ) : 
                    <>
                        {
                          "Apply"
                        }
                    </>
                }
            </button>

            }
            
        </div>
    </div>
  )
}

export default ClientCard
