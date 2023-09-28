/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Navbar from "@/components/gameDashboard/Navbar";
import { GetloggedData } from "@/redux/AppReducer/Action";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  const getuserinfo = useSelector(
    (store: any) => store.AppReducer.Userloggeddata
  );

  useEffect(() => {
    GetloggedData(dispatch)
      .then((res: any) => {
        console.log("res", res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-Background text-white pt-20 w-[90%   ] overflow-y-hidden">
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center basis-[90%]">
          <h2>Edit Profile</h2>
          <div className="border-2 border-red-500">
            <Image
              src={getuserinfo?.avatar}
              alt="user avatar"
              width={500}
              height={500}
              className="w-[100%] rounded-full"
            />
            <p className="text-Secondary">Change Avatar</p>
          </div>
        </div>
        <div className="user-edit  space-y-4 w-[90%] basis-[90%]">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder={getuserinfo?.name}
              name="name"
              className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder={getuserinfo?.email}
              name="email"
              className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="phone-no">Phone Number</label>
            <input
              type="number"
              placeholder={getuserinfo?.phone.toString()}
              name="phone-no"
              className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col basis-[45%] ">
              <label htmlFor="dob">DOB</label>
              <input
                type="date"
                name="dob"
                id=""
                placeholder={getuserinfo?.DOB.toString()}
                className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
              />
            </div>
            <div className="flex flex-col basis-[45%] ">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id=""
                className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
              >
                <option value="Male" selected>
                  Male
                </option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id=""
              placeholder={getuserinfo?.address.toString()}
              className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
            />
          </div>
          <div className="flex  flex-wrap justify-between items-center ">
            <div className="flex flex-col basis-full sm:basis-[40%] ">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id=""
                placeholder={getuserinfo?.country.toString()}
                className="placeholder:text-GreyLight px-1 py-4 rounded-sm bg-GreyDark outline-none"
              />
            </div>
            <div className="flex flex-col basis-full sm:basis-[40%] ">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id=""
                placeholder={getuserinfo?.city.toString()}
                className="placeholder:text-GreyLight px-1 py-4 rounded-sm bg-GreyDark outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="number"
              name="postalCode"
              id=""
              placeholder={getuserinfo?.postalCode.toString()}
              className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
            />
          </div>
        </div>
        <button className="custom-gradient px-3 py-4 w-[90%] mx-auto my-3">
          update
        </button>
      </div>
    </div>
  );
};

export default page;
