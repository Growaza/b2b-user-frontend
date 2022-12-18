import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
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

function PrivacyPolicy() {
    const controls = useAnimation();
    const { ref, inView } = useInView({
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    });
    const [data, setData] = useState({});
  
    const getData = async () => {
      const data = await myApi.get("/api/v1/manage_pages/pages?variable=privacy_and_policy");
      console.log(data, "data");
      setData(data?.data[0]);
    };
  
    React.useEffect(() => {
      if (inView) {
        getData();
        controls.start("show");
      }
    }, [controls, inView]);
    return (
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          id="about"
          className="blur-0 flex flex-col bg-stone-800 text-white"
          style={{ minHeight: "100vh", paddingBottom: "20px"}}
        >
          <Box sx={{pl: {md:"12rem", sm:"6rem", xs:"2rem"}, pr: {md:"12rem", sm:"6rem", xs:"2rem"}}}>
            <div className="flex flex-col md:flex-row items-center justify-between md:space-x-3">
              <div>
                <Box sx={{ py: 6 }}>
                <div className="header__logo cursor-pointer">
                  <image
                    className="image"
                    src="/main.png"
                    alt="logo"
                    width={60}
                    height={60}
                  />
                </div>
                </Box>
                <motion.h1
                  ref={ref}
                  initial="hidden"
                  variants={fadeDown(0.2)}
                  animate={controls}
                  onChange={(inView) => console.log("Inview:", inView)}
                  className="text-2xl font-bold mb-4"
                >
                  Privacy Policy
                </motion.h1>
                <motion.h4
                  ref={ref}
                  initial="hidden"
                  variants={fadeLeft(0.6)}
                  animate={controls}
                  onChange={(inView) => console.log("Inview:", inView)}
                  className="text-base font-normal text-white md:text-xl "
                >
                  <div dangerouslySetInnerHTML={{ __html: data?.value || "" }}></div>
                </motion.h4>
              </div>
            </div>
          </Box>
        </motion.div>
    );
}
export default PrivacyPolicy;
