import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { Link } from 'react-router-dom';

function Banner({ title, toggle }) {
  var bg = "images/home.png";
  if (title == "Our Electric Gadgets") {
    bg = "images/gadgets.png";
  } else if (title == "Our Home Service") {
    bg = "images/hero_bg_2.jpg";
  }

  const handleScrollToSection = () => {
    const element = document.getElementById('servicecard');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "80vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add overlay for better text visibility
        },
      }}
    >
      <Container>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: "light",
                  mb: 2,
                  fontSize: { xs: "2rem", sm: "3rem", md: "4rem" }, // Responsive font size
                }}
              >
                {title}
              </Typography>
              {toggle && (
                <Button
                variant="contained"
                color="primary"
                onClick={handleScrollToSection}
                sx={{
                  mt: 2,
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "gray",
                  },
                }}
              >
                Book Now!
              </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Banner;
