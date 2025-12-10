import React from "react";
import Banner from "../widgests/Banner";
import NewHair from "../widgests/NewHair";
import Look from "../widgests/Look";

function About() {
  return (
    <div>
      <Banner title="About Us" toggle={false} />

      <div className="site-section bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7">
              <h2 className="site-section-heading font-weight-light text-black text-center">
                Our Barbers
              </h2>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-6 col-lg-4 text-center mb-5"
              data-aos="fade-up"
            >
              <img
                src="images/person_1.jpg"
                alt="Image"
                className="img-fluid w-50 rounded-circle mb-4"
              />
              <h2 className="text-black font-weight-light mb-4">Jean Smith</h2>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Pariatur ab quas facilis obcaecati non ea, est odit repellat
                distinctio incidunt, quia aliquam eveniet quod deleniti impedit
                sapiente atque tenetur porro?
              </p>
              <p>
                <a href="#" className="pl-0 pr-3">
                  <span className="icon-twitter" />
                </a>
                <a href="#" className="pl-3 pr-3">
                  <span className="icon-instagram" />
                </a>
                <a href="#" className="pl-3 pr-3">
                  <span className="icon-facebook" />
                </a>
              </p>
            </div>
            <div
              className="col-md-6 col-lg-4 text-center mb-5"
              data-aos="fade-up"
            >
              <img
                src="images/person_2.jpg"
                alt="Image"
                className="img-fluid w-50 rounded-circle mb-4"
              />
              <h2 className="text-black font-weight-light mb-4">
                Claire Smith
              </h2>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Pariatur ab quas facilis obcaecati non ea, est odit repellat
                distinctio incidunt, quia aliquam eveniet quod deleniti impedit
                sapiente atque tenetur porro?
              </p>
              <p>
                <a href="#" className="pl-0 pr-3">
                  <span className="icon-twitter" />
                </a>
                <a href="#" className="pl-3 pr-3">
                  <span className="icon-instagram" />
                </a>
                <a href="#" className="pl-3 pr-3">
                  <span className="icon-facebook" />
                </a>
              </p>
            </div>
            <div
              className="col-md-6 col-lg-4 text-center mb-5"
              data-aos="fade-up"
            >
              <img
                src="images/person_4.jpg"
                alt="Image"
                className="img-fluid w-50 rounded-circle mb-4"
              />
              <h2 className="text-black font-weight-light mb-4">John Smith</h2>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Pariatur ab quas facilis obcaecati non ea, est odit repellat
                distinctio incidunt, quia aliquam eveniet quod deleniti impedit
                sapiente atque tenetur porro?
              </p>
              <p>
                <a href="#" className="pl-0 pr-3">
                  <span className="icon-twitter" />
                </a>
                <a href="#" className="pl-3 pr-3">
                  <span className="icon-instagram" />
                </a>
                <a href="#" className="pl-3 pr-3">
                  <span className="icon-facebook" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <NewHair />
      <Look />
    </div>
  );
}

export default About;
