import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Typography, Box, Card, CardContent, CircularProgress } from '@mui/material';

const ServiceProviderProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            // Fetch the service provider's token from localStorage
            const serviceToken = localStorage.getItem("serviceToken");

            // Ensure the token is present
            if (!serviceToken) {
                throw new Error("Service Provider is not logged in.");
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${serviceToken}`, // Use the service provider token here
                },
            };

            // Make the request to fetch the profile
            const response = await axios.get('http://localhost:5000/api/service-provider/my-profile', config);

            // Handle the successful response
            console.log('Profile data:', response.data);
            setProfileData(response.data);
        } catch (error) {
            // Handle and log different error scenarios
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
                setError(`Error: ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                console.error('Error Request:', error.request);
                setError('No response received from the server.');
            } else {
                console.error('Error Message:', error.message);
                setError('An error occurred: ' + error.message);
            }
        }
    };

    fetchProfile();
}, []);

  

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, padding: 2 }}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            alt={profile.name}
            src={profile.profilePicture || '/default-avatar.png'} // Fallback image
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
          <Typography variant="h5">{profile.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {profile.businessName} - {profile.businessType?.name || 'No Business Type'}
          </Typography>
        </Box>
        <Box mt={3}>
          <Typography variant="h6">Contact Information:</Typography>
          <Typography variant="body2">Email: {profile.email}</Typography>
          <Typography variant="body2">Phone: {profile.phone}</Typography>
          <Typography variant="body2">Address: {profile.address}</Typography>
        </Box>
        <Box mt={3}>
          <Typography variant="h6">Business Description:</Typography>
          <Typography variant="body2">{profile.description || 'No description provided'}</Typography>
        </Box>
        <Box mt={3}>
          <Typography variant="h6">Working Hours:</Typography>
          {Object.entries(profile.workingHours || {}).map(([day, hours]) => (
            <Typography variant="body2" key={day}>
              {day}: {hours.start || 'N/A'} - {hours.end || 'N/A'}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ServiceProviderProfile;
