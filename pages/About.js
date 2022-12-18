/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  fadeDown,
  fadeLeft,
  fadeRight,
} from "../components/animation/FadeAnimOnLoad";
import NavBar from "components/NavBar";
import { useState } from "react";
import myApi from "../axios";

function About({isNav = true}) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });
  const [data, setData] = useState({});

  const getData = async () => {
    const data = await myApi.get("/api/v1/manage_pages/pages/?variable=aboutus");
    setData(data?.data[0]);
  };

  useEffect(() => {
    if (inView) {
      getData();
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <>
    {isNav && (<NavBar></NavBar>)}
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      id="about"
      className="h-screen blur-0 flex flex-col items-center justify-evenly  bg-stone-800 text-white"
    >
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-x-3">
        <div>
          <motion.h1
            ref={ref}
            initial="hidden"
            variants={fadeDown(0.2)}
            animate={controls}
            onChange={(inView) => console.log("Inview:", inView)}
            className="text-2xl font-bold mb-4"
          >
            About Us
          </motion.h1>
          <motion.h4
            ref={ref}
            initial="hidden"
            variants={fadeLeft(0.6)}
            animate={controls}
            onChange={(inView) => console.log("Inview:", inView)}
            className="w-44 text-base font-normal text-white md:w-96 md:text-xl "
          >
           <div dangerouslySetInnerHTML={{ __html: data?.value || "" }}></div>
            {/* B2B Cab is almost running in all over india B2B is platform where we
            can work together in a group in this platform all vendors come
            together & increase the business */}
          </motion.h4>
        </div>
        <motion.div
          ref={ref}
          initial="hidden"
          variants={fadeDown(1.4)}
          animate={controls}
          onChange={(inView) => console.log("Inview:", inView)}
          className="bg-[#fec601] h-1 w-44 md:h-64 md:w-1"
        >
          <span></span>
        </motion.div>
        <motion.img
          ref={ref}
          initial="hidden"
          variants={fadeRight(1.8)}
          animate={controls}
          onChange={(inView) => console.log("Inview:", inView)}
          src="/contact-img.png"
          alt=""
          className="w-60 md:w-96 md:h-60 rounded-xl xs:px-12 sm:px-12 md:h-80 xs:w-40 md:w-auto"
        />
      </div>
    </motion.div>
    </>
  );
}

export default About;