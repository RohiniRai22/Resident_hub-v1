import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../../../config/Hosts"; // Adjust path as necessary

function SubservicePage() {
  const { subserviceId } = useParams();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${config.host}/api/packages/${subserviceId}`);
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, [subserviceId]);

  return (
    <div>
      <h1>Subservice Details</h1>
      <div className="container">
        <div className="row">
          {packages.map((pkg) => (
            <div key={pkg._id} className="col-md-4">
              <div className="package-card">
                <img src={pkg.thumbnail} alt={pkg.title} className="img-fluid" />
                <h3>{pkg.title}</h3>
                <p>{pkg.description}</p>
                <p>${pkg.price}</p>
                <button className="btn btn-primary">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubservicePage;
