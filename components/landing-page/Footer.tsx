import { footerPayment, footerSecurity } from "@/constants";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[url(https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/footer/footer-background.svg)] text-white bg-no-repeat bg-cover">
      <div className="footer-conatainer">
        <div className="footer-information px-8 pt-10 md:pt-28 text-center">
          <h3
            data-aos="fade-up"
            className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl expl-text"
          >
            Sikka Play
          </h3>
          <p
            data-aos="fade-up"
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 py-14"
          >
            Welcome to Sikka Play, your ultimate destination for thrilling card
            games and endless entertainment. Immerse yourself in world of
            classic Indian card games, where strategy meets excitement. At Sikka
            Play, we take pride in bringing you two of the most beloved card
            games Teen Patti and Marriage. Whether you are a seasoned card
            player or just starting out, Sikka Play offers a platform where you
            can challenge your friends, connect with players from around the
            world, and showcase your skills. With a user-friendly interface,
            stunning graphics, and smooth gameplay, Sikka Play ensures that
            every hand you play is a memorable one.
            <span data-aos="fade-up" className="text-white block pt-8">
              Thank you for choosing us as your gaming companion. Let the cards
              fall in your favor!
            </span>
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="footer-payment-info flex justify-center items-canter pt-14"
        >
          <hr className=" w-[27%] my-auto" />
          <p className="w-[38%] text-center expl-text text-base sm:text-lg md:text-xl lg:text-2xl">
            Your money is safe with us
          </p>
          <hr className=" w-[27%] my-auto" />
        </div>
        <div
          data-aos="fade-up"
          className="footer-payment-container flex flex-wrap justify-between py-20 px-14"
        >
          <div className="payment-security basis-full md:basis-[40%]">
            <h3 className="text-2xl py-5 text-center ">
              Security & certificates
            </h3>
            <div
              data-aos="fade-up"
              className="footer-payment-security-images flex justify-around gap-3 w-[75%] mx-auto"
            >
              {footerSecurity.length > 0 &&
                footerSecurity.map((image) => (
                  <img
                    src={image.image}
                    alt="image"
                    key={image.id}
                    className=""
                  />
                ))}
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="footer-payment-images basis-full md:basis-[40%]"
          >
            <h3 className="text-2xl  py-5 text-center">Payment Partners</h3>
            <div className="footer-payment-images flex justify-around gap-3  w-[75%] mx-auto">
              {footerPayment.length > 0 &&
                footerPayment.map((image) => (
                  <img
                    src={image.image}
                    alt="image"
                    key={image.id}
                    className=""
                  />
                ))}
            </div>
          </div>
        </div>

        <div data-aos="fade-up" className=" p-5	text-center text-base relative ">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-100 opacity-10 z-0"></div>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg">
            This game involves an element of financial risk and may be
            addictive. Please play responsibly and at your own risk. T&C Apply
          </p>
        </div>

        <div
          data-aos="fade-up"
          className="footer-container flex flex-wrap justify-between px-4 w-[95%] mx-auto md:px-20 py-10 text-sm gap-6 items-start"
        >
          <div
            data-aos="fade-up"
            className="left-footer   basis-[50%] text-sm md:text-base lg:text-lg "
          >
            <div className="Contact-us  text-left">
              <h4 className="text-sm sm:text-base md:text-base lg:text-lg">
                Contact:{" "}
                <a
                  href="mailto:contact@sikkaplay.com "
                  target="_blank"
                  className="underline "
                >
                  contact@sikkaplay.com
                </a>
              </h4>
            </div>
          </div>
          <div className="right-footer flex flex-wrap py-5 basis-[60%]  sm:basis-[45%] text-sm md:text-base lg:text-lg justify-evenly ">
            <a
              href="#"
              className="basis-full  sm:text-left md:text-right text-sm sm:text-base md:text-base lg:text-lg"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="basis-full  sm:text-left md:text-right text-sm sm:text-base md:text-base lg:text-lg"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="basis-full  sm:text-left md:text-right text-sm sm:text-base md:text-base lg:text-lg"
            >
              Cookies Settings
            </a>
          </div>
        </div>

        <hr className="w-[95%] mx-auto bg-slate-400" />
        <h3 className="text-sm px-2 text-center py-8">
          © 2023 Sikka play. All rights reserved. |
          <a className="px-2" href="https://www.furation.tech/" target="_blank">
            Developed By: Furation Tech Solutions Pvt.Ltd.
          </a>
        </h3>
      </div>
    </footer>
  );
};

export default Footer;