/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import sikklogo from "../../../public/assets/users/sikkuserlogo.svg";
import Image from "next/image";
import { UserAvatar } from "../../../constants/index";
import { useDispatch, useSelector } from "react-redux";
import {
  GetpresignedurlData,
  UpdatedImage,
  UpdatedPost,
} from "@/redux/AuthReducer/Action";
import { GetloggedData } from "@/redux/AppReducer/Action";
import Toast from "../notification/Toast";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useDispatch();
  const getuserinfo = useSelector(
    (store) => store.AppReducer.Userloggeddata
  );
  // console.log("getuserinfo from redux", getuserinfo);

  useEffect(() => {
    GetloggedData(dispatch)
      .then((res) => {
        console.log("resdatalogged", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleImageChange = async (e) => {
    try {
      const selectedFile = e.target.files && e.target.files[0];

      if (!selectedFile) {
        console.log("No file selected");
        return;
      } else {
        setImage(selectedFile);
      }
      const filenam = selectedFile.name;
      // console.log("file",filenam)
      const action = await GetpresignedurlData(filenam)(dispatch);
      const preurl = action?.payload?.presignedurl;

      const res = await UpdatedPost(preurl, selectedFile)(dispatch);
      console.log("resawsupdated", res);
      const avatar = action?.payload?.presignedurl.split("?")[0];
      console.log("avatara", avatar);
      const payload = {
        avatar: avatar,
      };
      console.log("dekho", payload);
      localStorage.setItem("avatar", JSON.stringify(payload));
      const Updateduser = await UpdatedImage(payload)(dispatch);
      console.log("user updated profile", Updateduser);
    } catch (err) {
      console.error(err);
    }
  };
  
  const dataAvatar = localStorage.getItem("avatar");
  const payload= dataAvatar ? JSON.parse(dataAvatar) : null;
  // console.log("avatar data", payload)

  const handleupdatedimage = () => {
    console.log("res handle image");
  };

  const handleclick = () => {
    console.log("hello image uploader");
  };

  const defaultimage = (avatar) => {
    const payload = {
      avatar,
    };
    UpdatedImage(payload)(dispatch)
      .then((res) => {
        console.log(res);
        toast.success("Image Updated");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  return (
    <>
      <div
        className="overflow-hidden max-w-8xl  px-2 py-2 pb-[2%] md:py-[8%] lg:py-[4%] bg-[#000000] 
    bg-[url('https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/users/userbackground.svg')]  border-green-700"
      >
        <div className="w-[50%]  py-4  lg:w-[12%] md:w-[25%]  flex items-center justify-center m-auto  border-green-600">
          <Image src={sikklogo} alt="sikka" />
        </div>

        <div className="w-[100%]  py-[18%] sm:py-[4%] md:py-[6%] lg:py-[1%] lg:pb-[2%] bg-center  border-green-700  bg-no-repeat ">
          <div className="w-[100%] rounded-lg  py-10 md:py-6  sm:w-[60%] md:w-[60%] lg:w-[70%] bg-[#000000] m-auto  border-red-500">
            <div className="py-2 pb-10 flex items-center justify-center ">
              <h2 className="text-white text-center">
                Select Avatar or Upload a picture{" "}
              </h2>
            </div>

            <div className="flex items-center justify-center  m-auto  px-auto mx-auto  border-yellow-700 flex-wrap gap-4 md:gap-14">
              {UserAvatar.length > 0 &&
                UserAvatar.map((el) => {
                  return (
                    <div key={el.id} className="w-[100px]  h-[120px] ">
                      <div
                        onClick={
                          el.cardName === "upload" ? handleclick : undefined
                        }
                        className="bg-[#1E1E1E] flex items-center justify-center w-[100%]  h-[100px] rounded-full border-yellow-500 "
                      >
                        {el.cardName === "upload" ? (
                          <div className="">
                            <label>
                              <Image
                                src={el.avatar}
                                alt="avatar"
                                width={50}
                                height={50}
                              />
                              <input
                                type="file"
                                className="hidden"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                        ) : (
                          <Image
                            onClick={
                              el.cardName === "upload"
                                ? handleclick
                                : () => defaultimage(el.avatar)
                            }
                            src={el.avatar}
                            alt="avatar"
                            width={100}
                            height={100}
                            style={{
                              width: el.id === 1 ? "40px" : "auto",
                            }}
                            className="rounded-full"
                          />
                        )}
                      </div>
                      <h2 className=" pb-4 text-white text-center">
                        {el.cardName}{" "}
                      </h2>
                    </div>
                  );
                })}
            </div>

            <div className="py-2 px-2  mt-5  flex items-center justify-center border-yellow-600 rounded-md">
              <button
                onClick={handleupdatedimage}
                className="text-white py-4 px-10 rounded-lg bg-[#636363] font-semibold text-sm text-center
              hover:bg-gradient-to-t from-[#AD0B40] to-[#FF1917]  bg-opacity-15 hover:border-none transition-all duration-200 ease-in	delay-300
 "
              >
                Next
              </button>
            </div>
          </div>

          <div className="w-[80%] m-auto py-[5%] sm:py-[10] md:py-[8%] lg:py-7 px-2 flex items-center justify-center  border-yellow-500">
            <Image
              src={
                "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/users/Bottomborder.svg"
              }
              width={800}
              height={100}
              alt="Acelocked"
              className="text-white color-white pt-10 sm:pt-5"
            />
          </div>
        </div>
      </div>
      <Toast />
    </>
  );
};

export default page;
