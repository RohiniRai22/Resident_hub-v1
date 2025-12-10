import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import bg from "../../../user/components/images/bg.jpg";
import log from "../../../user/components/images/lock.png";
import axios from "axios";
import config from "../../../../config/Hosts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const steps = ["Basic Information", "Company Details"];

function RegistrationForm() {
  const host = config.host;
  const [services, setServices] = useState([]);

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",

    businessContactNo: "",
    address: "",
  });

  useEffect(() => {
    axios
      .get(`${host}/api/admin/get-service`)
      .then((res) => {
        console.log(res.data);
        setServices(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const nav = useNavigate();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
    businessContactNo: "",
    address: "",
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (activeStep === 1) {
      if (!formData.businessName)
        newErrors.businessName = "Business name is required";
      if (!formData.businessType)
        newErrors.businessType = "Business type is required";
      if (!formData.businessContactNo)
        newErrors.businessContactNo = "Business contact number is required";
      else if (!/^\d{10}$/.test(formData.businessContactNo))
        newErrors.businessContactNo = "Contact number is invalid";
      if (!formData.address) newErrors.address = "Address is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      if (validate()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validate()) {
      console.log("Form data submitted:", formData);
      axios
        .post(`${host}/api/service-provider/register`, formData)
        .then((res) => {
          console.log(res, "res");
          if (res.data.success) {
            toast.success("Registration Successfull");
            setTimeout(() => {
              nav("/service-provider/login");
            }, 1000);
          } else {
            toast.error("An Internal Server Error");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.success(error);
        });
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
            <img src={log} alt="" width={40} height={40} />
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ color: "#8bc34a", marginBottom: "20px" }}
            >
              Sign-Up
            </Typography>
          </Box>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form onSubmit={handleSubmit}>
            {activeStep === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#f53474" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#8bc34a" },
                        "&:hover fieldset": { borderColor: "#f53474" },
                        "&.Mui-focused fieldset": { borderColor: "#8bc34a" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#f53474" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#8bc34a" },
                        "&:hover fieldset": { borderColor: "#f53474" },
                        "&.Mui-focused fieldset": { borderColor: "#8bc34a" },
                      },
                    }}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#f53474" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#8bc34a" },
                        "&:hover fieldset": { borderColor: "#f53474" },
                        "&.Mui-focused fieldset": { borderColor: "#8bc34a" },
                      },
                    }}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#f53474" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#8bc34a" },
                        "&:hover fieldset": { borderColor: "#f53474" },
                        "&.Mui-focused fieldset": { borderColor: "#8bc34a" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    required
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#f53474" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#8bc34a" },
                        "&:hover fieldset": { borderColor: "#f53474" },
                        "&.Mui-focused fieldset": { borderColor: "#8bc34a" },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            )}
            {activeStep === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Business Name"
                    variant="outlined"
                    margin="normal"
                    required
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    error={Boolean(errors.businessName)}
                    helperText={errors.businessName}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#f53474" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#8bc34a" },
                        "&:hover fieldset": { borderColor: "#f53474" },
                        "&.Mui-focused fieldset": { borderColor: "#8bc34a" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="business-type-label">
                      Business Type
                    </InputLabel>
                    <Select
                      labelId="business-type-label"
                      id="business-type"
                      value={formData.businessType}
                      onChange={handleChange}
                      label="Business Type"
                      name="businessType"
                      error={Boolean(errors.businessType)}
                      sx={{
                        "& .MuiInputLabel-root": { color: "#f53474" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#8bc34a" },
                          "&:hover fieldset": { borderColor: "#f53474" },
                          "&.Mui-focused fieldset": { borderColor: "#8bc34a" },
                        },
                      }}
                    >
                      {services.length > 0 ? (
                        services.map((item) => {
                          return (
                            <MenuItem value={item._id}>{item.name}</MenuItem>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </Select>
                    <FormHelperText>{errors.businessType}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Business Contact Number"
                    variant="outlined"
                    margin="normal"
                    name="businessContactNo"
                    value={formData.businessContactNo}
                    onChange={handleChange}
                    error={Boolean(errors.businessContactNo)}
                    helperText={errors.businessContactNo}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#f53474" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#8bc34a" },
                        "&:hover fieldset": { borderColor: "#f53474" },
                        "&.Mui-focused fieldset": { borderColor: "#8bc34a" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    variant="outlined"
                    margin="normal"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#f53474" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#8bc34a" },
                        "&:hover fieldset": { borderColor: "#f53474" },
                        "&.Mui-focused fieldset": { borderColor: "#8bc34a" },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button
                color="secondary"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  backgroundColor: "#f53474",
                  color: "white",
                  "&:hover": { backgroundColor: "#c62828" },
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{
                  backgroundColor: "#8bc34a",
                  color: "white",
                  "&:hover": { backgroundColor: "#689f38" },
                }}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default RegistrationForm;
