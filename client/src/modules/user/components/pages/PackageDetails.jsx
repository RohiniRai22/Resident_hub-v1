import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Container, Card, CardContent, CardMedia, Box, Grid, styled, Button, List, ListItem
} from '@mui/material';
import defaultPackageImage from "../../../../../images/gadgets.png";

// Styled components for custom text and list items
const HighlightedText = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const StarListItem = styled(ListItem)(({ theme }) => ({
  '&::before': {
    content: '"★"',
    fontSize: '1.5rem',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
}));

const PackageDetails = () => {
  const { packageId } = useParams();       // Get packageId from URL
  const navigate = useNavigate();          // Use navigate for routing
  const [packageDetails, setPackageDetails] = useState(null);
  const [error, setError] = useState('');

  // Fetch package details from API
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/package/${packageId}`);
        if (!response.ok) {
          throw new Error('Package not found.');
        }
        const data = await response.json();
        setPackageDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  // Handle error state
  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  // Show loading while fetching
  if (!packageDetails) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  // Handle book now button click
  const handleBookNow = () => {
  const userToken = localStorage.getItem('userToken');  // Get userToken from localStorage

    if (!userToken) {
      // If no token, redirect to login page
      alert('Please Login!!! To book your service')
      navigate('/login');
    } else {
      // If token exists, proceed to booking page
      navigate(`/book/${packageId}`);
    }
  };

  return (
    <Container>
      <Card
        sx={{
          margin: 'auto', marginTop: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          padding: 4
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 'bold',
            fontFamily: 'Georgia, serif',
            fontSize: '2.5rem',
            background: 'linear-gradient(to left, blue, lightblue)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
            marginBottom: '1rem',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          {packageDetails.title}-
          ₹{packageDetails.price}
        
        </Typography>

        {/* Image for package */}
        <CardMedia
          component="img"
          height="400"
          image={packageDetails.thumbnail ? `http://localhost:5000/api/image/${packageDetails.thumbnail}` : defaultPackageImage}
          alt={packageDetails.title}
          sx={{ borderRadius: 8, marginBottom: 2 }}
        />

        {/* Description */}
        <Typography variant="body1" gutterBottom align="center" sx={{ marginBottom: 2, lineHeight: 1.6 }}>
          {packageDetails.description}
        </Typography>

        {/* Package details */}
        <CardContent>
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
           
            <Grid item xs={12} sm={8}>
              <Typography variant="body1" gutterBottom>
              <strong>Amenities:</strong>
              </Typography>
              <List>
                {packageDetails.amenities.map((amenity, index) => (
                  <StarListItem key={index}>
                    <Typography variant="body2">{amenity}</Typography>
                  </StarListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>

        {/* Book Now button */}
        <Box mt={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleBookNow} style={{
      background: 'linear-gradient(to top, white, #264d73)',  // 45-degree white and blue gradient
      color: 'black',  // Text color
      fontWeight: 'bold',
      borderRadius: '5px',
      padding: '10px 20px',  // Adjusts padding for a nicer look
      transition: 'box-shadow 0.3s ease-in-out',
    }}>
            Book Now
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default PackageDetails;
