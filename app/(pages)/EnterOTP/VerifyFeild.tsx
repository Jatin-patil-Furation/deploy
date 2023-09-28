/* eslint-disable react/no-unescaped-entities */
import React, { FC, useRef, useEffect, useState } from "react";

interface Props {}

const VerifyField: FC<Props> = (props): JSX.Element => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeotpindex, setActiveOtpindex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = e.target;
    const newOTP: string[] = [...otp];
    newOTP[index] = value.substring(value.length - 1);

    if (!value) {
      setActiveOtpindex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else {
      setActiveOtpindex((prevIndex) => Math.min(prevIndex + 1, 5));
    }

    setOtp(newOTP);
  };

  const handleKeydown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (key === "Backspace") {
      if (!otp[index]) {
        setActiveOtpindex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeotpindex]);

  const calculateButtonColor = () => {
    if (otp.length < 6) {
      return "bg-[#636363]";
    } else {
      return "bg-gradient-to-t from-[#AD0B40] to-[#FF1917]";
    }
  };

  return (
    <>
      <div className=" mx-auto border-yellow-500 ">
        <label htmlFor="OTP" className="text-white  text-sm">
          Email OTP
        </label>

        <div className="w-[100%] pt-2 border-red-500 flex justify-center items-center gap-1 space-x-2">
          {otp.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <input
                  ref={index === activeotpindex ? inputRef : null}
                  type="number"
                  maxLength={1}
                  placeholder="  -"
                  className="w-[100%]  h-[62px]  rounded bg-[#1E1E1E]
                outline-none text-center  font-semibold text-xl spin-button-none border-gray-400
                 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
                  onKeyDown={(e) => handleKeydown(e, index)}
                  onChange={(e) => handleOnchange(e, index)}
                  value={otp[index]}
                />
              </React.Fragment>
            );
          })}
        </div>
        <div
          className={`${
            otp.length < 6
              ? "bg-[#636363]"
              : "bg-gradient-to-t from-[#AD0B40] to-[#FF1917]"
          } py-2 px-2 mt-5  bg-[#636363] flex items-center justify-center border-yellow-600 rounded-md`}
        >
          <button
            className={` text-white py-1 px-2 font-semibold text-sm text-center`}
          >
            Verify
          </button>
        </div>

        <div className="py-5 px-2 flex items-center justify-center border-yellow-600 rounded-md">
          <div className="flex justify-between gap-2 border-red-600">
            <h2 className="text-[#1E1E1E] text-sm sm:text-base font-semibold">
              Didn't Revice any Code?
            </h2>
            <h2 className="text-white text-sm sm:text-base">Resend Code</h2>
          </div>
        </div>

        <div className="py-5 px-2 flex items-center justify-center border-yellow-600 rounded-md">
          <div className="flex justify-between gap-2 border-red-600">
            <h2 className="text-[#1E1E1E] text-sm sm:text-base  font-semibold">
              Don't have an account?{" "}
            </h2>
            <h2 className="text-red-500 text-sm sm:text-base  underline block">
              {" "}
              SignUp{" "}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyField;
