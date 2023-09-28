import Image from "next/image";
import React ,{useState} from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FiCopy } from "react-icons/fi";
import Toast from "@/app/(pages)/notification/Toast";
import {toast} from "react-toastify"

const Shareinvite = ({ SetshareinviteCode, joincode }) => {
  const [textToCopy, setTextToCopy] = useState(joincode); // Initialize with the text you want to copy
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleclose = () => {
    SetshareinviteCode(false);
  };

  const copyToClipboard = () => {
      // setTextToCopy(joincode);
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        toast.success("copied");
      })
      .catch((error) => {
        console.error("Copy failed: ", error);
      });
  };

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-Background  flex flex-col gap-3 items-center   z-[100] w-[75%] sm:w-[40%] md:w-[30%] lg:w-[30%] ">
      <button
        className="relative custom-gradient py-3 px-4 w-full rounded-t-sm rounded-b-none"
        style={{
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold">
          Share & Invite
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
        <h1 className="text-white"> Table Code </h1>

        <div className="flex items-center custom-gradient border-yellow-600">
          <input
            type="text"
            value={textToCopy}
            className="item-center w-[90%] text-white bg-GreyDark text-center"
            readOnly
          />

          <div className="w-[20%]  text-[#FFFFFF] flex items-center">
            <FiCopy onClick={copyToClipboard} className="m-auto" />
          </div>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default Shareinvite;
