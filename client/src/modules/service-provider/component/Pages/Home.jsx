// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, Grid, Card, CardContent, CardHeader, Divider, Alert,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// export default function Home() {
//   const [dashboardData, setDashboardData] = useState({
//     totalpackages: 0,
//     totalBookings: 0,
//   });

//   useEffect(() => {
//     const fetchTotalPackage = async () => {
//       try {
//         const { data } = await axios.get('/api/service-provider/total-package');
//         console.log('Total Packages Response:', data); // Log the response
//         setDashboardData((prevData) => ({
//           ...prevData,
//           totalpackages: data.totalpackages || 0,
//         }));
//       } catch (error) {
//         console.error('Error fetching total packages:', error.message);
//       }
//     };
  
//     fetchTotalPackage();
//   }, []);
  
//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h4" sx={{ color: '#264d73' }} gutterBottom>
//         Dashboard
//       </Typography>
//       <Box sx={{ marginBottom: 2 }}>
//         {/* <Alert variant="filled" severity="success">
//           Your profile is almost complete! Take a moment to set it up and unlock all the features.
//           <Link style={{ color: 'red', marginLeft: '10px' }} to="/service-provider/my-profile">
//             Click here
//           </Link>
//         </Alert> */}
//       </Box>

//       <Grid container spacing={3}>
//         {/* Total Services (Packages) Card */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardHeader title="Total Services" sx={{ color: '#264d73' }} />
//             <Divider />
//             <CardContent>

//             <Typography variant="h5">
//   {(dashboardData.totalpackages || 0).toLocaleString()} {/* Display total packages */}
// </Typography>

//               {/* <Typography variant="h5">
//                 {(dashboardData.totalpackages || 0).toLocaleString()} {/* Display total packages */}
//               {/* </Typography> */}

//               <Typography color="textSecondary" sx={{ color: '#264d73' }}>
//                 Services Counts
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Total Bookings Card */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardHeader title="Total Bookings" sx={{ color: '#264d73' }} />
//             <Divider />
//             <CardContent>
//               <Typography variant="h5">
//                 {(dashboardData.totalBookings || 0).toLocaleString()} {/* Display total bookings */}
//               </Typography>
//               <Typography color="textSecondary" sx={{ color: '#264d73' }}>
//                 Booking Counts
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }


// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
// } from "@mui/material";

// export default function Home() {
//   const [serviceProviderId, setServiceProviderId] = useState(null); // Initially null
//   const [packageCount, setPackageCount] = useState(0);
//   const [bookingCount, setBookingCount] = useState(0);
//   const [paymentCount, setPaymentCount] = useState(0);
//   const [feedbackCount, setFeedbackCount] = useState(0);

//   useEffect(() => {
//     // Retrieve serviceProviderId from localStorage and remove quotes if necessary
//     const id = localStorage.getItem('serviceProviderId');
//     if (id) {
//       setServiceProviderId(id.replace(/"/g, '')); // Removes any surrounding quotes
//     }
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (serviceProviderId) {
//           // Package Count
//           const packageResponse = await fetch(`http://localhost:5000/api/service-provider/getPackageCount/${serviceProviderId}`);
//           if (packageResponse.ok) {
//             const packageData = await packageResponse.json();
//             setPackageCount(packageData.count);
//           }

//           // Booking Count
//          // Booking Count
// // Booking Count
// const bookingResponse = await fetch(`http://localhost:5000/api/booking/getBookingCount/${serviceProviderId}`);
// if (bookingResponse.ok) {
//   const bookingData = await bookingResponse.json();
//   console.log('Booking Data:', bookingData);
//   setBookingCount(bookingData.count);
// } else {
//   const errorText = await bookingResponse.text();
//   console.error('Failed to fetch booking count:', errorText);
// }



//           // Payment Count
//           const paymentResponse = await fetch(`http://localhost:5000/api/payment/getPaymentCount/${serviceProviderId}`);
//           if (paymentResponse.ok) {
//             const paymentData = await paymentResponse.json();
//             setPaymentCount(paymentData.count);
//           }

//           // Feedback Count
//           const feedbackResponse = await fetch(`http://localhost:5000/api/feedback/getFeedbackCount/${serviceProviderId}`);
//           if (feedbackResponse.ok) {
//             const feedbackData = await feedbackResponse.json();
//             setFeedbackCount(feedbackData.count);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       }
//     };

//     if (serviceProviderId) {
//       fetchData(); // Fetch data when serviceProviderId is available
//     }
//   }, [serviceProviderId]);

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h4" sx={{ color: "#264d73" }} gutterBottom>
//         Dashboard
//       </Typography>

//       <Grid container spacing={3}>
//         {/* Total Packages */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardHeader title="Total Packages" sx={{ color: "#264d73" }} />
//             <Divider />
//             <CardContent>
//               <Typography variant="h5">{packageCount}</Typography>
//               <Typography color="textSecondary" sx={{ color: "#264d73 " }}>
//                 Package Counts
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Total Bookings */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardHeader title="Total Bookings" sx={{ color: "#264d73" }} />
//             <Divider />
//             <CardContent>
//               <Typography variant="h5">{bookingCount}</Typography>
//               <Typography color="textSecondary" sx={{ color: "#264d73 " }}>
//                 Booking Counts
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Total Payments */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardHeader title="Total Payments" sx={{ color: "#264d73" }} />
//             <Divider />
//             <CardContent>
//               <Typography variant="h5">{paymentCount}</Typography>
//               <Typography color="textSecondary" sx={{ color: "#264d73 " }}>
//                 Payment Counts
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Total Feedbacks */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardHeader title="Total Feedbacks" sx={{ color: "#264d73" }} />
//             <Divider />
//             <CardContent>
//               <Typography variant="h5">{feedbackCount}</Typography>
//               <Typography color="textSecondary" sx={{ color: "#264d73 " }}>
//                 Feedback Counts
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  CircularProgress,
} from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // Example icon for packages

export default function Home() {
  const [serviceProviderId, setServiceProviderId] = useState(null);
  const [packageCount, setPackageCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const serviceProviderId = localStorage.getItem('serviceProviderId');
    if (serviceProviderId) {
      setServiceProviderId(serviceProviderId.replace(/"/g, '')); // Removes any surrounding quotes
    } else {
      console.error('Service Provider ID not found in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (serviceProviderId) {
          const [packageResponse, bookingResponse, paymentResponse, feedbackResponse] = await Promise.all([
            fetch(`http://localhost:5000/api/service-provider/getPackageCount/${serviceProviderId}`),
            fetch(`http://localhost:5000/api/booking/getBookingCount/${serviceProviderId}`),
            fetch(`http://localhost:5000/api/payment/getPaymentCount/${serviceProviderId}`),
            fetch(`http://localhost:5000/api/feedback/getFeedbackCount/${serviceProviderId}`)
          ]);

          if (packageResponse.ok) {
            const packageData = await packageResponse.json();
            setPackageCount(packageData.count);
          }

          if (bookingResponse.ok) {
            const bookingData = await bookingResponse.json();
            setBookingCount(bookingData.count);
          }

          if (paymentResponse.ok) {
            const paymentData = await paymentResponse.json();
            setPaymentCount(paymentData.count);
          }

          if (feedbackResponse.ok) {
            const feedbackData = await feedbackResponse.json();
            setFeedbackCount(feedbackData.count);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (serviceProviderId) {
      fetchData();
    }
  }, [serviceProviderId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ color: "#264d73", fontWeight: 'bold' }} gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, transition: '0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
            <CardHeader
              title="Total Packages"
              sx={{ color: "#264d73", backgroundColor: '#e3f2fd' }}
              avatar={<LocalOfferIcon sx={{ fontSize: 40, color: '#64b5f6' }} />}
            />
            <Divider />
            <CardContent>
              <Typography variant="h5">{packageCount}</Typography>
              <Typography color="textSecondary" sx={{ color: "#264d73 " }}>
                Package Counts
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, transition: '0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
            <CardHeader
              title="Total Bookings"
              sx={{ color: "#264d73", backgroundColor: '#e8f5e9' }}
              avatar={<EventIcon sx={{ fontSize: 40, color: '#66bb6a' }} />}
            />
            <Divider />
            <CardContent>
              <Typography variant="h5">{bookingCount}</Typography>
              <Typography color="textSecondary" sx={{ color: "#264d73 " }}>
                Booking Counts
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, transition: '0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
            <CardHeader
              title="Total Payments"
              sx={{ color: "#264d73", backgroundColor: '#fffde7' }}
              avatar={<PaymentIcon sx={{ fontSize: 40, color: '#fdd835' }} />}
            />
            <Divider />
            <CardContent>
              <Typography variant="h5">{paymentCount}</Typography>
              <Typography color="textSecondary" sx={{ color: "#264d73 " }}>
                Payment Counts
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}

        {/* <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, transition: '0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
            <CardHeader
              title="Total Feedbacks"
              sx={{ color: "#264d73", backgroundColor: '#fce4ec' }}
              avatar={<FeedbackIcon sx={{ fontSize: 40, color: '#ec407a' }} />}
            />
            <Divider />
            <CardContent>
              <Typography variant="h5">{feedbackCount}</Typography>
              <Typography color="textSecondary" sx={{ color: "#264d73 " }}>
                Feedback Counts
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </Box>
  );
}
