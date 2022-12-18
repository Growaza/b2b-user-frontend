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
import { ProtectedRoute } from "../components/ProtectedRoute";
import Notification from "components/Notification";
import myApi from "../axios";
import { Box, CircularProgress, Grid, InputLabel, TextField } from "@mui/material";
import Validations from "config/validation";

function PostTestimonials() {
  const [data, setData] = useState({
    name: "",
    testimonials: "",
    // date_of_jorney: "",
    // pickup_time:"",
    // prefer_car: "",
    // cost_of_jorney: "",
    // commission_of_vendor: "",
    // customer_name:"",
    // customer_mobile_number:"",
    // is_driver_request_form: true
  });

  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  function checkProperties(obj) {
    for (var key in obj) {
      if (obj[key] !== null && obj[key] != "") return false;
    }
    return true;
  }

  const postBookingSubmit = async (e) => {
    e.preventDefault();
    console.log(checkProperties(data));
    let allError = Validations.validatePostTestimonialsForm(data);
    console.log("allError", allError);
    if (
      Object.entries(allError).length === 0 &&
      allError.constructor === Object
      ) {
      setLoading(true);
      try {
        const updateData = await myApi.post(
          `/api/v1/testimonials/testimonials/`,
          data
        );
        setNotify({
          isOpen: true,
          message: `Testimonial posted successfully`,
          type: "success",
        });
        setLoading(false);
        // return navigate(`/booking/`);
        setData({
          name: "",
          testimonials: "",
          // date_of_jorney: "",
          // pickup_time:"",
          // prefer_car: "",
          // cost_of_jorney: "",
          // commission_of_vendor: "",
          // customer_name:"",
          // customer_mobile_number:"",
        });
      } catch (e) {
        setNotify({
          isOpen: true,
          message: `something went wrong, please try again`,
          type: "success",
        });
        setLoading(false);
      }
    }
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
              <div className="p-3 bg-[#fec601] rounded-3xl sm:px-0">
                <h3 className="text-2xl font-semibold ml-1 leading-6 text-gray-900">
                  Testimonials Request
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
                      <div className="col-span-6 sm:col-span-3">
                          <InputLabel sx={{ color: "#fff" }}>Name</InputLabel>
                          <TextField
                            sx={{ borderRadius: "6px", color: "#fff" }}
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="given-name"
                            value={data?.name}
                            onChange={(e) => updateData(e)}
                            fullWidth
                            error={formError && formError.name ? true : false}
                            helperText={formError && formError.name}
                            // label="Pick up"
                          />
                        {/* <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="given-name"
                          value={data?.name}
                          onChange={(e) => updateData(e)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        /> */}
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                          <InputLabel sx={{ color: "#fff" }}>Testimonials</InputLabel>
                          <TextField
                            sx={{ borderRadius: "6px", color: "#fff" }}
                            type="text"
                            name="testimonials"
                            id="testimonials"
                            autoComplete="given-name"
                            value={data?.testimonials}
                            onChange={(e) => updateData(e)}
                            fullWidth
                            error={formError && formError.testimonials ? true : false}
                            helperText={formError && formError.testimonials}
                            // label="Pick up"
                            />
                        {/* <label
                          htmlFor="testimonials"
                          className="block text-sm font-medium text-gray-700"
                        >
                          testimonials
                        </label>
                        <input
                          type="text"
                          name="testimonials"
                          id="testimonials"
                          autoComplete="given-name"
                          value={data?.testimonials}
                          onChange={(e) => updateData(e)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        /> */}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-[#1261A0] text-center sm:px-6">
                    {!loading ? (
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
                    )}
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </Box>
      </motion.section>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default ProtectedRoute(PostTestimonials);
