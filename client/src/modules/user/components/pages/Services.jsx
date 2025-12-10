// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Banner from "../widgests/Banner";
// import NewHair from "../widgests/NewHair";
// import Look from "../widgests/Look";
// import config from "../../../../config/Hosts";

// function Services() {
//   const host = config.host;
//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState(null);
//   const [subservices, setSubservices] = useState([]);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const [error, setError] = useState(null); // Add error state
//   const navigate = useNavigate();

//   // Fetch services
//   useEffect(() => {
//     axios
//       .get(`${host}/api/admin/get-service`)
//       .then((res) => {
//         const sortedData = res.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setServices(sortedData);
//       })
//       .catch((err) => {
//         console.error("Error fetching services:", err);
//         setError("Failed to load services. Please try again later.");
//       })
//       .finally(() => {
//         setLoading(false); // Set loading to false when done
//       });
//   }, [host]);

//   // Fetch subservices for a selected service
//   const handleServiceClick = (service) => {
//     if (service._id) {
//       axios
//         .get(`${host}/api/admin/GetServicebyid/${service._id}`)
//         .then((res) => {
//           setSelectedService(service); // Set the selected service
//           setSubservices(res.data.subservices); // Set the subservices for the selected service
//         })
//         .catch((err) => {
//           console.error("Error fetching service details:", err.response ? err.response.data : err.message);
//           setError("Failed to load service details. Please try again later.");
//         });
//     } else {
//       console.error("Service ID is missing");
//       setError("Service ID is missing.");
//     }
//   };
  

//   // Fetch and navigate to package details for a selected subservice
//   const handleSubserviceClick = (subservice) => {
//     axios
//       .get(`${host}/api/service-provider/packages-by-subservice/${subservice._id}`)
//       .then((res) => {
//         navigate(`/service-provider/package-details/${subservice._id}`, {
//           state: { packages: res.data },
//         });
//       })
//       .catch((err) => {
//         console.error("Error fetching package details:", err);
//         setError("Failed to load package details. Please try again later.");
//       });
//   };

//   // Handle "Go Back" button to show all services again
//   const handleGoBack = () => {
//     setSelectedService(null); // Clear the selected service to show the service list again
//     setSubservices([]); // Clear subservices
//   };

//   // Display loading or error message
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <Banner title="See Our Services!" toggle={true} />
//       <div className="site-section">
//         <div className="container">
//           <div className="row">
//             {/* Display service list if no service is selected */}
//             {!selectedService &&
//               services.map((service) => (
//                 <div
//                   className="col-md-6 col-lg-4 text-center mb-5 mb-lg-5"
//                   key={service._id}
//                   onClick={() => handleServiceClick(service)}
//                 >
//                   <div className="h-100 p-4 p-lg-5 bg-light site-block-feature-7">
//                     <span
//                       className={`icon ${service.iconClass} display-3 text-primary mb-4 d-block`}
//                     />
//                     <h3 className="text-black h4">{service.name}</h3>
//                     <p>{service.description}</p>
//                     <p>
//                       <strong className="font-weight-bold text-primary">
//                         ${service.price}
//                       </strong>
//                     </p>
//                   </div>
//                 </div>
//               ))}

//             {/* Display subservices list when a service is selected */}
//             {selectedService && (
//               <div>
//                 <h2>{selectedService.name} - Subservices</h2>
//                 <button onClick={handleGoBack} className="btn btn-secondary mb-4">
//                   Go Back
//                 </button>
//                 <div className="row">
//                   {subservices.map((subservice) => (
//                     <div
//                       className="col-md-6 col-lg-4 text-center mb-5"
//                       key={subservice._id}
//                       onClick={() => handleSubserviceClick(subservice)}
//                     >
//                       <div className="h-100 p-4 p-lg-5 bg-light">
//                         <h3 className="text-black h4">{subservice.sub_service}</h3>
//                         <p>{subservice.description}</p>
//                         <p>
//                           <strong className="font-weight-bold text-primary">
//                             ${subservice.price}
//                           </strong>
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <NewHair />
//       <Look />
//     </div>
//   );
// }

// export default Services;

// correct up

// frontend/src/components/Services.js
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Banner from "../widgests/Banner";
// import NewHair from "../widgests/NewHair";
// import Look from "../widgests/Look";
// import config from "../../../../config/Hosts";

// function Services() {
//   const host = config.host;
//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState(null);
//   const [subservices, setSubservices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${host}/api/admin/get-service`)
//       .then((res) => {
//         const sortedData = res.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setServices(sortedData);
//       })
//       .catch((err) => {
//         console.error("Error fetching services:", err);
//         setError("Failed to load services. Please try again later.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [host]);

//   const handleServiceClick = (service) => {
//     if (service._id) {
//       axios
//         .get(`${host}/api/admin/GetServicebyid/${service._id}`)
//         .then((res) => {
//           setSelectedService(service);
//           setSubservices(res.data.subservices);
//         })
//         .catch((err) => {
//           console.error("Error fetching service details:", err.response ? err.response.data : err.message);
//           setError("Failed to load service details. Please try again later.");
//         });
//     } else {
//       console.error("Service ID is missing");
//       setError("Service ID is missing.");
//     }
//   };

//   const handleSubserviceClick = (subservice) => {
//     navigate(`/user/packages/${subservice._id}`);
//   };

//   const handleGoBack = () => {
//     setSelectedService(null);
//     setSubservices([]);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <Banner title="See Our Services!" toggle={true} />
//       <div className="site-section">
//         <div className="container">
//           <div className="row">
//             {!selectedService &&
//               services.map((service) => (
//                 <div
//                   className="col-md-6 col-lg-4 text-center mb-5 mb-lg-5"
//                   id="servicecard"
//                   key={service._id}
//                   onClick={() => handleServiceClick(service)}
//                 >
//                   <div className="h-100 p-4 p-lg-5 bg-light site-block-feature-7">
//                     <span
//                       className={`icon ${service.iconClass} display-3 text-primary mb-4 d-block`}
//                     />
//                     <h3 className="text-black h4">{service.name}</h3>
//                     <p>{service.description}</p>
//                     <p>
//                       <strong className="font-weight-bold text-primary">
//                         ${service.price}
//                       </strong>
//                     </p>
//                   </div>
//                 </div>
//               ))}

//             {selectedService && (
//               <div>
//                 <h2>{selectedService.name} - Subservices</h2>
//                 <button onClick={handleGoBack} className="btn btn-secondary mb-4">
//                   Go Back
//                 </button>
//                 <div className="row">
//                   {subservices.map((subservice) => (
//                     <div
//                       className="col-md-6 col-lg-4 text-center mb-5"
//                       key={subservice._id}
//                       onClick={() => handleSubserviceClick(subservice)}
//                     >
//                       <div className="h-100 p-4 p-lg-5 bg-light">
//                         <h3 className="text-black h4">{subservice.sub_service}</h3>
//                         <p>{subservice.description}</p>
//                         <p>
//                           <strong className="font-weight-bold text-primary">
//                             ${subservice.price}
//                           </strong>
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <NewHair />
//       <Look />
//     </div>
//   );
// }

// export default Services;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Banner from "../widgests/Banner";
import NewHair from "../widgests/NewHair";
import Look from "../widgests/Look";
import config from "../../../../config/Hosts";
import ViewServiceprovider from "./ViewServiceprovider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Services() {
  const host = config.host;
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [subservices, setSubservices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${host}/api/admin/get-service`)
      .then((res) => {
        const sortedData = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setServices(sortedData);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [host]);

  const handleServiceChange = (event) => {
    const serviceId = evefnt.target.value;
    if (serviceId) {
      axios
        .get(`${host}/api/admin/GetServicebyid/${serviceId}`)
        .then((res) => {
          const service = services.find((s) => s._id === serviceId);
          setSelectedService(service);
          setSubservices(res.data.subservices);
        })
        .catch((err) => {
          console.error("Error fetching service details:", err.response ? err.response.data : err.message);
          setError("Failed to load service details. Please try again later.");
        });
    } else {
      setSelectedService(null);
      setSubservices([]);
    }
  };

  const handleSubserviceClick = (subservice) => {
    navigate(`/user/packages/${subservice._id}`);
  };

  const handleGoBack = () => {
    setSelectedService(null);
    setSubservices([]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Banner title="See Our Services!" toggle={true} />
      <div className="site-section">
        <div className="container">
          <div className="row">
            {!selectedService && (
              <div className="col-md-12 mb-5">
                {/* <label htmlFor="serviceDropdown" className="form-label">Select a Service:</label> */}
                <select
                  id="serviceDropdown"
                  className="form-select"
                  onChange={handleServiceChange}
                  defaultValue=""
                  style={{ width: '50%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                  <option value="" disabled>Select a service</option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedService && (
              <div>
                <h2>{selectedService.name} - Subservices</h2>
                {/* <button
                  onClick={handleGoBack}
                  style={{
                    // backgroundColor: '#6c757d',
                    color: '#264d73',
                    border: 'none',
                    
                    cursor: 'pointer',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
        
                </button> */}
                <div className="row">
                  {subservices.map((subservice) => (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }} key={subservice._id}>
                      <button
                        onClick={() => handleSubserviceClick(subservice)}
                        style={{
                          color: 'black',
                          textTransform: 'none',
                          fontWeight: 'bold',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                          border: 'none',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '10px 20px',
                          marginBottom: '20px',
                          marginRight: '20px',  // Adds horizontal space between buttons
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)')}
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                      >
                        <h4>{subservice.sub_service}</h4>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <ViewServiceprovider /> */}
      <NewHair />
      <Look />
    </div>
  );
}

export default Services;
