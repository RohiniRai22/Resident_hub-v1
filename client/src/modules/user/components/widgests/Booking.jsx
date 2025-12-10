import React from "react";

function Booking() {
  return (
    <div>
      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-7 mb-5">
              <form action="#" className="p-5 bg-white">
                <h2 className="mb-4 site-section-heading">Book Now</h2>
                <div className="row form-group">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="text-black" htmlFor="fname">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="text-black" htmlFor="lname">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lname"
                      className="form-control"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="text-black" htmlFor="date">
                      Date
                    </label>
                    <input
                      type="text"
                      id="date"
                      className="form-control datepicker px-2"
                      placeholder="Date of visit"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="text-black" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black" htmlFor="treatment">
                      Service You Want
                    </label>
                    <select
                      name="treatment"
                      id="treatment"
                      className="form-control"
                    >
                      <option value>Hair Cut</option>
                      <option value>Hair Coloring</option>
                      <option value>Shave</option>
                      <option value>Hair Conditioning</option>
                    </select>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black" htmlFor="note">
                      Notes
                    </label>
                    <textarea
                      name="note"
                      id="note"
                      cols={30}
                      rows={5}
                      className="form-control"
                      placeholder="Write your notes or questions here..."
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <input
                      type="submit"
                      defaultValue="Send"
                      className="btn btn-primary py-2 px-4 text-white"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-5">
              <div className="p-4 mb-3 bg-white">
                <p className="mb-0 font-weight-bold">Address</p>
                <p className="mb-4">
                  203 Fake St. Mountain View, San Francisco, California, USA
                </p>
                <p className="mb-0 font-weight-bold">Phone</p>
                <p className="mb-4">
                  <a href="#">+1 232 3235 324</a>
                </p>
                <p className="mb-0 font-weight-bold">Email Address</p>
                <p className="mb-0">
                  <a href="#">youremail@domain.com</a>
                </p>
              </div>
              <div className="p-4 mb-3 bg-white">
                <h3 className="h5 text-black mb-3">More Info</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
                  ad iure porro mollitia architecto hic consequuntur. Distinctio
                  nisi perferendis dolore, ipsa consectetur? Fugiat quaerat eos
                  qui, libero neque sed nulla.
                </p>
                <p>
                  <a href="#" className="btn btn-primary px-4 py-2 text-white">
                    Get In Touch
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
