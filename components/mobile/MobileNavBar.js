/* eslint-disable react/button-has-type */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import ModalDialog from "../ModelDialog";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from "next/router";
import { Box, Button, Stack } from "@mui/material";
import { IconButton } from "@material-ui/core";

function MobileNavBar() {
  // const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEL, setAnchorEL] = React.useState(null);
  const [anchorELProfile, setAnchorELProfile] = React.useState(null);
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
    console.log("event", event);
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseDropDown = (event) => {
    console.log(event.target.value,'s')
    setAnchorEl(null);
  };

  const handleBtnClick = (event) => {
    console.log("event", event);
    setAnchorEL(event.currentTarget);
  };
  
  const handleCloseBtnDropDown = (event) => {
    console.log(event.target.value,'s')
    setAnchorEL(null);
  };

  const handleProfileBtnClick = (event) => {
    console.log("event", event);
    setAnchorELProfile(event.currentTarget);
  };
  
  const handleCloseProfileBtnDropDown = (event) => {
    console.log(event.target.value,'s')
    setAnchorELProfile(null);
  };

  const logout = () => {
    localStorage.removeItem("user")
    return router.push('/login')
  }
  
  return (
    <div>
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

            <div className="header__burger" style={{ marginRight: "1rem" }}>
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              >
                <i className="text-white">
                  <MenuIcon />
                </i>
              </IconButton>
            </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseDropDown}
            >
              <MenuItem value="TakeBooking">
                <Link href="/">Home</Link>
              </MenuItem>
              {userData && (
                <>
                  <MenuItem value="PostBooking">
                    <Link href="/PostBooking">Post Booking</Link>
                  </MenuItem>
                  <MenuItem value="booking">
                    <button onClick={handleBtnClick}>Booking</button>
                  </MenuItem>
                  <MenuItem value="DriverRequest">
                    <Link href="/DriverRequest">Driver Request</Link>
                  </MenuItem>
                </>
              )}
              <MenuItem value="About">
                <Link href="/About">About</Link>
              </MenuItem>
              <MenuItem value="ContactUs">
                <Link href="/ContactUs">Contact Us</Link>
              </MenuItem>
              <MenuItem value="FAQ">
                <Link href="/FAQ">FAQ</Link>
              </MenuItem>
              <MenuItem value="feedback">
                <Link href="/feedback">Feedback</Link>
              </MenuItem>
              {userData && (
                <>
                  <MenuItem value="Booking">
                    <button onClick={handleProfileBtnClick}>Profile</button>
                  </MenuItem>
                 
                </>
              )}
              {
                buttonShw ? (
                  <MenuItem value="Booking">
                    <button onClick={logout}>Logout</button>
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem value="logout">
                      <Link href="/login">login</Link>
                    </MenuItem>
                    <MenuItem value="Signup">
                      <Link href="/signup">Signup</Link>
                    </MenuItem>
                  </>
                )
              }
            </Menu>
            <Menu
              id="simple-menu"
              anchorEl={anchorEL}
              open={Boolean(anchorEL)}
              onClose={handleCloseBtnDropDown}
            >
              <MenuItem value="TakeBooking">
                <Link href="/AllPostBooking">My Post Booking</Link>
              </MenuItem>
              <MenuItem value="ConfirmBooking">
                <Link href="/booking">All Booking</Link>
              </MenuItem>
              <MenuItem value="CancelBooking">
                <Link href="/ConfirmBooking">My Confirm Booking</Link>
              </MenuItem>
              <MenuItem value="Booking">
                <Link href="/CancelBooking">My Cancel Booking</Link>
              </MenuItem>
            </Menu>
            <Menu
              id="simple-menu"
              anchorEl={anchorELProfile}
              open={Boolean(anchorELProfile)}
              onClose={handleCloseProfileBtnDropDown}
            >
              <MenuItem value="ConfirmBooking">
                <Link href="/PostTestimonials">Testimonials</Link>
              </MenuItem>
              <MenuItem value="ConfirmBooking">
                <Link href="/MyProfile">Profile Update</Link>
              </MenuItem>
            </Menu>
          </div>
          <ModalDialog open={open} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
}

export default MobileNavBar;
