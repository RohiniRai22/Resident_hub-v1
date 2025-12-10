import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Button
} from '@mui/material';

const SingleApartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  axios.get(`http://localhost:5000/api/apartment/getApartmentById/${id}`)
    .then(res => {
      setApartment(res.data.data);  // <-- fix here
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
}, [id]);


  if (loading) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;
  if (!apartment) return <Typography textAlign="center" mt={5}>Apartment not found</Typography>;

  return (
    <Box p={3}>
      <Card sx={{ maxWidth: 800, margin: 'auto' }}>
        <CardMedia
          component="img"
          height="300"
          image={`http://localhost:5000/api/image/${apartment.thumbnail}`}
          
          alt={apartment.name}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>{apartment.name}</Typography>
          <Typography variant="body1" gutterBottom>
            Address: {apartment.address}, {apartment.city} - {apartment.zipCode}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Status: {apartment.availabilityStatus}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Price: ₹{apartment.rentOrSalePrice}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Contact: {apartment.contactName} ({apartment.contactPhone})
          </Typography>
          {apartment.amenities?.length > 0 && (
            <Typography variant="body1" gutterBottom>
              Amenities: {apartment.amenities.join(', ')}
            </Typography>
          )}
          {/* Book Now Button */}
        <Box mt={2} textAlign="center">
  <Button
    variant="contained"
    disabled={apartment.availabilityStatus === 'Occupied'}
    onClick={() => navigate(`/apartmentbook/${id}`)}
    sx={{
      backgroundColor:
        apartment.availabilityStatus === 'Occupied' ? 'gray' : '#264d73',
      color: '#fff',
      fontWeight: 'bold',
      px: 4,
      py: 1,
      '&:hover': {
        backgroundColor:
          apartment.availabilityStatus === 'Occupied' ? 'gray' : '#1b3a57'
      }
    }}
  >
    {apartment.availabilityStatus === 'Occupied' ? 'Not Available' : 'Book Now'}
  </Button>
</Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleApartment;
