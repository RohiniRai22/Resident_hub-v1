import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Import product images
import razorImage from "../../../../../images/b3.jpeg";
import locationPinImage from "../../../../../images/b1.jpeg";
import shaveImage from "../../../../../images/b2.jpeg";
import seatImage from "../../../../../images/b1.jpeg";
import dryerImage from "../../../../../images/b3.jpeg";
import sprayImage from "../../../../../images/b1.jpeg";
import Banner from "../widgests/Banner";
import NewHair from "../widgests/NewHair";
import Look from "../widgests/Look";

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

const ShopDetails = () => {
  const { id } = useParams();
  console.log(id, "id");
  const product = products.find((p) => p.id == id);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <>
      <Banner title="Shop Details" toggle={true} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <h3 className="text-primary">${product.price}</h3>
            <button className="btn btn-primary">Add to Cart</button>
            <br />
            <Link to="/shop" className="btn btn-secondary mt-3">
              Back to Shop
            </Link>
          </div>
        </div>
      </div>

      <Look />
    </>
  );
};

export default ShopDetails;
