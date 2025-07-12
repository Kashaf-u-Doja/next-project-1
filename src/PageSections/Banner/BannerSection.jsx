import { Icon } from "@iconify/react";
import React from "react";

function BannerSection() {
  return (
    <>
      <section className="banner">
        <img
          src="https://images.pexels.com/photos/2578323/pexels-photo-2578323.jpeg"
          alt="Banner"
          className="bannerImage"
        />
        <div className="bannerText">
          <p className="innoscripta">
            <Icon
              icon="academicons:ideas-repec"
              style={{ marginRight: "8px", verticalAlign: "middle" }}
            />
            innoscripta
          </p>
          <p className="caseStudy mb-0">Case Study</p>
          <h1>Frontend Developer</h1>
        </div>
      </section>
    </>
  );
}

export default BannerSection;
