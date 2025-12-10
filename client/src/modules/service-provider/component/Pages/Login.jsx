import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import bg from "../../../user/components/images/bg.jpg";
import log from "../../../user/components/images/lock.png";
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

    axios.post(`${host}/api/service-provider/login`, data)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          localStorage.setItem("serviceProviderId", JSON.stringify(res.data.serviceProviderId));
          localStorage.setItem("serviceToken", JSON.stringify(res.data.serviceToken));
          toast.success("Login successful");
          setTimeout(() => {
            nav("/service-provider/");
          }, 1000);
        } else {
          toast.error("Invalid Email or Password");
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  return (
    <div style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}>
      <ToastContainer />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: 5,
            width: "100%",
          }}
        >
          <Box textAlign="center" mb={2}>
            <img src={log} alt="login" width={50} height={50} />
            <Typography variant="h5" mt={1} sx={{ color: "#331a00", fontWeight: "bold" }}>
              Apartment Service Provider Login
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              Access your dashboard to manage service requests.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  variant="outlined"
               
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: "#331a00", color: "white" }}
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Uncomment if you want registration */}
          {/* <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Don’t have an account?{" "}
              <Link to="/service-provider/register">Register here</Link>
            </Typography>
          </Box> */}
        </Box>
      </Container>
    </div>
  );
}

export default Login;
