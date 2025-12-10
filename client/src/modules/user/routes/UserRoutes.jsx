
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../components/pages/Home";
import Topbar from "../components/nav/Topbar";
import Footer from "../components/nav/Footer";
import Services from "../components/pages/Services";
import About from "../components/pages/About";
import OnlineBooking from "../components/pages/OnlineBooking";
import Contact from "../components/pages/Contact";
import RegistrationForm from "../components/pages/Register";
import Login from "../components/pages/Login";
import Shop from "../components/pages/Shop";
import ShopDetails from "../components/pages/ShopDetails";
import HomeService from "../components/pages/HomeService";
import ElectricGadgets from "../components/pages/ElectricGadgets";
import HairSalon from "../components/pages/HairSalon";
import ServiceProviderDetail from "../components/pages/ServiceProviderDetail"

import ViewServiceProvider from "../../admin/component/Pages/service-provider/ViewServiceProvider";
import ServiceProviderProfile from "../components/pages/ServiceProviderProfile";
import ServiceDetails from "../components/pages/ServiceDetails";
import SubservicePage from "../components/pages/SubservicePage";
import Packages from "../components/pages/Packages";
import PackageDetails from "../components/pages/PackageDetails"; // Import the PackageDetails component
import ServiceBookingForm from "../components/pages/ServiceBookingForm";
import ViewBookingStatus from "../components/pages/ViewBookingStatus";
import ViewServiceprovider from "../components/pages/ViewServiceprovider";
import Apartment from "../components/pages/Apartment";
import SingleApartment from "../components/pages/SingleApartment";
import ApartmentBookingForm from "../components/pages/ApartmentBookingForm";

function UserRoutes() {
  const location = useLocation();
  const isRegistrationPage =
    location.pathname === "/register" || location.pathname === "/login";

  return (
    <div>
      {!isRegistrationPage && <Topbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/online-booking" element={<OnlineBooking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop-hairsalon" element={<HairSalon />} />
        <Route path="/shop-homeservice" element={<HomeService />} />
        <Route path="/shop-gadgets" element={<ElectricGadgets />} />
        <Route path="/shop-details/:id" element={<ShopDetails />} />
        <Route path="/services/:serviceId" element={<ServiceDetails />} />

        <Route path="/service-providers" element={<ViewServiceProvider />} />
        <Route path="/service-provider-profile/:id" element={<ServiceProviderProfile />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subservice/:subserviceId" element={<SubservicePage />} />
        <Route path="/user/packages/:subserviceId" element={<Packages />} />
        <Route path="/packages/:packageId" element={<PackageDetails />} /> {/* Add this route */}
        {/* <Route path="/package/:packageId" element={<PackageDetails />} /> */}
        <Route path="/book/:packageId" element={<ServiceBookingForm />} />
        <Route path="/ViewBookingStatus" element={<ViewBookingStatus />} />
        <Route path="/ViewServiceprovider" element={<ViewServiceprovider />} />
        <Route path="/Apartment" element={<Apartment />} />
       
    
        <Route path="/ServiceProviderDetail/:serviceName" element={<ServiceProviderDetail />} />

 <Route path="/apartment/:id" element={<SingleApartment />} />
<Route path="/apartmentbook/:apartmentId" element={<ApartmentBookingForm />} />

        
      </Routes>
      {!isRegistrationPage && <Footer />}
    </div>
  );
}

export default UserRoutes;
