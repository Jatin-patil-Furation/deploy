import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FiCopy } from "react-icons/fi";
import Toast from "@/app/(pages)/notification/Toast";
import { toast } from "react-toastify";
import { playprivatetableSuccess } from "@/redux/AppReducer/Action";

interface CardState {
  joinprivatetable: boolean;
  Setjoinprivatetable: React.Dispatch<React.SetStateAction<boolean>>;
}

const Joinmodal: React.FC<CardState> = ({ Setjoinprivatetable }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [privateCode, setPrivateCode] = useState(0);

  const handlePlayPrivate = () => {
    dispatch(playprivatetableSuccess(privateCode));
    localStorage.setItem("privateTableKey", JSON.stringify(privateCode));
    // router.push("/teen-patti");
    window.location.href = "/teen-patti";
  };
  const handleclose = () => {
    Setjoinprivatetable(false);
  };
  const privateTableKey = useSelector(
    (store: any) => store.AppReducer.Privatecode
  );
  console.log(privateTableKey);

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-Background  flex flex-col gap-3 items-center   z-[100] w-[75%] sm:w-[40%] md:w-[30%] lg:w-[30%] ">
      <button
        className="relative custom-gradient py-3 px-4 w-full rounded-t-sm rounded-b-none"
        style={{
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Join Private Table
        </p>
        <Image
          src={"/assets/other/x.svg"}
          onClick={handleclose}
          alt="x"
          width={50}
          height={50}
          className="w-[5%] md:w-[4%] lg:w-[3%] absolute right-3  md:right-4 lg:right-6 top-1/2 transform  -translate-y-1/2 "
        />
      </button>

      <div className=" w-[80%] mx-auto flex flex-col gap-2 bg-Background  py-5 px-2">
        <h1 className=""> Table Code </h1>

        <div className="flex items-center  border-yellow-600">
          <input
            type="text"
            value={privateCode}
            onChange={(e:any) => setPrivateCode(e.target.value)}
            className="item-center  py-2   w-[90%] text-white bg-GreyDark text-center"
          />
        </div>
        <div className=" flex items-center py-4 border-yellow-800">
          <button
            onClick={handlePlayPrivate}
            className="custom-gradient
            w-[90%]
            rounded-xl px-3 py-2   text-sm sm:text-base md:text-lg lg:text-xl
           hover:bg-gradient-to-t from-[#AD0B40] to-[#FF1917]  bg-opacity-15 hover:border-none transition-all duration-200 ease-in	delay-300
        "
          >
            Lets Play
          </button>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default Joinmodal;
