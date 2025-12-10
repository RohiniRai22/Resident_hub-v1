import React from 'react';

const ServiceDetails = ({ service, subservices, packages }) => {
  return (
    <div>
      <h2>{service.name}</h2>
      <h3>Subservices:</h3>
      <ul>
        {subservices.map(sub => (
          <li key={sub._id}>{sub.sub_service}</li>
        ))}
      </ul>
      <h3>Packages:</h3>
      <ul>
        {packages.map(pkg => (
          <li key={pkg._id}>
            <h4>{pkg.title}</h4>
            <p>{pkg.description}</p>
            <p>Price: ${pkg.price}</p>
            <p>Amenities: {pkg.amenties.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceDetails;
