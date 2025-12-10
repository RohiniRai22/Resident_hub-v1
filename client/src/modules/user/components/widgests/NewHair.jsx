import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import b1 from "../../../../../images/bg1.jpeg"; // Apartment Cleaning Image
import homeService from "../../../../../images/bg3.jpeg"; // Apartment Maintenance Image
import electricalService from "../../../../../images/bg2.jpeg"; // Electrical System Image

function NewHair() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="site-section bg-light">
      <div className="container">
        <Slider {...settings}>
          {/* Apartment Cleaning Service */}
          <div className="row mb-5 align-items-center">
            <div style={{ display: "flex" }}>
              <div className="col-lg-6 d-flex align-items-center">
                <img src={b1} alt="Apartment Cleaning" className="img-fluid" />
              </div>
              <div className="col-lg-6 bg-white p-md-5">
                <h2 className="display-1 text-black line-height-1 site-section-heading mb-4 pb-3">
                  Professional Apartment Cleaning Services
                </h2>
                <p className="text-black lead">
                  <em>
                    “Our apartment cleaning service is designed to meet all of
                    your home cleaning needs. Whether it's a one-time deep clean
                    or regular maintenance, our experts ensure your living space
                    remains spotless and hygienic.”
                  </em>
                </p>
                <p className="lead text-black">
                  — <em>Jessica Roberts</em>
                </p>
              </div>
            </div>
          </div>

          {/* Apartment Maintenance Service */}
          <div className="row mb-5 align-items-center">
            <div style={{ display: "flex" }}>
              <div className="col-lg-6 d-flex align-items-center">
                <img
                  src={homeService}
                  alt="Apartment Maintenance"
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-6 bg-white p-md-5">
                <h2 className="display-1 text-black line-height-1 site-section-heading mb-4 pb-3">
                  Reliable Apartment Maintenance Services
                </h2>
                <p className="text-black lead">
                  <em>
                    “We provide expert apartment maintenance services to keep
                    your home running smoothly. From plumbing and HVAC to
                    electrical systems, we offer efficient solutions for all
                    your apartment maintenance needs.”
                  </em>
                </p>
                <p className="lead text-black">
                  — <em>Michael Johnson</em>
                </p>
              </div>
            </div>
          </div>

          {/* Electrical System Maintenance */}
          <div className="row mb-5 align-items-center">
            <div style={{ display: "flex" }}>
              <div className="col-lg-6 d-flex align-items-center">
                <img
                  src={electricalService}
                  alt="Electrical System"
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-6 bg-white p-md-5">
                <h2 className="display-1 text-black line-height-1 site-section-heading mb-4 pb-3">
                  Expert Electrical System Maintenance
                </h2>
                <p className="text-black lead">
                  <em>
                    “Our team of certified electricians provides top-notch
                    electrical system maintenance. Whether you need wiring
                    repairs, installation, or safety inspections, we ensure your
                    apartment’s electrical systems are always in peak condition.”
                  </em>
                </p>
                <p className="lead text-black">
                  — <em>Sarah Williams</em>
                </p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default NewHair;
