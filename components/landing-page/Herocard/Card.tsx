"use client";
import Image from "next/image";
import React from "react";


const Card = () => {
  return (
    <div className="flex flex-wrap justify-between text-white py-[8rem]  sm:py-48 px-6">
      <div className="hero-left-container basis-full space-y-3 sm:basis-[40%] lg:basis-[45%]">
        <img
          src="/assets/hero/hero-heading.svg"
          alt=""
          className="w-[40%] sm:w-[60%] mx-auto"
        />
        <h4 className="text-sm text-center">
          Experience boundless amusement on ultimate betting platform! Unfold
          endless entertainment.
        </h4>
        <button className="px-3 py-2 bg-red-400 text-white mx-auto">
          Join Now!
        </button>
      </div>
      <div className="hero-right-container basis-full order-first sm:order-last sm:basis-[40%] lg:basis-[45%]">
        <img
          src="https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/hero/hero-image.svg"
          alt=""
          className="w-[40%] sm:w-[80%] lg:w-[50%] mx-auto"
        />
      </div>
    </div>
  );
};

export default Card;

