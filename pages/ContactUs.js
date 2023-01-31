import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeLeft, fadeRight } from "../components/animation/FadeAnimOnLoad";
import NavBar from "components/NavBar";
import Notification from "components/Notification";
import myApi from "../axios";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Validations from "config/validation";

function ContactUs({ isNav = true }) {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone_number: "",
    msg: "",
  });
  
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);

  const [navClass, setNavClass] = useState(
    "h-auto w-80 p-1 bg-[#fec601] rounded-full mt-20"
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const updateData = (e) => {
    console.log(data, "data");
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (isNav) {
      setNavClass("h-auto w-80 p-1 bg-[#fec601] rounded-full mt-40");
    } else {
      setNavClass("h-auto w-80 p-1 bg-[#fec601] rounded-full mt-20");
    }
  }, [isNav]);

  const contactUsPost = async (e) => {
    e.preventDefault();
    let allError = Validations.validateContactUsForm(data);
    console.log("allError", allError);
    if (
      Object.entries(allError).length === 0 &&
      allError.constructor === Object
      ) {
        try {
          setLoading(true);
          const result = await myApi.post(
            `/api/v1/contactus/contactus-create/`,
            data
          );
          if (Object.keys(result).length > 0) {
            setNotify({
              isOpen: true,
              message: `please fill the all the values`,
              type: "error",
            });
          }
          setNotify({
            isOpen: true,
            message: `submited successfully`,
            type: "success",
          });
          setData({
            name: "",
            email: "",
            phone_number: "",
            msg: "",
          });
          setLoading(false);
        } catch (e) {
          setNotify({
            isOpen: true,
            message: e.response.data?.error || `please fill the all the values`,
            type: "error",
          });
          setLoading(false);
        }
    }
    setFormError(allError);
  };

  const controls = useAnimation();
  const { ref, inView } = useInView({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <>
      {isNav && <NavBar></NavBar>}
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        // className="flex flex-col items-center justify-center  bg-stone-800"
        className="min-h-screen blur-0 flex flex-col items-center justify-evenly  bg-stone-800 text-white"
        id="contact"
      >
        <motion.div
          ref={ref}
          initial="hidden"
          variants={fadeLeft(0.4)}
          animate={controls}
          onChange={(inView) => console.log("Inview:", inView)}
          // className="h-auto w-80 p-1 bg-[#fec601] rounded-full mt-20"
          className={navClass}
        >
          <h1 className="font-semibold text-white text-center text-3xl underline pt-2 pb-2">
            Contact Us
          </h1>
        </motion.div>
        {/* <div className="mt-5 space-y-4 md:flex md:space-x-10"> */}
        <Grid container sx={{ my: 4 }}>
          {/* Form */}
          <Grid item md={6} sm={8} xs={12} sx={{display: "flex", justifyItems:"center"}}>
            <motion.div
              ref={ref}
              initial="hidden"
              variants={fadeLeft(0.8)}
              animate={controls}
              onChange={(inView) => console.log("Inview:", inView)}
              className="grid justify-items-center md:justify-items-end"
              // className="bg-[#1261A0] w-64 md:w-auto text-white p-5 border rounded-md"
            >
              <Card sx={{ width: {md: "60%", xs: "80%"}, background: "#1261A0", mr: {md: 12 } }}>
                <CardContent sx={{ backgroundColor: "#1261A0" }}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, color: "#fff" }}
                        >
                          Contact Us
                        </Typography>
                        <Typography
                          variant="subtitle"
                          component="p"
                          sx={{ color: "#fff" }}
                        >
                          Get in touch using the form below
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
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
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel sx={{ color: "#fff" }}>Email</InputLabel>
                        <TextField
                          type="text"
                          name="email"
                          id="email"
                          autoComplete="given-email"
                          value={data?.email}
                          onChange={(e) => updateData(e)}
                          fullWidth
                          error={formError && formError.email ? true : false}
                          helperText={formError && formError.email}
                          // label=""
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel sx={{ color: "#fff" }}>
                          Phone Number
                        </InputLabel>
                        <TextField
                          type="text"
                          name="phone_number"
                          id="phone_number"
                          value={data?.phone_number}
                          onChange={(e) => updateData(e)}
                          fullWidth
                          error={
                            formError && formError.phone_number ? true : false
                          }
                          helperText={formError && formError.phone_number}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel sx={{ color: "#fff" }}>Message</InputLabel>
                        <TextField
                          type="text"
                          name="msg"
                          id="message"
                          value={data?.msg}
                          onChange={(e) => updateData(e)}
                          fullWidth
                          error={formError && formError.msg ? true : false}
                          helperText={formError && formError.msg}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {!loading ? (
                          <button
                            className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#fec601] hover:bg-[#FFCC33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={contactUsPost}
                          >
                            Send Message
                          </button>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              mb: 2,
                            }}
                          >
                            <CircularProgress size={25} />
                          </Box>
                        )}
                        {/* <button
                          className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#fec601] hover:bg-[#FFCC33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          // className="border rounded-lg p-1 w-32 bg-[#fec601] text-black shadow-md hover:shadow-xl active:scale-90 transition duration-150 nav__links"
                          onClick={contactUsPost}
                        >
                          Send Message
                        </button> */}
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          {/* Info */}
          <Grid item md={6} sm={8} xs={12} sx={{display: "flex", justifyContent: "center", mt: 2}}>
            <div className="flex flex-col justify-center">
              {/* <div className="text-white flex flex-col space-y-3"> */}
              <Box sx={{display: "flex", flexDirection: "column"}} spacing={4}>
                <motion.h2
                  ref={ref}
                  initial="hidden"
                  variants={fadeLeft(1.2)}
                  animate={controls}
                  onChange={(inView) => console.log("Inview:", inView)}
                  className="w-fit p-1 px-2 text-lg font-medium bg-[#fec601] rounded-xl">
                  Contact Info
                </motion.h2>
                <motion.div
                  ref={ref}
                  initial="hidden"
                  variants={fadeRight(1.4)}
                  animate={controls}
                  onChange={(inView) => console.log("Inview:", inView)}
                  className="flex space-x-2 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 border rounded-full mx-2"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Mumbai
                </motion.div>
                <motion.div
                  ref={ref}
                  initial="hidden"
                  variants={fadeRight(1.5)}
                  animate={controls}
                  onChange={(inView) => console.log("Inview:", inView)}
                  className="flex space-x-2 mt-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 border rounded-full mx-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  info@gmail.com
                </motion.div>
                <motion.div
                  ref={ref}
                  initial="hidden"
                  variants={fadeRight(1.6)}
                  animate={controls}
                  onChange={(inView) => console.log("Inview:", inView)}
                  className="flex space-x-2 mt-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 border rounded-full mx-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  7873297733
                </motion.div>
                <motion.div
                  ref={ref}
                  initial="hidden"
                  variants={fadeRight(2.0)}
                  animate={controls}
                  onChange={(inView) => console.log("Inview:", inView)}
                  className="w-60 md:w-96 md:h-60 md:object-contain">
                  <img src="/contact-img.png" alt="car photo" />
                </motion.div>
              </Box>
            </div>
          </Grid>
        </Grid>
      </motion.div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default ContactUs;
