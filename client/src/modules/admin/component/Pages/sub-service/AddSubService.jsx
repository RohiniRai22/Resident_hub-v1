import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../../../config/Hosts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AddSubService() {
  const host = config.host;
  const [serviceDetails, setServiceDetails] = useState({});
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [service, setService] = useState([]);

  useEffect(() => {
    axios
      .get(`${host}/api/admin/get-service`)
      .then((res) => {
        console.log(res);
        setService(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleData = (e) => {
    setServiceDetails({ ...serviceDetails, [e.target.name]: e.target.value });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!serviceDetails.service_id) {
      newErrors.title = "Service  is required";
      isValid = false;
    }
    if (!serviceDetails.sub_service) {
      newErrors.title = "Service  is required";
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
      .post(`${host}/api/admin/add-sub-service`, serviceDetails)
      .then((res) => {
        if (res.data.success) {
          toast.success("Sub-Service Added Successfully");
        } else {
          console.log("some error occurred");
          toast.error("Adding Service Failed");
        }
      })
      .catch((err) => {
        console.log(err);
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
            Insert Sub-Service Details
          </Typography>
          <Link to="/admin/manage-sub-service" style={{ color: "#8bc34a" }}>
            <Button
              size="small"
              endIcon={<ArrowForwardIosIcon />}
              sx={{ color: "#331a00" }}
            >
              View Sub-Services
            </Button>
          </Link>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl sx={{ minWidth: 550 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Service
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={serviceDetails?.service_id}
                label="Service"
                name="service_id"
                onChange={handleData}
              >
                {service.map((item) => (
                  <MenuItem value={item._id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Sub Service Name"
              name="sub_service"
              onChange={handleData}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.title}
              helperText={errors.title}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
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
