import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "../component/Nav/Navigation";
import Box from "@mui/material/Box";
import Home from "../component/Pages/Home";
import { styled, useTheme } from "@mui/material/styles";
import "../css/Style.css";

import CssBaseline from "@mui/material/CssBaseline";
import ManageCourse from "../component/Pages/ManageCourse";
import AddCourse from "../component/Pages/AddCourse";
import ViewChapters from "../component/Pages/ViewChapters";
import UpdateCourse from "../component/Pages/UpdateCourse";
import Login from "../component/Pages/Login";
import ManageService from "../component/Pages/services/ManageService";
import AddService from "../component/Pages/services/AddService";
import ViewUsers from "../component/Pages/users/ViewUser";
import ViewServiceProvider from "../component/Pages/service-provider/ViewServiceProvider";
import AddSubService from "../component/Pages/sub-service/AddSubService";
import ManageSubService from "../component/Pages/sub-service/ManageSubService";
import ViewFeedback from "../component/Pages/users/ViewFeedback";
import Viewreports from "../component/Pages/Viewreports";
import ManageApartment from "../component/Pages/Package/ManageApartment";
import AddApartment from "../component/Pages/Package/AddApartment";
import UpdateApartment from "../component/Pages/Package/UpdateApartment";
import AddServiceProvider from "../component/Pages/service-provider/AddServiceProvider";
import ViewBookings from "../component/Pages/ViewBookings";
import ViewPayments from "../component/Pages/ViewPayments";
import ViewContact from "../component/Pages/users/ViewContact";


export default function AdminRoute() {
  const location = useLocation();

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const isAdminLoginPage = location.pathname === "/admin/login";

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {!isAdminLoginPage && <Navigation />}
        <Box component="main" sx={{ flexGrow: 1, p: 3, background: "#f0f1f6" }}>
          {!isAdminLoginPage && <DrawerHeader />}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/manage-service" element={<ManageService />} />
            <Route exact path="/view-user" element={<ViewUsers />} />
            <Route exact path="/ViewFeedback" element={<ViewFeedback />} />
            <Route
              exact
              path="/view-service-provider"
              element={<ViewServiceProvider />}
            />

            <Route exact path="/add-service" element={<AddService />} />
            <Route exact path="/add-sub-service" element={<AddSubService />} />
            <Route
              exact
              path="/manage-sub-service"
              element={<ManageSubService />}
            />
            <Route exact path="/manage-course" element={<ManageCourse />} />
            <Route exact path="/Viewreports" element={<Viewreports />} />
            <Route exact path="/manage-course" element={<ManageCourse />} />
            <Route exact path="/add-course" element={<AddCourse />} />
            <Route exact path="/view-chapter/:id" element={<ViewChapters />} />
            <Route exact path="/update-course/:id" element={<UpdateCourse />} />

            {/* AddApartment routes */}
            <Route exact path="/ManageApartment" element={<ManageApartment />} />
            <Route exact path="/AddApartment" element={<AddApartment />} />
            <Route exact path="/UpdateApartment/:id" element={<UpdateApartment />} />
            <Route exact path="/AddServiceProvider" element={<AddServiceProvider/>} />
            <Route exact path="/ViewBookings" element={<ViewBookings/>} />
            <Route exact path="/ViewPayments" element={<ViewPayments/>} />
            <Route exact path="/ViewContact" element={<ViewContact/>} />
            
            
          </Routes>
        </Box>
      </Box>
    </div>
  );
}
