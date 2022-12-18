import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  fadeUp,
  fadeRight,
} from "../components/animation/FadeAnimOnLoad";
import NavBar from "components/NavBar";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Notification from "components/Notification";
import myApi from "../axios";

import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import moment from "moment";

import { styled } from "@mui/material/styles";

import DirectionsCarIcon from "mdi-material-ui/Car";
import ClockIcon from "mdi-material-ui/Clock";
import CurrencyRupeeIcon from "mdi-material-ui/CurrencyRupee";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import PlaceIcon from '@mui/icons-material/Place';

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    borderRight: `1px solid ${theme.palette.divider}`,
    pr: 12,
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function TakeBooking() {
  const [data, setData] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const getData = async () => {
    const data = await myApi.get("/api/v1/booking/postbooking/");
    console.log(data?.data, "data");
    setData(data?.data);
  };

  let delay = 0.5;
  const controls = useAnimation();
  const { ref, inView } = useInView({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const handleAcceptBooking = async (postbooking_id) => {
    const reponse = await myApi.post("api/v1/payment/payment-link-create", {
      postbooking_id: postbooking_id,
    });
    console.log(reponse.data, "NS");
    if (reponse?.data?.payment_link) {
      window.open(reponse?.data?.payment_link, '_blank', 'noopener,noreferrer');
    } else {
      setNotify({
        isOpen: true,
        message: `Something went wring please try again`,
        type: "error",
      });
    }
  }

  useEffect(() => {
    if (inView) {
      getData();
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <>
      <NavBar></NavBar>
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        id="takeBooking"
        style={{paddingBottom: "20px"}}
        className="min-h-screen flex flex-col items-center justify-center bg-stone-800"
      >
        <motion.div
          ref={ref}
          initial="hidden"
          variants={fadeUp(delay)}
          animate={controls}
          onChange={(inView) => console.log("Inview:", inView)}
          className="w-52 bg-[#fec601] p-2 rounded-2xl mt-40"
        >
          <h2 className="text-3xl text-center text-white font-medium underline">
            All Bookings
          </h2>
        </motion.div>

        <br />
        <br />
        <motion.div
          ref={ref}
          initial="hidden"
          variants={fadeRight(0.8)}
          animate={controls}
          onChange={(inView) => console.log("Inview:", inView)}
          className="grid justify-items-center md:grid-cols-3 gap-6"
          // className="flex overflow-x-clip w-3/12"
        >
          {data?.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ minWidth: {md: 400}, mt: 3 }}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={12} md={12}>
                      <CardHeader
                       sx={{backgroundColor: "#FEC601"}}
                       avatar={
                         <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                           R
                         </Avatar>
                       }
                        title={"Booking No - " + item?.id}
                        subheader={ "Posted At:" + moment(item.created_at).format("DD MMM YYYY")}
                      />
                      <CardContent sx={{backgroundColor: "#FEC601"}}>
                        <Grid container sx={{display: "flex", flexDirection: "row", justifyContent:"center", mb:1}}>
                          <Grid item md={5} display={"flex"} justifyContent="center">
                            <Chip icon={<PlaceIcon fontSize="small" sx={{ color: "#fff !important" }}/>} label={item?.pick_up} sx={{backgroundColor: "primary.main", color: "#fff"}}/>
                          </Grid>
                          <Grid item md={2} display={"flex"} justifyContent="center" sx={{mt: "4px"}}>
                            <EastRoundedIcon />
                          </Grid>
                          <Grid item md={5} display={"flex"} justifyContent="center" >
                            <Chip icon={<PlaceIcon fontSize="small" sx={{ color: "#fff !important" }}/>} label={item?.drop} sx={{backgroundColor: "primary.main", color: "#fff"}}/>
                          </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                          <Grid item xs={12} sm={6}>
                            <StyledBox>
                              <Box
                                sx={{
                                  py: 1.25,
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <DirectionsCarIcon
                                  sx={{ color: "primary.main", mr: 2.5 }}
                                  fontSize="small"
                                />
                                <Typography variant="body2">
                                  {item?.prefer_car}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  py: 1,
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <ClockIcon
                                  sx={{ color: "primary.main", mr: 2.5 }}
                                  fontSize="small"
                                />
                                <Typography variant="body2">
                                  {item?.date_of_jorney}
                                </Typography>
                              </Box>
                            </StyledBox>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                py: 1.25,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <CurrencyRupeeIcon
                                sx={{ color: "primary.main", mr: 2.5 }}
                                fontSize="small"
                              />
                              <Typography variant="body2">
                                {item?.cost_of_jorney} Rs.
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                py: 1.25,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <ClockIcon
                                sx={{ color: "primary.main", mr: 2.5 }}
                                fontSize="small"
                              />
                              <Typography variant="body2">
                                {item?.pickup_time}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                          <button
                            className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#F44336] hover:bg-[#1976d2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            // className="border rounded-lg p-1 w-32 bg-[#F44336] text-black shadow-md hover:shadow-xl active:scale-90 transition duration-150 nav__links"
                            onClick={() => handleAcceptBooking(item?.id)}
                          >
                            Accept Booking
                          </button>
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
          {/* <BookingCards
          car="Shift Dzire"
          start="Pune"
          end="Mumbai"
          date="10 April 2022"
          time="02:30 AM"
          contact_person_location="Mumbai"
          contact_person="Sai Sarthak Travels"
        />
        <BookingCards
          car="Shift Dzire"
          start="Pune"
          end="Mumbai"
          date="10 April 2022"
          time="02:30 AM"
          contact_person_location="Mumbai"
          contact_person="Sai Sarthak Travels"
        />
        <BookingCards
          car="Shift Dzire"
          start="Pune"
          end="Mumbai"
          date="10 April 2022"
          time="02:30 AM"
          contact_person_location="Mumbai"
          contact_person="Sai Sarthak Travels"
        />
        <BookingCards
          car="Shift Dzire"
          start="Pune"
          end="Mumbai"
          date="10 April 2022"
          time="02:30 AM"
          contact_person_location="Mumbai"
          contact_person="Sai Sarthak Travels"
        />
        <BookingCards
          car="Shift Dzire"
          start="Pune"
          end="Mumbai"
          date="10 April 2022"
          time="02:30 AM"
          contact_person_location="Mumbai"
          contact_person="Sai Sarthak Travels"
        /> */}
        </motion.div>
      </motion.div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default ProtectedRoute(TakeBooking);
