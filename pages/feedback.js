import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeLeft } from "../components/animation/FadeAnimOnLoad";
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

function Feedback({ isNav = true }) {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone_number: "",
    feedback: "",
  });

  const [formError, setFormError] = useState({});

  const [navClass, setNavClass] = useState(
    "h-auto w-80 p-1 bg-[#fec601] rounded-full mt-20"
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [loading, setLoading] = useState();

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

  function checkProperties(obj) {
    for (var key in obj) {
      if (obj[key] !== null && obj[key] != "") return false;
    }
    return true;
  }

  const contactUsPost = async (e) => {
    e.preventDefault();
    let allError = Validations.validateFeedbackForm(data);
    console.log("allError", allError);
    if (
      Object.entries(allError).length === 0 &&
      allError.constructor === Object
      ) {
        try {
            setLoading(true);
            const result = await myApi.post(
              `/api/v1/common/create-feedback/`,
              data
            );
            console.log("result", result);
            if (result && result.data && result.data.valid) {
              setNotify({
                isOpen: true,
                message: result?.data.message ? result?.data.message : `submited successfully`,
                type: "success",
              });
            } else {
              setNotify({
                isOpen: true,
                message: result.data.message ? result.data.message : `this email is already feedbacked`,
                type: "error",
              });
            }
            setLoading(false);
            setData({
              name: "",
              email: "",
              phone_number: "",
              feedback: "",
            });
        } catch (e) {
          setNotify({
            isOpen: true,
            message: `please fill the all the values`,
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
            Feedback
          </h1>
        </motion.div>
        {/* <div className="mt-5 space-y-4 md:flex md:space-x-10"> */}
        <Grid
          container
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {/* Form */}
          <Grid item md={6}>
            <motion.div
              ref={ref}
              initial="hidden"
              variants={fadeLeft(0.8)}
              animate={controls}
              onChange={(inView) => console.log("Inview:", inView)}
              className="grid justify-items-end"
              // className="bg-[#1261A0] w-64 md:w-auto text-white p-5 border rounded-md"
            >
              <Card sx={{ background: "#1261A0", my: 4 , mx: {md: 0, sm: 2, xs: 4}}}>
                <CardContent sx={{ backgroundColor: "#1261A0" }}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, color: "#fff" }}
                        >
                          Feedback
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
                          name="feedback"
                          id="message"
                          value={data?.feedback}
                          onChange={(e) => updateData(e)}
                          fullWidth
                          error={formError && formError.feedback ? true : false}
                          helperText={formError && formError.feedback}
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
                            // className="border rounded-lg p-1 w-32 bg-[#fec601] text-black shadow-md hover:shadow-xl active:scale-90 transition duration-150 nav__links"
                            onClick={contactUsPost}
                          >
                            Send Feedback
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
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default Feedback;
