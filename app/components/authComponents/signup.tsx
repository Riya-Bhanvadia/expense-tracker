"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import google_icon from "@/public/google_icon.svg";
import axios from "axios";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const defaultTheme = createTheme();

export default function SignUp() {
  const { data: session } = useSession();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const obj = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };
    if (obj.email === "" || obj.name === "" || obj.password === "") {
      setError("please fill all details");
      setLoading(false)
    } else {
      const response = axios
        .post("/api/register", obj)
        .then((res) => {
          // console.log(res);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      router.push("/mainDashboard");
    }
    // console.log(obj);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <span style={{ color: "red" }}>{error}</span>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             {loading? "Loading...": "SignIn"} 
            </Button>
            {/* <img src={google_icon} alt="icon" /> */}
            <Tooltip title="Signin with google">
              <Image
                src="/google_icon.svg"
                alt="me"
                width="40"
                height="40"
                style={{
                  marginLeft: "50%",
                  marginBottom: "50px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  signIn("google", { callbackUrl: "/mainDashboard" })
                }
              />
            </Tooltip>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
