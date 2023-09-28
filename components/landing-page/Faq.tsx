"use client"
import { faqData } from '@/constants';
import React, { useState } from 'react'
import { ChevronUp, ChevronDown } from "lucide-react";

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const handleAccordionClick = (index: any) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  return (
    <section className="mx-auto p-16 pb-28 sm:pb-32  lg:p-40  bg-[#0c0c0c] text-white relative ">
      <div>
        <div className="mx-auto max-w-4xl lg:text-center">
          <h2 className=" text-2xl md:text-3xl lg:text-5xl expl-text font-normal leading-10 text-white  text-center">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mx-auto mt-8 max-w-3xl space-y-4 md:mt-16">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="cursor-pointer border-[#B40E0D] border-t-[1px]  transition-all duration-160"
            >
              <button
                type="button"
                className="flex w-full items-start justify-between px-4 py-5 sm:p-6 md:items-center"
                onClick={() => handleAccordionClick(index)}
              >
                <span className="flex text-start text- md:text-base lg:text-lg font-semibold text-white">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-160 transition-all	 duration-200" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-160 transition-all	 duration-200" />
                )}
              </button>
              {activeIndex === index && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6 transition-all	 duration-200">
                  <p className="text-[#5f5f5f] text-xs md:text-sm lg:text-base">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <img
        src={
          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/faq/AceCard.svg"
        }
        alt="img"
        className="w-16 h-16 lg:w-[100px] lg:h-[100px] absolute top-[-4rem] right-8"
      />
      <img
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
        src={
          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/faq/BlackChip.svg"
        }
        alt="img"
        className="w-16 h-16 lg:w-[100px] lg:h-[100px] absolute top-1 left-2 lg:left-12"
      />
      <img
        data-aos="fade-up"
        data-aos-duration="2000"
        src={
          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/faq/PinkChip.svg"
        }
        alt="img"
        className="w-16 h-16 lg:w-[100px] lg:h-[100px] absolute bottom-[-2rem] sm:bottom-[-2.5rem] md:bottom-[-2.8rem] lg:bottom-[-3rem] left-8"
      />
      <img
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
        src={
          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/faq/GreenChip.svg"
        }
        alt="img"
        className="w-20 h-20 lg:w-[140px] lg:h-[140px] absolute bottom-8 right-4 lg:right-8"
      />
      <img
        data-aos="fade-up"
        data-aos-duration="2000"
        src={
          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/faq/AceCard.svg"
        }
        alt="img"
        className=" rotate-180 w-16 h-16 lg:w-[110px] lg:h-[110px] absolute bottom-[4rem] left-4 lg:left-28"
      />
    </section>
  );
}

export default Faq