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
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../../../../../config/Hosts";

export default function UpdateApartment() {
  const { id } = useParams(); // Get the package ID from the URL
  const host = config.host;
  const [packageDetails, setPackageDetails] = useState({});
  const [fields, setFields] = useState([{ amenities: "" }]);
  const [imagePreview, setImagePreview] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [subService, setSubService] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("serviceToken"));
    if (!token) {
      nav("/service-provider/login");
    }

    // Fetch the package details for the edit form
    axios
      .get(`${host}/api/service-provider/getPackageById/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        const data = res.data;
        setPackageDetails(data);

        // Initialize fields with existing amenities
        const amenitiesArray =
          data.amenities && data.amenities.length > 0
            ? data.amenities.map((amenity) => ({ amenities: amenity }))
            : [{ amenities: "" }];
        setFields(amenitiesArray);

        // Set the image preview if a thumbnail exists
        if (data.thumbnail) {
          setImagePreview(`${host}/uploads/${data.thumbnail}`);
        }

        // Set the selected sub-service
        setPackageDetails((prevDetails) => ({
          ...prevDetails,
          sub_service: data.sub_service || ""
        }));
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to fetch package details.");
      });

    // Fetch sub-services
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
  }, [host, id, nav]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const token = JSON.parse(localStorage.getItem("serviceToken"));
      const formData = new FormData();

      formData.append("title", packageDetails.title);
      formData.append("sub_service", packageDetails.sub_service);
      formData.append("price", packageDetails.price);
      formData.append("description", packageDetails.description);
      formData.append(
        "amenities",
        JSON.stringify(fields.map((field) => field.amenities))
      );

      axios
        .put(`${host}/api/service-provider/update-package/${id}`, formData, {
          headers: { "auth-token": token, "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setSuccessAlert(true); // Show success alert
          setTimeout(() => {
            setSuccessAlert(false); // Hide alert after 3 seconds
            nav("/service-provider/manage-package");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error updating package:", error);
          setError("Failed to update package. Please try again.");
        });
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
            Edit Package Details
          </Typography>
          <Link
            to="/service-provider/manage-package"
            style={{ color: "#8bc34a" }}
          >
            <Button
              size="small"
              endIcon={<ArrowForwardIosIcon />}
              sx={{ color: "#8bc34a" }}
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
              onChange={handlePackageDetails}
              variant="outlined"
              size="small"
              fullWidth
              value={packageDetails.title || ""}
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
              onChange={handlePackageDetails}
              variant="outlined"
              size="small"
              fullWidth
              value={packageDetails.price || ""}
              error={!!errors.price}
              helperText={errors.price}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Description"
              name="description"
              onChange={handlePackageDetails}
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              value={packageDetails.description || ""}
              error={!!errors.description}
              helperText={errors.description}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Box>
          <Typography variant="subtitle1">Amenities:</Typography>
          <Grid container spacing={2}>
            {fields.map((field, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={11}>
                    <TextField
                      label={`Amenity ${index + 1}`}
                      name="amenities"
                      value={field.amenities || ""}
                      onChange={(e) => handleFieldChange(index, e)}
                      fullWidth
                      size="small"
                      error={!!errors[`amenities_${index}`]}
                      helperText={errors[`amenities_${index}`]}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    {fields.length > 1 && (
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveField(index)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    )}
                    {fields.length === index + 1 && (
                      <IconButton
                        color="primary"
                        onClick={handleAddField}
                      >
                        <AddIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#331a00',mr: 2 }}
            onClick={handleSubmit}
          >
            Update Package
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => nav("/admin/ManageApartment")}
          >
            Cancel
          </Button>
        </Box>
      </Paper>

      <Snackbar open={successAlert} autoHideDuration={3000} onClose={() => setSuccessAlert(false)}>
        <Alert onClose={() => setSuccessAlert(false)} severity="success">
          Package updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError("")}>
        <Alert onClose={() => setError("")} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
