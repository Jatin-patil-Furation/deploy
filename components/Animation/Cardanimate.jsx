'use client';

import React, { useEffect, useState } from "react";
import "./ani.css";
import $ from "jquery";
import Image from "next/image";


const Cardanimate = ({ cardsInfo,seeplayingcard }) => {
  
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

   console.log( "seeplaying",seeplayingcard, cardsInfo);
  return (
    <>
      {!cardsInfo ? (
        <div className="container">
          <div className="relative md:top-6 lg:top-1 left-16 w-[25%] m-auto items-center">
            <Image
              src={"/assets/Game-table/Backcard.svg"}
              alt="Backcard"
              width={100}
              height={50}
            />
          </div>
        </div>
      ) : (
        <div className="container">
          {cardsInfo?.length > 0 &&
            cardsInfo?.map((el, index) => {
              return (
                <div
                  key={el.id}
                  className={`card ${isFlipped[index] ? "flipped" : ""} 
                 ${
                   index == 0
                     ? " border-black transform rotate-[-30deg] relative left-[18%] top-1"
                     : ""
                 }
                  ${
                    index == 1
                      ? " border-blue-700 transform rotate-[-5deg] relative left-[12%]"
                      : ""
                  }
                   ${
                     index == 2
                       ? " border-yellow-500 transform rotate-[16deg] relative left-[6%]"
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

export default Cardanimate;

