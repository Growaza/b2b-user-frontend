import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  fadeDown,
} from "../components/animation/FadeAnimOnLoad";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import PostBooking from "../pages/PostBooking";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import FAQ from "../pages/FAQ";

function HomePage() {
  const router = useRouter();
  const [userData, setUserData] = React.useState();

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("user"));
    setUserData(sessionData);
  },[]);

  const handleBookNow = () => {
    if (userData) {
      router.push("/PostBooking")
    } else {
      router.push("/login")
    }
  }
  
  let delay = 1;
  const deltaDelay = 0.3;
  return (
      <motion.section
        animate="show"
        initial="hidden"
        className="container-fluid slider_section min-h-screen"
        >
        <Box sx={{mt: 12}}>
          {/* <div className="row flex items-center ml-48"> */}
          <Grid container sx={{display: "flex", justifyContent: "center"}}>
            <Grid item md={6} sx={{display: "flex", justifyContent: "end"}}>
              <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <motion.h4 variants={fadeUp(deltaDelay)}  className="text-[#f7c621] md:text-white ">Welcome to</motion.h4>
                <motion.h1
                  variants={fadeDown(delay)}
                  className="text-[#f7c621] md:text-white "
                  style={{fontSize: "3rem", fontWeight: "bold"}}>
                  B2B CABS
                </motion.h1>
                <motion.div
                  variants={fadeLeft(delay)}
                  // className="relative top-6 left-5"
                >
                  <iframe
                    src="/Car-1.mp4"
                    frameborder="0"
                    allow="autoplay"
                    allowfullscreen
                    className="w-[300px] h-[300px] md:w-[600px] md:h-[400px] "
                  />
                </motion.div>
              </Box>
            </Grid>
            <Grid item md={6} sx={{justifyContent: "center", display: "flex", mt: {xs: 2, sm: 2, md: 0}}}>
              <motion.div
                variants={fadeRight(1.5)}
                // className="hidden relative left-48 bottom-32 sm:block"
                >
                <div 
                className="w-[300px] flex flex-col items-center space-y-6 p-3 bg-black rounded-xl"
                >
                  <h4 className="text-white text-3xl font-semibold">
                    Get a Cab Now
                  </h4>
                  <a href="#takeBooking">
                    <button 
                      className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#fec601] hover:bg-[#FFCC33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      // className="border-[1px] text-white text-center rounded-lg p-2 bg-[#f7c621] " 
                      onClick={()=>handleBookNow()}>
                      Book Now
                    </button>
                  </a>
                </div>
              </motion.div>
            </Grid>
          </Grid>            
            {/* </div> */}
            {/* Form */}
            
          <Box sx={{display: "flex", justifyContent:"center", width: "100%"}}>
            {
              userData && (
                <PostBooking isNav={false}/>
              )
            }
          </Box>
          <Box sx={{display: "flex", justifyContent:"center", width: "100%"}}>
            <About isNav={false}/>
          </Box>
          <Box sx={{display: "flex", justifyContent:"center", width: "100%"}}>
            <ContactUs isNav={false}/>
          </Box>
          <Box sx={{display: "flex", justifyContent:"center", width: "100%"}}>
            <FAQ isNav={false}/>
          </Box>
        </Box>
      </motion.section>
  );
}

export default HomePage;
