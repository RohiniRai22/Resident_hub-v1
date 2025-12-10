import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import config from "../../../../../config/Hosts";
import { useParams } from "react-router-dom";
import b from "../../../../../../images/bb.jpeg";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckIcon from "@mui/icons-material/Check";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

const MyProfile = () => {
  const [serviceProvider, setServiceProvider] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({});
  const [businessImage, setBusinessImage] = useState(null);
  const host = config.host;
  const nav = useParams();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
        const token = JSON.parse(localStorage.getItem("serviceToken"));
        if (!token) {
            console.error("Service token not found");
            setLoading(false);
            return; // Exit if token is not found
        }

        try {
            const response = await axios.get('http://localhost:5000/api/service-provider/my-profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchProfile();
}, []);

  


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setBusinessImage(e.target.files[0]);
  };

  const handleWorkingHoursChange = (day, type, value) => {
    setFormData((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [type]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    const token = JSON.parse(localStorage.getItem("serviceToken"));
    const formDataWithImage = new FormData();

    // Append non-nested fields
    Object.keys(formData).forEach((key) => {
      if (key !== "workingHours") {
        formDataWithImage.append(key, formData[key]);
      }
    });

    // Serialize workingHours to a JSON string and append it to FormData
    formDataWithImage.append(
      "workingHours",
      JSON.stringify(formData.workingHours)
    );

    if (businessImage) {
      formDataWithImage.append("businessImage", businessImage);
    }

    axios
      .put(`${host}/api/service-provider/update-profile`, formDataWithImage, {
        headers: {
          "auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setServiceProvider(res.data);
        setIsEditable(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!serviceProvider) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        {/* Profile Picture and Business Info */}
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          {isEditable ? "Edit Profile" : "My Profile"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <img
              alt={serviceProvider?.businessName}
              src={
                serviceProvider.profilePicture
                  ? `${host}/api/image/${serviceProvider?.profilePicture}`
                  : b
              }
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "300px",
                margin: "auto",
                display: "block",
                borderRadius: "20px",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            {isEditable ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  gap: "20px",
                }}
              >
                <TextField
                  label="Business Name"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
                <Typography variant="subtitle1" gutterBottom>
                  Upload Business Image:
                </Typography>
                <input type="file" onChange={handleImageChange} />
              </div>
            ) : (
              <>
                <Typography variant="h4">
                  {serviceProvider?.businessName}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Business Type:</strong>{" "}
                  {serviceProvider?.businessType?.name}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Business Email:</strong> {serviceProvider?.email}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Business Phone:</strong> {serviceProvider?.phone}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Business Address:</strong> {serviceProvider?.address}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Description:</strong>{" "}
                  {serviceProvider?.description || "N/A"}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 3 }} />

        {/* Service Provider Details */}
        <Typography variant="h6" gutterBottom>
          Service Provider Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            {isEditable ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
            ) : (
              <>
                <Typography variant="h5">{serviceProvider?.name}</Typography>
                <Typography variant="subtitle1">
                  {serviceProvider?.email}
                </Typography>
                <Typography variant="subtitle1">
                  {serviceProvider?.phone}
                </Typography>
                <Typography variant="subtitle1">
                  {serviceProvider?.address}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 3 }} />

        {/* Working Hours */}
        <Typography variant="h5" gutterBottom>
          Working Hours
        </Typography>
        {isEditable ? (
          <Grid container spacing={2}>
            {Object.keys(formData.workingHours).map((day) => (
              <Grid item xs={12} sm={6} key={day}>
                <Typography variant="subtitle1">
                  <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong>
                </Typography>
                <TextField
                  label="Start Time"
                  type="time"
                  value={formData.workingHours[day]?.start || ""}
                  onChange={(e) =>
                    handleWorkingHoursChange(day, "start", e.target.value)
                  }
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="End Time"
                  type="time"
                  value={formData.workingHours[day]?.end || ""}
                  onChange={(e) =>
                    handleWorkingHoursChange(day, "end", e.target.value)
                  }
                  fullWidth
                  margin="normal"
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {Object.keys(formData.workingHours).map((day) => (
              <Grid item xs={12} sm={6} key={day}>
                <Typography variant="subtitle1">
                  <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong>{" "}
                  {formData.workingHours[day]?.start} -{" "}
                  {formData.workingHours[day]?.end}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}

        <Divider sx={{ marginY: 3 }} />

        {/* Save/Edit Button */}
        <Box sx={{ marginTop: 2 }}>
          {isEditable ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ backgroundColor: "#f53474 !important" }}
            >
              <FileDownloadDoneIcon sx={{ color: "white", mr: 1 }} />
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditable(true)}
              sx={{ backgroundColor: "#8bc34a !important" }}
            >
              <BorderColorIcon sx={{ color: "white", mr: 1 }} />
              Edit
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default MyProfile;
