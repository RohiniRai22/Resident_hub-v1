import React, { useEffect, useState } from "react";
import {
  Box, Paper, Grid, TextField, Button, IconButton, Snackbar,
  Alert, Typography, Select, FormControl, InputLabel,
  MenuItem, FormHelperText
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../../../config/Hosts";

export default function AddApartment() {
  const host = config.host;
  const nav = useNavigate();

  const [apartmentDetails, setApartmentDetails] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
    areaSqFt: '',
    rentOrSalePrice: '',
    // availabilityStatus: '',
    contactName: '',
    contactPhone: '',
    apartcategory: ''
  });

  const [amenities, setAmenities] = useState([{ amenities: "" }]);
  const [thumbnail, setThumbnail] = useState(null);  // single file
  const [subService, setSubService] = useState([]);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${host}/api/admin/get-service`)
      .then((res) => setSubService(res.data))
      .catch((err) => console.error("Error fetching services:", err));
  }, [host]);

  const handleChange = (e) => {
    setApartmentDetails({ ...apartmentDetails, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleAmenitiesChange = (index, e) => {
    const updated = [...amenities];
    updated[index].amenities = e.target.value;
    setAmenities(updated);
    setErrors((prev) => ({ ...prev, [`amenities_${index}`]: "" }));
  };

  const handleAddAmenity = () => setAmenities([...amenities, { amenities: "" }]);

  const handleRemoveAmenity = (index) => {
    const updated = [...amenities];
    updated.splice(index, 1);
    setAmenities(updated);
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
      setErrors((prev) => ({ ...prev, thumbnail: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.entries(apartmentDetails).forEach(([key, val]) => {
      if (!val) {
        newErrors[key] = "This field is required";
        isValid = false;
      }
    });

    amenities.forEach((field, index) => {
      if (!field.amenities.trim()) {
        newErrors[`amenities_${index}`] = "Amenity is required";
        isValid = false;
      }
    });

    if (!thumbnail) {
      newErrors.thumbnail = "At least one image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();

    // Append all apartment details, converting rentOrSalePrice to Number
    Object.entries(apartmentDetails).forEach(([key, val]) => {
      if (key === "rentOrSalePrice") {
        formData.append(key, Number(val));
      } else {
        formData.append(key, val);
      }
    });

    // Append amenities as JSON string
    formData.append("amenities", JSON.stringify(amenities.map(a => a.amenities)));

    // Append thumbnail file
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await axios.post(
        `${host}/api/apartment/insertApartment`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Apartment added:", response.data);
      setOpen(true);
      // Reset form after success
      setApartmentDetails({
        name: '',
        address: '',
        city: '',
        zipCode: '',
        areaSqFt: '',
        rentOrSalePrice: '',
        // availabilityStatus: '',
        contactName: '',
        contactPhone: '',
        apartcategory: ''
      });
      setAmenities([{ amenities: "" }]);
      setThumbnail(null);
      setErrors({});
    } catch (err) {
      console.error("Submission error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Error adding apartment. Please check your form and try again.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  return (
    <Box sx={{ height: "100%", p: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ color: "#331a00" }}>Insert Apartment Details</Typography>
          <Link to="/admin/ManageApartment">
            <Button size="small" endIcon={<ArrowForwardIosIcon />} sx={{ color: "#331a00" }}>
              View Apartment
            </Button>
          </Link>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Name"
              name="name"
              value={apartmentDetails.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Address"
              name="address"
              value={apartmentDetails.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="City"
              name="city"
              value={apartmentDetails.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Zip Code"
              name="zipCode"
              value={apartmentDetails.zipCode}
              onChange={handleChange}
              error={!!errors.zipCode}
              helperText={errors.zipCode}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Area (sq. ft.)"
              name="areaSqFt"
              value={apartmentDetails.areaSqFt}
              onChange={handleChange}
              error={!!errors.areaSqFt}
              helperText={errors.areaSqFt}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Rent or Sale Price"
              name="rentOrSalePrice"
              type="number"
              value={apartmentDetails.rentOrSalePrice}
              onChange={handleChange}
              error={!!errors.rentOrSalePrice}
              helperText={errors.rentOrSalePrice}
              fullWidth
              size="small"
            />
          </Grid>

          {/* <Grid item xs={12} md={3}>
            <FormControl fullWidth error={!!errors.availabilityStatus} size="small">
              <InputLabel>Status</InputLabel>
              <Select
                name="availabilityStatus"
                value={apartmentDetails.availabilityStatus}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Occupied">Occupied</MenuItem>
              </Select>
              <FormHelperText>{errors.availabilityStatus}</FormHelperText>
            </FormControl>
          </Grid> */}

          <Grid item xs={12} md={3}>
            <TextField
              label="Contact Name"
              name="contactName"
              value={apartmentDetails.contactName}
              onChange={handleChange}
              error={!!errors.contactName}
              helperText={errors.contactName}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Contact Phone"
              name="contactPhone"
              value={apartmentDetails.contactPhone}
              onChange={handleChange}
              error={!!errors.contactPhone}
              helperText={errors.contactPhone}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.apartcategory} size="small">
              <InputLabel>Category</InputLabel>
              <Select
                name="apartcategory"
                value={apartmentDetails.apartcategory}
                onChange={handleChange}
                label="Category"
              >
                {subService.length ? (
                  subService.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Services</MenuItem>
                )}
              </Select>
              <FormHelperText>{errors.apartcategory}</FormHelperText>
            </FormControl>
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12} md={3}>
            <input
              type="file"
              name="thumbnail"
              onChange={handleThumbnailChange}
              style={{ width: "100%" }}
              id="thumbnail"
              accept="image/*"
            />
            {errors.thumbnail && (
              <FormHelperText error>{errors.thumbnail}</FormHelperText>
            )}
          </Grid>

          {/* Amenities */}
          {amenities.map((field, index) => (
            <Grid item xs={12} md={8} key={index}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
                <TextField
                  label={`Amenity ${index + 1}`}
                  value={field.amenities}
                  onChange={(e) => handleAmenitiesChange(index, e)}
                  error={!!errors[`amenities_${index}`]}
                  helperText={errors[`amenities_${index}`]}
                  fullWidth
                  size="small"
                />
                <IconButton
                  color="primary"
                  onClick={handleAddAmenity}
                  aria-label="Add Amenity"
                  size="large"
                >
                  <AddIcon />
                </IconButton>
                {amenities.length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveAmenity(index)}
                    aria-label="Remove Amenity"
                    size="large"
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>
          ))}

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              // color="primary"
              style={{ backgroundColor: "#331a00", color: "white" }}
              onClick={handleSubmit}
              fullWidth
            >
              Add Apartment
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Apartment Added Successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
