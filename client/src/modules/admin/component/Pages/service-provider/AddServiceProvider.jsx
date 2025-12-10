import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../../../config/Hosts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddServiceProvider() {
  const host = config.host;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "",
    password: "",
    businessType: "",
  });
  const [errors, setErrors] = useState({});
  const [services, setServices] = useState([]); // businessType options

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

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["name", "email", "phone", "address", "businessType"];
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    axios
      .post(`${host}/api/service-provider/register`, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Service Provider Added Successfully");
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            status: "",
            password: "",
            businessType: "",
          });
        } else {
          toast.error("Adding Service Provider Failed");
        }
      })
      .catch((err) => {
        toast.error("Server Error: " + err.message);
      });
  };

  return (
    <Box sx={{ height: "100%", p: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" sx={{ color: "#331a00" }}>
            Add Service Provider
          </Typography>
          <Link to="/admin/view-service-provider" style={{ color: "#8bc34a" }}>
            <Button
              size="small"
              endIcon={<ArrowForwardIosIcon />}
              sx={{ color: "#331a00" }}
            >
              View Service Providers
            </Button>
          </Link>
        </Box>

        <Grid container spacing={2}>
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Phone", name: "phone" },
            { label: "Address", name: "address" },
            // { label: "Status", name: "status" },
            { label: "Password", name: "password", type: "password" },
          ].map((field) => (
            <Grid item xs={12} md={6} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                value={formData[field.name]}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
                error={!!errors[field.name]}
                helperText={errors[field.name]}
              />
            </Grid>
          ))}

          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Category"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.businessType}
              helperText={errors.businessType}
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
            </TextField>
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
