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
//   const [userCount, setUserCount] = useState(0);
//   const [providerCount, setProviderCount] = useState(0);
//   const [serviceCount, setServiceCount] = useState(0);
//   const [feedbackCount, setFeedbackCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // User Count
//         const userResponse = await fetch('http://localhost:5000/api/user/usercount');
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
//           console.log('User Data:', userData);
//           setUserCount(userData.count);
//         } else {
//           const userText = await userResponse.text();
//           console.error('Error fetching user count:', userText);
//           setUserCount(0); // Optionally set default value or handle differently
//         }
  
//         // Provider Count
//         const providerResponse = await fetch('http://localhost:5000/api/service-provider/providerCount');
//         if (providerResponse.ok) {
//           const providerData = await providerResponse.json();
//           console.log('Provider Data:', providerData);
//           setProviderCount(providerData.count);
//         } else {
//           const providerText = await providerResponse.text();
//           console.error('Error fetching provider count:', providerText);
//           setProviderCount(0); // Optionally set default value or handle differently
//         }
  
//         // Service Count
//         const serviceResponse = await fetch('http://localhost:5000/api/admin/serviceCount');
//         if (serviceResponse.ok) {
//           const serviceData = await serviceResponse.json();
//           console.log('Service Data:', serviceData);
//           setServiceCount(serviceData.count);
//         } else {
//           const serviceText = await serviceResponse.text();
//           console.error('Error fetching service count:', serviceText);
//           setServiceCount(0); // Optionally set default value or handle differently
//         }
  
//         // Uncomment and modify if you have feedback count API
//         // const feedbackResponse = await fetch('/api/feedback/count');
//         // if (feedbackResponse.ok) {
//         //   const feedbackData = await feedbackResponse.json();
//         //   console.log('Feedback Data:', feedbackData);
//         //   setFeedbackCount(feedbackData.count);
//         // } else {
//         //   const feedbackText = await feedbackResponse.text();
//         //   console.error('Error fetching feedback count:', feedbackText);
//         //   setFeedbackCount(0); // Optionally set default value or handle differently
//         // }
  
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       }
//     };
  
//     fetchData();
//   }, []);
  
  
  
  
  

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h4" sx={{ color: "#331a00" }} gutterBottom>
//         Dashboard
//       </Typography>

//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardHeader title="Total Users" sx={{ color: "#331a00" }} />
//             <Divider />
//             <CardContent>
//               <Typography variant="h5">{userCount}</Typography>
//               <Typography color="textSecondary" sx={{ color: "#331a00 " }}>
//                 Users Registered
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardHeader
//               title="Total Service Providers"
//               sx={{ color: "#331a00" }}
//             />
//             <Divider />
//             <CardContent>
//               <Typography variant="h5">{providerCount}</Typography>
//               <Typography color="textSecondary" sx={{ color: "#331a00 " }}>
//                 Service Providers Registered
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardHeader title="Total Services" sx={{ color: "#331a00" }} />
//             <Divider />
//             <CardContent>
//               <Typography variant="h5">{serviceCount}</Typography>
//               <Typography color="textSecondary" sx={{ color: "#331a00 " }}>
//                 Services Counts
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Uncomment and modify if you have feedback count API */}
//         {/* <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardHeader title="Total Feedback" sx={{ color: "#f53474" }} />
//             <Divider />
//             <CardContent>
//               <Typography variant="h5">{feedbackCount}</Typography>
//               <Typography color="textSecondary" sx={{ color: "#8bc34a " }}>
//                 Feedback Counts
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid> */}
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
} from "@mui/material";
import { People, Storefront, Build, Feedback } from "@mui/icons-material";
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInAnimation = {
  animation: `${fadeIn} 1s ease-in-out`,
};

export default function Home() {
  const [userCount, setUserCount] = useState(0);
  const [providerCount, setProviderCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // User Count
        const userResponse = await fetch('http://localhost:5000/api/user/usercount');
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserCount(userData.count);
        } else {
          const userText = await userResponse.text();
          console.error('Error fetching user count:', userText);
          setUserCount(0);
        }

        // Provider Count
        const providerResponse = await fetch('http://localhost:5000/api/service-provider/providerCount');
        if (providerResponse.ok) {
          const providerData = await providerResponse.json();
          setProviderCount(providerData.count);
        } else {
          const providerText = await providerResponse.text();
          console.error('Error fetching provider count:', providerText);
          setProviderCount(0);
        }

        // Service Count
        const serviceResponse = await fetch('http://localhost:5000/api/admin/serviceCount');
        if (serviceResponse.ok) {
          const serviceData = await serviceResponse.json();
          setServiceCount(serviceData.count);
        } else {
          const serviceText = await serviceResponse.text();
          console.error('Error fetching service count:', serviceText);
          setServiceCount(0);
        }

        // Uncomment and modify if you have feedback count API
        // const feedbackResponse = await fetch('/api/feedback/count');
        // if (feedbackResponse.ok) {
        //   const feedbackData = await feedbackResponse.json();
        //   setFeedbackCount(feedbackData.count);
        // } else {
        //   const feedbackText = await feedbackResponse.text();
        //   console.error('Error fetching feedback count:', feedbackText);
        //   setFeedbackCount(0);
        // }

      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ color: "#331a00", mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={fadeInAnimation}>
            <CardHeader
              avatar={<People sx={{ fontSize: 40, color: "#331a00" }} />}
              title="Total Users"
              sx={{ color: "#331a00" }}
            />
            <Divider />
            <CardContent>
              <Typography variant="h5">{userCount}</Typography>
              <Typography color="textSecondary" sx={{ color: "#331a00 " }}>
                Users Registered
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={fadeInAnimation}>
            <CardHeader
              avatar={<Storefront sx={{ fontSize: 40, color: "#331a00" }} />}
              title="Total Service Providers"
              sx={{ color: "#331a00" }}
            />
            <Divider />
            <CardContent>
              <Typography variant="h5">{providerCount}</Typography>
              <Typography color="textSecondary" sx={{ color: "#331a00 " }}>
                Service Providers Registered
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={fadeInAnimation}>
            <CardHeader
              avatar={<Build sx={{ fontSize: 40, color: "#331a00" }} />}
              title="Total Services"
              sx={{ color: "#331a00" }}
            />
            <Divider />
            <CardContent>
              <Typography variant="h5">{serviceCount}</Typography>
              <Typography color="textSecondary" sx={{ color: "#331a00 " }}>
                Services Counts
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Uncomment and modify if you have feedback count API */}
        {/* <Grid item xs={12} sm={6} md={4}>
          <Card sx={fadeInAnimation}>
            <CardHeader
              avatar={<Feedback sx={{ fontSize: 40, color: "#f53474" }} />}
              title="Total Feedback"
              sx={{ color: "#f53474" }}
            />
            <Divider />
            <CardContent>
              <Typography variant="h5">{feedbackCount}</Typography>
              <Typography color="textSecondary" sx={{ color: "#8bc34a " }}>
                Feedback Counts
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </Box>
  );
}
