import React from "react";

function Footer() {
  return (
    <div>
      <footer className="site-footer" style={{backgroundColor: "#331a00", padding: "40px 0"}}>
        <div className="container-fluid">
          <div className="row">
            {/* About Section */}
            <div className="col-lg-4">
              <div className="mb-5">
                <h3 className="footer-heading mb-4">About ResidentHub</h3>
                <p style={{textAlign:"justify"}}>
                  ResidentHub is your trusted partner in apartment living. From maintenance requests to common area cleaning, rent collection, and tenant support, we make apartment management simple and efficient for both landlords and residents.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="row mb-5">
                <div className="col-md-12">
                  <h3 className="footer-heading mb-4">Quick Links</h3>
                </div>
                <div className="col-md-6 col-lg-6">
                  <ul className="list-unstyled">
                    <li><a href="/">Home</a></li>
                    <li><a href="/Apartment">Services</a></li>
                    <li><a href="/Apartment">For Tenants</a></li>
                    <li><a href="/Apartment">For Landlords</a></li>
                  </ul>
                </div>
                <div className="col-md-6 col-lg-6">
                  <ul className="list-unstyled">
                    <li><a href="/about">About Us</a></li>
                    <li><a href="">FAQs</a></li>
                    <li><a href="">Contact</a></li>
                    <li><a href="/Apartment">Request Service</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="mb-5">
                <h3 className="footer-heading mb-2">Stay Informed</h3>
                <p>
                  Get tips on better apartment living, service updates, and exclusive offers straight to your inbox. Join our newsletter today!
                </p>
                {/* <form action="#" method="post">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control border-secondary text-white bg-transparent"
                      placeholder="Enter Email"
                      aria-label="Enter Email"
                      aria-describedby="button-addon2"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary text-white"
                        type="button"
                        id="button-addon2"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </form> */}
              </div>
            </div>
          </div>

          {/* Social Media & Copyright */}
          <div className="row pt-5 mt-5 text-center">
            <div className="col-md-12">
              <div className="mb-5">
                <a href="#" className="pl-0 pr-3"><span className="icon-facebook" /></a>
                <a href="#" className="pl-3 pr-3"><span className="icon-twitter" /></a>
                <a href="#" className="pl-3 pr-3"><span className="icon-instagram" /></a>
                <a href="#" className="pl-3 pr-3"><span className="icon-linkedin" /></a>
              </div>
              <p>
                © {new Date().getFullYear()} ResidentHub. All rights reserved. | Designed for Better Apartment Living
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
