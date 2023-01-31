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
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Hooks
// import { useSettings } from 'src/@core/hooks/useSettings'

import BlankLayout from 'components/BlankLayout'
import FooterIllustrationsV2 from 'components/FooterIllustrationsV2'

import { useRouter } from "next/router";
import Notification from "components/Notification";
import myApi from '../axios';
import { CircularProgress, Stack } from '@mui/material';

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

const ResetPassword = () => {
  
  const controls = useAnimation();
  const router = useRouter();
  // ** States
  const [values, setValues] = useState({
    password: '',
    cPassword: '',
    showPassword: '',
    cShowPassword: '',
    useridb64: '',
    token: '',
  })
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const { useridb64, token } = router.query;

  // useEffect(() => {
  //   const user_token = JSON.parse(localStorage.getItem('user'))
  //   if (user_token) {
  //     router.replace("/")
  //   } 
  // }, []);

  useEffect(() => {
    console.log("useridb64",useridb64, token);
    if (useridb64 && token) {
      setValues({ ...values, 'useridb64': useridb64,'token': token })
      checkURL(useridb64, token)
    } 
  }, [useridb64,token]);

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const checkURL = async () => {
    const reponse = await myApi.get(`/api/v1/accounts/forgot-password-token-verify?useridb64=${useridb64}&token=${token}`)
    console.log(reponse.data.is_token_valid, "NS");
    if (reponse?.data?.is_token_valid) {
      setErrorMsg("");
      // setNotify({
      //   isOpen: true,
      //   message: `Mail sent to your mail successfully`,
      //   type: "success",
      // });
      setLoading(false);
    } else {
      setNotify({
        isOpen: true,
        message: "Token has been expired",
        type: "error",
      });
      setLoading(false);
      setErrorMsg(reponse?.data?.response);
    }
  }

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
  const handleClickCShowPassword = () => {
    setValues({ ...values, cShowPassword: !values.cShowPassword })
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
    if (!values.password || !values.cPassword) {
      setNotify({
        isOpen: true,
        message: `please fill the all the values`,
        type: "error",
      });
      setLoading(false);
      return true;
    } 
    if(values.password !== values.cPassword) {  
      setNotify({
        isOpen: true,
        message: `Password and confirm password should be same`,
        type: "error",
      });
      setLoading(false);
      return true
    }

    try {
      const reponse = await myApi.post("/api/v1/accounts/forgot-password-confirm/", {
        password1: values.password,
        password2: values.cPassword,
        useridb64: useridb64,
        token: token
      });
      console.log(reponse.data.valid, "NS");
      if (!reponse?.data?.error) {
        setErrorMsg("");
        setNotify({
          isOpen: true,
          message: reponse?.data?.message,
          type: "success",
        });
        setLoading(false);
        // return navigate('/dashboard')
        // router.push("/login");
      } else {
        setNotify({
          isOpen: true,
          message: reponse?.data?.message,
          type: "error",
        });
        setLoading(false);
        setErrorMsg(reponse?.data?.message);
      }
    } catch (error) {
      setNotify({
        isOpen: true,
        message: error?.response?.data?.message,
        type: "error",
      });
      setLoading(false)
      setErrorMsg(error?.response?.data?.message)
    }
  };
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
                    <img src="/contact-img.png" alt="car photo" />
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
                  <Box sx={{ mb: 6 }}>
                    <TypographyStyled variant="h5">{`Forgotten your password!👋🏻`}</TypographyStyled>
                    <Typography variant="body2">
                      Please enter your email here and we will send you a link
                      to reset it.
                    </Typography>
                  </Box>
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Stack direction="column" spacing={2}>
                      <Box>
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
                      </Box>
                      <Box>
                        <InputLabel>Confirm Password</InputLabel>
                        <FormControl fullWidth>
                          <OutlinedInput
                            value={values.cPassword}
                            id="auth-login-v2-password"
                            onChange={handleChange("cPassword")}
                            type={values.cShowPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  edge="end"
                                  onClick={handleClickCShowPassword}
                                  aria-label="toggle password visibility"
                                >
                                  {values.cShowPassword ? (
                                    <EyeOutline />
                                  ) : (
                                    <EyeOffOutline />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Box>
                      {!loading ? (
                        <button
                          type="submit"
                          className="py-2 px-36 mx-1 mb-4 text-sm font-medium rounded-md text-white bg-[#fec601] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={handleSubmit}
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
                    </Stack>
                  </form>
                </BoxWrapper>
              </Box>
            </RightWrapper>
          </Box>
        </motion.div>
      </BlankLayout>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

// LoginV2.getLayout = (page) => {page}</BlankLayout>

export default ResetPassword
