import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

function Slider() {
  return (
    <Carousel
      infiniteLoop
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
      autoPlay
      interval={5000}
    >
      {/* Slide 1 */}
      <Box
        sx={{
          height: "100vh",
          backgroundImage: "url(images/bg1.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          color: "white",
        }}
      >
        <Container>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12} md={10}>
              <Box sx={{ p: 3, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 4 }}>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                    letterSpacing: "2px",
                  }}
                >
                  Hassle-Free Apartment Services at Your Doorstep
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    color: "lightgray",
                  }}
                >
                  Trusted Electricians, Plumbers, Cleaners & More
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff6f00",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    borderRadius: "50px",
                    transition: "0.5s",
                    "&:hover": {
                      backgroundColor: "#e65100",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  Book Service
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Slide 2 */}
      <Box
        sx={{
          height: "100vh",
          backgroundImage: "url(images/bg3.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          color: "white",
        }}
      >
        <Container>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12} md={10}>
              <Box sx={{ p: 3, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 4 }}>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                    letterSpacing: "2px",
                  }}
                >
                  Reliable Maintenance for Every Apartment Need
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    color: "lightgray",
                  }}
                >
                  24/7 Availability · Verified Professionals · Quick Support
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff6f00",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    borderRadius: "50px",
                    transition: "0.5s",
                    "&:hover": {
                      backgroundColor: "#e65100",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  Request Assistance
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Slide 3 */}
      <Box
        sx={{
          height: "100vh",
          backgroundImage: "url(images/bg2.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          color: "white",
        }}
      >
        <Container>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12} md={10}>
              <Box sx={{ p: 3, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 4 }}>
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    mb: 1,
                    letterSpacing: "1.5px",
                  }}
                >
                  Welcome to SwiftServe
                </Typography>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                  }}
                >
                  Your Apartment’s Personal Caretaker
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff6f00",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    borderRadius: "50px",
                    transition: "0.5s",
                    "&:hover": {
                      backgroundColor: "#e65100",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  Explore Services
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Carousel>
  );
}

export default Slider;
