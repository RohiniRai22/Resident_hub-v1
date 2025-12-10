import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import bg from "../images/bg.jpg";
import log from "../images/lock.png"; // You might want to replace this with an apartment/home icon for more thematic feel
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../../config/Hosts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const host = config.host;
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${host}/api/user/login`, data)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("userToken", res.data.userToken);

          toast.success("Login successful");
          setTimeout(() => {
            nav("/");
          }, 1000);
        } else {
          toast.error("Invalid Email or Password");
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <ToastContainer />
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px",
          boxShadow:
            "0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "40px 30px",
          backdropFilter: "blur(8px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            mb: 4,
          }}
        >
          {/* You can replace the lock icon with a home/apartment icon */}
          {/* <img
            src={log}
            alt="resident hub logo"
            width={48}
            height={48}
            style={{ filter: "invert(40%) sepia(60%) saturate(700%) hue-rotate(80deg)" }} // subtle greenish tint
          /> */}
          <Typography
            variant="h4"
            sx={{
              color: "#331a00",
              fontWeight: "700",
              letterSpacing: "1.5px",
              userSelect: "none",
            }}
          >
            Resident Hub
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#331a00", fontWeight: "500", mb: 2 }}
          >
            Resident Login
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#331a00",
                    transition: "color 0.3s ease",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                    "& fieldset": {
                      borderColor: "#3a6f8f",
                    },
                    "&:hover fieldset": {
                      borderColor: "#7ec8e3",
                      boxShadow: "0 0 8px #7ec8e3",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#331a00",
                      boxShadow: "0 0 10px #331a00",
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#331a00",
                    transition: "color 0.3s ease",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                    "& fieldset": {
                      borderColor: "#3a6f8f",
                    },
                    "&:hover fieldset": {
                      borderColor: "#7ec8e3",
                      boxShadow: "0 0 8px #7ec8e3",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#331a00",
                      boxShadow: "0 0 10px #331a00",
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center", mt: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: "#555", userSelect: "none" }}
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{ color: "#331a00", textDecoration: "none" }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: "#331a00",
                  color: "#fff",
                  fontWeight: "600",
                  borderRadius: "12px",
                  padding: "12px 0",
                  textTransform: "none",
                  boxShadow: "0 6px 12px rgba(74, 144, 226, 0.6)",
                  transition:
                    "background-color 0.4s ease, box-shadow 0.4s ease",
                  "&:hover": {
                    backgroundColor: "#331a00",
                    boxShadow: "0 8px 20px rgba(42, 111, 191, 0.8)",
                  },
                  "&:disabled": {
                    backgroundColor: "#a0c8f0",
                    boxShadow: "none",
                    cursor: "not-allowed",
                  },
                }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default Login;
