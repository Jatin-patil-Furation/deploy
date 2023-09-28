 import { offerDeatils } from "@/constants";
import React from "react";
import gamelogo from "../../public/assets/game/Gamelogo.svg"


const Offer = () => {
  return (
    <div className="bg-black text-white py-10">
      <div
        data-aos="fade-up"
        className="py-[2rem] px-8 md:px-1 lg:px-1  aos-init aos-animate flex items-center justify-center px-auto"
      >
        <div className="m-10   border-yellow-600 headtop">
          <div className="flex items-center expl-text  justify-center py-[.6rem] lg:py-[1rem] border-yellow-500 ">
            <h1 className="text-center  items-center  text-[1.2rem] lg:text-3xl ">
              {" "}
              Exclusive Offers{" "}
            </h1>
          </div>
        </div>
      </div>

      <div className=" w-[95%] m-auto pt-4  justify-center items-center  grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 px-[2rem] py-3 sm:gap-7 md:gap-10 lg:gap-4  ">
        {offerDeatils.map((offer) => {
          return (
            <div
              data-aos="fade-up"
              key={offer.id}
              className="basis-full  aos-init aos-animate object-fill sm:basis-[45%] md:basis-[30%] "
            >
              <div className="w-[90%] md:w-[80%] mx-auto hover:scale-105 transition-all delay-200 ease-in ">
                <img
                  src={offer.offerImage}
                  alt=""
                  className="w-full "
                  style={{
                    filter: "drop-shadow(0px 0px 20px rgba(255, 192, 0, 0.30))",
                  }}
                />
                <button className="font-lato font-semibold bg-gradient-to-t from-[#AD0B40] to-[#FF1917] py-3 px-2 w-full rounded-b-xl ">
                  Play Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Offer;
