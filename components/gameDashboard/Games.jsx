'use client'
import React,{useState} from "react";
import Image from "next/image";
import Shareinvite from "../modals/Shareinvite";




const Games= ({ setTeenPattiGame }) => {
  const [showJointable, SetshowJointable] = useState(false);

  const cardState = {
    showJointable,
    SetshowJointable,
  };
  // https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets
  https: return (
    <>
      <div className=" mt-5 sm:mt-7 md:mt-9 lg:mt-12 games-container flex justify-around items-center max-w-7xl  mx-3 flex-wrap gap-3 xl:justify-between">
        <div className="teen-patti-container basis-full sm:basis-[40%] md:basis-[36%] lg:basis-[45%] space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4 xl:space-y-5 ">
          <Image
            src={
              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/landingPage/teen-patti.svg"
            }
            alt=""
            className="w-full"
            width={500}
            height={500}
          />
          <button
            className="custom-gradient px-3 py-2 w-full rounded-xl text-sm sm:text-base md:text-lg lg:text-xl
           hover:bg-gradient-to-t from-[#AD0B40] to-[#FF1917]  bg-opacity-15 hover:border-none transition-all duration-200 ease-in	delay-300
        "
            onClick={() => setTeenPattiGame(true)}
          >
            Play Button
          </button>
        </div>
        <div className="merriage-container basis-full sm:basis-[40%] md:basis-[36%] lg:basis-[45%] space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4 xl:space-y-5">
          <Image
            src={"/assets/landingPage/marriage.svg"}
            alt=""
            className=" w-full "
            width={500}
            height={700}
          />
          <button
            className="custom-gradient rounded-xl px-3 py-2 w-full  text-sm sm:text-base md:text-lg lg:text-xl
           hover:bg-gradient-to-t from-[#AD0B40] to-[#FF1917]  bg-opacity-15 hover:border-none transition-all duration-200 ease-in	delay-300
        "
          >
            Play Button
          </button>
        </div>
      </div>
      {showJointable && (
        <Shareinvite
          SetshowJointable={SetshowJointable}
          showJointable={false}
        />
      )}
    </>
  );
};

export default Games;
