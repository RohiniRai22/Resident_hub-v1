import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "../component/Nav/Navigation";
import Box from "@mui/material/Box";
import Home from "../component/Pages/Home";
import { styled, useTheme } from "@mui/material/styles";
import "../css/Style.css";

import CssBaseline from "@mui/material/CssBaseline";


import Login from "../component/Pages/Login";
import RegistrationForm from "../component/Pages/Register";
import MyProfile from "../component/Pages/Profile/MyProfile";
import ManagePackage from "../component/Pages/Package/ManagePackage";
import AddPackage from "../component/Pages/Package/AddPackage";
import UpdatePackage from "../component/Pages/Package/UpdatePackage";
import ViewBookings from "../component/Pages/ViewBookings";
import ViewPayments from "../component/Pages/ViewPayments";
import ViewBookingFeedback from "../component/Pages/ViewBookingFeedback";


export default function ServiceProviderRoute() {
  const location = useLocation();

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const isLoginPage =
    location.pathname === "/service-provider/login" ||
    location.pathname === "/service-provider/register";

  console.log(isLoginPage, "hh");

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        {!isLoginPage && <CssBaseline />}
        {!isLoginPage && <Navigation />}
        <Box component="main" sx={{ flexGrow: 1, p: 3, background: "#f0f1f6" }}>
          {!isLoginPage && <DrawerHeader />}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<RegistrationForm />} />
            <Route exact path="/my-profile" element={<MyProfile />} />
            <Route exact path="/manage-package" element={<ManagePackage />} />
            <Route exact path="/add-package" element={<AddPackage />} />
        
        
            <Route exact path="/my-profile" element={<MyProfile />} />
            <Route exact path="/ViewBookings" element={<ViewBookings />} />
            <Route path="/update-package/:id" element={<UpdatePackage/>} />
            <Route path="/viewPayments/:serviceProviderId" element={<ViewPayments />} />
            <Route path="/ViewBookingFeedback/:serviceProviderId" element={<ViewBookingFeedback />} />



          </Routes>
        </Box>
      </Box>
    </div>
  );
}
