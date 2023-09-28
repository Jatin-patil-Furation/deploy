"use client";
import React, { useState } from "react";
import PhoneNumber from "../phonenumber/PhoneNumber";
import EmailLogin from "../EmailLogin/EmailLogin";

import VerifyField from "../EnterOTP/VerifyFeild";


const Tablist = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-[100%]  border-green-500  mx-auto p-2">
      <div className="flex ">
        <button
          onClick={() => handleTabChange("login")}
          className={`w-full  py-2 text-sm  focus:outline-none ${
            activeTab === "login"
              ? "text-[#CA2446] border-b border-b-[#ca2446]"
              : "text-gray-500"
          }`}
        >
          Phone Number
        </button>
        <button
          onClick={() => handleTabChange("signup")}
          className={`w-full  py-2 text-sm  focus:outline-none ${
            activeTab === "signup"
              ? "text-[#CA2446] border-b border-b-[#ca2446]"
              : "text-gray-500"
          }`}
        >
          Email Address
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "login" && (
          <div className="py-2 ">
            <PhoneNumber />
         
          </div>
        )}

        {activeTab === "signup" && (
          <div className="py-2 ">
            <EmailLogin />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tablist;
