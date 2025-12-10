
    import React, { useEffect, useState } from "react";
    import { Box, Typography, Grid, Card, CardContent, CardHeader, Divider } from "@mui/material";
    import {
      BarChart,
      Bar,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      ResponsiveContainer,
      PieChart,
      Pie,
      Cell,
      Legend,
    } from 'recharts';
    
    export default function Viewreports() {
      const [userCount, setUserCount] = useState(0);
      const [providerCount, setProviderCount] = useState(0);
      const [serviceCount, setServiceCount] = useState(0);
      const [feedbackCount, setFeedbackCount] = useState(0);
    
      const COLORS = ['#331a00', '#82ca9d', '#ffc658', '#d04f4f'];
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch counts from APIs
            const userResponse = await fetch('http://localhost:5000/api/user/usercount');
            const userData = userResponse.ok ? await userResponse.json() : { count: 0 };
            setUserCount(userData.count);
    
            const providerResponse = await fetch('http://localhost:5000/api/service-provider/providerCount');
            const providerData = providerResponse.ok ? await providerResponse.json() : { count: 0 };
            setProviderCount(providerData.count);
    
            const serviceResponse = await fetch('http://localhost:5000/api/admin/serviceCount');
            const serviceData = serviceResponse.ok ? await serviceResponse.json() : { count: 0 };
            setServiceCount(serviceData.count);
    
            // Uncomment if you have feedback API
            // const feedbackResponse = await fetch('/api/feedback/count');
            // const feedbackData = feedbackResponse.ok ? await feedbackResponse.json() : { count: 0 };
            // setFeedbackCount(feedbackData.count);
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    
      // Data for the charts
      const data = [
        { name: 'Users', count: userCount },
        { name: 'Providers', count: providerCount },
        { name: 'Services', count: serviceCount },
        { name: 'Feedback', count: feedbackCount },
      ];
    
      return (
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" sx={{ color: "#331a00" }} gutterBottom>
            {/* Dashboard */}
          </Typography>
    
          <Grid container spacing={3}>
            {/* Card for Total Users */}
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardHeader title="Total Users" sx={{ color: "#331a00" }} />
                <Divider />
                <CardContent>
                  <Typography variant="h5">{userCount}</Typography>
                  <Typography color="textSecondary" sx={{ color: "#331a00 " }}>
                    Users Registered
                  </Typography>
    
                  {/* Bar Chart for Users */}
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[{ name: 'Users', count: userCount }]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#331a00" />
                    </BarChart>
                  </ResponsiveContainer>
    
                  {/* Pie Chart for Users */}
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[{ name: 'Users', count: userCount }]}
                        dataKey="count"
                        outerRadius={100}
                        fill="#331a00"
                        label
                      >
                        <Cell fill="#331a00" />
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
    
            {/* Card for Total Service Providers */}
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardHeader title="Total Service Providers" sx={{ color: "#331a00" }} />
                <Divider />
                <CardContent>
                  <Typography variant="h5">{providerCount}</Typography>
                  <Typography color="textSecondary" sx={{ color: "#331a00 " }}>
                    Providers Registered
                  </Typography>
    
                  {/* Bar Chart for Providers */}
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[{ name: 'Providers', count: providerCount }]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#331a00" />
                    </BarChart>
                  </ResponsiveContainer>
    
                  {/* Pie Chart for Providers */}
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[{ name: 'Providers', count: providerCount }]}
                        dataKey="count"
                        outerRadius={100}
                        fill="#331a00"
                        label
                      >
                        <Cell fill="#82ca9d" />
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
    
            {/* Card for Total Services */}
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardHeader title="Total Services" sx={{ color: "#331a00" }} />
                <Divider />
                <CardContent>
                  <Typography variant="h5">{serviceCount}</Typography>
                  <Typography color="textSecondary" sx={{ color: "#331a00 " }}>
                    Services Available
                  </Typography>
    
                  {/* Bar Chart for Services */}
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[{ name: 'Services', count: serviceCount }]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#331a00" />
                    </BarChart>
                  </ResponsiveContainer>
    
                  {/* Pie Chart for Services */}
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[{ name: 'Services', count: serviceCount }]}
                        dataKey="count"
                        outerRadius={100}
                        fill="#331a00"
                        label
                      >
                        <Cell fill="#ffc658" />
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
    
            {/* Feedback Card (Uncomment if needed) */}
            {/* <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardHeader title="Total Feedback" sx={{ color: "#331a00" }} />
                <Divider />
                <CardContent>
                  <Typography variant="h5">{feedbackCount}</Typography>
                  <Typography color="textSecondary" sx={{ color: "#331a00 " }}>
                    Feedback Received
                  </Typography>
    
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[{ name: 'Feedback', count: feedbackCount }]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#331a00" />
                    </BarChart>
                  </ResponsiveContainer>
    
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[{ name: 'Feedback', count: feedbackCount }]}
                        dataKey="count"
                        outerRadius={100}
                        fill="#d04f4f"
                        label
                      >
                        <Cell fill="#d04f4f" />
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
        </Box>
      );
    }
    