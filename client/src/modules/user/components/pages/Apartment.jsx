import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  MenuItem,
  Select,
  Box
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Apartment = () => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [apartments, setApartments] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch service list for dropdown
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/get-service')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch apartments on load and on category change
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        let res;
        if (selectedCategory === '') {
          // All apartments
          res = await axios.get('http://localhost:5000/api/apartment/getAllApartments');
        } else {
          // Filtered by category
          res = await axios.get(`http://localhost:5000/api/apartment/apartments-by-category/${selectedCategory}`);
        }
        setApartments(res.data);
        setMessage('');
      } catch (err) {
        if (err.response?.status === 404) {
          setApartments([]);
          setMessage('No apartments found for this category.');
        } else {
          console.error(err);
        }
      }
    };

    fetchApartments();
  }, [selectedCategory]);

  return (
    <Box p={3}>
      {/* Dropdown for filtering */}
      <Select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        displayEmpty
        fullWidth
        sx={{ mb: 4, maxWidth: 400 }}
      >
        <MenuItem value="">All Apartments</MenuItem>
        {services.map(service => (
          <MenuItem key={service._id} value={service._id}>
            {service.name}
          </MenuItem>
        ))}
      </Select>

      {message && <Typography color="error">{message}</Typography>}

      {/* Apartment Cards */}
      <Grid container spacing={3}>
        {apartments.map(apartment => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={apartment._id}>
            <Card
  sx={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: 3,
    transition: '0.3s',
    '&:hover': {
      boxShadow: 8,
      transform: 'translateY(-4px)',
    },
  }}
>
  <CardMedia
    component="img"
    height="180"
    image={`http://localhost:5000/api/image/${apartment.thumbnail}`}
    alt={apartment.name}
    sx={{ objectFit: 'cover' }}
  />
  <CardContent sx={{ flexGrow: 1 }}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      <HomeWorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
      {apartment.name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      <LocationOnIcon fontSize="small" /> {apartment.address}, {apartment.city} - {apartment.zipCode}
    </Typography>
  <Typography
  variant="body2"
  sx={{
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    color: apartment.availabilityStatus === 'Available' ? 'green' : 'red',
  }}
>
  <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
  Status: {apartment.availabilityStatus}
</Typography>

    <Typography variant="body2" color="text.secondary">
      <AttachMoneyIcon fontSize="small" /> Price: ₹{apartment.rentOrSalePrice}
    </Typography>
  </CardContent>
  <Box sx={{ px: 2, pb: 2 }}>
    <Button
      variant="contained"
      style={{backgroundColor: '#331a00', color: 'white'}}
      fullWidth
      onClick={() => navigate(`/apartment/${apartment._id}`)}
    >
      View More
    </Button>
  </Box>
</Card>

          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Apartment;
