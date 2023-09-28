"use client";

import React, { useEffect, useState } from "react";
import "./cardmiddle.css";
import $ from "jquery";
import Image from "next/image";


const Cardleftmiddle = ({cardsInfo}) => {
 
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);
  const [isFlipped, setIsFlipped] = useState(Array(cardsInfo?.length).fill(false));

  const toggleAllCards = () => {
    setIsFlipped((prevIsFlipped) =>
      prevIsFlipped.map((_) => !prevIsFlipped[0])
    );
  };

  // console.log(seeplayingcard);
  return (
    <>
      {!cardsInfo ? (
        <div className="">
          <div className="relative mt-[-80%] left-[90%] w-[55%] m-auto items-center">
            <Image
              src={"/assets/Game-table/leftmiddlecard.svg"}
              alt="Backcard"
              width={200}
              height={200}
            />
          </div>
        </div>
      ) : (
        <div className="containermiddletop">
          {cardsInfo?.length > 0 &&
            cardsInfo?.map((el, index) => {
              return (
                <div
                  key={el.id}
                  className={`cardmiddletop ${isFlipped[index] ? "flipped" : ""} 
                 ${
                   index == 0
                     ? " border-black transform rotate-[-30deg] relative left-[16%] top-1"
                     : ""
                 }
                  ${
                    index == 1
                      ? " border-blue-700 transform rotate-[-5deg] relative left-[12%]"
                      : ""
                  }
                   ${
                     index == 2
                       ? " border-yellow-500 transform rotate-[18deg] relative left-[8%]"
                       : ""
                   }

                `}
                  data-suite={el.type}
                  data-value={el.name}
                >
                  <div className="front">
                    <span></span>
                    <span></span>
                  </div>
                  <div className="back"></div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Cardleftmiddle;
