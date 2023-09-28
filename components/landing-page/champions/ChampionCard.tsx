"use client";

import React, {useState ,useEffect,useRef } from "react";
import { Swiper,  SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { Championsdata } from "../../../constants/index";

interface CustomNextArrowProps {
  onClick: () => void;
}

interface CustomPrevArrow {
  onClick: () => void;
}
const CustomNextArrow: React.FC<CustomNextArrowProps> = ({ onClick }) => {
return <button className="custom-next-arrow" onClick={onClick}>
   
 </button>;
}
 

// Custom Previous Arrow Component
const CustomPrevArrow: React.FC<CustomNextArrowProps> = ({ onClick }) => {
 return <button className="custom-prev-arrow" onClick={onClick}>
  
  </button>;
}
 

const ChampionCard: React.FC = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  function handleNextClick(): void {
    // Implement the behavior for the "Next" button here
    console.log("Next button clicked");
  }

  function handlePrevClick(): void {
    // Implement the behavior for the "Prev" button here
    console.log("Prev button clicked");
  }
  return (
    <>
      <div
        className="lg:py-[1rem] lg:px-[3.5rem]
     relative top-[-20px]  overflow-hidden "
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={35}
          // navigation={true}
          navigation={{
            nextEl: ".custom-next-arrow", 
            prevEl: ".custom-prev-arrow", 
          }}
          centeredSlides={true}
          initialSlide={1}
          autoplay={{
            delay: 1500,
            // disableOnInteraction: true,
          }}
          onSlideChange={handleSlideChange}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper overflow-hidden  min-h-[420px]  md:px-2 px-4 md:border-red-600"
        >
          {Championsdata.length > 0 &&
            Championsdata.map((data, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className={`swiper-dot  congrs user-descrip userimage user-name Image ${
                    activeIndex === index ? "selected" : ""
                  }`}
                >
                  <div className="py-3 min-h-[400px] px-2 md:py-[.5rem]  md:px-[.8rem] lg:py-[.8rem] lg:px-[1rem]">
                    <div className=" congrs">

                    </div>
                    <div className="flex  py-[.1rem] px-[.3rem]  justify-center items-center ">
                      <div
                        className={`Image rounded-full userimage `}
                        style={{
                          width: activeIndex === index ? "180px" : "100px",
                          opacity: activeIndex === index ? "3" : ".5",
                          border:
                            activeIndex === index ? "5px solid #B40E0D" : "",
                          marginTop: activeIndex === index ? "-10px" : "30px",
                        }}
                      >
                        <Image
                          src={data.avatar}
                          width={100}
                          height={100}
                          alt={`Profile Image ${index + 1}`}
                        />
                      </div>
                    </div>

                    <div className=" lg:py-[.5rem] lg:px-[1rem] border-green-600 mt-5">
                      <p
                        className="text-center  expl-text font-normal md:text-xl lg:text-2xl leading-8 tracking-normal text-gray-600"
                        style={{
                          color: activeIndex === index ? "#ffffff" : "#6E6E6E",
                        }}
                      >
                        {" "}
                        {data.username}
                      </p>
                    </div>
                    <div className="m-7  mt-[-4px]  sm:py[2rem] md:py[1.5rem] lg:py-[.9rem]  lg:px-[1.5rem] border-green-600 ">
                      <p
                        className={`${
                          index + 1
                        } text-center mt-[-2px] py-2 font-lato text-sm sm:text-lg font-thin leading-1 sm:leading-5 tracking-normal`}
                        style={{
                          color: activeIndex === index ? "#ffffff" : "#6E6E6E",
                        }}
                      >
                        {data.userdes}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      
      <div
        className=" py-2 relative 
      z-10
      cursor-pointer top-[-290px] flex justify-between border-red-600"
      >
        <div>
          <CustomPrevArrow onClick={handlePrevClick} />
        </div>
        <div>
          <CustomNextArrow onClick={handleNextClick} />
        </div>
      </div>
    </>
  );
};

export default ChampionCard;

