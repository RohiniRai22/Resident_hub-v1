import React, { useState } from "react";
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

export default function AddCourse() {
  const host = "http://127.0.0.1:5000";
  const [courseDetails, setCourseDetails] = useState({});
  const [fields, setFields] = useState([{ roadmap: "" }]);
  const [chapters, setChapters] = useState([
    { title: "", content: "", description: "" },
  ]);
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCourseDetails = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleAddField = () => {
    setFields([...fields, { roadmap: "" }]);
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  const handleAddChapter = () => {
    setChapters([...chapters, { title: "", content: "", description: "" }]);
  };

  const handleRemoveChapter = (index) => {
    const values = [...chapters];
    values.splice(index, 1);
    setChapters(values);
  };

  const handleChangeChapter = (index, event) => {
    const values = [...chapters];
    values[index][event.target.name] = event.target.value;
    setChapters(values);
    setErrors((prev) => ({
      ...prev,
      [`chapter_${index}_${event.target.name}`]: "",
    }));
  };

  const handleImage = (e) => {
    setImage({ ...image, [e.target.name]: e.target.files[0] });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!courseDetails.title) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!courseDetails.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }
    if (!courseDetails.level) {
      newErrors.level = "Level is required";
      isValid = false;
    }
    if (!image.thumbnail) {
      newErrors.thumbnail = "Thumbnail is required";
      isValid = false;
    }
    if (!courseDetails.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    fields.forEach((field, index) => {
      if (!field.roadmap) {
        newErrors[`roadmap_${index}`] = "Roadmap is required";
        isValid = false;
      }
    });
    chapters.forEach((chapter, index) => {
      if (!chapter.title) {
        newErrors[`chapter_${index}_title`] = "Title is required";
        isValid = false;
      }
      if (!chapter.content) {
        newErrors[`chapter_${index}_content`] = "Content is required";
        isValid = false;
      }
      if (!chapter.description) {
        newErrors[`chapter_${index}_description`] = "Description is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const Data = new FormData();
    Data.append("title", courseDetails.title);
    Data.append("category", courseDetails.category);
    Data.append("level", courseDetails.level);
    Data.append("thumbnail", image.thumbnail);
    Data.append("description", courseDetails.description);
    Data.append("roadmap", JSON.stringify(fields));
    Data.append("chapters", JSON.stringify(chapters));

    axios
      .post(`${host}/api/admin/insertcourse`, Data)
      .then((res) => {
        if (res.data) {
          setOpen(true);
        } else {
          console.log("some error occurred");
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
            sx={{ color: "#f53474" }}
          >
            Insert Service Details
          </Typography>
          <Link to="/admin/manage-course" style={{ color: "#8bc34a" }}>
            <Button
              size="small"
              endIcon={<ArrowForwardIosIcon />}
              sx={{ color: "#8bc34a" }}
            >
              View Services
            </Button>
          </Link>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Title"
              name="title"
              onChange={handleCourseDetails}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.title}
              helperText={errors.title}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Category"
              name="category"
              onChange={handleCourseDetails}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.category}
              helperText={errors.category}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Level"
              name="level"
              onChange={handleCourseDetails}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.level}
              helperText={errors.level}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              type="file"
              InputLabelProps={{ shrink: true }}
              name="thumbnail"
              onChange={handleImage}
              label="Upload Thumbnail"
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.thumbnail}
              helperText={errors.thumbnail}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              onChange={handleCourseDetails}
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
                  label={`Roadmap ${index + 1}`}
                  variant="outlined"
                  size="small"
                  name="roadmap"
                  value={field.roadmap}
                  onChange={(event) => handleChange(index, event)}
                  fullWidth
                  error={!!errors[`roadmap_${index}`]}
                  helperText={errors[`roadmap_${index}`]}
                />
                {index > 0 && (
                  <IconButton
                    aria-label="remove"
                    onClick={() => handleRemoveField(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} md={8}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleAddField}
              startIcon={<AddIcon />}
              sx={{
                color: "#8bc34a !important",
                border: "1px solid #8bc34a !important",
              }}
            >
              Add Field
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ background: "#8bc34a !important", width: "400px" }}
          >
            Submit
          </Button>
        </Box>
      </Paper>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Course Added Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
