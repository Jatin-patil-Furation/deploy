"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Mobilenav from "./Mobilenav";
import HeroCard from "./Herocard/HeroCard";
import Mobilehero from "./Herocard/Mobilehero";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const Hero: React.FC = () => {
  const [admin, SetAdmin] = useState("");

  return (
    <section>
      <div className=" relative  top-0 mobiles">
        <div
          className="w-[100vw]  
           bg-[url(https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/hero/background.svg)]
       bg-center bg-no-repeat"
        >
          <div
            className=" w-[100%]
          fixed z-20
          main-nav-con
           py-2   opacity-2 rounded-lg"
          >
            <div className=" pt-[.1rem]">
              <Mobilenav />
            </div>
          </div>
          <Mobilehero />
        </div>
        <img
          src="https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/hero/border-hero.png"
          alt="back"
          className="w-full h-full"
        />
      </div>

      <div className="w-[100%] hidden sm:block  relative  ">
        <div className="z-0 w-full border-[.1px]  border-[#0C0C0C] bg-[#0C0C0C]  object-cover">
          <Image
            src={
              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/hero/hero-background.svg"
            }
            width={1440}
            height={800}
            alt="hero-background"
            className="z-10   "
            loading="lazy"
          />
        </div>
        <div className="z-20  border-green-600 absolute inset-0 text-6xl text-white ">
          <div
            className=" w-[100%]
          fixed z-20
          main-nav-con
           py-[1rem] opacity-2 rounded-lg"
          >
            <div>
              <Navbar />
            </div>
          </div>
          <div
            className=" m-auto relative 
          lg:py-[1.5rem] sm:py-[1rem] 
          top-[8rem] sm:top-[2rem] md:top-[5rem] 
           border-yellow-500"
          >
            <HeroCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
