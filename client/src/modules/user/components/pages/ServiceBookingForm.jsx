
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, CircularProgress, Snackbar, Alert, Grow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';

const ServiceBookingForm = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false); // For success confirmation dialog
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [serviceTime, setServiceTime] = useState('');
  const [amount, setAmount] = useState('');
  const [serviceProviderId, setServiceProviderId] = useState('');
  // const [serviceDate, setServiceDate] = useState('');

  // Get today's date in the format yyyy-mm-dd
  const today = new Date().toISOString().split('T')[0];
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/service-provider/getPackageId/${packageId}`);
        const packageData = response.data.data;

        setAmount(packageData.price);
        setServiceProviderId(packageData.service_provider_id);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch package details. Please try again.');
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError(null);

    if (!serviceProviderId) {
      setError('Service provider is missing. Please try again later.');
      setSubmitting(false);
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID is missing');
      }

      await axios.post('http://localhost:5000/api/booking/createBooking', {
        packageId,
        fullName,
        email: emailAddress,
        phoneNumber,
        serviceDate,
        serviceTime,
        userId,
        serviceProviderId,
        amount,
      });

      setSuccess(true);
      setConfirmationOpen(true); // Open confirmation dialog
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Error booking service');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    navigate('/ViewBookingStatus');
  };

  if (loading) return <CircularProgress />;

  return (
    <Container sx={{ mt: 4 }}>
      <Grow in>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Book Service
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={3} sx={{ boxShadow: 2, borderRadius: 2, p: 2, transition: 'all 0.3s', '&:hover': { boxShadow: 4 } }}>
              <TextField
                fullWidth
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email Address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                error={emailAddress && !validateEmail(emailAddress)}
                helperText={emailAddress && !validateEmail(emailAddress) ? 'Enter a valid email' : ''}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={phoneNumber && !validatePhone(phoneNumber)}
                helperText={phoneNumber && !validatePhone(phoneNumber) ? 'Enter a valid 10-digit phone number' : ''}
                required
                sx={{ mb: 2 }}
              />
              <TextField
      fullWidth
      label="Service Date"
      type="date"
      value={serviceDate}
      onChange={(e) => setServiceDate(e.target.value)}
      InputLabelProps={{ shrink: true }}
      required
      sx={{ mb: 2 }}
      inputProps={{
        min: today, // Set the minimum allowed date to today
      }}
    />
              <TextField
                fullWidth
                label="Service Time"
                type="time"
                value={serviceTime}
                onChange={(e) => setServiceTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Amount"
                value={amount}
                InputProps={{ readOnly: true }}
                required
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting || !fullName || !emailAddress || !phoneNumber || !serviceDate || !serviceTime}
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: '1.1rem',
                width: '100%',
                backgroundColor: 'primary.main',
                transition: 'transform 0.3s',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'translateY(-2px)',
                },
                background: 'linear-gradient(to top, white, #264d73)',
                color: 'black',
                fontWeight: 'bold',
                borderRadius: '5px',
                padding: '10px 20px',
              }}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Box>
      </Grow>

      {/* Success Dialog */}
      <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
        <DialogTitle>Booking Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your booking was successful. Do you want to view your booking status?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default ServiceBookingForm;
