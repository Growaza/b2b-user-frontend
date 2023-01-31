import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ModalDialogRegister from "./ModelDialogRegister";

const theme = createTheme();

export default function Login({ handleClose }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleCloseRegister = () => setOpen(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    // fetch(
    //   "https://b2bbackend-production.up.railway.app/api/v1/accounts/login-verify/",
    //   {
    //     method: "POST",
    //     headers: { "content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <input
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleClose}
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleOpen}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <ModalDialogRegister
                open={open}
                handleClose={handleCloseRegister}
              />
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   function login() {
//     console.log(email, password);
//     let item = { email, password };
//     fetch(
//       "https://b2bbackend-production.up.railway.app/api/v1/accounts/login-verify/",
//       {
//         method: "POST",
//         headers: { "content-Type": "application/json" },
//         body: JSON.stringify(item),
//       }
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//       });
//   }

//   return (
//     <div>
//       <h1>Login</h1>
//       <div className="flex items-center space-x-1">
//         <label>Email </label>
//         <input
//           type="text"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <label>Password</label>
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           className="border-2 bg-zinc-700 text-white rounded-xl p-2"
//           onClick={login}
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }
