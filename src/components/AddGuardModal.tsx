"use client";   
import { guards } from '@/models/frontendModels';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment } from 'react';
import AddGuardCard from './AddGuardCard';

interface AddGuardModalProps {
    isOpen:boolean;
    closeModal:()=>void; 
    guardsData:guards[];
    addGuard:(guard:guards)=>void;
    removeGuard:(guard: guards)=>void;
    selectedShift:string
}

const AddGuardModal: React.FC<AddGuardModalProps> = ({ isOpen, closeModal, guardsData, addGuard, selectedShift, removeGuard }) => {

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex max-h-screen items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl p-2 text-left align-middle shadow-xl transition-all bg-gray-50">
                                    <section>
                                        <div className="flex flex-col items-center justify-center py-8 mx-auto lg:py-0">
                                                                                        
                                                <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                                        <div>
                                                            <label htmlFor="courseType" className="block mb-2 text-sm font-medium text-gray-900">{selectedShift}</label>
                                                        </div>
                                                        <div className='h-[580px] overflow-auto w-full p-2' >
                                                            {
                                                                guardsData.length>0?<>
                                                                    {guardsData.map((guard: guards) => (
                                                                
                                                                        <AddGuardCard guard={guard} addGuard={addGuard} key={guard.phno} removeGuard={removeGuard}/>
                                                            
                                                                    ))}
                                                                </>:
                                                                <p className='text-black text-center'>
                                                                    No inactive guards
                                                                </p>
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                     
                                        </div>
                                    </section>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default AddGuardModal;
