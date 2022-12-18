import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
} from "../components/animation/FadeAnimOnLoad";
import NavBar from "components/NavBar";
import myApi from "../axios";

function FAQ({ isNav = true }) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const [data, setData] = useState([]);
  const getData = async () => {
    const data = await myApi.get("/api/v1/manage_pages/get_faqs/");
    console.log(data?.data, "data");
    setData(data?.data);
  };

  useEffect(() => {
    getData();
  }, []);

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
        className="min-h-screen flex flex-col items-center justify-center space-y-2 bg-stone-800"
        id="faq"
      >
        <motion.div
          ref={ref}
          initial="hidden"
          variants={fadeUp(0.8)}
          animate={controls}
          onChange={(inView) => console.log("Inview:", inView)}
          className="w-36 text-center p-2 bg-[#fec601] rounded-full"
        >
          <h2
            className="text-3v
        xl font-semibold underline text-white"
          >
            FAQ
          </h2>
        </motion.div>
        <motion.div
              ref={ref}
              initial="hidden"
              variants={fadeLeft(1.5)}
              animate={controls}
              onChange={(inView) => console.log("Inview:", inView)}
              className="w-56 group bg-[#1261A0] p-2 flex flex-col border-2 border-gray-800 rounded-xl text-white md:w-[800px]"
            >
            {data &&
              data.length > 0 &&
              data.map((val) => (
                <div>
                  <div className="flex items-center justify-between">
                    <p>{val.question}</p>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {/* symbol */}
                  <div className="hidden p-4 group-hover:block">{val.answer}</div>
                </div>
            ))}
        </motion.div>
      </motion.div>
    </>
  );
}

export default FAQ;
