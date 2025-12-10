import React from "react";

function DownBanner() {
  return (
    <div>
      <div
        className="site-blocks-cover overlay inner-page-cover"
        style={{
          backgroundImage: "url(images/hero_bg_2.jpg)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-md-10" data-aos="fade-up" data-aos-delay={400}>
              <h2 className="text-white font-weight-light mb-5 display-3">
                Experience Our Outstanding Services
              </h2>
              <a
                href="https://vimeo.com/channels/staffpicks/93951774"
                className="play-single-big d-inline-block popup-vimeo"
              >
                <span className="icon-play" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownBanner;
