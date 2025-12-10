import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from "../images/bg.jpg"; // Import the background image
import log from "../images/lock.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../../config/Hosts";

function RegistrationForm() {
  const host = config.host;
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

 const validate = () => {
  let tempErrors = {};
  if (!data.name) tempErrors.name = "Name is required";
  if (!data.email) {
    tempErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    tempErrors.email = "Email is not valid";
  }
  if (!data.phone) tempErrors.phone = "Phone number is required";
  else if (!/^[0-9]{10}$/.test(data.phone)) tempErrors.phone = "Enter valid 10-digit number";
  if (!data.address) tempErrors.address = "Address is required";
  if (!data.password) {
    tempErrors.password = "Password is required";
  } else if (data.password.length < 6) {
    tempErrors.password = "Password must be at least 6 characters long";
  }
 
  setErrors(tempErrors);
  return Object.keys(tempErrors).length === 0;
};


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .post(`${host}/api/user/register`, data)
        .then((res) => {
          toast.success("Registration successful");
          setTimeout(() => {
            nav("/login");
          }, 1000);
        })
        .catch((error) => {
          toast.error("Registration failed");
        });
    } else {
      toast.error("Please fix the errors");
    }
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }}>
      <ToastContainer />
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
              Sign-Up
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                margin="normal"
                required
                sx={{
                  "& .MuiInputLabel-root": { color: "#331a00" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#331a00" },
                    "&:hover fieldset": { borderColor: "#331a00" },
                    "&.Mui-focused fieldset": { borderColor: "#331a00" },
                  },
                }}
                name="name"
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                margin="normal"
                required
                sx={{
                  "& .MuiInputLabel-root": { color: "#331a00" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#331a00" },
                    "&:hover fieldset": { borderColor: "#331a00" },
                    "&.Mui-focused fieldset": { borderColor: "#331a00" },
                  },
                }}
                name="last_name"
                onChange={handleChange}
                error={!!errors.last_name}
                helperText={errors.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                required
                sx={{
                  "& .MuiInputLabel-root": { color: "#331a00" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#331a00" },
                    "&:hover fieldset": { borderColor: "#331a00" },
                    "&.Mui-focused fieldset": { borderColor: "#331a00" },
                  },
                }}
                name="email"
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
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
                  "& .MuiInputLabel-root": { color: "#331a00" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#331a00" },
                    "&:hover fieldset": { borderColor: "#331a00" },
                    "&.Mui-focused fieldset": { borderColor: "#331a00" },
                  },
                }}
                name="password"
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
           
            <Grid item xs={12}>
  <TextField
    fullWidth
    label="Phone"
    name="phone"
    variant="outlined"
    margin="normal"
    required
    onChange={handleChange}
    error={!!errors.phone}
    helperText={errors.phone}
    sx={{
      "& .MuiInputLabel-root": { color: "#331a00" },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#331a00" },
        "&:hover fieldset": { borderColor: "#331a00" },
        "&.Mui-focused fieldset": { borderColor: "#331a00" },
      },
    }}
  />
</Grid>

<Grid item xs={12}>
  <TextField
    fullWidth
    label="Address"
    name="address"
    variant="outlined"
    margin="normal"
    required
    onChange={handleChange}
    error={!!errors.address}
    helperText={errors.address}
    sx={{
      "& .MuiInputLabel-root": { color: "#331a00" },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#331a00" },
        "&:hover fieldset": { borderColor: "#331a00" },
        "&.Mui-focused fieldset": { borderColor: "#331a00" },
      },
    }}
  />
</Grid>

            <p style={{ margin: "20px",color: "#331a00" }}>
              Don't have an Account? <Link to="/login">Sign-In</Link>
            </p>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#331a00",
                  color: "white",
                  "&:hover": { backgroundColor: "#331a00" }, // a darker blue on hover
                  mt: 2,
                }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default RegistrationForm;
