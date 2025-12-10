// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Card, CardMedia, CardContent, CardActions, Button, Typography } from "@mui/material";
// import config from "../../../../config/Hosts";
// import Banner from "../widgests/Banner";
// // import Sidebar from "../widgests/Sidebar";

// // Replace this with the path to your package image
// import defaultPackageImage from "../../../../../images/gadgets.png";

// function Packages() {
//   const { subserviceId } = useParams();
//   const [packages, setPackages] = useState([]);
//   const [error, setError] = useState(null);
//   const [filteredPackages, setFilteredPackages] = useState([]);
//   const host = config.host;

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await axios.get(`${host}/api/user/packages/${subserviceId}`);
//         setPackages(response.data);
//         setFilteredPackages(response.data);
//       } catch (err) {
//         console.error("Error fetching packages:", err);
//         setError("Failed to load packages. Please try again later.");
//       }
//     };

//     fetchPackages();
//   }, [subserviceId, host]);

//   const handleFilter = (category) => {
//     if (category === "All") {
//       setFilteredPackages(packages);
//     } else {
//       setFilteredPackages(
//         packages.filter((pkg) => pkg.title === category)
//       );
//     }
//   };

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (filteredPackages.length === 0) {
//     return <div>No packages available for this subservice.</div>;
//   }

//   return (
//     <div>
//       <Banner title="Our Packages" toggle={true} />

//       <div className="site-section">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-3">
//               {/* <Sidebar onFilter={handleFilter} /> */}
//             </div>
//             <div className="col-md-9">
//               <div className="row">
//                 {filteredPackages.map((pkg) => (
//                   <div key={pkg._id} className="col-md-6 col-lg-4 mb-5">
//                     <Card
//                       sx={{
//                         maxWidth: 345,
//                         borderRadius: 2,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         height: '100%',
//                       }}
//                     >
//                       <CardMedia
//                         component="img"
//                         height="200"
//                         image={pkg.thumbnail ? `http://localhost:5000/api/image/${pkg.thumbnail}` : defaultPackageImage}
//                         alt={pkg.title}
//                         onError={(e) => {
//                           e.target.src = defaultPackageImage; // Fallback to default image on error
//                         }}
//                       />
//                       <CardContent sx={{ flexGrow: 1 }}>
//                         <Typography variant="h5" component="div">
//                           {pkg.title}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify' }}>
//                           {pkg.description}
//                         </Typography>
//                         <Typography variant="h6" component="div" sx={{ mt: 2 }}>
//                           ${pkg.price}
//                         </Typography>
//                       </CardContent>
//                       <CardActions>
//                         <Button size="small" variant="contained" color="primary">
//                           Book Now
//                         </Button>
//                       </CardActions>
//                     </Card>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Packages;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Grid } from "@mui/material";
import config from "../../../../config/Hosts";
import Banner from "../widgests/Banner";
import defaultPackageImage from "../../../../../images/gadgets.png";

function Packages() {
  const { subserviceId } = useParams();
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const host = config.host;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${host}/api/user/packages/${subserviceId}`);
        setPackages(response.data);
        setFilteredPackages(response.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("No Packages Found.");
      }
    };

    fetchPackages();
  }, [subserviceId, host]);

  const handleFilter = (category) => {
    if (category === "All") {
      setFilteredPackages(packages);
    } else {
      setFilteredPackages(packages.filter((pkg) => pkg.title === category));
    }
  };

  const handleBookNow = (pkgId) => {
    navigate(`/packages/${pkgId}`); // Navigate to PackageDetails component first
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (filteredPackages.length === 0) {
    return <div>No packages available for this subservice.</div>;
  }

  return (
    <div>
      <Banner title="Our Packages" toggle={true} />

      <div className="site-section" > {/* Remove space on the left */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12"> {/* Full width column */}
              <Grid container spacing={3}> {/* Use Material-UI Grid to control spacing */}
                {filteredPackages.map((pkg) => (
                  <Grid item key={pkg._id} xs={12} sm={6} md={4}> {/* Adjust the column size */}
                    <Card
                      sx={{
                        maxWidth: "100%", // Make sure card takes up full width
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={pkg.thumbnail ? `http://localhost:5000/api/image/${pkg.thumbnail}` : defaultPackageImage}
                        alt={pkg.title}
                        onError={(e) => {
                          e.target.src = defaultPackageImage; // Fallback to default image on error
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h3" component="div">
                          {pkg.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify' }}>
                          {pkg.description}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                        ₹{pkg.price}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'center' }}>  {/* Centers the button */}
  <Button
    size="small"
    variant="contained"
    onClick={() => handleBookNow(pkg._id)}
    style={{
      background: 'linear-gradient(to top, white, #264d73)',  // 45-degree white and blue gradient
      color: 'black',  // Text color
      fontWeight: 'bold',
      borderRadius: '5px',
      padding: '10px 20px',  // Adjusts padding for a nicer look
      transition: 'box-shadow 0.3s ease-in-out',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)')}
    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
  >
    Read More
  </Button>
</CardActions>

                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Packages;
