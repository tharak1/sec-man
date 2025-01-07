import React from 'react'
import ClientCard from '@/components/ClientCard'
import Navbar from '@/components/Navbar'

const HomePage = () => {
  return (
    <>
      <Navbar/>
      <div className='w-full h-full grid grid-cols-4 max-sm:grid-cols-1 gap-4 p-4'>
        <ClientCard/>
        <ClientCard/>   
        <ClientCard/>
        <ClientCard/>
        <ClientCard/>
      </div>
    </>
  )
}

export default HomePage
