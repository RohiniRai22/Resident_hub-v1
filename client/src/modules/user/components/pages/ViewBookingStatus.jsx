// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField, IconButton, Menu, MenuItem } from '@mui/material';
// import FeedbackIcon from '@mui/icons-material/Feedback';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import PaymentIcon from '@mui/icons-material/Payment';
// import QRCode from 'react-qr-code';

// const ViewBookingStatus = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [feedbackOpen, setFeedbackOpen] = useState(false);
//   const [paymentOpen, setPaymentOpen] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [transactionId, setTransactionId] = useState('');
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBookings = async () => {
//       const userId = localStorage.getItem('userId');
//       if (!userId) {
//         alert('Please log in to view your bookings.');
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await axios.get(`http://localhost:5000/api/Booking/getBookingsByUserId/${userId}`);
//         if (response.data.success) {
//           if (response.data.data.length === 0) {
//             alert('You have not made any bookings. Please make a booking to view your booking status.');
//             navigate('/services');
//           } else {
//             setBookings(response.data.data);
//           }
//         } else {
//           setError(response.data.message || 'No bookings found.');
//         }
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//         setError('Error fetching bookings.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, [navigate]);

//   const handleFeedbackOpen = (booking) => {
//     setSelectedBooking(booking);
//     setFeedbackOpen(true);
//   };

//   const handleFeedbackClose = () => {
//     setFeedbackOpen(false);
//     setSelectedBooking(null);
//   };

//   const handleFeedbackSubmit = async () => {
//     if (!selectedBooking) return;

//     try {
//       const feedbackData = {
//         userId: selectedBooking.emailAddress,
//         orderId: selectedBooking._id,
//         name,
//         email,
//         message: feedback
//       };

//       const response = await axios.post('http://localhost:5000/api/Feedback/submit', feedbackData);

//       if (response.status === 201) {
//         setFeedbackSubmitted(true);
//         alert('Thank you for your feedback!');
//       } else {
//         console.error('Failed to submit feedback');
//       }
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//     } finally {
//       handleFeedbackClose();
//       setName('');
//       setEmail('');
//       setFeedback('');
//     }
//   };

//   const handlePaymentOpen = (booking) => {
//     setSelectedBooking(booking);
//     setPaymentOpen(true);
//   };

//   const handlePaymentClose = () => {
//     setPaymentOpen(false);
//     setSelectedBooking(null);
//     setTransactionId('');
//   };

//   const handleSubmitPayment = async () => {
//     if (!selectedBooking || !transactionId) {
//       alert('Please provide valid payment details.');
//       return;
//     }
  
//     const paymentData = {
//       orderId: selectedBooking._id, 
//       transactionId,
//       amount: selectedBooking.amount, // Include the amount
//     };
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/payment/process', paymentData);
  
//       if (response.status === 200) {
//         alert('Payment successful!');
//         handlePaymentClose();
//       }
//     } catch (error) {
//       console.error('Error processing payment:', error);
//     }
//   };
  
  
  

//   const handleMenuClick = (event, booking) => {
//     setSelectedBooking(booking);
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedBooking(null);
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box sx={{ width: '100%', padding: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Booking Status
//       </Typography>
//       {feedbackSubmitted && (
//         <Typography variant="h6" sx={{ color: 'green', marginBottom: 2 }}>
//           Thank you for your feedback!
//         </Typography>
//       )}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Booking ID</TableCell>
//               <TableCell>Full Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone Number</TableCell>
//               <TableCell>Service Date</TableCell>
//               <TableCell>Service Time</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {bookings.length > 0 ? (
//               bookings.map((booking) => (
//                 <TableRow key={booking._id}>
//                   <TableCell>{booking._id}</TableCell>
//                   <TableCell>{booking.fullName}</TableCell>
//                   <TableCell>{booking.email}</TableCell>
//                   <TableCell>{booking.phoneNumber}</TableCell>
//                   <TableCell>{new Date(booking.serviceDate).toLocaleDateString()}</TableCell>
//                   <TableCell>{booking.serviceTime}</TableCell>
//                   <TableCell>{booking.status}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={(e) => handleMenuClick(e, booking)}>
//                       <MoreVertIcon />
//                     </IconButton>
//                     <Menu
//                       anchorEl={anchorEl}
//                       open={Boolean(anchorEl) && selectedBooking?._id === booking._id}
//                       onClose={handleMenuClose}
//                     >
//                       {booking.status === 'Completed' && !feedbackSubmitted ? (
//                         <MenuItem onClick={() => handleFeedbackOpen(booking)}>
//                           <FeedbackIcon sx={{ marginRight: 1 }} />
//                           Give Feedback
//                         </MenuItem>
//                       ) : (
//                         booking.status === 'Completed' && (
//                           <MenuItem disabled>
//                             <FeedbackIcon sx={{ marginRight: 1 }} />
//                             Feedback Given
//                           </MenuItem>
//                         )
//                       )}
//                       {booking.status === 'Confirmed' && (
//                         <MenuItem onClick={() => handlePaymentOpen(booking)}>
//                           <PaymentIcon sx={{ marginRight: 1 }} />
//                           Pay Now
//                         </MenuItem>
//                       )}
//                     </Menu>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={8} align="center">
//                   No bookings found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Feedback Modal */}
//       <Modal open={feedbackOpen} onClose={handleFeedbackClose}>
//         <Box sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           bgcolor: 'background.paper',
//           border: '2px solid #000',
//           boxShadow: 24,
//           p: 4,
//         }}>
//           <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
//             Give Feedback
//           </Typography>
//           <TextField
//             label="Name"
//             fullWidth
//             margin="normal"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <TextField
//             label="Email"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             label="Feedback"
//             fullWidth
//             multiline
//             rows={4}
//             margin="normal"
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//           />
//           <Button variant="contained" sx={{ mt: 2 }} onClick={handleFeedbackSubmit}>
//             Submit
//           </Button>
//         </Box>
//       </Modal>

//       {/* Payment Modal */}
//       <Modal open={paymentOpen} onClose={handlePaymentClose}>
//         <Box sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           bgcolor: 'background.paper',
//           border: '2px solid #000',
//           boxShadow: 24,
//           p: 4,
//         }}>
//           <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
//       Payment Form
//     </Typography>
//           {/* <QRCode value={`http://localhost:5000/api/Payment/qr/${selectedBooking?._id}`} /> */}
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <QRCode value={`upi://pay?pa=your-upi-id&pn=Your+Name&am=${selectedBooking?.amount}&cu=INR`} size={256} />
//       <Typography variant="body2" sx={{ mt: 2 }}>
//         {/* Scan the QR code to pay ₹{selectedBooking?.amount} */}
//         Scan the QR code to pay
//       </Typography>
//     </Box>
//           <TextField
//             label="Transaction ID"
//             fullWidth
//             margin="normal"
//             value={transactionId}
//             onChange={(e) => setTransactionId(e.target.value)}
//           />
//           <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmitPayment}>
//             Submit Payment
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default ViewBookingStatus;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  Modal, TextField, IconButton, Menu, MenuItem
} from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PaymentIcon from '@mui/icons-material/Payment';
import QRCode from 'react-qr-code';

const ViewBookingStatus = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionError, setTransactionError] = useState('');
  const navigate = useNavigate();

  // 🔁 Extract fetchBookings so we can re-use it
  const fetchBookings = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please log in to view your bookings.');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/Booking/getBookingsByUserId/${userId}`);
      if (response.data.success) {
        if (response.data.data.length === 0) {
          alert('You have not made any bookings. Please make a booking to view your booking status.');
          navigate('/Apartment');
        } else {
          setBookings(response.data.data);
        }
      } else {
        setError(response.data.message || 'No bookings found.');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Error fetching bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(); // ⏳ Initial fetch
  }, []);

  const handleFeedbackOpen = (booking) => {
    setSelectedBooking(booking);
    setFeedbackOpen(true);
  };

  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
    setSelectedBooking(null);
  };

  const handleFeedbackSubmit = async () => {
    if (!selectedBooking) return;
    if (!selectedBooking.assignedTo) {
      alert('Unable to submit feedback. No service provider associated with this booking.');
      return;
    }

    const feedbackData = {
      userId: selectedBooking.userId,
      bookingId: selectedBooking._id,
      serviceProviderId: selectedBooking.assignedTo,
      name,
      email,
      message: feedback
    };

    try {
      const response = await axios.post('http://localhost:5000/api/feedback/submit', feedbackData);
      if (response.status === 201 || response.data.success) {
        setFeedbackSubmitted(true);
        alert('Thank you for your feedback!');
        fetchBookings(); // ✅ Refresh booking list
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error.response?.data || error.message);
      alert('Failed to submit feedback. Please try again later.');
    } finally {
      handleFeedbackClose();
      setName('');
      setEmail('');
      setFeedback('');
    }
  };

  const handlePaymentOpen = (booking) => {
    setSelectedBooking(booking);
    setPaymentOpen(true);
  };

  const handlePaymentClose = () => {
    setPaymentOpen(false);
    setSelectedBooking(null);
    setTransactionId('');
    setPaymentError(null);
    setPaymentSuccess(false);
  };

  const handleSubmitPayment = async () => {
    const isValidTransactionId = /^[a-zA-Z0-9]{12}$/.test(transactionId);
    if (!isValidTransactionId) {
      setTransactionError('Transaction ID must be exactly 12 alphanumeric characters.');
      return;
    }

    const { _id: orderId, amount, apartmentId } = selectedBooking;

    try {
      const response = await axios.post('http://localhost:5000/api/payment/process', {
        orderId,
        apartmentId,
        transactionId,
        amount,
      });

      alert('Payment submitted successfully!');
      setPaymentSuccess(true);
      fetchBookings(); // ✅ Refresh booking list
      handlePaymentClose();
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment: ' + (error.response?.data?.message || 'Unknown error.'));
      setPaymentError(error.response?.data?.message || 'Error processing payment.');
    }
  };

  const handleMenuClick = (event, booking) => {
    setSelectedBooking(booking);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h4" gutterBottom>Booking Status</Typography>

      {feedbackSubmitted && (
        <Typography variant="h6" sx={{ color: 'green', marginBottom: 2 }}>
          Thank you for your feedback!
        </Typography>
      )}
      {paymentError && (
        <Typography variant="h6" sx={{ color: 'red', marginBottom: 2 }}>
          {paymentError}
        </Typography>
      )}
      {paymentSuccess && (
        <Typography variant="h6" sx={{ color: 'green', marginBottom: 2 }}>
          Payment was successful!
        </Typography>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SL.No</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Service Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <TableRow key={booking._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{booking.fullName}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{booking.phoneNumber}</TableCell>
                  <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuClick(e, booking)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedBooking?._id === booking._id}
                      onClose={handleMenuClose}
                    >
                      {booking.status === 'Paid' && !feedbackSubmitted ? (
                        <MenuItem onClick={() => handleFeedbackOpen(booking)}>
                          <FeedbackIcon sx={{ marginRight: 1 }} />
                          Give Feedback
                        </MenuItem>
                      ) : booking.status === 'Paid' && (
                        <MenuItem disabled>
                          <FeedbackIcon sx={{ marginRight: 1 }} />
                          Feedback Given
                        </MenuItem>
                      )}
                      {booking.status === 'Confirmed' && (
                        <MenuItem onClick={() => handlePaymentOpen(booking)}>
                          <PaymentIcon sx={{ marginRight: 1 }} />
                          Pay Now
                        </MenuItem>
                      )}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">No bookings found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Feedback Modal */}
      <Modal open={feedbackOpen} onClose={handleFeedbackClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>Give Feedback</Typography>
          <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Feedback" fullWidth multiline rows={4} margin="normal" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleFeedbackSubmit}>Submit</Button>
        </Box>
      </Modal>

      {/* Payment Modal */}
      <Modal open={paymentOpen} onClose={handlePaymentClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>Payment</Typography>
          <QRCode value={`upi://pay?pa=your-upi-id&pn=Your+Name&am=${selectedBooking?.amount}&cu=INR`} size={256} />
<TextField
  label="Transaction ID"
  fullWidth
  margin="normal"
  value={transactionId}
  onChange={(e) => {
    const value = e.target.value;
    if (/^\d{0,12}$/.test(value)) {
      setTransactionId(value);

      // Automatically clear the error when 12 digits are entered
      if (value.length === 12) {
        setTransactionError('');
      }
    }
  }}
  error={Boolean(transactionError)}
  helperText={transactionError}
/>

          <Typography variant="body1" sx={{ mt: 2 }}>Amount: ₹{selectedBooking?.amount}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmitPayment}>Pay</Button>
          {paymentSuccess && <QRCode value={`Payment Successful for Order ID: ${selectedBooking?._id}`} />}
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default ViewBookingStatus;
