// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import config from "../../../../config/Hosts";

// function ServiceProviderDetail() {
//   const { id } = useParams(); // Get the service provider ID from the URL
//   const host = config.host;
//   const [provider, setProvider] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`${host}/api/service-provider/${id}`)
//       .then((res) => {
//         setProvider(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [id]);

//   if (!provider) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h2>{provider.name}</h2>
//       <p>Email: {provider.email}</p>
//       <p>Phone: {provider.phone || "--"}</p>
//       <p>Business Name: {provider.businessName || "--"}</p>
//       <p>Business Type: {provider.businessType?.name || "--"}</p>
//       <p>Address: {provider.address || "--"}</p>

//       <h3>Services Provided</h3>
//       <ul>
//         {provider.services?.length > 0 ? (
//           provider.services.map((service) => (
//             <li key={service._id}>
//               {service.name} - ${service.price}
//             </li>
//           ))
//         ) : (
//           <p>No services provided</p>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default ServiceProviderDetail;
import React from 'react';
import { useParams } from 'react-router-dom';

const ServiceProviderDetail = () => {
  const { serviceName } = useParams();
  
  // Fetch and display details based on the service name

  return (
    <div>
      <h1>Service Provider Detail for {serviceName}</h1>
      {/* Render the details here */}
    </div>
  );
};

export default ServiceProviderDetail;
