import React from "react";
import Banner from "../widgests/Banner";
import Booking from "../widgests/Booking";
import Look from "../widgests/Look";

function OnlineBooking() {
  return (
    <div>
      <Banner title="Online Booking" toggle={false} />
      <Booking />
      <Look />
    </div>
  );
}

export default OnlineBooking;
