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
import { useRouter } from "next/router";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Notification from "components/Notification";
import myApi from "../axios";
import { InputLabel, TextField } from "@mui/material";
import Validations from "config/validation";

function DriverForm() {
  const router = useRouter();
  const [data, setData] = useState({
    confirm_booking_id: "",
    payment_link_id: "",
    payment_link_reference_id: "",
    payment_link_status: "",
    razorpay_payment_id: "",
    razorpay_signature: "",
    postbooking_id: "",
    driver_name: "",
    driver_email: "",
    driver_mobile_number: "",
    driver_licence_number: "",
    driver_vehicle_number: "",
  });
  const [formError, setFormError] = useState({});

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  function checkProperties(obj) {
    for (var key in obj) {
      if (
        key == "confirm_booking_id" ||
        key == "payment_link_id" ||
        key == "payment_link_reference_id" ||
        key == "payment_link_status" ||
        key == "razorpay_payment_id" ||
        key == "razorpay_signature" ||
        key == "postbooking_id"
      ) {
        continue;
      } else if (obj[key] == null || obj[key] == "") {
        return false;
      }
    }
    return true;
  }

  const postBookingSubmit = async (e) => {
    e.preventDefault();
    console.log(checkProperties(data));
    let allError = Validations.validateDriverForm(data);
    if (Object.entries(allError).length === 0 &&
    allError.constructor === Object) {
      if (
        data.driver_email.length < 1 ||
        data.driver_licence_number.length < 1 ||
        data.driver_mobile_number.length < 1 ||
        data.driver_name.length < 1 ||
        data.driver_vehicle_number.length < 1
      ) {
        setNotify({
          isOpen: true,
          message: `please fill the all the values`,
          type: "error",
        });
        return;
      }

      const updateData = await myApi.post(
        `/api/v1/payment/payment-confirm/`,
        data
      );
      setNotify({
        isOpen: true,
        message: `booking successfully completed`,
        type: "success",
      });
      return router.push(`/ConfirmBooking/`);
    } 
    // else {
    //   setNotify({
    //     isOpen: true,
    //     message: `please fill the all the values`,
    //     type: "error",
    //   });
    // }
    setFormError(allError)
  };

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
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const confirm_booking_id = urlParams.get("confirm_booking_id");
      const payment_link_id = urlParams.get("razorpay_payment_link_id");
      const payment_link_reference_id = urlParams.get(
        "razorpay_payment_link_reference_id"
      );
      const payment_link_status = urlParams.get("razorpay_payment_link_status");
      const razorpay_payment_id = urlParams.get("razorpay_payment_id");
      const razorpay_signature = urlParams.get("razorpay_signature");
      const postbooking_id = urlParams.get("postbooking_id");

      console.log("postbooking_id", postbooking_id);

      setData({
        ...data,
        confirm_booking_id: confirm_booking_id,
        payment_link_id: payment_link_id,
        payment_link_reference_id: payment_link_reference_id,
        payment_link_status: payment_link_status,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        postbooking_id: postbooking_id,
      });

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
        style={{paddingBottom: "20px"}}
        className="min-h-screen bg-stone-800"
      >
        {/* border */}
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="pt-[8rem] px-[22px] sm:pt-[8rem]">
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
              <div className="p-3 bg-[#fec601] rounded-3xl sm:px-0">
                <h3 className="text-2xl font-semibold ml-1 leading-6 text-gray-900">
                  Driver Detail
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
            >
              <form>
                <div className="shadow overflow-hidden rounded-sm">
                  <div className="md:w-[600px] px-4 py-5 bg-[#1261A0] sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      {/* <div className="flex gap-6"> */}
                      {/* From */}
                      <div className="col-span-6 sm:col-span-3">
                          <InputLabel sx={{ color: "#fff" }}>Driver Name</InputLabel>
                          <TextField
                            sx={{ borderRadius: "6px", color: "#fff" }}
                            type="text"
                            name="driver_name"
                            id="driver_name"
                            value={data?.driver_name}
                            onChange={(e) => updateData(e)}
                            fullWidth
                            error={formError && formError.driver_name ? true : false}
                            helperText={formError && formError.driver_name}
                          />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                          <InputLabel sx={{ color: "#fff" }}>Driver Email</InputLabel>
                          <TextField
                            sx={{ borderRadius: "6px", color: "#fff" }}
                            type="email"
                            name="driver_email"
                            id="driver_email"
                            value={data?.driver_email}
                            onChange={(e) => updateData(e)}
                            fullWidth
                            error={formError && formError.driver_email ? true : false}
                            helperText={formError && formError.driver_email}
                          />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                          <InputLabel sx={{ color: "#fff" }}>Driver Mobile Number</InputLabel>
                          <TextField
                            sx={{ borderRadius: "6px", color: "#fff" }}
                            type="text"
                            name="driver_mobile_number"
                            id="driver_mobile_number"
                            value={data?.driver_mobile_number}
                            onChange={(e) => updateData(e)}
                            fullWidth
                            error={formError && formError.driver_mobile_number ? true : false}
                            helperText={formError && formError.driver_mobile_number}
                          />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                          <InputLabel sx={{ color: "#fff" }}>Driver Licence Number</InputLabel>
                          <TextField
                            sx={{ borderRadius: "6px", color: "#fff" }}
                            type="text"
                            name="driver_licence_number"
                            id="driver_licence_number"
                            value={data?.driver_licence_number}
                            onChange={(e) => updateData(e)}
                            fullWidth
                            error={formError && formError.driver_licence_number ? true : false}
                            helperText={formError && formError.driver_licence_number}
                          />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                          <InputLabel sx={{ color: "#fff" }}>Driver Vehicle Number</InputLabel>
                          <TextField
                            sx={{ borderRadius: "6px", color: "#fff" }}
                            type="text"
                            name="driver_vehicle_number"
                            id="driver_vehicle_number"
                            value={data?.driver_vehicle_number}
                            onChange={(e) => updateData(e)}
                            fullWidth
                            error={formError && formError.driver_vehicle_number ? true : false}
                            helperText={formError && formError.driver_vehicle_number}
                          />
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-[#1261A0] text-center sm:px-6">
                    <button
                      // type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#fec601] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={postBookingSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>

        {/* <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div> */}
      </motion.section>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default ProtectedRoute(DriverForm);
