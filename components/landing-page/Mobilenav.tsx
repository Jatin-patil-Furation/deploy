"use client";
import Image from "next/image";
import React from "react";

const Mobilenav: React.FC = () => {
  return (
    <nav className=" mx-auto flex justify-between items-center mobilenav">
      <div className="flex items-center justify-center  m-auto  border-yellow-400">
        <Image src={"https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/hero/hero-heading.svg"
            } 
            width={100}
            height={100}
            alt="img" className="h-[30px] pb-1 " />
      </div>
    </nav>
  );
};

export default Mobilenav;
