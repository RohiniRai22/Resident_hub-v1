import React, { useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../widgests/Banner";
import NewHair from "../widgests/NewHair";
import Look from "../widgests/Look";
import Sidebar from "../widgests/Sidebar";

// Import product images
import razorImage from "../../../../../images/b3.jpeg";
import locationPinImage from "../../../../../images/b1.jpeg";
import shaveImage from "../../../../../images/b2.jpeg";
import seatImage from "../../../../../images/b1.jpeg";
import dryerImage from "../../../../../images/b3.jpeg";
import sprayImage from "../../../../../images/b1.jpeg";

// Sample product data
const products = [
  {
    id: 1,
    name: "Barber Razor",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem quae id dolorum debitis.",
    price: 29,
    image: razorImage,
  },
  {
    id: 2,
    name: "Location Pin",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem quae id dolorum debitis.",
    price: 46,
    image: locationPinImage,
  },
  {
    id: 3,
    name: "Barber Shave",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem quae id dolorum debitis.",
    price: 24,
    image: shaveImage,
  },
  {
    id: 4,
    name: "Barber Seat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem quae id dolorum debitis.",
    price: 40,
    image: seatImage,
  },
  {
    id: 5,
    name: "Hair Dryer",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem quae id dolorum debitis.",
    price: 35,
    image: dryerImage,
  },
  {
    id: 6,
    name: "Barber Spray",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem quae id dolorum debitis.",
    price: 15,
    image: sprayImage,
  },
];

function ElectricGadgets() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilter = (category) => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.name === category)
      );
    }
  };

  return (
    <div>
      <Banner title="Our Electric Gadgets" toggle={true} />

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Sidebar onFilter={handleFilter} />
            </div>
            <div className="col-md-9">
              <div className="row">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="col-md-6 col-lg-6 text-center mb-5 mb-lg-5"
                  >
                    <div className="h-100 p-4 p-lg-5 bg-light site-block-feature-7">
                      <Link to={`/ElectricGadgets-details/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="img-fluid mb-4"
                          style={{
                            width: "300px",
                            height: "300px",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                      <h3 className="text-black h4">{product.name}</h3>
                      <p>{product.description}</p>
                      <p>
                        <strong className="font-weight-bold text-primary">
                          ${product.price}
                        </strong>
                      </p>
                      <button className="btn btn-primary">Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewHair />
      <Look />
    </div>
  );
}

export default ElectricGadgets;
