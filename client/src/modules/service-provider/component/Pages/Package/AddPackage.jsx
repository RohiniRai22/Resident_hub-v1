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
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../../../config/Hosts";

export default function AddPackage() {
  const host = config.host;
  const [packageDetails, setPackageDetails] = useState({
    title: '',
    sub_service: '',
    price: '',
    description: '',
  });
  const [fields, setFields] = useState([{ amenities: "" }]);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [subService, setSubService] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("serviceToken"));
    if (!token) {
      nav("/service-provider/login");
    }

    axios
      .get(`${host}/api/admin/my-sub-service`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setSubService(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [host, nav]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handlePackageDetails = (e) => {
    setPackageDetails({ ...packageDetails, [e.target.name]: e.target.value });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleAddField = () => {
    setFields([...fields, { amenities: "" }]);
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleFieldChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!packageDetails.title) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!packageDetails.sub_service) {
      newErrors.sub_service = "Sub service is required";
      isValid = false;
    }
    if (!packageDetails.price) {
      newErrors.price = "Price is required";
      isValid = false;
    }
    if (!image) {
      newErrors.thumbnail = "Thumbnail is required";
      isValid = false;
    }
    if (!packageDetails.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    fields.forEach((field, index) => {
      if (!field.amenities) {
        newErrors[`amenities_${index}`] = "Amenities are required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate form data before submitting
    if (!validateForm()) {
      return;
    }
  
    const formData = new FormData();
    formData.append('title', packageDetails.title);
    formData.append('sub_service', packageDetails.sub_service);
    formData.append('price', packageDetails.price);
    formData.append('description', packageDetails.description);
    formData.append('amenities', JSON.stringify(fields.map(field => field.amenities)));
    formData.append('service_provider_id', JSON.parse(localStorage.getItem("serviceProviderId"))); // Fetch service provider ID from local storage or other source
    if (image) {
      formData.append('thumbnail', image);
    }
  
    try {
      const response = await axios.post(`${host}/api/service-provider/insertPackage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Package added successfully:', response.data);
      setOpen(true); // Show success message
    } catch (error) {
      console.error('Error adding package:', error);
      setError('Error adding package. Please try again.'); // Show error message
    }
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
            Insert Package Details
          </Typography>
          <Link
            to="/service-provider/manage-package"
            style={{ color: "#331a00" }}
          >
            <Button
              size="small"
              endIcon={<ArrowForwardIosIcon />}
              sx={{ color: "#331a00" }}
            >
              View Packages
            </Button>
          </Link>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Title"
              name="title"
              value={packageDetails.title}
              onChange={handlePackageDetails}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.title}
              helperText={errors.title}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="service-select-label">Service</InputLabel>
              <Select
                labelId="service-select-label"
                id="service-select"
                value={packageDetails.sub_service || ""}
                onChange={handlePackageDetails}
                name="sub_service"
                sx={{ height: "40px" }}
                error={!!errors.sub_service}
              >
                {subService.length > 0 ? (
                  subService.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.sub_service}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Sub Services Available</MenuItem>
                )}
              </Select>
              {errors.sub_service && (
                <FormHelperText error>{errors.sub_service}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Price"
              name="price"
              value={packageDetails.price}
              onChange={handlePackageDetails}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.price}
              helperText={errors.price}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <input
              type="file"
              name="thumbnail"
              onChange={handleImage}
              style={{ width: '100%' }}
              id="thumbnail"
              accept="image/*"
            />
            {errors.thumbnail && (
              <FormHelperText error>{errors.thumbnail}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={packageDetails.description}
              onChange={handlePackageDetails}
              variant="outlined"
              size="small"
              multiline
              rows={4}
              fullWidth
              error={!!errors.description}
              helperText={errors.description}
              sx={{ mb: 2 }}
            />
          </Grid>

          {fields.map((field, index) => (
            <Grid item xs={12} md={8} key={index}>
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}
              >
                <TextField
                  label={`Amenities ${index + 1}`}
                  variant="outlined"
                  size="small"
                  name="amenities"
                  value={field.amenities || ""}
                  onChange={(event) => handleFieldChange(index, event)}
                  fullWidth
                  error={!!errors[`amenities_${index}`]}
                  helperText={errors[`amenities_${index}`]}
                />
                {fields.length > 1 && (
                  <IconButton onClick={() => handleRemoveField(index)}>
                    <RemoveIcon />
                  </IconButton>
                )}
                {index === fields.length - 1 && (
                  <IconButton onClick={handleAddField}>
                    <AddIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#331a00' }}
              onClick={handleSubmit}
            >
              Add Package
            </Button>
          </Grid>
        </Grid>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Package added successfully!
          </Alert>
        </Snackbar>
        {error && (
          <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {error}
            </Alert>
          </Snackbar>
        )}
      </Paper>
    </Box>
  );
}
