import React, { useEffect, useState } from "react";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  fadeDown,
} from "../components/animation/FadeAnimOnLoad";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import NavBar from "components/NavBar";
import {ProtectedRoute} from "../components/ProtectedRoute";
import Notification from "components/Notification";
import myApi from "../axios";
import { Box, CircularProgress, InputLabel, TextField } from "@mui/material";
import Validations from "config/validation";

function MyProfile() {
  const [data, setData] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    razorpay_account_id: "",
    state: "",
    city: "",
    dob: ""
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [loading, setLoading] = useState();

  useEffect(()=>{
    getProfileData();
  },[])

  const getProfileData = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const updateData = await myApi.get(`/api/v1/accounts/vendors/${userData.user_id}/`);
    console.log("updateData", updateData);
    setData({...data, ...updateData.data})
    // setData({...data, 
    //   id: updateData.id,
    //   first_name: updateData.first_name,
    //   last_name: updateData.last_name,
    //   email: updateData.email,
    //   password: updateData.password,
    //   phone_number: updateData.phone_number,
    //   razorpay_account_id: updateData.razorpay_account_id,
    //   state: updateData.state,
    //   city: updateData.city,
    //   dob: updateData.dob,
    // })
  }

  const [formError, setFormError] = useState({});

  console.log("data", data);

  function checkProperties(obj) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] != "")
            return false;
    }
    return true;
    }


  const postBookingSubmit = async(e) => {
    e.preventDefault()
    // setLoading(true)
    let allError = Validations.validateMyProfileForm(data);
    console.log("allError", allError);
    if (
      Object.entries(allError).length === 0 &&
      allError.constructor === Object
    ) {
      setLoading(true);
      try {
        const updateData = await myApi.put(
          `/api/v1/accounts/vendors/${data?.id}/`,
          data
        );
        setNotify({
          isOpen: true,
          message: `Profile Data updated successfully`,
          type: "success",
        });
        setLoading(false);
      } catch (error) {
        setNotify({
          isOpen: true,
          message: `something went wrong, please try again`,
          type: "success",
        });
        setLoading(false);
      }
    }
    setFormError(allError);
  }

  // let delay = 1;
  const controls = useAnimation();
  const { ref, inView } = useInView({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const updateData = (e) => {
    console.log(data, "data");
    const { name, value } = e.target;
   
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <>
    <NavBar></NavBar>
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      id="postBooking"
      className="min-h-screen bg-stone-800"
    >
      {/* border */}
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <Box sx={{pt: {md: 10, sm: 8, xs: 14}, px: {xs: 4}}}>
        <div className="md:grid md:grid-rows-non md:gap-6 md:justify-center">
          {/* Heading */}
          <motion.div
            ref={ref}
            initial="hidden"
            variants={fadeRight(0.5)}
            animate={controls}
            onChange={(inView) => console.log("Inview:", inView)}
            className="md:col-span-3 md:text-center"
          >
            <div className="p-3 bg-[#fec601] rounded-3xl  sm:px-0">
              <h3 className="text-2xl font-semibold ml-1 leading-6 text-gray-900">
                Profile Update
              </h3>
              {/* <p className="mt-1 text-sm text-gray-600">
                Use a permanent address where you can receive mail.
              </p> */}
            </div>
          </motion.div>
          {/* Form */}
          <motion.div
            ref={ref}
            initial="hidden"
            variants={fadeDown(0.5)}
            animate={controls}
            onChange={(inView) => console.log("Inview:", inView)}
            className="mt-5 md:mt-0 md:col-span-3"
            style={{paddingBottom: "20px"}}
          >
            <form>
              <div className="shadow overflow-hidden rounded-sm">
                <div className="md:w-[600px] px-4 py-5 bg-[#1261A0] sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {/* <div className="flex gap-6"> */}
                    {/* First Name */}
                    <div className="col-span-6 sm:col-span-3">
                        <InputLabel sx={{ color: "#fff" }}>First Name</InputLabel>
                        <TextField
                          sx={{ borderRadius: "6px", color: "#fff" }}
                          type="text"
                          name="first_name"
                          id="first_name"
                          autoComplete="given-name"
                          value={data?.first_name}
                          onChange={(e) => updateData(e)}
                          fullWidth
                          error={formError && formError.first_name ? true : false}
                          helperText={formError && formError.first_name}
                          // label="Pick up"
                        />
                      {/* <label
                        htmlFor="from"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        value={data?.first_name}
                        onChange={(e) => updateData(e)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      /> */}
                    </div>
                    {/* Last Name */}
                    <div className="col-span-6 sm:col-span-3">
                        <InputLabel sx={{ color: "#fff" }}>Last Name</InputLabel>
                        <TextField
                          sx={{ borderRadius: "6px", color: "#fff" }}
                          type="text"
                          name="last_name"
                          id="last_name"
                          autoComplete="given-name"
                          value={data?.last_name}
                          onChange={(e) => updateData(e)}
                          fullWidth
                          error={formError && formError.last_name ? true : false}
                          helperText={formError && formError.last_name}
                          // label="Pick up"
                        />
                      {/* <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="given-name"
                        value={data?.last_name}
                        onChange={(e) => updateData(e)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      /> */}
                    </div>
                    
                    {/* Time */}
                    <div className="col-span-6 sm:col-span-3">
                      <InputLabel sx={{ color: "#fff" }}>Email</InputLabel>
                      <TextField
                        sx={{ borderRadius: "6px", color: "#fff" }}
                        type="text"
                        name="email"
                        id="email"
                        value={data?.email}
                        onChange={(e) => updateData(e)}
                        fullWidth
                        error={formError && formError.email ? true : false}
                        helperText={formError && formError.email}
                        // label="Pick up"
                      />
                      {/* <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={data?.email}
                        onChange={(e) => updateData(e)}
                        // autoComplete="pickup_time"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      /> */}
                    </div>
                    {/* Car Varient */}
                    <div className="col-span-6 sm:col-span-3">
                        <InputLabel sx={{ color: "#fff" }}>Password</InputLabel>
                        <TextField
                          sx={{ borderRadius: "6px", color: "#fff" }}
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="car-varient"
                          value={data?.password}
                          onChange={(e) => updateData(e)}
                          fullWidth
                          error={formError && formError.password ? true : false}
                          helperText={formError && formError.password}
                          // label="Pick up"
                        />
                      {/* <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="car-varient"
                        value={data?.password}
                        onChange={(e) => updateData(e)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      /> */}
                    </div>
                    {/* Trip price */}
                    <div className="col-span-6 sm:col-span-3">
                      <InputLabel sx={{ color: "#fff" }}>Phone Number</InputLabel>
                      <TextField
                        sx={{ borderRadius: "6px", color: "#fff" }}
                        type="text"
                        name="phone_number"
                        id="phone_number"
                        autoComplete="phone_number"
                        value={data?.phone_number}
                        onChange={(e) => updateData(e)}
                        fullWidth
                        error={formError && formError.phone_number ? true : false}
                        helperText={formError && formError.phone_number}
                        // label="Pick up"
                      />
                      {/* <label
                        htmlFor="phone_number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="cost_of_jorney"
                        id="phone_number"
                        autoComplete="phone_number"
                        value={data?.phone_number}
                        onChange={(e) => updateData(e)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      /> */}
                    </div>
                    {/* Ask */}
                    <div className="col-span-6 sm:col-span-3">
                    <InputLabel sx={{ color: "#fff" }}>Razorpay Account Id</InputLabel>
                      <TextField
                        sx={{ borderRadius: "6px", color: "#fff" }}
                        type="text"
                        name="razorpay_account_id"
                        id="razorpay_account_id"
                        autoComplete="ask"
                        value={data?.razorpay_account_id}
                        fullWidth
                        error={formError && formError.razorpay_account_id ? true : false}
                        helperText={formError && formError.razorpay_account_id}
                        // label="Pick up"
                      />
                      {/* <label
                        htmlFor="razorpay_account_id"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Razorpay Account Id
                      </label>
                      <input
                        type="text"
                        name="razorpay_account_id"
                        id="razorpay_account_id"
                        autoComplete="ask"
                        value={data?.razorpay_account_id}
                        onChange={(e) => updateData(e)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      /> */}
                    </div>
                    {/* State */}
                    <div className="col-span-6 sm:col-span-3">
                      <InputLabel sx={{ color: "#fff" }}>State</InputLabel>
                      <TextField
                        sx={{ borderRadius: "6px", color: "#fff" }}
                        type="text"
                        name="state"
                        id="state"
                        value={data?.state}
                        onChange={(e) => updateData(e)}
                        fullWidth
                        error={formError && formError.state ? true : false}
                        helperText={formError && formError.state}
                        // label="Pick up"
                      />
                      {/* <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        value={data?.state}
                        onChange={(e) => updateData(e)}
                        autoComplete="state"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      /> */}
                    </div>
                    {/* city */}
                    <div className="col-span-6 sm:col-span-3">
                      <InputLabel sx={{ color: "#fff" }}>City</InputLabel>
                      <TextField
                        sx={{ borderRadius: "6px", color: "#fff" }}
                        type="text"
                        name="city"
                        id="city"
                        value={data?.city}
                        onChange={(e) => updateData(e)}
                        fullWidth
                        error={formError && formError.city ? true : false}
                        helperText={formError && formError.city}
                        // label="Pick up"
                      />
                      {/* <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={data?.city}
                        onChange={(e) => updateData(e)}
                        autoComplete="city"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      /> */}
                    </div>
                    {/* Date */}
                    <div className="col-span-6 sm:col-span-3">
                    <InputLabel sx={{ color: "#fff" }}>Date Of Birthday</InputLabel>
                      <TextField
                        sx={{ borderRadius: "6px", color: "#fff" }}
                        type="date"
                        name="dob"
                        id="dob"
                        value={data?.dob}
                        onChange={(e) => updateData(e)}
                        fullWidth
                        error={formError && formError.dob ? true : false}
                        helperText={formError && formError.dob}
                        // label="Pick up"
                      />
                      {/* <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date Of Birthday
                      </label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={data?.dob}
                        onChange={(e) => updateData(e)}
                        autoComplete="date_of_jorney"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-[#1261A0] text-center sm:px-6">
                  {
                    !loading ?(

                      <button
                        // type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#fec601] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={postBookingSubmit}
                      >
                        Submit
                      </button>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress size={25} />
                      </Box>
                    )
                  }
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </Box>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </motion.section>
    <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default ProtectedRoute(MyProfile);
