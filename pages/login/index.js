// ** React Imports
import { useState,useEffect, ChangeEvent, MouseEvent, ReactNode } from 'react'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  fadeRight,
} from "components/animation/FadeAnimOnLoad";

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Typography, { TypographyProps } from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'config/themeConfig'

// ** Hooks
// import { useSettings } from 'src/@core/hooks/useSettings'

import BlankLayout from 'components/BlankLayout'
import FooterIllustrationsV2 from 'components/FooterIllustrationsV2'

import myApi from "../../axios";
import Notification from "components/Notification";
import { useRouter } from "next/router";
import { CircularProgress } from '@mui/material';

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const LoginV2 = () => {
  
  const controls = useAnimation();
  const router = useRouter();
  // ** States
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false
  })
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'))
    if (token) {
      router.replace("/")
    } 
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  // ** Hook
  const theme = useTheme()
//   const { settings } = useSettings()

  // ** Vars
//   const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
//   const hidden = false

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!values.email || !values.password) {
      setNotify({
        isOpen: true,
        message: `please fill the all the values`,
        type: "error",
      });
      setLoading(false);
      return true;
    }
    const reponse = await myApi.post("/api/v1/accounts/login-verify/", {
      email: values.email,
      password: values.password,
    });
    console.log(reponse.data.valid, "NS");
    if (reponse?.data?.valid) {
      localStorage.setItem("user", JSON.stringify(reponse?.data));
      setErrorMsg("");
      setNotify({
        isOpen: true,
        message: `Login successfully`,
        type: "success",
      });
      setLoading(false);
      // return navigate('/dashboard')
      router.push("/");
    } else {
      setNotify({
        isOpen: true,
        message: reponse?.data?.response,
        type: "error",
      });
      setLoading(false);
      setErrorMsg(reponse?.data?.response);
    }
  };

  const handleAdminURL = () => {
    window.open("https://admin.b2bcab.co.in/", '_blank', 'noopener,noreferrer');
  }
//   const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <>
      <BlankLayout>
        <motion.div ref={ref} animate={controls} initial="hidden">
          <Box className="content-right">
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
                  p: {md: 7, sm: 5, xs: 4},
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
                  <Box sx={{ mb: 6 }}>
                    <TypographyStyled variant="h5">{`Welcome to B2B Cabs! 👋🏻`}</TypographyStyled>
                    <Typography variant="body2">
                      Please sign-in to your account and start the adventure
                    </Typography>
                  </Box>
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <InputLabel>Email</InputLabel>
                    <TextField
                      autoFocus
                      fullWidth
                      id="email"
                      onChange={handleChange("email")}
                      sx={{ mb: 4 }}
                    />
                    <InputLabel>Password</InputLabel>
                    <FormControl fullWidth>
                      <OutlinedInput
                        value={values.password}
                        id="auth-login-v2-password"
                        onChange={handleChange("password")}
                        type={values.showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              aria-label="toggle password visibility"
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
                    <Box
                      sx={{
                        mb: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        p:1
                      }}
                    >
                      {/* <FormControlLabel
                        label="Remember Me"
                        control={<Checkbox />}
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color: "text.primary",
                          },
                        }}
                      /> */}
                      <div className="forgot-link">
                        <Link href="/forgot-password" variant="body2">
                          Forgot password?
                        </Link>
                      </div>
                    </Box>
                    {!loading ? (
                      <Box>
                         <button
                        type="submit"
                        style={{width: "100%"}}
                        className="py-2 px-36 mx-1 mb-4 text-sm font-medium rounded-md text-white bg-[#fec601] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        // onClick={handleSubmit}
                      >
                        Login
                      </button>

                        {/* <Button
                          type="submit"
                          sx={{width: "100% !important"}}
                          className="py-2 mx-1 mb-4 text-sm font-medium rounded-md text-white bg-[#fec601] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          // onClick={handleSubmit}
                          >
                          Login
                        </Button> */}
                        </Box>
                    ) : (
                      <Box sx={{display: "flex", justifyContent: "center", mb: 2}}>
                        <CircularProgress size={25}/>
                      </Box>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      <Typography sx={{ mr: 1, color: "text.secondary" }}>
                        New on our platform?
                      </Typography>
                      <Typography>
                        <Link passHref href="/signup">
                          <Typography
                            component={MuiLink}
                            sx={{ color: "primary.main" }}
                          >
                            Create an account
                          </Typography>
                        </Link>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      <Typography sx={{ mr: 1, color: "text.secondary" }}>
                        Are you admin user?
                      </Typography>
                      <Typography
                        onClick={handleAdminURL}
                        component={MuiLink}
                        sx={{ color: "primary.main", cursor:'pointer' }}>
                        Admin Login
                      </Typography>
                    </Box>
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
}

// LoginV2.getLayout = (page) => {page}</BlankLayout>

export default LoginV2
