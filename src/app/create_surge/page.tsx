"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Navbar from "@/components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Surge, siteData } from "@/models/frontendModels";

const CreateSurge = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <CreateSurgePage />
      </Suspense>
    );
}

const CreateSurgePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const mode = searchParams.get("mode");
  const extra = searchParams.get("extra");

  const isextra = extra === "site";

  const isEditMode = mode === "edit";

  const isSiteCreate = mode === "sitecreate";

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [initialValues, setInitialValues] = useState<Surge>({
      name: "",
      Address: "",
      location: "",
      date: "",
      shift: "",
      shiftTimings: "",
      reason: "",
      requiredGuards: 0,
      // acceptedGuards: [],
    });

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    Address: yup.string().required("Address is required"),
    location: yup.string().required("Location is required"),
    date: yup.string().required("date is required"),
    shift: yup.string().required("Shift is required"),
    shiftTimings: yup.string().required("Shift timings are required"),
    reason: yup.string().required("Reason is required"),
    requiredGuards: yup
      .number()
      .required("Required guards is required")
      .min(1, "At least one guard is required"),
    // acceptedGuards: yup.array().of(
    //   yup.object({
    //     name: yup.string().required("Guard name is required"),
    //     phno: yup.string().required("Phone number is required"),
    //   })
    // ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });





  const getEditInitialData = async () => {
    if (isEditMode && id) {
      setLoading(true);
      try {
        const response = await axios.get(`/api/site/surgesite?id=${id}`);
        const fetchedData = response.data.data;
        setInitialValues(fetchedData);
        formik.setValues(fetchedData);
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.data?.error) {
          setError(error.response.data.error);
        } else if (error instanceof Error) {
          setError(error.message || "An error occurred.");
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }else if(isSiteCreate && id){
      setLoading(true);
      try {
        const response = await axios.get(`/api/site/clientsite?id=${id}`);
        const fetchedData = response.data.data as siteData;
        // setInitialValues(fetchedData);
        formik.setValues({
          name: fetchedData.name,
          Address: fetchedData.address,
          location: fetchedData.location,
          date: "",
          shift: "",
          shiftTimings: "",
          reason: "",
          requiredGuards: 0,
          // acceptedGuards: [],
        });
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.data?.error) {
          setError(error.response.data.error);
        } else if (error instanceof Error) {
          setError(error.message || "An error occurred.");
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const onSubmit = async (values: Surge) => {
    setLoading(true);
    try {
      if (isEditMode) {
        await axios.put(`/api/site/surgesite`, { ...values, _id: id });
        if(isextra){
        router.push(`/view_site?id=${values.siteId}`);
        }else{
        router.push("/surges_display");
        }
      }else if(isSiteCreate){
        await axios.post(`/api/site/surgesite`, { ...values, siteId:id });
        router.replace(`/view_site?id=${id}`);
      }
       else {
        await axios.post("/api/site/surgesite", values);
        router.push("/surges_display");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error instanceof Error) {
        setError(error.message || "An error occurred.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

//   const handleAddGuard = () => {
//     const newGuard: AcceptedGuard = { name: "", phno: "" };
//     formik.setFieldValue("acceptedGuards", [...formik.values.acceptedGuards, newGuard]);
//   };
//   const handleRemoveGuard = (index: number) => {
//     const updatedGuards = [...formik.values.acceptedGuards];
//     updatedGuards.splice(index, 1);
//     formik.setFieldValue("acceptedGuards", updatedGuards);
//   };


useEffect(() => {
  getEditInitialData();
}, [isEditMode, id, getEditInitialData]);
useEffect(() => {
},[name, id]);

  return (
    <Suspense fallback={
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
    }>
      <Navbar />
      <div className="w-full max-w-md mx-auto flex items-center justify-center max-sm:p-6 mb-4">
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
            <label htmlFor="Address">Address</label>
            <input
              id="Address"
              name="Address"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.Address}
              className="border p-2 rounded w-full text-gray-900"
            />
            {formik.errors.Address && formik.touched.Address && (
              <p className="text-red-500 text-sm">{formik.errors.Address}</p>
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
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.date}
              className="border p-2 rounded w-full text-gray-900"
            />
            {formik.errors.date && formik.touched.date && (
              <p className="text-red-500 text-sm">{formik.errors.date}</p>
            )}
          </div>

          <div>
            <label htmlFor="shift">Shift</label>
            <input
              id="shift"
              name="shift"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.shift}
              className="border p-2 rounded w-full text-gray-900"
            />
            {formik.errors.shift && formik.touched.shift && (
              <p className="text-red-500 text-sm">{formik.errors.shift}</p>
            )}
          </div>

          <div>
            <label htmlFor="shiftTimings">Shift Timings</label>
            <input
              id="shiftTimings"
              name="shiftTimings"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.shiftTimings}
              className="border p-2 rounded w-full text-gray-900"
            />
            {formik.errors.shiftTimings && formik.touched.shiftTimings && (
              <p className="text-red-500 text-sm">{formik.errors.shiftTimings}</p>
            )}
          </div>

          <div>
            <label htmlFor="reason">Reason</label>
            <input
              id="reason"
              name="reason"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.reason}
              className="border p-2 rounded w-full text-gray-900"
            />
            {formik.errors.reason && formik.touched.reason && (
              <p className="text-red-500 text-sm">{formik.errors.reason}</p>
            )}
          </div>

          <div>
            <label htmlFor="requiredGuards">Required Guards</label>
            <input
              id="requiredGuards"
              name="requiredGuards"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.requiredGuards}
              className="border p-2 rounded w-full text-gray-900"
            />
            {formik.errors.requiredGuards && formik.touched.requiredGuards && (
              <p className="text-red-500 text-sm">{formik.errors.requiredGuards}</p>
            )}
          </div>

          

          {/* Repeat similar blocks for Address, location, shift, etc. */}

          {/* <div>
            <label>Accepted Guards</label>
            {formik.values.acceptedGuards.map((guard, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  name={`acceptedGuards[${index}].name`}
                  type="text"
                  placeholder="Guard Name"
                  onChange={formik.handleChange}
                  value={guard.name}
                  className="border p-2 rounded w-full text-gray-900"
                />
                <input
                  name={`acceptedGuards[${index}].phno`}
                  type="text"
                  placeholder="Phone Number"
                  onChange={formik.handleChange}
                  value={guard.phno}
                  className="border p-2 rounded w-full text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveGuard(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddGuard}
              className="bg-blue-500 text-white p-2 rounded mt-2"
            >
              Add Guard
            </button>
          </div> */}

          <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
            {loading ? "Loading..." : isEditMode ? "Update" : "Submit"}
          </button>
          {
              error == ""?<p></p>:
              <p className='text-red-500'>
                {error}
              </p>
            }
        </form>
      </div>
    </Suspense>
  );
};

export default CreateSurge;

