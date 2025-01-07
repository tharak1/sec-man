// "use client";
// import React, { useState } from 'react'
// import { useFormik } from "formik";
// import * as yup from "yup";
// import Navbar from '@/components/Navbar';
// import { useRouter, useSearchParams } from 'next/navigation';
// import axios, { AxiosError } from 'axios';
// import { siteData } from '@/models/frontendModels';



// const CreateCite = () => {
//   const router = useRouter();

//   const searchParams = useSearchParams(); 
//   const mode = searchParams.get("mode"); 

//   const isEditMode = mode === "edit";

//   const [shifts, setShifts] = useState([{ shift: "", shiftTimings: "" }]);
//   const [loading,setLoading] = useState<boolean>(false);
//   const [error,setError] = useState<string>('');

//   const validationSchema = yup.object({
//     name: yup.string().required("Name is required"),
//     address: yup.string().required("Address is required"),
//     location: yup.string().required("Location is required"),
//     ownedBy: yup.string().required("Owner name is required"),
//     ownerContactNumber: yup
//       .string()
//       .required("Owner contact number is required"),
//     shifts: yup.array().of(
//       yup.object({
//         shift: yup.string().required("Shift name is required"),
//         shiftTimings: yup.string().required("Shift timings are required"),
//       })
//     ),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       address:"",
//       location: "",
//       ownedBy: "",
//       ownerContactNumber: "",
//       shifts: shifts,
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       onSubmit(values);
//     },
//   });

//   const onSubmit = async (values: siteData) => {
//     console.log(values);
//     setLoading(true);
//     try {
//       if(isEditMode){
//         const response = await axios.put(`/api/site/clientsite`, values);
//         console.log("Update success", response.data);
//         router.push("/admin_home");
//       }else{
//         const response = await axios.post("/api/site/clientsite", values);
//         console.log("Signup success", response.data);
//         router.push("/admin_home");
//       }
//     } catch (error: unknown) {
//       console.log("Login failed", error);
  
//       if (error instanceof AxiosError && error.response?.data?.error) {
//           setError(error.response.data.error);
//       } else if (error instanceof Error) {
//           setError(error.message || "Something went wrong. Please try again.");
//       } else {
//           setError("An unknown error occurred.");
//       }
//   }
//    finally {
//       setLoading(false);
//     }
//   }


//   const handleAddShift = () => {
//     setShifts([...shifts, { shift: "", shiftTimings: "" }]);
//     formik.setFieldValue("shifts", [...formik.values.shifts, { shift: "", shiftTimings: "" }]);
//   };

//   const handleRemoveShift = (index: number) => {
//     const updatedShifts = shifts.filter((_, i) => i !== index);
//     setShifts(updatedShifts);
//     formik.setFieldValue("shifts", updatedShifts);
//   };

//   return (
//     <>
//     <Navbar/>
//       <div className='w-full max-w-md mx-auto flex items-center justify-center max-sm:p-6'>
//         <form onSubmit={formik.handleSubmit} className="space-y-4 md:max-w-1/2">
//           <div>
//             <label htmlFor="name">Name</label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.name}
//               className="border p-2 rounded w-full  text-gray-900"
//             />
//             {formik.errors.name && formik.touched.name && (
//               <p className="text-red-500 text-sm">{formik.errors.name}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="address">address</label>
//             <input
//               id="address"
//               name="address"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.address}
//               className="border p-2 rounded w-full text-gray-900"
//             />
//             {formik.errors.address && formik.touched.address && (
//               <p className="text-red-500 text-sm">{formik.errors.address}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="location">Location</label>
//             <input
//               id="location"
//               name="location"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.location}
//               className="border p-2 rounded w-full text-gray-900"
//             />
//             {formik.errors.location && formik.touched.location && (
//               <p className="text-red-500 text-sm">{formik.errors.location}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="ownedBy">Owned By</label>
//             <input
//               id="ownedBy"
//               name="ownedBy"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.ownedBy}
//               className="border p-2 rounded w-full text-gray-900"
//             />
//             {formik.errors.ownedBy && formik.touched.ownedBy && (
//               <p className="text-red-500 text-sm">{formik.errors.ownedBy}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="ownerContactNumber">Owner Contact Number</label>
//             <input
//               id="ownerContactNumber"
//               name="ownerContactNumber"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.ownerContactNumber}
//               className="border p-2 rounded w-full text-gray-900"
//             />
//             {formik.errors.ownerContactNumber && formik.touched.ownerContactNumber && (
//               <p className="text-red-500 text-sm">{formik.errors.ownerContactNumber}</p>
//             )}
//           </div>

//           <div>
//             <label>Shifts</label>
//             {formik.values.shifts.map((shift, index) => (
//               <div key={index} className="flex items-center space-x-2 mb-2">
//                 <input
//                   name={`shifts[${index}].shift`}
//                   type="text"
//                   placeholder="Shift"
//                   onChange={formik.handleChange}
//                   value={shift.shift}
//                   className="border p-2 rounded w-full text-gray-900"
//                 />
//                 <input
//                   name={`shifts[${index}].shiftTimings`}
//                   type="text"
//                   placeholder="Shift Timings"
//                   onChange={formik.handleChange}
//                   value={shift.shiftTimings}
//                   className="border p-2 rounded w-full text-gray-900"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveShift(index)}
//                   className="bg-red-500 text-white p-2 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={handleAddShift}
//               className="bg-blue-500 text-white p-2 rounded mt-2"
//             >
//               Add Shift
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="bg-green-500 text-white p-2 rounded w-full"
//           >
//             {
//               loading?(
//                 <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
//                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
//                 </svg>
//               ):(
//                 isEditMode?
//                 "Update"
//                 :
//                 "Submit"
//               )
//             }
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default CreateCite



"use client";
import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import Navbar from '@/components/Navbar';
import { useRouter, useSearchParams } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { siteData } from '@/models/frontendModels';

const CreateSite = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the id from query parameters
  const mode = searchParams.get("mode"); // To determine if it's edit or create

  const isEditMode = mode === "edit";

  const [shifts, setShifts] = useState([{ shift: "", shiftTimings: "" }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [initialValues, setInitialValues] = useState<siteData>({
    name: "",
    address: "",
    location: "",
    ownedBy: "",
    ownerContactNumber: "",
    shifts: shifts,
  });

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    location: yup.string().required("Location is required"),
    ownedBy: yup.string().required("Owner name is required"),
    ownerContactNumber: yup
      .string()
      .required("Owner contact number is required"),
    shifts: yup.array().of(
      yup.object({
        shift: yup.string().required("Shift name is required"),
        shiftTimings: yup.string().required("Shift timings are required"),
      })
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    geteditInitialData(); 
  }, [isEditMode, id]);

  const geteditInitialData = async () => {
    if (isEditMode && id) {
      setLoading(true);
      const response = await axios
        .get(`/api/site/clientsite?id=${id}`)
        .then((response) => {
          const fetchedData = response.data.data;
          setInitialValues({
            name: fetchedData.name || "",
            address: fetchedData.address || "",
            location: fetchedData.location || "",
            ownedBy: fetchedData.ownedBy || "",
            ownerContactNumber: fetchedData.ownerContactNumber || "",
            shifts: fetchedData.shifts || [{ shift: "", shiftTimings: "" }],
          });
          formik.setValues({
            name: fetchedData.name || "",
            address: fetchedData.address || "",
            location: fetchedData.location || "",
            ownedBy: fetchedData.ownedBy || "",
            ownerContactNumber: fetchedData.ownerContactNumber || "",
            shifts: fetchedData.shifts || [{ shift: "", shiftTimings: "" }],
          });
        })
        .catch((error: AxiosError) => {
          console.log("Error fetching document:", error);
          setError("Failed to fetch data.");
        })
        .finally(() => setLoading(false));
    }
  }


    


  const onSubmit = async (values: siteData) => {
    setLoading(true);
    try {
      if (isEditMode) {
        const response = await axios.put(`/api/site/clientsite`, {...values, _id: id});
        console.log("Update success", response.data);
        router.push("/admin_home");
      } else {
        const response = await axios.post("/api/site/clientsite", values);
        console.log("Signup success", response.data);
        router.push("/admin_home");
      }
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
      setLoading(false);
    }
  };

  const handleAddShift = () => {
    setShifts([...shifts, { shift: "", shiftTimings: "" }]);
    formik.setFieldValue("shifts", [...formik.values.shifts, { shift: "", shiftTimings: "" }]);
  };

  const handleRemoveShift = (index: number) => {
    const updatedShifts = [...formik.values.shifts];
    updatedShifts.splice(index, 1); 
    setShifts(updatedShifts);
    formik.setFieldValue("shifts", updatedShifts);
  };
  

  return (
    <>
      <Navbar />
      <div className='w-full max-w-md mx-auto flex items-center justify-center max-sm:p-6 mb-4'>
        <form onSubmit={formik.handleSubmit} className="space-y-4 md:max-w-1/2">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="border p-2 rounded w-full text-gray-900"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address}
              className="border p-2 rounded w-full text-gray-900"
            />
            {formik.errors.address && formik.touched.address && (
              <p className="text-red-500 text-sm">{formik.errors.address}</p>
            )}
          </div>

          <div>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.location}
              className="border p-2 rounded w-full text-gray-900"
            />
            {formik.errors.location && formik.touched.location && (
              <p className="text-red-500 text-sm">{formik.errors.location}</p>
            )}
          </div>

          <div>
            <label htmlFor="ownedBy">Owned By</label>
            <input
              id="ownedBy"
              name="ownedBy"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.ownedBy}
              className="border p-2 rounded w-full text-gray-900"
            />
            {formik.errors.ownedBy && formik.touched.ownedBy && (
              <p className="text-red-500 text-sm">{formik.errors.ownedBy}</p>
            )}
          </div>

          <div>
            <label htmlFor="ownerContactNumber">Owner Contact Number</label>
            <input
              id="ownerContactNumber"
              name="ownerContactNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.ownerContactNumber}
              className="border p-2 rounded w-full text-gray-900"
            />
            {formik.errors.ownerContactNumber && formik.touched.ownerContactNumber && (
              <p className="text-red-500 text-sm">{formik.errors.ownerContactNumber}</p>
            )}
          </div>

          <div>
            <label>Shifts</label>
            {formik.values.shifts.map((shift, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  name={`shifts[${index}].shift`}
                  type="text"
                  placeholder="Shift"
                  onChange={formik.handleChange}
                  value={shift.shift}
                  className="border p-2 rounded w-full text-gray-900"
                />
                <input
                  name={`shifts[${index}].shiftTimings`}
                  type="text"
                  placeholder="Shift Timings"
                  onChange={formik.handleChange}
                  value={shift.shiftTimings}
                  className="border p-2 rounded w-full text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveShift(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddShift}
              className="bg-blue-500 text-white p-2 rounded mt-2"
            >
              Add Shift
            </button>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded w-full"
          >
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
            ) : isEditMode ? (
              "Update"
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateSite;
