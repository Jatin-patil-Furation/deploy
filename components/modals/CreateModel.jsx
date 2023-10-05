import Image from "next/image";
import React from "react";

import { CREATEPRIVATETABLE } from "@/redux/AppReducer/Action";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";




const CreateModel= ({ SetCreateprivatetable }) => {
  const router = useRouter();
  const privateTableKey = useSelector(
    (store) => store.AppReducer.Privatecode
  );
  console.log(privateTableKey);

  const dispatch = useDispatch();
  const handleclose = () => {
    SetCreateprivatetable(false);
  };

  const handleCreateprivatetable = async () => {
    CREATEPRIVATETABLE(dispatch)
      .then((res) => {
        console.log("res", res);
        localStorage.setItem(
          "privateTableKey",
          JSON.stringify(res?.payload?.inviteCode)
        );
        
        window.location.href = "/teen-patti";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
       <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-[#111111] opacity-50"></div>
 
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-Background  flex flex-col gap-1 items-center   z-[100] w-[75%] sm:w-[70%] md:w-[50%] lg:w-[50%] ">
        <button
          className="relative custom-gradient py-3 px-4 w-full rounded-t-sm rounded-b-none"
          style={{
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
          }}
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">Classic</p>
          <Image
            src={"/assets/other/x.svg"}
            onClick={handleclose}
            alt="x"
            width={50}
            height={50}
            className="w-[5%] md:w-[4%] lg:w-[3%] absolute right-3  md:right-4 lg:right-6 top-1/2 transform  -translate-y-1/2 "
          />
        </button>

        <div className="w-full flex flex-col gap-2 bg-Background ">
          <div className="w-full px-2">
            <div className="px-3">
              <div className="flex justify-between items-center p-2 bg-GreyDark my-2">
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base md:text-md lg:text-lg">
                    Boot Amount
                  </h3>
                </div>
                <div className="flex justify-between text-lg sm:text-base md:text-md lg:text-lg">
                  <p> $140</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/** max blinds */}
        <div className="w-full flex flex-col gap-2 bg-Background ">
          <div className="w-full px-2">
            <div className="px-3">
              <div className="flex justify-between items-center p-2 bg-GreyDark my-2">
                <div className="flex flex-col">
                  <h3 className="text-sm  sm:text-base md:text-md lg:text-lg">
                    Max Blinds
                  </h3>
                </div>
                <div className="flex justify-between text-lg sm:text-base md:text-md lg:text-lg">
                  <p> 4 </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/**Chall limit */}
        <div className="w-full flex flex-col gap-2 bg-Background ">
          <div className="w-full px-2">
            <div className="px-3">
              <div className="flex justify-between items-center p-2 bg-GreyDark my-2">
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base md:text-md lg:text-lg">
                    Chaal limit
                  </h3>
                </div>
                <div className="flex justify-between text-lg sm:text-base md:text-md lg:text-lg">
                  <p> $96000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/**Pot Limit */}
        <div className="w-full flex flex-col gap-2 bg-Background ">
          <div className="w-full px-2">
            <div className="px-3">
              <div className="flex justify-between items-center p-2 bg-GreyDark my-2">
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base md:text-md lg:text-lg">
                    Pot Limit
                  </h3>
                </div>
                <div className="flex justify-between text-lg sm:text-base md:text-md lg:text-lg">
                  <p> $7960000 </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-[90%] py-4 border-red-900">
          <p className="text-[#FFFFFF] py-2 text-xs  font-lato md:text-sm lg:text-sm">
            {" "}
            Disclaimer: Lorem Lorem ipsum dolor sit .{" "}
          </p>
          <div className=" border-yellow-700 flex gap-5 ">
            <input type="checkbox" />
            <p className=" text-[#FFFFFF] text-xs  font-lato md:text-sm lg:text-sm">
              Yes I agree with the terms & conditions{" "}
            </p>
          </div>
        </div>

        <div
          className=" w-[50%] py-4 border-yellow-800"
          onClick={handleCreateprivatetable}
        >
          <button
            className="custom-gradient rounded-xl px-3 py-2 w-full  text-sm sm:text-base md:text-lg lg:text-xl
           hover:bg-gradient-to-t from-[#AD0B40] to-[#FF1917]  bg-opacity-15 hover:border-none transition-all duration-200 ease-in	delay-300
        "
          >
            Lets Play
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default CreateModel;
