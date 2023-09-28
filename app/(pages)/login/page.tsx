"use client";
import React from "react";
import Tablist from "../tablist/Tablist";

import Image from "next/image";

const page = () => {
  return (
    <div className="overflow-hidden max-w-8xl   px-2 py-2 md:pb-[16%] md:py-[12%] lg:py-[2%] bg-[#000000] bg-[url('/assets/users/userbackground.svg')]  border-green-700">
      <div className="w-[60%] py-2 pt-10 sm:pt-1
       sm:w-[50%] md:w-[40%] 
       lg:w-[20%]  flex items-center justify-center m-auto  border-green-600">
        <Image
          src={
            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/users/sikkuserlogo.svg"
          }
          width={200}
          height={100}
          alt="sikka"
        />
      </div>

      <div className="w-[100%]  py-[18%] md:py-[10%] lg:py-[2%] lg:pb-[2%] bg-center  border-green-700  bg-no-repeat ">
        <div className="w-[100%]  rounded-lg px-2 mb-5 lg:py-[1%] sm:w-[60%] md:w-[50%] lg:w-[40%] bg-[#000000] m-auto  border-red-500">
          <Tablist />
        </div>

        <div className="w-[80%]  px-2 sm:w-[90%] m-auto  pt-[20%] sm:pt-[10%] md:pt-[14%]  py-[5%] sm:py-[10] md:py-[8%] lg:py-7  flex items-center justify-center  border-yellow-500">
          <Image
            src={
              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/users/Bottomborder.svg"
            }
            width={800}
            height={100}
            alt="Acelocked"
            className="text-white color-white pt-10 sm:pt-5"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
