import React from "react";
import Slider from "../widgests/Slider";
import Welcome from "../widgests/Welcome";
import Featured from "../widgests/Featured";
import NewHair from "../widgests/NewHair";
// import DownBanner from "../widgests/DownBanner";

function Home() {
  return (
    <div>
      <Slider />
      <Welcome />
      <Featured />
      <NewHair />
      
      {/* <DownBanner /> */}
    </div>
  );
}

export default Home;
