import React from "react";

function Welcome() {
  return (
    <div>
      <div className="site-section">
        <div className="container">
          <div className="row">
            {/* Welcome Text */}
            <div className="col-md-6 col-lg-4 text-center">
              <h3 className="line-height-1 mb-3">
                <span className="d-block display-4 line-height-1 text-black">
                  Welcome to
                </span>{" "}
                <span className="d-block display-4 line-height-1">
                  <em className="text-primary font-weight-bold">
                    ApartmentEase
                  </em>
                </span>
              </h3>
              <p>
                Simplify your life with our trusted apartment service management system.
                Whether it’s plumbing, electrical repairs, cleaning, or general maintenance —
                we deliver professional services right at your doorstep.
              </p>
              <p>
                <a href="#">
                  <small className="text-uppercase font-weight-bold" style={{ transition: "0.3s", color: "#000" }}>
                    Learn More
                  </small>
                </a>
              </p>
            </div>

            {/* Welcome Image */}
            <div className="col-md-6 col-lg-4">
              <figure className="h-100 hover-bg-enlarge">
                <div
                  className="bg-image h-100 bg-image-md-height"
                  style={{
                    backgroundImage: 'url("images/bg4.jpeg")',
                    transition: "transform 0.5s ease",
                  }}
                />
              </figure>
            </div>

            {/* Service Hours */}
            <div className="col-md-6 col-lg-4">
              <div className="border p-4 d-flex align-items-center justify-content-center h-100">
                <div className="text-center">
                  <h2 className="text-primary h2 mb-5" style={{ transition: "color 0.3s" }}>
                    Service Hours
                  </h2>
                  <p className="mb-4">
                    <span className="d-block font-weight-bold">Mon – Fri </span>
                    9:00 AM – 8:00 PM
                  </p>
                  <p className="mb-4">
                    <span className="d-block font-weight-bold">Saturday</span>
                    10:00 AM – 6:00 PM
                  </p>
                  <p className="mb-4">
                    <span className="d-block font-weight-bold">Sunday</span>
                    Emergency Services Only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default Welcome;
