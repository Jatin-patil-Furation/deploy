import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";


const Mobilehero = () => {
   const router = useRouter()


  return (
    <div className="max-w-4xl mt-[-2px] px-2 border-yellow-700   mobilehero ">
      <div className="w-[100%]   mx-auto  px-1 py-10 pb-[1%] border-red-600 mobilepadding">
        <div className=" pt-4 border-green-600">
          <div className="heroshadow  relative top-[-30px] left-[50px] h-[1px] z-1">
            <Image
              src={
                "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/Ellipse+152.svg"
              }
              alt="heroshadow"
              width={300}
              height={300}
            />
          </div>
          <div className="m-auto py-4 px-2 flex items-center justify-center  border-yellow-400">
            <Image
              src={
                "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/hero/hero-image.svg"
              }
              width={100}
              height={100}
              alt="Image"
              className="w-[70%]  m-auto heroimage"
            />
          </div>
          <div className="w-[60%] sikka  m-auto ">
            <Image
              src={
                "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/hero/hero-heading.svg"
              }
              width={400}
              height={400}
              alt="Sikkafont"
              className="  m-auto"
            />
          </div>
        </div>

        <div className="  border-red-400">
          <div className="px-2 py-2 m-auto">
            <p className="text-white text-center text-base  font-Lato text-[rgba(255, 255, 255, 0.8)] tracking-[0.1px] ">
              Experience boundless amusement on ultimate betting platform!
              Unfold endless entertainment.
            </p>
          </div>
        </div>
        <div className="flex m-1 justify-center  items-center space-x-4 buttoncon ">
          <button
            onClick={() => router.push("/login")}
            className="px-8 py-2 text-white font-lato  text-sm rounded  bg-opacity-15  border-white border-[0.5px] 
          hover:bg-gradient-to-t from-[#AD0B40] to-[#FF1917]  bg-opacity-15  hover:border-none transition-all duration-200 ease-in	delay-300
          "
          >
            Login
          </button>
          <button
            onClick={() => router.push("/createuser")}
            className="bg-white-500 px-8 py-2 font-lato text-sm  rounded bg-white text-[#ad0b40]  border-white border-[0.5px] 
           hover:bg-gradient-to-t from-[#AD0B40] to-[#FF1917]  bg-opacity-15  hover:border-none transition-all duration-200 ease-in	delay-300
          "
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  ); 


};

export default Mobilehero;
