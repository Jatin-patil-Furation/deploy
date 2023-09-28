import React from "react";

import champrectangle from "../../../public/assets/champs/champ-sidelogo.svg";
import Image from "next/image";
import ChampionCard from "./ChampionCard";
import sufflecoin from "../../../public/assets/champs/Sufflechamp.svg";
import gamelogo from "../../../public/assets/champs/Gamelogo.svg";

 import AOS from "aos";
 import "aos/dist/aos.css"; 


const Champions: React.FC = () => {



  return (
    <div
      className=" w-[100%]  py-[1rem] px-[1rem] m-auto border-green-600 bg-[rgb(7,7,7)]
     champ-con
    "
    >
      <div className="w-[100%] py-[1rem] px-[.5rem]  m-auto  flex justify-between ">
        <div
          data-aos="fade-up"
          className=" aos-init aos-animate w-[15%]  border-red-700"
        >
          <Image
            src={
              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/champs/champ-sidelogo.svg"
            }
            width={200}
            height={200}
            alt="logo"
            className="mt-[-2px]"
          />
        </div>

        <div
          data-aos="fade-up"
          className=" aos-init aos-animate w-[15%] border-red-700"
        >
          <Image
            src={
              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/champs/Sufflechamp.svg"
            }
            width={150}
            height={150}
            alt="logo"
            className="mt-[-2px]"
          />
        </div>
      </div>
      <div
        data-aos="fade-up"
        className="py-[.8rem] px-8 md:px-1 lg:px-1 aos-init aos-animate  relative top-[-30px] flex items-center justify-center m-auto"
      >
        <div className=" border-yellow-600 headtop">
          <div className="flex items-center expl-text  justify-center py-[.6rem] lg:py-[1rem] border-yellow-500 ">
            <h1 className="text-center  text-white text-[1.2rem] lg:text-4xl  items-center">
              {" "}
              Champions Talk{" "}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-8xl   py-[1rem] px-[1rem] m-auto border-yellow-500">
        <ChampionCard />
      </div>
    </div>
  );
};

export default Champions;
