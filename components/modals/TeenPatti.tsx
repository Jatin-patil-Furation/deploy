import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const TeenPatti = ({
  setTeenPattiGame,
  SetshowJointable,
  SetCreateprivatetable,
  Setjoinprivatetable,
}: any) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const HandleJoinTable = () => {
    localStorage.removeItem("privateTableKey");
    window.location.href = "/teen-patti";
    console.log("join table");
  };

  const handleCreatemodel = () => {
    setTeenPattiGame(false);
    SetCreateprivatetable(true);
  };

  const handleprivatetable = () => {
    setTeenPattiGame(false);
    Setjoinprivatetable(true);
  };

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-Background  flex flex-col gap-3 items-center   z-[100] w-[75%] sm:w-[70%] md:w-[60%] lg:w-[50%] ">
      <button
        className="relative custom-gradient py-3 px-4 w-full rounded-t-sm rounded-b-none"
        style={{
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">Teen Patti</p>
        <Image
          src={"/assets/other/x.svg"}
          onClick={() => setTeenPattiGame(false)}
          alt="x"
          width={50}
          height={50}
          className="w-[5%] md:w-[4%] lg:w-[3%] absolute right-3  md:right-4 lg:right-6 top-1/2 transform  -translate-y-1/2 "
        />
      </button>
      <div className=" w-[80%] mx-auto flex flex-col gap-2 bg-Background  py-5 px-2">
        <button
          onClick={HandleJoinTable}
          className="bg-GreyDark py-3 px-6 basis-full text-sm sm:text-sm md:text-base lg:text-lg rounded-sm text-center"
        >
          Play Online
        </button>
        <button
          onClick={handleprivatetable}
          className="bg-GreyDark py-3 px-6 basis-full text-sm sm:text-sm md:text-base lg:text-lgrounded-sm text-center "
        >
          Join Private Table
        </button>
        <button
          onClick={handleCreatemodel}
          className="bg-GreyDark py-3 px-6 basis-full text-sm sm:text-sm md:text-base lg:text-lg rounded-sm text-center"
        >
          Create Private Table
        </button>
        <button className="bg-GreyDark py-3 px-6 basis-full text-sm sm:text-sm md:text-base lg:text-lg rounded-sm text-center">
          Tournament Mode
        </button>
      </div>
    </div>
  );
};

export default TeenPatti;
