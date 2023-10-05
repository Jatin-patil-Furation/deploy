'use client';

import React, { useState } from "react";
import Image from "next/image";
import Toast from "@/app/(pages)/notification/Toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/Firebase/firebase";



const ResetpasswordModal = ({ Setresetpassword }) => {
  const [email, SetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      try {
        await sendPasswordResetEmail(auth, email);
        setResetSent(true);
      } catch (error) {
        console.error("Error sending password reset email", error);
      }
    }
  };

  return (
       <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-[#111111] opacity-50"></div>
 
    <div>
      <div
        className={`w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-Background rounded-b-md z-[100]`}
      >
        <div>
          <button
            className="relative custom-gradient py-3 px-4 w-full rounded-t-sm rounded-b-none "
            style={{
              borderBottomRightRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Reset Password
            </p>
            <Image
              src={"/assets/other/x.svg"}
              onClick={() => Setresetpassword(false)}
              alt="x"
              width={50}
              height={50}
              className="w-[4%] md:w-[3%] absolute right-3 md:right-6 top-1/2 transform -translate-y-1/2"
            />
          </button>

          {resetSent ? (
            <p className="text-center py-4">
              {" "}
              Password reset email sent. Check your inbox
            </p>
          ) : (
            <div className="w-[100%] px-2 py-4">
              <form onSubmit={handleSubmit}>
                <label htmlFor="phone" className="text-white m-1   text-sm">
                  Email
                </label>
                <div className="flex justify-between py-1  border-red-700 items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => SetEmail(e.target.value)}
                    className="w-full text-white px-4 bg-[#1E1E1E]
               border-red-600  p-2 rounded "
                    placeholder=" Enter your email"
                  />
                </div>

                <div className=" flex items-center text-center w-[50%] m-auto py-4 border-yellow-800">
                  <button
                    className="custom-gradient rounded-xl px-3 py-2 w-full  text-sm sm:text-base md:text-lg lg:text-xl
                    hover:bg-gradient-to-t from-[#AD0B40] to-[#FF1917]  bg-opacity-15 hover:border-none transition-all duration-200 ease-in	delay-300
        "
                  >
                    Reset password
                  </button>
                </div>
              </form>

              <Toast />
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ResetpasswordModal;
