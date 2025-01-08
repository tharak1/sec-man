import { guards } from '@/models/frontendModels';
import React from 'react'

interface AddGuardCardProps {
    guard:guards; 
    addGuard:(guard:guards)=>void;
    removeGuard:(guard: guards)=>void;  
} 

const AddGuardCard:React.FC<AddGuardCardProps> = ({ guard, addGuard, removeGuard }) => {

  const [added, setAdded] = React.useState(false);


  const handleAddGuard = async() => {
    addGuard(guard);
    setAdded(true);
  }

  const handleRemoveGuard = () => {
    removeGuard(guard);
    setAdded(false);
  }

  return (
    <div className='w-full rounded-md bg-slate-100 dark:bg-slate-700 flex flex-row items-center justify-between p-3 my-2 hover:cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-500'>
        <div className='flex flex-col justify-start items-start'>
            <h2 className='ml-2 dark:text-white'>Name: {guard.name}</h2>
            <h2 className='ml-2 dark:text-white'>Ph.No: {guard.phno}</h2>
        </div>
        <div>
          {
            added?
            <button className='py-1 px-4 bg-red-500 rounded-md' onClick={handleRemoveGuard} >Remove</button>
            :
            <button className='py-1 px-4 bg-blue-500 rounded-md' onClick={handleAddGuard} >Add</button>
          }
        </div>
    </div>
  )
}

export default AddGuardCard
