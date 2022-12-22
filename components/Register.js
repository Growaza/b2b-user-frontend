import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
export default function Register({ handleCloseRegister }) {
  // create state variables for each input
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let item = {
      first_name,
      last_name,
      phone_number,
      district,
      state,
      date_of_birth,
      password,
    };

    fetch(
      "http://localhost:8000/api/v1/accounts/vendor-registration/",
      {
        method: "POST",
        headers: {},
        body: JSON.stringify(),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    handleCloseRegister();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ marginBottom: 5 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="district"
                  label="District"
                  name="district"
                  autoComplete="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone_number"
                  label="Phone Number"
                  name="phone_number"
                  autoComplete="phone number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              {/* password */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              {/* confirm password */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="confirm-password"
                />
              </Grid>
              {/* Date of birth */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="date_of_birth"
                  label="Date of Birth"
                  type="date"
                  id="date_of_birth"
                  autoComplete="date-of-birth"
                  value={date_of_birth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </Grid>
              {/* Aadhar card photo */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="aadhar_card_photo"
                  label="Aadhar Card Photo"
                  type="image"
                  id="aadhar_card_photo"
                  autoComplete="aadhar-card_photo"
                />
              </Grid>
              {/* PAN card photo */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="pan_card_photo"
                  label="PAN Card Photo"
                  type="image"
                  id="pan_card_photo"
                  autoComplete="pan-card_photo"
                />
              </Grid>
              {/* Licence photo */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="licence_photo"
                  label="Licence Photo"
                  type="image"
                  id="licence_photo"
                  autoComplete="licence-photo"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCloseRegister}
            >
              Cancel
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

{
  /* <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        variant="filled"
        required
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="filled"
        required
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="District"
        variant="filled"
        type="number"
        required
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      />
      <TextField
        label="Phone Number"
        variant="filled"
        type="number"
        required
        value={phone_number}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select
        id="state"
        label="State"
        type="text"
        required
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        <option>Pune</option>
        <option>Mumbai</option>
        <option>Gandhi Nagar</option>
      </select>
      
      <TextField
        label="Password"
        type="password"
        variant="filled"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <Button variant="contained" onClick={handleCloseRegister}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form> */
}

// export default function Register() {
//   const [first_name, setFirstName] = useState("");
//   const [last_name, setLastName] = useState("");
//   const [phone_number, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [password, setPassword] = useState("");

//   function Register() {
//     console.warn(
//       first_name,
//       last_name,
//       phone_number,
//       email,
//       state,
//       city,
//       password
//     );
//     let item = {
//       first_name,
//       last_name,
//       phone_number,
//       email,
//       state,
//       city,
//       password,
//     };
//     fetch(
//       "http://localhost:8000/api/v1/accounts/vendor-registration/",
//       {
//         method: "POST",
//         headers: {},
//         body: JSON.stringify(item),
//       }
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//       });
//   }
//   return (
//     <div className="flex bg-black text-white">
//       <form action="" className="w-28">
//         <label id="first_name">First Name</label>
//         <input
//           type="text"
//           name="firstname"
//           placeholder="First Name"
//           value={first_name}
//           onChange={(e) => setFirstName(e.target.value)}
//           className="text-black"
//         />
//         <label id="last_name">Last Name</label>
//         <input
//           type="text"
//           name="lastname"
//           placeholder="Last Name"
//           value={last_name}
//           onChange={(e) => setLastName(e.target.value)}
//           className="text-black"
//         />
//         <label id="phone_number">Phone Number</label>
//         <input
//           type="number"
//           name="phonenumber"
//           placeholder="Phone Number"
//           value={phone_number}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           className="text-black"
//         />
//         <label id="email">Email</label>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="text-black"
//         />
//         <label id="state">State</label>
//         <input
//           type="text"
//           name="state"
//           placeholder="State"
//           value={state}
//           onChange={(e) => setState(e.target.value)}
//           className="text-black"
//         />
//         <label id="city">City</label>
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="text-black"
//         />
//         <label id="password">Password</label>
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="text-black"
//         />
//         <button
//           type="submit"
//           onClick={Register}
//           className="border rounded-xl p-2 mt-2"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
