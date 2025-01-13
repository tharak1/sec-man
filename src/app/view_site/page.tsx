"use client";
import AddGuardModal from '@/components/AddGuardModal';
import Navbar from '@/components/Navbar'
import { guards, siteData, Surge } from '@/models/frontendModels';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { CiEdit, CiLocationOn } from "react-icons/ci";
import { MdDelete } from 'react-icons/md';


const ViewSitePage = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ViewPage />
      </Suspense>
    );
  };

const ViewPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState<boolean>(false);
    const [loading1, setLoading1] = useState<boolean>(false); 
    const [loading2, setLoading2] = useState<boolean>(false); 

    const [selectedValue, setSelectedValue] = useState("");
    const [error, setError] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [guardsData, setGuardsData] = useState<guards[]>([]);
    const [siteSurge, setSiteSurge] = useState<Surge[]>([]);
    const [siteData, setSiteData] = useState<siteData>({
        _id: '',
        name: '',
        address: '',
        location: '',
        ownedBy: '',
        ownerContactNumber: '',
        shifts: [],
        guards: []
    });
    const [filteredData, setFilteredData] = useState<guards[]>([]);





    const getSiteData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/site/clientsite?id=${id}`);
            setSiteData(res.data.data as siteData);
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



    const openUrl = (url:string) => {
        window.open(url, "_blank");
    }; 

    useEffect(() => {
        const updatedFilteredData = siteData.guards?.filter((guard) =>
          `${guard.shift.toLowerCase()}:${guard.shiftTimings.toLowerCase()}`.includes(selectedValue.toLowerCase())
        ) || [];
        setFilteredData(updatedFilteredData);
      }, [siteData, selectedValue]);
  

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(e.target.value);
    };

    const closeModal = () => {   
        setIsOpen(false);
    }

    const openModal = () => {
        if(selectedValue!=='' && selectedValue!==null){
            setIsOpen(true);
        }else{
            alert("Please select a shift to add guard");
        }
    }

  const fetchGuards = async () => {
      try {
          const response = await axios.get('/api/guards');

          const guardsData = response.data.data as guards[]

          const res = await axios.get('/api/users/login')

          const x = guardsData.filter(guard => 
            guard.phno !== res.data.data.phno && 
            (guard.site === 'none' && guard.shift === 'none' && guard.shiftTimings === 'none')
          );
          
          setGuardsData(x);
    
      }catch (error: unknown) {
          if (error instanceof AxiosError && error.response?.data?.error) {
              setError(error.response.data.error);
          } else if (error instanceof Error) {
              setError(error.message || "Something went wrong. Please try again.");
          } else {
              setError("An unknown error occurred.");
          }
      }
      finally {
      }
  }


//   const addGuard = (guard:guards) => {
//     console.log(guard);
//     guard = {
//         ...guard,
//         shift: selectedValue.split(':')[0],
//         shiftTimings: selectedValue.split(':').slice(1).join(':')
//     }
//     setSiteData(prevSiteData => ({
//         ...prevSiteData,
//         guards: [...prevSiteData.guards!, guard], 
//       }));

//     console.log(guard);
//   }


const addGuard = async (guard: guards) => {
    setLoading1(true);  // Show loading state when submitting
  
    try {
      console.log(guard);
  
    guard = {
        ...guard,
        site: siteData.name,
        shift: selectedValue.split(':')[0],
        shiftTimings: selectedValue.split(':').slice(1).join(':')
    }
      setSiteData(prevSiteData => ({
        ...prevSiteData,
        guards: [...prevSiteData.guards!, guard], 
      }));

      const x = {...siteData, guards: [...siteData.guards!, guard]};
  
      const response = await axios.put(`/api/site/clientsite`, {
        ...x, 
        _id: id,    
      });

      const anotherResponse = await axios.put(`/api/guards`,{
        ...guard,
        _id: guard._id
      })

      console.log(anotherResponse)
  
      console.log("Update success", response.data);
  
    } catch (error: unknown) {
      console.log("Submission failed", error);
  

      if (error instanceof AxiosError && error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error instanceof Error) {
        setError(error.message || "Something went wrong. Please try again.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
        fetchGuards();
      setLoading1(false);  
    }

    console.log(siteData.guards);  
  };
  
  
  const removeGuard = async(guard: guards) => {
    setLoading1(true);  // Show loading state when submitting
  
    try {
        guard = {
            ...guard,
            site: "none",
            shift: "none",
            shiftTimings: "none"
        }
        setSiteData(prevSiteData => ({
            ...prevSiteData, 
            guards: prevSiteData.guards!.filter(guard => guard._id !== guard._id),
          }));

        const x = {...siteData, guards: siteData.guards!.filter(guard => guard._id !== guard._id)};

      const response = await axios.put(`/api/site/clientsite`, {
        ...x, 
        _id: id,    
      });

      const anotherResponse = await axios.put(`/api/guards`,{
        ...guard,
        _id: guard._id
      })

      console.log(anotherResponse);
  
      console.log("Update success", response.data);
  
    } catch (error: unknown) {
      console.log("Submission failed", error);
  

      if (error instanceof AxiosError && error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error instanceof Error) {
        setError(error.message || "Something went wrong. Please try again.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
        fetchGuards();
      setLoading1(false); 
    }

  };

  const getSiteSurges = async() =>{
    setLoading2(true);
    try {
        const res = await axios.get(`/api/site/sitesurge?id=${id}`);
        console.log(res.data.data as Surge[]);
        setSiteSurge(res.data.data as Surge[]);
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
        setLoading2(false);
    }
  }


  const [loading3,setLoading3] = useState(false);

  const deleteSite = async (surge: Surge) => {
      setLoading3(true);
      try { 
          const res = await axios.delete(`/api/site/surgesite?id=${surge._id}`,);
          console.log(res.data);
        //   handleDelete(surge._id!);
        setSiteSurge(siteSurge.filter((surge) => surge._id !== id));

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
          setLoading3(false);
      }
  }


  useEffect(() => {    
    getSiteData();
    getSiteSurges();
    fetchGuards();
},[id]);



  return (
    <div className='w-full h-screen max-sm:h-full grid grid-cols-12 grid-rows-12 gap-1'>
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
                <div className='col-span-6 row-span-5 max-sm:col-span-12 row-start-2 mt-5 p-4 bg-slate-200 dark:bg-gray-700 rounded-lg shadow-lg mx-2 flex flex-col items-center overflow-auto'>
                    <h1 className='text-2xl font-bold text-black dark:text-gray-200'>{siteData.name}</h1>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col p-4 w-1/2'>
                            <p className='text-sm font-normal text-black dark:text-gray-200 my-2'><span className='text-lg text-black dark:text-gray-300'>Address:</span> {siteData.address}</p>
                            <p className='text-sm font-normal text-black dark:text-gray-200 my-2'><span className='text-lg text-black dark:text-gray-300'>Owner name:</span> {siteData.ownedBy}</p>
                            <p className='text-sm font-normal text-black dark:text-gray-200 my-2'><span className='text-lg text-black dark:text-gray-300'>Contact No:</span> {siteData.ownerContactNumber}</p>
                        </div>
                        <div className='flex flex-col p-4 w-1/2'>
                            <button type="button" className="py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={()=>openUrl(siteData.location)}>
                                Show in maps <CiLocationOn size={24} />
                            </button>
                            <p className='text-sm font-normal text-black dark:text-gray-200 my-2'><span className='text-lg text-black dark:text-gray-300'>No.of shifts:</span> {siteData.shifts.length}</p>
                            {
                                siteData.shifts.map((shift,index)=>{
                                    return (
                                        <p key={index} className='text-sm font-normal text-black dark:text-gray-200'><span className='text-lg text-black dark:text-gray-300'>{shift.shift} {index+1}:</span> {shift.shiftTimings}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='col-span-6 max-sm:col-span-12 row-span-6 row-start-7 bg-slate-200 dark:bg-gray-700 rounded-lg shadow-lg m-2 flex flex-col items-center overflow-auto p-2'>
                    <div className='w-full flex flex-row items-end justify-between'>
                        <div>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>{router.push(`/create_surge?mode=sitecreate&id=${id}`)}}>Add surge request to this site</button>
                        </div>
                    </div>
                    
                        {loading2 ? (
                            <div className='col-span-3 row-span-5 max-sm:row-span-8 flex items-center justify-center dark:text-white'>
                            <svg
                                aria-hidden='true'
                                className='inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300'
                                viewBox='0 0 100 101'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                fill='currentColor'
                                />
                                <path
                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                fill='currentFill'
                                />
                            </svg>
                            </div>
                        ) : siteSurge.length > 0 ? (
                            <div className='col-span-4 max-sm:col-span-12 row-span-8 p-2  bg-white dark:bg-slate-700 rounded-lg  overflow-auto mt-2 space-y-2'>
                                {/* <div className='w-full grid grid-cols-6 max-sm:grid-cols-2 py-5'>
                                    <div className='col-span-2 flex flex-col justify-start'>
                                        <div>Details</div>
                                    </div>
                                    <div className='col-span-1 max-sm:hidden flex flex-col justify-center items-center'>
                                        <div>Date</div>
                                    </div>
                                    <div className='col-span-2 max-sm:hidden flex flex-col justify-center items-center'>
                                        <div>Shift</div>
                                    </div>
                                    <div className='col-span-1 max-sm:hidden flex flex-col justify-center items-center'>
                                        <div>Action</div>
                                    </div>
                                </div> */}
                                {siteSurge.map((obj:Surge) => (
                                    <div
                                    className='w-full grid grid-cols-6 max-sm:grid-rows-2 max-sm:grid-cols-4 py-5 bg-slate-200 dark:bg-slate-800 rounded-lg px-3 hover:shadow-md hover:shadow-gray-600 hover:cursor-pointer '
                                    key={obj._id!}
                                    >
                                        <div className='col-span-2 max-sm:row-start-1 max-sm:row-span-1  flex flex-col justify-start'>
                                            <h2>{obj.Address}</h2>
                                            <h2>{obj.reason}</h2>
                                        </div>
                                        <div className='col-span-1 max-sm:col-span-2 max-sm:row-span-1 max-sm:row-start-1 flex flex-col justify-center border-l-2 border-gray-500 dark:border-gray-300 items-center'>
                                            <h2>{obj.date}</h2>
                                        </div>
                                        <div className='col-span-2 max-sm:col-span-2 max-sm:row-span-1  max-sm:row-start-2 flex flex-col justify-center items-center sm:border-l-2 border-gray-500 dark:border-gray-300 p-2'>
                                            <h2>
                                                <span className='text-sm text-gray-600 dark:text-gray-400'>{obj.shift}: {obj.shiftTimings}</span>
                                            </h2>
                                        </div>
                                        <div className={`col-span-1 max-sm:col-span-2 max-sm:row-span-1 max-sm:row-start-2 flex flex-col justify-center items-center border-l-2 border-gray-500 dark:border-gray-300 px-3`}>
                                        <div className='w-full flex flex-col'>
                                            <Link href={`/view_surge?id=${obj._id}`}>
                                                <button className="inline-flex items-center px-1 mb-1 text-sm font-normal text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    View
                                                </button>
                                            </Link>

                                            <Link href={`/create_surge?mode=edit&id=${obj._id}&extra=site`}>
                                                <button className="inline-flex items-center px-1 mb-1 text-sm font-normal text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                                                    Edit   <CiEdit size={20}/>
                                                </button>
                                            </Link>

                                            <button className="inline-flex items-center px-1 mb-1 text-sm font-normal text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={()=>{deleteSite(obj)}}>
                                            {loading3 ? (
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
                                                    Delete <MdDelete size={20} />
                                                </>
                                            }
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            ) : (
                                <div className='col-span-3 row-span-8 bg-white dark:bg-slate-700 rounded-lg p-3 overflow-auto space-y-5 flex items-center justify-center dark:text-white'>
                                No results found
                                </div>
                        )}

                </div>
                <div className='col-span-6 row-span-11 sm:row-start-2 max-sm:col-span-12 mt-5 bg-slate-200 dark:bg-gray-700 rounded-lg shadow-lg mx-2 mb-2 flex flex-col items-center overflow-auto p-4'>
                    <div className='w-full flex flex-row items-end justify-between'>
                        <div>
                            <form className="max-w-sm mx-auto">
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an shift</label>
                            <select 
                            id="countries" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            value={selectedValue} 
                            onChange={handleChange}
                            >
                                <option value="" disabled>Choose a shift</option>
                            {siteData.shifts.map((shift, index) => (
                                <option key={index} value={`${shift.shift}:${shift.shiftTimings}`} >
                                {shift.shift}: {shift.shiftTimings}
                                </option>
                            ))}
                            </select>

                            </form>
                        </div>

                        <div>
                            <button type="button" className="max-sm:ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={openModal}>Add guard to selected shift</button>
                        </div>

                    </div>
                    <div className='w-full h-full flex flex-col items-center justify-start overflow-auto '>
                        {loading1 ? (
                            <div className='col-span-3 row-span-5 max-sm:row-span-8 flex items-center justify-center dark:text-white'>
                            <svg
                                aria-hidden='true'
                                className='inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300'
                                viewBox='0 0 100 101'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                fill='currentColor'
                                />
                                <path
                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                fill='currentFill'
                                />
                            </svg>
                            </div>
                        ) : filteredData.length > 0 ? (
                            <div className='col-span-3 row-span-8 bg-white dark:bg-slate-700 rounded-lg p-3 overflow-auto mt-2 space-y-2'>
                                <div className='w-full grid grid-cols-6 max-sm:grid-cols-2 py-5 max-sm:hidden'>
                                    <div className='col-span-1 flex flex-col justify-start'>
                                        <div>Details</div>
                                    </div>
                                    <div className='col-span-2 max-sm:hidden flex flex-col justify-center items-center'>
                                        <div>Site</div>
                                    </div>
                                    <div className='col-span-2 max-sm:hidden flex flex-col justify-center items-center'>
                                        <div>Shift</div>
                                    </div>
                                    <div className='col-span-1 max-sm:hidden flex flex-col justify-center items-center'>
                                        <div>Action</div>
                                    </div>
                                </div>
                                {filteredData.map((obj:guards) => (
                                    <div
                                    className='w-full grid grid-cols-6 max-sm:grid-rows-2 max-sm:grid-cols-4 py-5 bg-slate-200 dark:bg-slate-800 rounded-lg px-3 hover:shadow-md hover:shadow-gray-600 hover:cursor-pointer'
                                    key={obj.phno}
                                    >
                                        <div className='col-span-1 max-sm:col-span-2 max-sm:row-span-1 max-sm:row-start-1 flex flex-col justify-start'>
                                            <h2>{obj.name}</h2>
                                            <h2>{obj.phno}</h2>
                                        </div>
                                        <div className='col-span-2 max-sm:col-span-2 max-sm:row-span-1 max-sm:row-start-1 flex flex-col justify-center border-l-2 border-gray-500 dark:border-gray-300 items-center'>
                                            <h2>{obj.site}</h2>
                                        </div>
                                        <div className='col-span-2 max-sm:col-span-2 max-sm:row-span-1 max-sm:row-start-2 flex flex-col justify-center items-center sm:border-l-2 border-gray-500 dark:border-gray-300 p-2'>
                                            <h2>
                                                <span className='text-sm text-gray-600 dark:text-gray-400'>{obj.shift}: {obj.shiftTimings}</span>
                                            </h2>
                                        </div>
                                        <div className={`col-span-1 max-sm:col-span-2 max-sm:row-span-1 max-sm:row-start-2 flex flex-col justify-center items-center border-l-2 border-gray-500 dark:border-gray-300 px-3`}>
                                            <button onClick={()=>(removeGuard(obj))} className="inline-flex items-center px-3 py-2 text-lg font-normal text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
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
                                ))}
                                </div>
                            ) : (
                                <div className='col-span-3 row-span-8 bg-white dark:bg-slate-700 rounded-lg p-3 overflow-auto space-y-5 flex items-center justify-center dark:text-white'>
                                No results found
                                </div>
                            )}
                        </div>

                        {
                            error == ""?<p></p>:
                            <p className='text-red-500'>
                                {error}
                            </p>
                        }
                </div>

                <AddGuardModal isOpen={isOpen} closeModal={closeModal} guardsData={guardsData} addGuard={addGuard} selectedShift={selectedValue} removeGuard={removeGuard}/>
            </>

        }
    </div>
  )
}
 
export default ViewSitePage;
