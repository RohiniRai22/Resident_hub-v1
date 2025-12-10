import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import bg from "../../../user/components/images/bg.jpg"; // Import the background image
import log from "../../../user/components/images/lock.png";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../../config/Hosts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const host = config.host;
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const nav = useNavigate();

  const handleTermsChange = (event) => {
    setAcceptedTerms(event.target.checked);
  };

  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${host}/api/admin/login`, data)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          localStorage.setItem("adminToken", JSON.stringify(res.data.token));
          toast.success("Login Successfull");
          setTimeout(() => {
            nav("/admin/");
          }, 1000);
        } else {
          toast.error("Invalid Email Or Password ");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Internal Server Error ");
      });
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }}>
      <Container
        maxWidth="sm"
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: 3,
            width: "100%",
            animation: "slideUp 1s ease-in-out",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {/* <img src={log} alt="" width={40} height={40} /> */}
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ color: "#331a00", marginBottom: "20px" }}
            >
             Admin Sign-In
            </Typography>
          </Box>
          {/* Admin Login Info */}
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#888", marginBottom: "16px" }}
          >
            Please enter your admin credentials to access the dashboard. Only authorized users can log in here.
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                  sx={{
                    "& .MuiInputLabel-root": { color: "brown" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "brown" },
                      "&:hover fieldset": { borderColor: "#f53474" },
                      "&.Mui-focused fieldset": { borderColor: "brown" },
                    },
                  }}
                  name="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  required
                  sx={{
                    "& .MuiInputLabel-root": { color: "brown" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "brown" },
                      "&:hover fieldset": { borderColor: "#f53474" },
                      "&.Mui-focused fieldset": { borderColor: "brown" },
                    },
                  }}
                  name="password"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#331a00",
                    color: "white",
                    "&:hover": { backgroundColor: "#f53474" },
                    mt: 2,
                  }}
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Login;
