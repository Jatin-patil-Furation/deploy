"use client";
import React, { useState } from "react";
import Image from "next/image";

import StepControl from "../allRegistration/StepControl";




const Page = () => {
  const [currentStep, SetCurrentStep] = useState(1);
  const steps = ["Step 1", "Step 2", "Step 3"];

  return (
    <div
      className=" max-w-8xl     px-2 py-[16%]  pb-[22%] sm:py-[2%] md:py-[6%] lg:py-2   bg-[#000000]
     bg-[url('https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/users/userbackground.svg')] 
     bg-cover 
     border-red-700"
    >
      <div
        className="w-[100%]  py-[2%] pt-[10%] pb-[8%]  
      sm:py-[7%] md:py-[14%] lg:py-1 
      lg:pb-[2%] bg-center 
        border-green-700  bg-no-repeat "
      >
        <div className="w-[40%]  sm:pb-4 lg:py-2 lg:pb-1 sm:w-[30%] md:w-[50%]  lg:w-[30%]  flex items-center justify-center m-auto  border-green-600">
          <Image
            src={
              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/users/sikkuserlogo.svg"
            }
            width={400}
            height={400}
            alt="sikka"
            className="md:w-[50%] lg:w-[50%]"
          />
        </div>

        <div className="pt-[7%]  sm:pt-2 md:pt-14 lg:pt-1">
          <div
            className="w-[100%]  rounded-lg  mb-5 
          lg:py-1 sm:w-[60%]
           md:w-[50%] lg:w-[35%] 
           bg-[#000000] m-auto  border-red-500"
          >
            <StepControl
              SetCurrentStep={SetCurrentStep}
              currentStep={currentStep}
              steps={steps}
            />
          </div>
        </div>

        <div
          className="w-[80%] m-auto 
         sm:py-[10] md:py-[8%] lg:py-2 
         px-2 flex items-center justify-center  border-yellow-500"
        >
          <Image
            src={
              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/users/Bottomborder.svg"
            }
            width={800}
            height={100}
            alt="Acelocked"
            className="text-white color-white
             pt-20 sm:pt-10 md:pt-[18%] lg:pt-20 "
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
