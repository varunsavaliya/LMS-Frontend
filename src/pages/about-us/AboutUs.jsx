import React from "react";
import CarouselSlide from "../../components/about-us/CarouselSlide";
import { celebrities } from "../../constants/CelebrityData.js";
import HomeLayout from "../../layouts/HomeLayout";
import aboutMainImage from "../../assets/images/aboutMainImage.png";

export default function AboutUs() {
  return (
    <HomeLayout>
      <div className="container-wrapper text-white">
        <div className="flex justify-between items-center max-10">
          <section className="w-full lg:w-1/2 text-center lg:text-left space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide affordable and quality education to the
              world. We are providing the platform for the aspiring teachers and
              students to share their skills, creativity and knowledge to each
              other to empower and contribute in the growth and wellness of
              mankind.
            </p>
          </section>

          <div className="w-1/2 hidden lg:block">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))",
              }}
              alt="about main image"
              className="drop-shadow-2xl float-right "
              src={aboutMainImage}
            />
          </div>
        </div>

        <div className="carousel w-full lg:w-1/2 m-auto my-16">
          {celebrities &&
            celebrities.map((celebrity) => (
              <CarouselSlide
                {...celebrity}
                key={celebrity.slideNumber}
                totalSlides={celebrities.length}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
}
