import React, { useEffect, useState } from "react";
import BookingCards from "../components/BookingCards";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  fadeUp,
  fadeRight,
} from "../components/animation/FadeAnimOnLoad";
import NavBar from "components/NavBar";
import {ProtectedRoute} from "../components/ProtectedRoute";
import Notification from "components/Notification";
import myApi from "../axios";
import moment from "moment";

import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Collapse from "@mui/material/Collapse";

import { styled } from "@mui/material/styles";

import DirectionsCarIcon from "mdi-material-ui/Car";
import ClockIcon from "mdi-material-ui/Clock";
import CurrencyRupeeIcon from "mdi-material-ui/CurrencyRupee";
import { Box,Grid,Card, CardHeader, CardContent, Typography, CardActions, Chip} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

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


function CancelBooking() {
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = useState([])
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getData = async()=> {
    const data =  await myApi.get("/api/v1/booking/confirmbooking/?is_booking_cansel=True")
    console.log(data?.data, "data");
    setData(data?.data);
  }
  React.useEffect(async() => {
    getData()
  }, []);

  let delay = 0.5;
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
          className="w-62 bg-[#fec601] p-2 rounded-2xl mt-40"
        >
          <h2 className="text-3xl text-center text-white font-medium underline">
            Cancel Booking
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
              <Grid item xs={6} sx={{ mb: 2 }} key={index}>
                <Card sx={{ minWidth: { md: 400 }, mt: 3 }}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={12}>
                      <CardHeader
                        sx={{ backgroundColor: "#FEC601" }}
                        avatar={
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                          >
                            R
                          </Avatar>
                        }
                        title={"Booking No - " + item?.postbooking[0]?.id}
                        subheader={
                          "Posted At:" +
                          moment(item.created_at).format("DD MMM YYYY")
                        }
                      />
                      <CardContent sx={{ backgroundColor: "#FEC601" }}>
                        <Grid container sx={{display: "flex", flexDirection: "row", justifyContent:"center", mb:1}}>
                          <Grid item md={5} display={"flex"} justifyContent="center">
                            <Chip icon={<PlaceIcon fontSize="small" sx={{ color: "#fff !important" }}/>} label={item?.postbooking[0]?.pick_up} sx={{backgroundColor: "primary.main", color: "#fff"}}/>
                          </Grid>
                          <Grid item md={2} display={"flex"} justifyContent="center" sx={{mt: "4px"}}>
                            <EastRoundedIcon />
                          </Grid>
                          <Grid item md={5} display={"flex"} justifyContent="center" >
                            <Chip icon={<PlaceIcon fontSize="small" sx={{ color: "#fff !important" }}/>} label={item?.postbooking[0]?.drop} sx={{backgroundColor: "primary.main", color: "#fff"}}/>
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
                                  {item?.postbooking[0]?.prefer_car}
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
                                  {item?.postbooking[0]?.date_of_jorney}
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
                                {item?.postbooking[0]?.cost_of_jorney} Rs.
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
                                {item?.postbooking[0]?.pickup_time}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Grid>
                  </Grid>
                  <CardActions
                    disableSpacing
                    sx={{ backgroundColor: "#FEC601" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={handleExpandClick}
                    >
                      <ExpandMore
                        expand={expanded}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                      <Typography variant="body2">View More Details</Typography>
                    </Box>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent sx={{ backgroundColor: "#FEC601" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ mb: 1.5, fontWeight: 600 }}>
                          Car Number:
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          {item?.postbooking[0]?.prefer_car}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ mb: 1.5, fontWeight: 600 }}>
                          Passenger Name:
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          {item?.postbooking[0]?.customer_name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ mb: 1.5, fontWeight: 600 }}>
                          Passenger Mobile:
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          {item?.postbooking[0]?.customer_mobile_number}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Collapse>
                  <CardActions sx={{ backgroundColor: "#FEC601" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <CancelSharpIcon sx={{ color: "red", mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: "700" }}>
                        Booking Confirmed
                      </Typography>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </motion.div>
      </motion.div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default ProtectedRoute(CancelBooking);
