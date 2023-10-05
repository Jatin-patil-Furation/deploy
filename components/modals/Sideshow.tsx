
import Image from "next/image";
import React , {useEffect, useState} from "react";

const SideShow = ({ handleResponseSideShowCancel, handleResponseSideShowAccept }: any) => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      else{
        handleResponseSideShowCancel()
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
       <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-[#111111] opacity-50"></div>
 
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-Background py-3 px-10 sm:py-5  md:py-7 lg:py-9 flex flex-col gap-5 items-center   z-[100]">
      <p
        className="text-center text-base 
       text-white
      sm:text-lg md:text-xl lg:text-2xl"
      >
        Opponent Requested a side show
      </p>
      <div className="flex justify-between basis-full gap-3">
        <button
          onClick={handleResponseSideShowCancel}
          className="border border-opacity-100
           px-5 py-2 text-sm text-white
            rounded-sm  sm:text-base md:text-lg lg:text-xl  "
          style={{
            borderImage:
              "linear-gradient(111deg, rgba(173, 11, 64, 0.88) 9.86%, #ff1917 63.95%) 1",
          }}
        >
          Cancel
        </button>
        <div className="text-white m-auto px-2">{seconds} sec</div>

        <button
          className="custom-gradient px-5 py-2 text-sm rounded-sm sm:text-base md:text-lg lg:text-xl text-white "
          onClick={handleResponseSideShowAccept}
        >
          Accept
        </button>
      </div>
    </div>
    </div>
  );
};

export default SideShow;
