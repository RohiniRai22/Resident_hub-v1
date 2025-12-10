import React, { useState } from "react";
import {
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../../../config/Hosts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddService() {
  const host = config.host;
  const [name, setName] = useState(""); // State for the name field
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!name) {
      newErrors.name = "Name is required"; // Validate the name field
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = () => {
    if (!validateForm()) {
        return;
    }

    axios
      .post(`${host}/api/admin/add-service`, { name })
      .then((res) => {
        if (res.data.success) {
          toast.success("Service Added Successfully");
        } else {
          toast.error("Adding Service Failed");
        }
      })
      .catch((err) => {
        console.error("Error in Axios request: ", err); // Logs the full error
        toast.error("Server Error: " + err.message); // Shows a toast with the error message
      });
};

  return (
    <Box sx={{ height: "100%", p: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ color: "#331a00" }}
          >
            Insert Service Details
          </Typography>
          <Link to="/admin/manage-service" style={{ color: "#8bc34a" }}>
            <Button
              size="small"
              endIcon={<ArrowForwardIosIcon />}
              sx={{ color: "#331a00" }}
            >
              View Services
            </Button>
          </Link>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Name" // Updated label to "Name"
              name="name" // Name attribute to match the state variable
              onChange={(e) => setName(e.target.value)} // Handle input
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.name} // Error handling
              helperText={errors.name} // Display validation message
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ background: "#331a00 !important", width: "400px" }}
          >
            Submit
          </Button>
        </Box>
      </Paper>

      <ToastContainer />
    </Box>
  );
}
