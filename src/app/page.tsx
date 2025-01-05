"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";

export default function Home() {

  const router = useRouter()
  const [data, setData] = useState({
    name: '',
    phno: '',
  })

  const logout = async () => {
    try {
        await axios.get('/api/users/logout')
        router.push('/login')
    } catch (error:any) {
        console.log(error.message);
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/login')
    console.log(res.data);
    setData({name: res.data.data.name, phno: res.data.data.phno});
  }

  useEffect(() => {
    getUserDetails()
  },[]);


  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] justify-center items-center flex flex-col">
          Hello Login successful
          <div>
            <p>{data.name}</p>
            <p>{data.phno}</p>
          </div>

        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>
    </div>
  );
}
