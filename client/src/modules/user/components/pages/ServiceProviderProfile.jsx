import { useLocation } from "react-router-dom";

function ServiceProviderProfile() {
  const { state } = useLocation();
  const { service, subservices } = state;

  return (
    <div>
      <h1>{service.name}</h1>
      <h2>Subservices</h2>
      <div className="row">
        {subservices.map((subservice) => (
          <div className="col-md-6 col-lg-4 text-center mb-5" key={subservice._id}>
            <div className="h-100 p-4 p-lg-5 bg-light">
              <h3 className="text-black h4">{subservice.name}</h3>
              <p>{subservice.description}</p>
              <p>
                <strong className="font-weight-bold text-primary">
                  ${subservice.price}
                </strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceProviderProfile;
