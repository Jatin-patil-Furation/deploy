'use client'
import { GameCardDetails } from "@/constants";
import React  from "react";
import GameCard from "./GameCard";

import Image from "next/image";

import game from "../../public/assets/game/abs-1.svg";
import AOS from "aos";
import "aos/dist/aos.css"; 

const Game = () => {



  return (
    <div className="bg-[#0C0C0C] border-none relative w-[100vw]  py-12 px-3 text-white">
      <div className="py-[2rem] px-6 md:px-1 lg:px-1  flex items-center justify-center px-auto">
        <div className="m-10   py-[.2rem] border-yellow-600 headtop">
          <div className="flex  border-green-700 items-center  justify-center ">
            <h1 className="text-center py-2 items-center  px-24  expl-text text-[1.2rem] lg:text-4xl ">
              {" "}
              Games{" "}
            </h1>
          </div>
        </div>
      </div>

      <Image
        data-aos="fade-up"
        src={
          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/game/pink-chip.svg"
        }
        width={50}
        height={50}
        alt="chip"
        className="w-14 sm:w-16 sm:h-16 lg:w-24 h-12 lg:h-24 top-8 right-[-0.5em] absolute"
      />

      <Image
        data-aos="fade-up"
        src={game}
        alt="game"
        className="w-14 sm:w-16 sm:h-16 lg:w-24 h-12 lg:h-24  top-8 left-1 absolute"
      />

      <div className="game-card-container max-w-8xl m-auto  grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-7   my-3 lg:my-12 sm:my-6  sm:justify-between sm:px-2  ">
        {GameCardDetails.map((card) => {
          return (
            <div
              data-aos="fade-up"
              key={card.id}
              className=" p-6 sm:w-[90%] md:w-[70%] lg:w-[100%] w-[100%] m-auto"
            >
              <GameCard card={card} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Game;
