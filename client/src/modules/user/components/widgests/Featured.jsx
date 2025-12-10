import React from "react";

function Featured() {
  return (
    <div>
      <div className="site-section">
        <div className="container">
          <div className="row">
            {/* Best Value */}
            <div className="col-md-6 col-lg-4 text-center mb-5 mb-lg-5">
              <div className="h-100 p-4 p-lg-5 bg-light site-block-feature-7">
                <span className="icon fas fa-star display-3 text-primary mb-4 d-block" />
                <h3 className="text-black h4">Best value</h3>
                <p>
                  "Best value" units are located in buildings rated three stars or higher. We label apartment rentals that are priced significantly less than similar high-quality units nearby.
                </p>
              </div>
            </div>

            {/* Price Drop */}
            <div className="col-md-6 col-lg-4 text-center mb-5 mb-lg-5">
              <div className="h-100 p-4 p-lg-5 bg-light site-block-feature-7">
                <span className="icon fas fa-arrow-down display-3 text-primary mb-4 d-block" />
                <h3 className="text-black h4">Price Drop</h3>
                <p>
                  Apartment communities change their rental rates often - sometimes multiple times a day. We track the changes and keep you up to date when a rental rate decreases.
                </p>
              </div>
            </div>

            {/* Rent Specials */}
            <div className="col-md-6 col-lg-4 text-center mb-5 mb-lg-5">
              <div className="h-100 p-4 p-lg-5 bg-light site-block-feature-7">
                <span className="icon fas fa-gift display-3 text-primary mb-4 d-block" />
                <h3 className="text-black h4">Rent Specials</h3>
                <p>
                  Apartment communities regularly advertise deals for new residents. Whether it's a move-in special or a free TV, we locate the rentals that offer a little something extra when you sign your lease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
