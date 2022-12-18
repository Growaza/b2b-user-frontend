import React, { useEffect, useState } from "react";
import {
  fadeLeft,
} from "../components/animation/FadeAnimOnLoad";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import NavBar from "components/NavBar";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Notification from "components/Notification";
import myApi from "../axios";
import { Box, Card, CardContent, CircularProgress, Grid, InputLabel, TextField, Typography } from "@mui/material";
import Validations from "config/validation";

function PostBooking({ isNav = true }) {
  const [data, setData] = useState({
    pick_up: "",
    drop: "",
    date_of_jorney: "",
    pickup_time: "",
    prefer_car: "",
    cost_of_jorney: "",
    commission_of_vendor: "",
    customer_name: "",
    customer_mobile_number: "",
    is_driver_request_form: false
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
    let allError = Validations.validatePostBookingForm(data);
    console.log("allError", allError);
    if (
        Object.entries(allError).length === 0 &&
        allError.constructor === Object
    ) {
      try {
        const updateData = await myApi.post(`/api/v1/booking/postbooking/`, data);
        setNotify({
          isOpen: true,
          message: `booking posted successfully`,
          type: "success",
        });
        setLoading(false);
        // return navigate(`/booking/`);
        setData({
          pick_up: "",
          drop: "",
          date_of_jorney: "",
          pickup_time: "",
          prefer_car: "",
          cost_of_jorney: "",
          commission_of_vendor: "",
          customer_name: "",
          customer_mobile_number: "",
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
    // else {
    //   setNotify({
    //     isOpen: true,
    //     message: `please fill the all the values`,
    //     type: "error",
    //   });
    // }
    setFormError(allError);

    // if (checkProperties(data) != true) {
    //   setLoading(true);
     
    // } else {
      
    // }
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

  const renderContent = () => {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#fff" }}>
              PostBooking
            </Typography>
            <Typography variant="subtitle" component="p" sx={{ color: "#fff" }}>
              Enter you details for post booking
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ color: "#fff" }}>From</InputLabel>
            <TextField
              sx={{ borderRadius: "6px", color: "#fff" }}
              type="text"
              name="pick_up"
              id="pick_up"
              autoComplete="given-pickup"
              value={data?.pick_up}
              onChange={(e) => updateData(e)}
              fullWidth
              error={formError && formError.pick_up ? true : false}
              helperText={formError && formError.pick_up}
              // label="Pick up"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ color: "#fff" }}>To</InputLabel>
            <TextField
              type="text"
              name="drop"
              id="drop"
              autoComplete="given-drop"
              value={data?.drop}
              onChange={(e) => updateData(e)}
              fullWidth
              error={formError && formError.drop ? true : false}
              helperText={formError && formError.drop}
              // label=""
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ color: "#fff" }}>Date Of Jorney</InputLabel>
            <TextField
              type="date"
              name="date_of_jorney"
              id="date"
              value={data?.date_of_jorney}
              onChange={(e) => updateData(e)}
              fullWidth
              error={formError && formError.date_of_jorney ? true : false}
              helperText={formError && formError.date_of_jorney}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ color: "#fff" }}>Pickup Time</InputLabel>
            <TextField
              type="time"
              name="pickup_time"
              id="pickup_time"
              value={data?.pickup_time}
              onChange={(e) => updateData(e)}
              fullWidth
              error={formError && formError.pickup_time ? true : false}
              helperText={formError && formError.pickup_time}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ color: "#fff" }}>Prefer Car</InputLabel>
            <TextField
              type="text"
              name="prefer_car"
              id="car-varient"
              autoComplete="car-varient"
              value={data?.prefer_car}
              onChange={(e) => updateData(e)}
              fullWidth
              error={formError && formError.prefer_car ? true : false}
              helperText={formError && formError.prefer_car}
              // label="Prefer Car"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ color: "#fff" }}>Cost Of Jorney</InputLabel>
            <TextField
              type="text"
              name="cost_of_jorney"
              id="trip-price"
              autoComplete="trip-price"
              value={data?.cost_of_jorney}
              onChange={(e) => updateData(e)}
              fullWidth
              error={formError && formError.cost_of_jorney ? true : false}
              helperText={formError && formError.cost_of_jorney}
              // label="Cost Of Jorney"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ color: "#fff" }}>Commission of vendor</InputLabel>
            <TextField
              type="text"
              name="commission_of_vendor"
              id="ask"
              autoComplete="ask"
              value={data?.commission_of_vendor}
              onChange={(e) => updateData(e)}
              fullWidth
              error={formError && formError.commission_of_vendor ? true : false}
              helperText={formError && formError.commission_of_vendor}
              // label="Commission of vendor"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ color: "#fff" }}>Passenger Name</InputLabel>
            <TextField
              type="text"
              name="customer_name"
              id="passenger-name"
              value={data?.customer_name}
              onChange={(e) => updateData(e)}
              autoComplete="passenger-name"
              fullWidth
              error={formError && formError.customer_name ? true : false}
              helperText={formError && formError.customer_name}
              // label="Passenger Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ color: "#fff" }}>Contact Number</InputLabel>
            <TextField
              type="text"
              name="customer_mobile_number"
              id="contact-number"
              value={data?.customer_mobile_number}
              onChange={(e) => updateData(e)}
              autoComplete="contact-number"
              fullWidth
              error={formError && formError.customer_mobile_number ? true : false}
              helperText={formError && formError.customer_mobile_number}
              // label="Contact Number"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {!loading ? (
              <button
                className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#fec601] hover:bg-[#FFCC33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={postBookingSubmit}
              >
                Submit
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
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <Box>
      { isNav && (<NavBar></NavBar>)}
      <motion.section
        ref={ref}
        animate={controls}
        initial="hidden"
        id="postBooking"
        className="min-h-screen bg-stone-800"
      >
        <Box sx={{ pt: 16, pb: 2, display: "flex", justifyContent: "center" }}>
          <motion.div
            ref={ref}
            initial="hidden"
            variants={fadeLeft(0.8)}
            animate={controls}
            onChange={(inView) => console.log("Inview:", inView)}
            className="grid justify-items-center"
          >
            <Card sx={{ width:{ md: "70%", sm: "80%", xs: "90%"}, background: "#1261A0" }}>
              <CardContent sx={{backgroundColor: "#1261A0"}}>{renderContent()}</CardContent>
            </Card>
          </motion.div>
        </Box>
      </motion.section>
      <Notification notify={notify} setNotify={setNotify} />
    </Box>
  );
}

export default ProtectedRoute(PostBooking);
