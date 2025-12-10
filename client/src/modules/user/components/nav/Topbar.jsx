
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import config from "../../../../config/Hosts";
import logo from "../../../../../images/logo2.png";
import { Typography } from "@mui/material";

function Topbar() {
  const host = config.host;
  const [token, setToken] = useState(null);
  const [decodedData, setDecodedData] = useState(null);
  const [services, setServices] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch and decode JWT token
    const storedToken = localStorage.getItem("userToken");

    if (storedToken) {
      try {
        // Split the JWT token to extract the payload
        const base64Url = storedToken.split(".")[1]; // The payload is the second part
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const decodedData = JSON.parse(jsonPayload); // Parse the payload
        console.log("Decoded JWT Payload:", decodedData);
        setDecodedData(decodedData); // Store decoded data in state
        setToken(storedToken); // Store the raw token if needed
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    }

    // Fetch services from API
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${host}/api/admin/get-service`);
        console.log("Fetched Services:", response.data); // Log the response data
        const sortedData = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setServices(sortedData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [host]);

  // Handle user logout
  const handleLogout = () => {
    // Show confirmation alert
    if (window.confirm("Are you sure you want to log out?")) {
      // Remove userToken and userId from localStorage
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");

      // Clear state
      setToken(null);
      setDecodedData(null);

      // Navigate to home page
      navigate("/"); // Use navigate to go to home page
    }
  };

  return (
    <div>
      <header className="site-navbar py-1" role="banner">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Logo Section */}
            <div className="col-6 col-xl-2 d-flex align-items-center" data-aos="fade-down">
  <Link to="/" className="d-flex align-items-center text-black text-decoration-none">
    <img
      src={logo}
      alt="ResidentHub"
      style={{ height: "auto", maxWidth: "100px", marginRight: "10px", marginLeft: "20px" }}
    />
    <h2 className="mb-0" style={{ fontSize: "1.2rem" }}>ResidentHub</h2>
  </Link>
</div>


            {/* Navigation Menu */}
            <div className="col-10 col-md-8 d-none d-xl-block" data-aos="fade-down">
              <nav className="site-navigation position-relative text-right text-lg-center" role="navigation">
                <ul className="site-menu js-clone-nav mx-auto d-none d-lg-block">
                  
                  <li>
                    <Link to="/">Home</Link>
                  </li>

                  {/* Browse Menu */}
                  <li className="has-children" style={{ color: "blue" }}>
                    <a href="#">Browse</a>
                    <ul className="dropdown">
                      {services.length > 0 ? (
                        services.map((service) => (
                          <li key={service._id}>
                            <Link to="/Apartment">{service.name}</Link>
                          </li>
                        ))
                      ) : (
                        <li>No services available</li>
                      )}
                    </ul>
                  </li>
                  {/* <li><Link to="/services">Services</Link></li> */}
                  <li><Link to="/Apartment">Apartment</Link></li>
                  <li><Link to="/ViewBookingStatus">Booking Status</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </nav>
            </div>

            {/* Sign In / Logout */}
            <div className="col-6 col-xl-2 text-right" data-aos="fade-down">
              <div className="d-none d-xl-inline-block">
                {token ? (
                  <button className="custom-btn btn-11"  onClick={handleLogout} style={{backgroundColor: "#331a00", color: "white"}}>
                    Logout<div className="dot"></div>
                  </button>
                ) : (
                  <button className="custom-btn btn-11">
                    <Link
                      to="/login"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      Sign In<div className="dot"></div>
                    </Link>
                  </button>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <div
                className="d-inline-block d-xl-none ml-md-0 mr-auto py-3"
                style={{ position: "relative", top: 3 }}
              >
                <a
                  href="#"
                  className="site-menu-toggle js-menu-toggle text-black"
                >
                  <span className="icon-menu h3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Topbar;
