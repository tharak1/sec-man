"use client";
import React from 'react'

const ClientCard = () => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">LOCATION NAME</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Timings: 5:30 to 11:00</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Required: 8</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Open: 5</p>
        <div className='w-full flex justify-between'>
            <button className="inline-flex items-center px-3 py-2 text-lg font-normal text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Location
            </button>
            <button className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Apply
            </button>
        </div>
    </div>
  )
}

export default ClientCard
