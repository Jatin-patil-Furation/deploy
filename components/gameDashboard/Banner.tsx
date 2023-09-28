import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="pt-16 sm:pt-20 lg:pt-28">
      <div className="bg-[url('/assets/landingPage/banner-bg.svg')] overflow-y-clip w-[100vw] h-[50vh] sm:h-[60vh] z-0 md:h- bg-no-repeat bg-center bg-cover relative">
        <Image
          src={"/assets/landingPage/banner-cards.svg"}
          alt=""
          className="absolute left-0 top-3 w-[35%] sm:w-[20%] lg:hidden "
          width={50}
          height={50} 
        />
        <Image
          src={"/assets/landingPage/banner-cards.svg"}
          alt=""
          className="hidden   top-3 lg:w-[20%]  lg:block lg:absolute lg:right-72 xl:right-96 xl:top-1 xl:w-[15%] "
          width={50}
          height={50}
        />
        <Image
          src={"/assets/landingPage/banner-18.svg"}
          alt=""
          className="absolute right-7 md:right-10 lg:right-14 bottom-7 md:bottom-10 lg:bottom-14  w-[10%] sm:w-[7%] lg:w-[4%]"
          width={50}
          height={50}
        />
        <Image
          src={"/assets/landingPage/banner-disco.svg"}
          alt=""
          className="absolute right-3 top-0 lg:top-[-3rem] lg:right-28 w-[30%] sm:w-[25%] lg:w-[20%] xl:w-[18%] "
          width={50}
          height={50}
        />
        <Image
          src={"/assets/landingPage/banner-footer.svg"}
          alt=""
          className="absolute left-0 bottom-[-2rem] md:bottom-[-4rem] w-[50%] sm:w-[40%] xl:bottom-[-5rem]"
          width={50}
          height={50}
        />
        <Image
          src={"/assets/landingPage/banner-ft-text.svg"}
          alt=""
          className="absolute right-0 bottom-[-0.2rem] w-[80%] sm:w-[70%] md:w-[50%] lg:w-[35%] z-20"
          width={50}
          height={50}
        />
        <Image
          src={"/assets/landingPage/game-host.svg"}
          alt=""
          className=" hidden lg:block lg:absolute w-[35%] bottom-[-2rem] right-28 z-10 xl:w-[30%] xl:right-48"
          width={50}
          height={50}
        />
        <div className="flex justify-center  items-center  flex-col w-[50%] md:w-[55%] mx-auto lg:mx-3 py-10 space-y-2 ">
          <Image
            src={"/assets/landingPage/banner-sikkaplay.svg"}
            alt=""
            width={50}
            height={50}
            className="w-[110%] sm:w-[80%] md:w-[60%]"
          />
          <p className="text-xs sm:text-sm md:text-base">ONLINE</p>
          <h2 className="text-3xl md:text-4xl font-bold w-full text-center">
            Welcome bonus up to $4000
          </h2>
          <button className="custom-gradient px-3 py-2 text-xs rounded-md sm:text-sm md:text-base">
            Grab this offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
