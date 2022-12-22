// ** React Imports
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeRight } from "components/animation/FadeAnimOnLoad";

// ** Next Import
import Link from "next/link";

import { State, City } from "country-state-city";

import { MenuItem } from "@material-ui/core";

// ** MUI Components
import MuiLink from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import Button from '@mui/material/Button'

import Notification from "components/Notification";
import myApi from "../axios";

// ** Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// ** Hooks
// import { useSettings } from 'src/@core/hooks/useSettings'

import BlankLayout from "components/BlankLayout";
import FooterIllustrationsV2 from "components/FooterIllustrationsV2";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 400,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 450,
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: "0.18px",
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) },
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

function checkProperties(obj) {
  return Object.keys(obj).map((key) => obj[key] == null || obj[key] == "").includes(false);
}

const SignUp = () => {
  const controls = useAnimation();
  const router = useRouter();
  // ** States
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

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

  const [data, setData] = useState({
    state: "",
    city: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    dob: "",
    password: "",
    phone_number: "",
    business_name: "",
    business_type: "",
    ifsc_code: "",
    beneficiary_name: "",
    account_type: "",
    account_number: "",
  });

  const [errorMsg, setErrorMsg] = useState();

  const [states, setStates] = useState();
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const stateChange = (event) => {
    setSelectedState(event.target.value);
    setData({ ...data, "state": event?.target?.value || "" });
  };

  const cityChange = (event) => {
    setSelectedCity(event.target.value);
    setData({ ...data, "city": event?.target?.value || "" });
  };

  useEffect(() => {
    setStates(State.getStatesOfCountry("IN"));
  }, []);
  useEffect(() => {
    const ct = City.getCitiesOfState("IN", "GJ");
    console.log(ct);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      delete data["text"];
    } catch {
      console.log("");
    }
    setLoading(true);
    try {
      console.log(checkProperties(data), data);
      if (checkProperties(data)) {
        console.log(data);
        const response = await myApi.post(
          "/api/v1/accounts/generate_otp/",
          { phone: data.phone_number }
        );
        localStorage.setItem('pre_user',Json.stringify(data))
        console.log("response", response);
        if (response?.data?.valid) {
          console.log("true");
          setNotify({
            isOpen: true,
            message: `OTP Sent Successfully`,
            type: "success",
          });
          setLoading(false);
          router.push("/login/verify_mobile");
        } else {
          console.log("false");
          setNotify({
            isOpen: true,
            message: response?.data?.message,
            type: "error",
          });
          setLoading(false);
        }
      } else {
        setNotify({
          isOpen: true,
          message: `please fill the all the values`,
          type: "error",
        });
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setNotify({
        isOpen: true,
        message: Object.entries(e?.response?.data)[0][1][0],
        type: "error",
      });
      if (e?.response?.data) {
        setErrorMsg(Object.entries(e?.response?.data)[0][1][0]);
      } else {
        setErrorMsg(errorMsg);
      }
    }
  };

  const updateData = (e) => {
    console.log(data, "data");
    if (e.target) {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    }

  };

  // ** Hook
  const theme = useTheme();
  //   const { settings } = useSettings()

  // ** Vars
  //   const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down("md"));
  //   const hidden = false

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //   const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <>
      <BlankLayout>
        <motion.div ref={ref} animate={controls} initial="hidden">
          <Box className="content-right" sx={{ position: "fixed" }}>
            {!hidden ? (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <motion.div
                    ref={ref}
                    initial="hidden"
                    variants={fadeRight(2.0)}
                    animate={controls}
                    onChange={(inView) => console.log("Inview:", inView)}
                    className="w-60 md:w-96 md:h-60"
                  >
                    <img src="contact-img.png" alt="car photo" />
                  </motion.div>
                </Box>
                <FooterIllustrationsV2 />
              </Box>
            ) : null}
            <RightWrapper
              sx={{ borderLeft: `1px solid rgba(76, 78, 100, 0.12)` }}
            >
              <Box
                sx={{
                  p: 7,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "background.paper",
                }}
              >
                <BoxWrapper>
                  <Box
                    sx={{
                      top: 30,
                      left: 40,
                      display: "flex",
                      position: "absolute",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <image
                      className="image"
                      src="/main.png"
                      alt="logo"
                      width={60}
                      height={60}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        ml: 2,
                        lineHeight: 1,
                        fontWeight: 700,
                        fontSize: "1.5rem !important",
                        color: "#e33825",
                      }}
                    >
                      B2b Cabs
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <TypographyStyled variant="h5">{`Welcome to B2B Cabs! 👋🏻`}</TypographyStyled>
                    <Typography variant="body2">
                      Please sign-in to your account and start the adventure
                    </Typography>
                  </Box>
                  <form
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <Grid container>
                      <Grid item md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>First Name</InputLabel>
                        <TextField
                          type="text"
                          name="first_name"
                          id="first_name"
                          autoComplete="given-firstname"
                          // label="First Name"
                          value={data?.first_name}
                          onChange={(e) => updateData(e)}
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>Last Name</InputLabel>
                        <TextField
                          type="text"
                          name="last_name"
                          id="last_name"
                          autoComplete="given-lastname"
                          // label="Last Name"
                          value={data?.last_name}
                          onChange={(e) => updateData(e)}
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>email</InputLabel>
                        <TextField
                          type="email"
                          name="email"
                          id="email"
                          // label="email"
                          autoComplete="given-email"
                          value={data?.email}
                          onChange={(e) => updateData(e)}
                          autoFocus
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid itm md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>
                          Password
                        </InputLabel>
                        <FormControl fullWidth>
                          <OutlinedInput
                            // label="Password"
                            name="password"
                            value={data?.password}
                            id="auth-login-v2-password"
                            onChange={(e) => updateData(e)}
                            sx={{ mb: 2 }}
                            type={values.showPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  edge="end"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  aria-labels="toggle password visibility"
                                >
                                  {values.showPassword ? (
                                    <EyeOutline />
                                  ) : (
                                    <EyeOffOutline />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>State</InputLabel>
                        <TextField
                          // label="State"
                          select
                          name="state"
                          value={selectedState}
                          onChange={stateChange}
                          autoFocus
                          fullWidth
                          variant="outlined"
                          size="small"
                          sx={{ mb: 2 }}
                        >
                          {states &&
                            states.map((s) => {
                              return (
                                <MenuItem key={s.isoCode} value={s.isoCode}>
                                  {s.name}
                                </MenuItem>
                              );
                            })}
                        </TextField>
                      </Grid>
                      <Grid item md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>City</InputLabel>
                        <TextField
                          name="city"
                          select
                          // label="City"
                          value={selectedCity}
                          onChange={cityChange}
                          autoFocus
                          fullWidth
                          variant="outlined"
                          size="small"
                          sx={{ mb: 2 }}
                        >
                          {selectedState &&
                            City.getCitiesOfState("IN", selectedState).map(
                              (c) => {
                                return (
                                  <MenuItem key={c.name} value={c.name}>
                                    {c.name}
                                  </MenuItem>
                                );
                              }
                            )}
                        </TextField>
                      </Grid>
                      <Grid item md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>Date of birth</InputLabel>
                        <TextField
                          type="date"
                          name="dob"
                          id="date"
                          value={data?.date_of_jorney}
                          onChange={(e) => updateData(e)}
                          autoComplete="date_of_jorney"
                          autoFocus
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>Phone Number</InputLabel>
                        <TextField
                          type="text"
                          name="phone_number"
                          id="phone_number"
                          autoComplete="given-name"
                          // label="Phone Number"
                          value={data?.phone_number}
                          onChange={(e) => updateData(e)}
                          autoFocus
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>Business Name</InputLabel>
                        <TextField
                          type="text"
                          name="business_name"
                          id="business_name"
                          // label="Business Name"
                          value={data?.business_name}
                          onChange={(e) => updateData(e)}
                          autoFocus
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>Business Type</InputLabel>
                        <TextField
                          type="text"
                          name="business_type"
                          id="business_type"
                          // label="Business Type"
                          value={data?.business_type}
                          onChange={(e) => updateData(e)}
                          autoFocus
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>IFSC Code</InputLabel>
                        <TextField
                          type="text"
                          name="ifsc_code"
                          id="ifsc_code"
                          // label="IFSC Code"
                          value={data?.ifsc_code}
                          onChange={(e) => updateData(e)}
                          autoFocus
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>Beneficiary Name</InputLabel>
                        <TextField
                          type="text"
                          name="beneficiary_name"
                          // label="Beneficiary Name"
                          id="car-varient"
                          value={data?.beneficiary_name}
                          onChange={(e) => updateData(e)}
                          autoFocus
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>Account Type</InputLabel>
                        <TextField
                          type="text"
                          name="account_type"
                          // label="Account Type"
                          id="account_type"
                          value={data?.account_type}
                          onChange={(e) => updateData(e)}
                          autoFocus
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <InputLabel>Account Number</InputLabel>
                        <TextField
                          type="number"
                          name="account_number"
                          // label="Account Number"
                          id="account_number"
                          value={data?.account_number}
                          onChange={(e) => updateData(e)}
                          autoFocus
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item md={12} sm={12} xs={12} sx={{ my: 1 }}>
                          <FormControlLabel
                            control={
                              <Checkbox checked={true} onChange={handleChange('term_condition')} name="termandcondition" />
                            }
                            label={<div>By checking this box you agree to the <Link href="/privacypolicy">
                              <a target="_blank" className='privacy_term_link'>
                                Privacy Policy
                              </a>
                            </Link> and <Link href="/termsandconditions">
                                <a target="_blank" className='privacy_term_link'>
                                  Terms and Conditions
                                </a>
                              </Link></div>}
                          />
                          {/* {
                        formError && formError.term_condition && (
                          <FormHelperText error id="country-error">
                            {formError.term_condition}
                          </FormHelperText>
                        )
                      } */}
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        md={12}
                        sx={{ width: "100%" }}
                      >
                        {
                          !loading ? (
                            <Box>
                              <button
                                type="submit"
                                style={{ width: "100%" }}
                                className="py-2 mb-4 text-sm font-medium rounded-md text-white bg-[#fec601] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={handleSubmit}
                              >
                                Submit
                              </button>
                            </Box>
                          ) : (
                            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                              <CircularProgress size={25} />
                            </Box>
                          )
                        }

                      </Grid>
                      <Grid item md={12}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: "center",
                          }}
                        >
                          <Typography sx={{ mr: 1, color: "text.secondary" }}>
                            Already have an account?
                          </Typography>
                          <Typography>
                            <Link passHref href="/login">
                              <Typography
                                component={MuiLink}
                                sx={{ color: "primary.main" }}
                              >
                                Login
                              </Typography>
                            </Link>
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </BoxWrapper>
              </Box>
            </RightWrapper>
          </Box>
        </motion.div>
        <Notification notify={notify} setNotify={setNotify} />
      </BlankLayout>
    </>
  );
};

export default SignUp;