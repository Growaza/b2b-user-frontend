/* eslint-disable react/button-has-type */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import ModalDialog from "./ModelDialog";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from "next/router";
import { Box, Button, Stack } from "@mui/material";
import MobileNavBar from "./mobile/MobileNavBar";

function NavBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileEl, setProfileEl] = React.useState(null);
  const [userData, setUserData] = React.useState(null);
  const [buttonShw, setButtonShw] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("user"));
    setUserData(sessionData ? sessionData : null);
    setButtonShw(sessionData ? true : false)
  },[])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseDropDown = (event) => {
    console.log(event.target.value,'s')
    setAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setProfileEl(event.currentTarget);
  };
  
  const handleProfiCloseDropDown = (event) => {
    console.log(event.target.value,'s')
    setProfileEl(null);
  };

  const logout = () => {
    localStorage.removeItem("user")
    return router.push('/login')
  }

  const RespMenu = () => {
    // This function is for making the navbar responsive
    var x = document.getElementById("myTopnav");
    if (x.className === "header__main") {
      x.className += " responsive"; //adds this class if the burger icon is clicked
    } else {
      x.className = "header__main";
    }
    var x = document.getElementById("myMenu");
    if (x.className === "header__menu") {
      x.className += " responsive";
    } else {
      x.className = "header__menu";
    }
  };

    return (
      <>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <div className="header__main1 flex items-center justify-center">
            <div className="header__main bg-neutral-900" id="myTopnav">
              <div className="resp">
                <Link href="/" passHref>
                  <div className="header__logo cursor-pointer">
                    <image
                      className="image"
                      src="/main.png"
                      alt="logo"
                      width={60}
                      height={60}
                    />
                  </div>
                </Link>
                <div className="header__burger" onClick={RespMenu}>
                  <i className="text-white">
                    <MenuIcon />
                  </i>
                </div>
              </div>
              <div className="header__menu" id="myMenu" onClick={RespMenu}>
                <Button onClick={() => router.replace("/")}>
                  <span className="nav__links">HOME</span>
                  </Button>
                {userData && (<>
                <Button onClick={() => router.replace("/PostBooking")}>
                    <span className="nav__links">POST BOOKING</span>
                  </Button>
                  
                  <Button aria-controls="simple-menu" aria-haspopup="true"  onClick={handleClick}>
                    {/* Open Menu */}
                    <span className="nav__links">BOOKING</span>
                  </Button>
                  <Box>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseDropDown}>
                      <MenuItem  value="TakeBooking">
                        <Link href="/AllPostBooking">
                          My Post Booking
                        </Link>
                      </MenuItem>
                      <MenuItem  value="ConfirmBooking">
                        <Link href="/booking">
                          All Booking
                        </Link>
                      </MenuItem>
                      <MenuItem value="CancelBooking">
                        <Link href="/ConfirmBooking">
                          My Confirm Booking
                        </Link>
                      </MenuItem>
                      <MenuItem value="Booking">
                        <Link href="/CancelBooking">
                          My Cancel Booking
                        </Link>
                      </MenuItem>
                    </Menu>
                  </Box></>)}
                  {
                    userData && (
                      <Button onClick={() => router.replace("/DriverRequest")}>
                        <span className="nav__links">DRIVER REQUEST</span>
                      </Button>)
                  }
                <Button onClick={() => router.replace("/About")}>
                  <span className="nav__links">ABOUT</span>
                </Button>
                <Button onClick={() => router.replace("/ContactUs")}>
                  <span className="nav__links">CONTACT US</span>
                </Button>
              
                <Button onClick={() => router.replace("/FAQ")}>
                  <span className="nav__links">FAQ</span>
                </Button>
  
                <Button onClick={() => router.replace("/feedback")}>
                  <span className="nav__links">FEEDBACK</span>
                </Button>
  
                {userData && (<><Button   onClick={handleProfileClick}>
                  <span className="nav__links">PROFILE</span>
                </Button></>)}
                <Box>
                  <Menu
                    id="simple-menu"
                    anchorEl={profileEl}
                    keepMounted
                    open={Boolean(profileEl)}
                    onClose={handleProfiCloseDropDown}>
                    <MenuItem  value="ConfirmBooking">
                      
                      <Link href="/PostTestimonials">
                        Testimonials
                      </Link>
                    </MenuItem>
                    <MenuItem  value="ConfirmBooking">
                      
                      <Link href="/MyProfile">
                        Profile Update
                      </Link>
                    </MenuItem>
                    
                  
                  </Menu>
                </Box>
  
                {
                  buttonShw ? (
                    <>
                      <button
                        className="border rounded-lg p-1 w-32 bg-[#fec601] text-black shadow-md hover:shadow-xl active:scale-90 transition duration-150 nav__links"
                        onClick={logout}>
                        Logout
                      </button>
                    </>
                  ) : (
                    <Stack direction={"row"}>
                      <button
                        className="border rounded-lg p-1 w-32 bg-[#fec601] text-black shadow-md hover:shadow-xl active:scale-90 transition duration-150 nav__links"
                        onClick={() => router.push('/login')}>
                        Login
                      </button>
                      <button
                        className="border rounded-lg p-1 w-32 bg-[#fec601] text-black shadow-md hover:shadow-xl active:scale-90 transition duration-150 nav__links"
                        onClick={() => router.push('/signup')}>
                        SignUp
                      </button>
                    </Stack>
                  )
                }
              </div>
              <ModalDialog open={open} handleClose={handleClose} />
            </div>
          </div>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <MobileNavBar />
        </Box>
      </>
    );
}

export default NavBar;
