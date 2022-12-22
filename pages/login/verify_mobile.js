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

export default function VerifyMobile()  {
  
  const controls = useAnimation();
  const router = useRouter();
  // ** States
  const {uid} = router.query
  const [otp, setOtp] = useState('')
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
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (otp) => {
    setLoading(true);
    const _user = JSON.parse(localStorage.getItem('pre_user'));
    if (!otp || !_user) {
      setNotify({
        isOpen: true,
        message: `Otp or userdata cannot be empty`,
        type: "error",
      });
      setLoading(false);
      return true;
    }
    const reponse = await myApi.post("/api/v1/accounts/login-verify/", { ...user, otp });
    if (reponse?.data?.valid) {
      setErrorMsg("");
      setNotify({
        isOpen: true,
        message: `verified successfully`,
        type: "success",
      });
      setLoading(false);
      // return navigate('/dashboard')
      router.push("/login");
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
                    <TypographyStyled variant="h5">{`Verify your mobile! 🤙🏽`}</TypographyStyled>
                    <Typography variant="body2">
                      Please enter the otp sent on your registered mobile number
                    </Typography>
                  </Box>
                    <InputLabel>OTP</InputLabel>
                    <FormControl fullWidth>
                      <OutlinedInput
                        value={otp}
                        id="auth-login-v2-password"
                        onChange={(e)=>{
                          setOtp(e.target.value)
                        }}
                        type={"text"}
                        placeholder='OTP'
                      />
                    </FormControl>
                    <div style={{
                      width:'100%',
                      display:'flex',
                      justifyContent:'end',
                      padding:'1rem 0'
                    }}>
                      <span style={{
                        textDecoration:'underline',
                        cursor:'pointer',
                        color:'indigo'
                      }}>
                        Resend
                      </span>
                    </div>
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
                    </Box>
                    {!loading ? (
                      <Box>
                         <button
                        type="submit"
                        onClick={()=>{
                          handleSubmit(otp)
                        }}
                        style={{width: "100%"}}
                        className="py-2 px-36 mx-1 mb-4 text-sm font-medium rounded-md text-white bg-[#fec601] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Verify
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

