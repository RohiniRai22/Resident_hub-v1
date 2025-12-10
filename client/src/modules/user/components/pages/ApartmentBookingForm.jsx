// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Container, Typography, Box, TextField, Button, CircularProgress,
//   Snackbar, Alert, Grow, Dialog, DialogActions, DialogContent,
//   DialogContentText, DialogTitle
// } from '@mui/material';
// import axios from 'axios';

// const ApartmentBookingForm = () => {
//   const { apartmentId } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [confirmationOpen, setConfirmationOpen] = useState(false);

//   const [fullName, setFullName] = useState('');
//   const [emailAddress, setEmailAddress] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [amount, setAmount] = useState('');

//   useEffect(() => {
//     const fetchApartmentDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/apartment/getApartmentById/${apartmentId}`);
//         const apartment = response.data.data;
//         console.log('Apartment data:', apartment); // ✅ Debug log
//         setAmount(apartment.rentOrSalePrice?.toString() || ''); // ✅ Convert safely to string
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch apartment details');
//         setLoading(false);
//       }
//     };
//     fetchApartmentDetails();
//   }, [apartmentId]);

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setSuccess(false);
//     setError(null);

//     try {
//       const userId = localStorage.getItem('userId');
//       if (!userId) throw new Error('User ID not found');

//       await axios.post('http://localhost:5000/api/booking/createBooking', {
//         fullName,
//         email: emailAddress,
//         phoneNumber,
//         address,
//         amount,
//         userId,
//         apartmentId,
//       });

//       setSuccess(true);
//       setConfirmationOpen(true);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Booking failed');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleConfirmationClose = () => {
//     setConfirmationOpen(false);
//     navigate('/ViewBookingStatus');
//   };

//   if (loading) return <CircularProgress />;

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Grow in>
//         <Box>
//           <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
//             Book Apartment
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Box mb={3} sx={{ boxShadow: 2, borderRadius: 2, p: 2 }}>
//               <TextField
//                 fullWidth
//                 label="Full Name"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 required
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 value={emailAddress}
//                 onChange={(e) => setEmailAddress(e.target.value)}
//                 error={emailAddress && !validateEmail(emailAddress)}
//                 helperText={emailAddress && !validateEmail(emailAddress) ? 'Enter a valid email' : ''}
//                 required
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Phone Number"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 error={phoneNumber && !validatePhone(phoneNumber)}
//                 helperText={phoneNumber && !validatePhone(phoneNumber) ? 'Enter a valid 10-digit phone number' : ''}
//                 required
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 required
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Amount"
//                 value={amount}
//                 InputProps={{ readOnly: true }}
//                 required
//               />
//             </Box>

//             <Button
//               type="submit"
//               variant="contained"
//               disabled={submitting}
//               sx={{
//                 mt: 3,
//                 py: 1.5,
//                 fontSize: '1.1rem',
//                 width: '100%',
//                 background: 'linear-gradient(to top, white, #264d73)',
//                 color: 'black',
//                 fontWeight: 'bold',
//                 borderRadius: '5px',
//               }}
//             >
//               {submitting ? 'Submitting...' : 'Book Now'}
//             </Button>
//           </form>
//         </Box>
//       </Grow>

//       <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
//         <DialogTitle>Booking Successful</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Your booking was successful. Do you want to view your booking status?</DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleConfirmationClose} color="primary" autoFocus>OK</Button>
//         </DialogActions>
//       </Dialog>

//       {error && (
//         <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
//           <Alert severity="error">{error}</Alert>
//         </Snackbar>
//       )}
//     </Container>
//   );
// };

// export default ApartmentBookingForm;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, TextField, Button, CircularProgress,
  Snackbar, Alert, Grow, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle
} from '@mui/material';
import axios from 'axios';

const ApartmentBookingForm = () => {
  const { apartmentId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  // Fetch apartment details
  useEffect(() => {
    const fetchApartmentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/apartment/getApartmentById/${apartmentId}`);
        const apartment = response.data.data;
        setAmount(apartment.rentOrSalePrice?.toString() || '');
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch apartment details');
        setLoading(false);
      }
    };
    fetchApartmentDetails();
  }, [apartmentId]);

  // Fetch user details and prefill form
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('User ID not found in localStorage');
        const response = await axios.get(`http://localhost:5000/api/user/getUserById/${userId}`);
        const user = response.data;
        setFullName(user.name || '');
        setEmailAddress(user.email || '');
        setPhoneNumber(user.phone || '');
        setAddress(user.address || '');
      } catch (err) {
        console.error('Failed to fetch user details:', err.message);
      }
    };
    fetchUserDetails();
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError(null);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('User ID not found');

      await axios.post('http://localhost:5000/api/booking/createBooking', {
        fullName,
        email: emailAddress,
        phoneNumber,
        address,
        amount,
        userId,
        apartmentId,
      });

      setSuccess(true);
      setConfirmationOpen(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    
    navigate('/ViewBookingStatus');
  };
  const handleCancel = () => {
    // Navigate to home
    navigate('/');
  };

  if (loading) return <CircularProgress />;

  return (
    <Container sx={{ mt: 4 }}>
      <Grow in>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Book Apartment
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={3} sx={{ boxShadow: 2, borderRadius: 2, p: 2 }}>
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
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
              disabled={submitting}
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: '1.1rem',
                width: '100%',
                background: 'linear-gradient(to top, white, #264d73)',
                color: 'black',
                fontWeight: 'bold',
                borderRadius: '5px',
              }}
            >
              {submitting ? 'Submitting...' : 'Book Now'}
            </Button>
          </form>
        </Box>
      </Grow>

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
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>

      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default ApartmentBookingForm;
