import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Animation for fading in
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styles for the section and category card
const SectionBox = styled(Box)(({
  marginTop: '20px',
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '8px',
  animation: `${fadeIn} 2s ease-in-out`,
  textAlign: 'center',
}));

const ProviderCard = styled(Card)(({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: '10px',
  width: '300px',
  height: 'auto',
  padding: '16px',
  transition: 'transform 0.3s ease-in-out',
  backgroundColor: '#f9f9f9', // Background color for card
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'scale(1.05)',
    cursor: 'pointer',
  },
  margin: '0 auto',
}));

const ProviderImage = styled(CardMedia)(({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '10px',
}));

const ProviderName = styled(Typography)(({
  marginTop: '10px',
  fontWeight: 'bold',
  color: '#333', // Text color for name
}));

const ProviderDetails = styled(Typography)(({
  color: '#777',
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const IconWrapper = styled(Box)(({
  marginRight: '8px',
}));

// Main component
export default function ViewServiceProvider() {
  const [serviceProviders, setServiceProviders] = useState([]);
  const navigate = useNavigate();

  // Fetch service providers from the API
  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/service-provider/getAllServiceProviders');
        setServiceProviders(response.data);
      } catch (error) {
        console.error('Error fetching service providers:', error);
      }
    };

    fetchServiceProviders();
  }, []);

  // Handle click event to navigate to service provider details
  const handleProviderClick = (provider) => {
    navigate(`/ServiceProviderDetail/${provider._id}`);
  };

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Our Service Providers
      </Typography>
      <SectionBox>
        <Typography variant="body1" paragraph style={{ fontSize: '20px', textAlign: 'justify' }}>
          Explore our diverse range of service providers and find the right professional for your needs.
        </Typography>
        {serviceProviders.length > 0 ? (
          <Slider {...settings}>
            {serviceProviders.map((provider) => (
              <Box key={provider._id}>
                <ProviderCard>
                  {/* Uncomment if you have profile images */}
                  {/* <ProviderImage
                    component="img"
                    image={`http://localhost:5000/api/image/${provider.profilePicture}`}
                    alt={provider.name}
                  /> */}
                      <ProviderDetails variant="h6">
                 {provider.businessName}
                  </ProviderDetails>
                  {/* <ProviderName variant="body2">
                    {provider.name}
                  </ProviderName> */}
                  <ProviderDetails variant="body2">
                    <IconWrapper><EmailIcon /></IconWrapper>
                    {provider.email}
                  </ProviderDetails>
                  <ProviderDetails variant="body2">
                    <IconWrapper><PhoneIcon /></IconWrapper>
                    {provider.phone}
                  </ProviderDetails>
                  <ProviderDetails variant="body2">
                    <IconWrapper><LocationOnIcon /></IconWrapper>
                    {provider.address}
                  </ProviderDetails>
                  {/* <ProviderDetails variant="body2">
                    <strong>Status:</strong> {provider.status}
                  </ProviderDetails> */}
              
                  {/* <ProviderDetails variant="body2">
                    <strong>Business Type:</strong> {provider.businessType}
                  </ProviderDetails> */}
                </ProviderCard>
              </Box>
            ))}
          </Slider>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Loading...
          </Typography>
        )}
      </SectionBox>
    </Container>
  );
}
