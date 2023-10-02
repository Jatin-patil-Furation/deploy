"use client"

import Banner from "@/components/gameDashboard/Banner";
import Games from "@/components/gameDashboard/Games";
import Navbar from "@/components/gameDashboard/Navbar";
import Overlay from "@/components/gameDashboard/Overlay";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logout from "@/components/modals/Logout";
import BannedPlayers from "@/components/modals/BannedPlayers";
import TeenPatti from "@/components/modals/TeenPatti";
import TransactionHistory from "@/components/modals/TransactionHistory";
import ApprovedWinners from "@/components/modals/ApprovedWinners";
import ViewGames from "@/components/modals/ViewGames";
import WithDraw from "@/components/modals/WithDraw";
import Deposit from "@/components/modals/Deposit";
import AccountManagement from "@/components/modals/AccountManagement";
import PrivateRoute from "@/components/Private/PrivateRoute";

import {
  GetpresignedurlData,
  UpdatedImage,
  UpdatedPost,
} from "@/redux/AuthReducer/Action";
import { useDispatch, useSelector } from "react-redux";
import {
  GETADMINALLUSERDATA,
  GetloggedData,
} from "../../../redux/AppReducer/Action";
import Toast from "@/app/(pages)/notification/Toast";
import { toast } from "react-toastify";
import Shareinvite from "@/components/modals/Shareinvite";
import CreateModel from "@/components/modals/CreateModel";
import Joinmodal from "@/components/modals/Joinmodal";
import ResetpasswordModal from "@/components/modals/ResetpasswordModal";

const Page = () => {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showJointable, SetshowJointable] = useState(false);
  const [Createprivatetable, SetCreateprivatetable] = useState(false);
   const [image, SetImage] = useState("");
  const [isClient, setIsClient] = useState(false);
     const [loading, setLoading] = useState(false);
  const ToggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };
  const getuserinfo = useSelector((store) => store.AppReducer.Userloggeddata);
  useEffect(() => {
    GETADMINALLUSERDATA(dispatch)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [showDropDown, setShowDropDown] = useState(true);
  const [showLogoutModal, setLogoutModal] = useState(false);
  const [showBannedModal, setBannedModal] = useState(false);
  const [showTeenPattiGame, setTeenPattiGame] = useState(false);
  const [showTransactionHistory, setTransactionHistory] = useState(false);
  const [showAccountMangement, setAccountMangement] = useState(false);
  const [showApprovedWinners, setApprovedWinners] = useState(false);
  const [showViewGames, setViewGames] = useState(false);
  const [showUpdateProfile, setUpdateProfile] = useState(false);
  const [showCreateTournament, setCreateTournament] = useState(false);
  const [showWithDraw, setWithDraw] = useState(false);
  const [showDeposit, setDeposit] = useState(false);
  const [typeDate, setTypeDate] = useState("text");
  const [joinprivatetable, Setjoinprivatetable] = useState(false);
  const [resetpassword, Setresetpassword] = useState(false);

  const toggleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  const handleLogout = () => {
    setDrawerOpen(false);
    setLogoutModal(true);
  };

  const handleBanned = () => {
    setDrawerOpen(false);
    setBannedModal(true);
  };

  const handleTransactionHistory = () => {
    setDrawerOpen(false);
    setTransactionHistory(true);
  };

  const handleAccountMangement = () => {
    setDrawerOpen(false);
    setAccountMangement(true);
  };

  const handleApprovedWinners = () => {
    setDrawerOpen(false);
    setApprovedWinners(true);
  };

  const handleViewGames = () => {
    setDrawerOpen(false);
    setViewGames(true);
  };
  const handleUpdateProfile = () => {
    setDrawerOpen(false);
    setUpdateProfile(true);
  };
  const handleCreateTournament = () => {
    setDrawerOpen(false);
    setCreateTournament(true);
  };
  const handleWithDraw = () => {
    setDrawerOpen(false);
    setWithDraw(true);
  };
  const handleDeposit = () => {
    setDrawerOpen(false);
    setDeposit(true);
  };
 const handleChangereset = () => {
   setDrawerOpen(false);
   Setresetpassword(true);
 };


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
  });


  useEffect(() => {
    if (getuserinfo) {
      setFormData({
        name: getuserinfo.name || "",
        email: getuserinfo.email || "",
        phone: getuserinfo.phone || "",
        dateOfBirth: getuserinfo.dateOfBirth || "",
        gender: getuserinfo.gender || "",
        address: getuserinfo.address || "",
        country: getuserinfo.country || "",
        city: getuserinfo.city || "",
        postalCode: getuserinfo.postalCode || "",
      });
    }
  }, [getuserinfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (e.target.tagName === "SELECT") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleImageChange = async (e) => {
    try {
      const selectedFile = e.target.files && e.target.files[0];

      if (!selectedFile) {
        console.log("No file selected");
        return;
      } else {
        SetImage(selectedFile);
      }
     
      const filenam = selectedFile.name;
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
      const updatedFormData = {
        ...formData,
        avatar: avatar,
      };
      console.log("updatedfromdata", updatedFormData);
      UpdatedImage(updatedFormData)(dispatch)
        .then((res) => {
          console.log(res);
          if (res.type === "USEREDIT_IMAGE_SUCESS") {
            GetloggedData(dispatch);
            toast.success("Updated data sucessfully");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.success(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const Admintrue = getuserinfo?.isAdmin;

  //  const Admintrue =true

  const handleUpdateprofile = () => {
    setLoading(true)
    const {
      dateOfBirth,
      name,
      email,
      phone,
      gender,
      address,
      country,
      city,
      postalCode,
    } = formData;
    const birthYear = parseInt(dateOfBirth.split("-")[0]);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (age < 18) {
      toast.error("Minimum age required: 18");
      return false;
    }
    if (
      dateOfBirth.trim() == "" ||
      address.trim() == "" ||
      postalCode == null ||
      email.trim() == "" ||
      phone == "" ||
      name.trim() == null ||
      gender.trim() == "" ||
      country.trim() == "" ||
      city.trim() == ""
    ) {
      toast.error("All fields are required");
      return false;
    }

    UpdatedImage(formData)(dispatch)
      .then((res) => {
        console.log(res);
        if (res.type === "USEREDIT_IMAGE_SUCESS") {
          toast.success("Updated data sucessfully");
           setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.success(err);
         setLoading(false);
      });
  };

  useEffect(() => {
    GetloggedData(dispatch)
      
  }, []);

  return (
    <>
      <PrivateRoute>
        <main className=" w-[100vw]   text-white z-0 relative">
          <section
            className={`body-container max-w-7xl mx-auto overflow-x-hidden ${
              showLogoutModal ||
              showBannedModal ||
              showTeenPattiGame ||
              showTransactionHistory
                ? " overflow-y-hidden"
                : ""
            }`}
          >
            <Navbar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
            {drawerOpen && <Overlay closeDrawer={ToggleDrawer} />}
            {drawerOpen ? (
              <div className=" px-2 ">
                <div className="md:hidden pt-20 bg-Background ">
                  <div className="px-2 py-3 space-y-3  overflow-y-scroll  scrollbar">
                    {/* user info */}
                    <div className="flex justify-between items-center ">
                      <div className="player-info flex justify-between gap-5 items-center">
                        <div className="image-container rounded-full">
                          <Image
                            src={getuserinfo?.avatar}
                            alt="user avatar"
                            width={50}
                            height={50}
                            className="text-center rounded-full"
                          />
                        </div>
                        <div className="flex flex-col ">
                          <p className="text-sm">{getuserinfo?.name}</p>
                          <p className="text-sm text-GreyLight">
                            {getuserinfo?.email}
                          </p>
                        </div>
                      </div>
                      <Image
                        src={
                          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/edit.svg"
                        }
                        alt="user avatar"
                        width={50}
                        height={50}
                        className="text-center w-[7%]"
                        onClick={handleUpdateProfile}
                      />
                    </div>
                    {/* user game status */}
                    <div className="flex justify-between items-center  ">
                      <div className="border border-Background  pr-2 border-r-GreyLight border-r-1 text-center">
                        <p className="text-lg  text-GreyLight">
                          {" "}
                          {(getuserinfo?.gamesWon || 0) +
                            (getuserinfo?.gamesLost || 0)}
                        </p>
                        <p className="text-sm text-GreyLight">Game Played</p>
                      </div>
                      <div className="border border-Background pr-2 border-r-GreyLight border-r-1  text-center">
                        <p className="text-base ">20</p>
                        <p className="text-sm text-GreyLight">Game Won</p>
                      </div>
                      <div className="border border-Background pr-2 border-r-GreyLight border-r-1  text-center ">
                        <p className="text-base ">20</p>
                        <p className="text-sm text-GreyLight">Game Lost</p>
                      </div>
                      <div className="text-center pr-2">
                        <p className="text-base ">100</p>
                        <p className="text-sm text-GreyLight">Balance</p>
                      </div>
                    </div>

                    {/* menu items mobile view */}

                    {Admintrue && (
                      <button
                        className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                        onClick={handleAccountMangement}
                      >
                        <div className="flex items-center gap-3 basis-[70%]">
                          <Image
                            src={"/assets/drawer/users.svg"}
                            alt="deposit icon"
                            width={50}
                            height={50}
                            className="w-[10%]"
                          />
                          <p className="text-base">Account Management</p>
                        </div>
                        <Image
                          src={
                            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                          }
                          alt="right arrow icon"
                          width={50}
                          height={50}
                          className="w-[5%]"
                        />
                      </button>
                    )}

                    {Admintrue && (
                      <button
                        className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                        onClick={handleApprovedWinners}
                      >
                        <div className=" border-red-700 flex items-center gap-3 basis-[70%]">
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/trophy.svg"
                            }
                            alt="deposit icon"
                            width={50}
                            height={50}
                            className="w-[10%]"
                          />
                          <p className="text-base">Approved Winners</p>
                        </div>
                        <Image
                          src={
                            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                          }
                          alt="right arrow icon"
                          width={50}
                          height={50}
                          className="w-[5%]"
                        />
                      </button>
                    )}
                    {Admintrue && (
                      <button
                        onClick={handleBanned}
                        className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                      >
                        <div className="flex items-center gap-3 basis-[70%]">
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/banned.svg"
                            }
                            alt="deposit icon"
                            width={50}
                            height={50}
                            className="w-[8%]"
                          />
                          <p className="text-base">Banned Players</p>
                        </div>
                        <Image
                          src={
                            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                          }
                          alt="right arrow icon"
                          width={50}
                          height={50}
                          className="w-[5%]"
                        />
                      </button>
                    )}
                    {Admintrue && (
                      <button
                        onClick={handleCreateTournament}
                        className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                      >
                        <div className="flex items-center gap-3 basis-[70%]">
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/create-tournament.svg"
                            }
                            alt="deposit icon"
                            width={50}
                            height={50}
                            className="w-[8%]"
                          />
                          <p className="text-base">Create Tournament</p>
                        </div>
                        <Image
                          src={
                            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                          }
                          alt="right arrow icon"
                          width={50}
                          height={50}
                          className="w-[5%]"
                        />
                      </button>
                    )}
                    {Admintrue && (
                      <button
                        className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                        onClick={handleViewGames}
                      >
                        <div className="flex items-center gap-3 basis-[70%]">
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/eye.svg"
                            }
                            alt="deposit icon"
                            width={50}
                            height={50}
                            className="w-[9%]"
                          />
                          <p className="text-base">View Games</p>
                        </div>
                        <Image
                          src={
                            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                          }
                          alt="right arrow icon"
                          width={50}
                          height={50}
                          className="w-[5%]"
                        />
                      </button>
                    )}

                    <button
                      className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                      onClick={handleDeposit}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/upload.svg"
                          }
                          alt="deposit icon"
                          width={50}
                          height={50}
                          className="w-[50%]"
                        />
                        <p className="text-base">Deposit</p>
                      </div>
                      <Image
                        src={
                          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                        }
                        alt="right arrow icon"
                        width={50}
                        height={50}
                        className="w-[5%]"
                      />
                    </button>

                    <button
                      className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                      onClick={handleWithDraw}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/upload.svg"
                          }
                          alt="Withdraw icon"
                          width={50}
                          height={50}
                          className="w-[50%] rotate-180"
                        />
                        <p className="text-base">Withdraw</p>
                      </div>
                      <Image
                        src={
                          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                        }
                        alt="right arrow icon"
                        width={50}
                        height={50}
                        className="w-[5%]"
                      />
                    </button>

                    <button
                      className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                      onClick={handleTransactionHistory}
                    >
                      <div className="flex justify-start items-center gap-3 basis-[70%]">
                        <Image
                          src={
                            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/clock.svg"
                          }
                          alt="Withdraw icon"
                          width={50}
                          height={50}
                          className="w-[9%]"
                        />
                        <p className="text-base">Transaction History</p>
                      </div>
                      <Image
                        src={
                          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                        }
                        alt="right arrow icon"
                        width={50}
                        height={50}
                        className="w-[5%]"
                      />
                    </button>

                    <div>
                      <button
                        onClick={toggleDropDown}
                        className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/settings.svg"
                            }
                            alt="Withdraw icon"
                            width={50}
                            height={50}
                            className="w-[30%] rotate-180"
                          />
                          <p className="text-base">Settings</p>
                        </div>
                        <Image
                          src={
                            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/chevron-down.svg"
                          }
                          alt="right arrow icon"
                          width={50}
                          height={50}
                          className={`w-[5%] ${
                            showDropDown ? "rotate-180" : "rotate-0"
                          } "" `}
                        />
                      </button>
                      {showDropDown && (
                        <div className="bg-GreyDark flex flex-col items-center gap-3 pl-12">
                          <a
                            href=""
                            className="border border-GreyDark border-b-GreyLight basis-[75%] w-full text-left pb-2"
                          >
                            About Game
                          </a>
                          <a
                            href="#"
                            className="border border-GreyDark border-b-GreyLight basis-[75%] w-full text-left pb-2"
                          >
                            T&C
                          </a>
                          <a
                            href="#"
                            className="border border-GreyDark border-b-GreyLight basis-[75%] w-full text-left pb-2"
                          >
                            Legal Notice
                          </a>
                          <a
                            onClick={handleChangereset}
                            href="#"
                            className="border border-GreyDark border-b-GreyLight basis-[75%] w-full text-left pb-2 "
                          >
                            Change Password
                          </a>
                          <a
                            href="#"
                            className="basis-[75%] w-full text-left pb-2  "
                          >
                            Help
                          </a>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleLogout}
                      className="mt-8 text-center w-full border border-Secondary text-Secondary font-bold text-lg"
                    >
                      Log out
                    </button>
                  </div>
                </div>
                {/* tab to desktop */}
              </div>
            ) : showCreateTournament ? (
              <div className="bg-Background pt-20 text-white md:hidden min-h-screen">
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center w-full gap-1">
                    <h2>Create Tournament</h2>
                    <div className="h-[30vh] bg-GreyDark   relative w-[90%] mx-auto">
                      <Image
                        src={
                          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/camera.svg"
                        }
                        alt="camera"
                        width={50}
                        height={50}
                        className="w-[10%] absolute left-1/2  top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10] "
                      />
                    </div>
                    <p className="text-Secondary">Upload Image</p>
                  </div>
                  <div className=" space-y-3 w-[90%] mx-auto">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="TournamentName">Tournament Name</label>
                      <input
                        type="text"
                        name="TournamentName"
                        placeholder="Tournament Name"
                        className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="TournamentDescription">
                        Tournament Description
                      </label>
                      <input
                        type="text"
                        name="TournamentDescription"
                        placeholder="Description"
                        className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="number"
                        name="phone"
                        className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                        placeholder="13242314"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col basis-[45%] gap-1 ">
                        <label htmlFor="NoOfGames">No. of Games</label>
                        <select
                          name="NoOfGames"
                          className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none "
                        >
                          <option value="7">7 Games</option>
                          <option value="8">8 Games</option>
                          <option value="9">9 Games</option>
                          <option value="10">10 Games</option>
                        </select>
                      </div>
                      <div className="flex flex-col  basis-[45%] gap-1">
                        <label htmlFor="NoOfPlayers">No. of Players</label>
                        <select
                          name="NoOfPlayers"
                          className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                        >
                          <option value="7">7 Players</option>
                          <option value="8">8 Players</option>
                          <option value="9">9 Players</option>
                          <option value="10">10 Players</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col basis-[45%] gap-1">
                        <label htmlFor="WinningAmount">Winning Amount</label>
                        <select
                          name="WinningAmount"
                          className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                        >
                          <option value="2000">$2000</option>
                          <option value="3000">$3000</option>
                          <option value="4000">$4000</option>
                          <option value="5000">$5000</option>
                        </select>
                      </div>
                      <div className="flex flex-col basis-[45%] gap-1">
                        <label htmlFor="EntryFee">Entry Fee</label>
                        <select
                          name="EntryFee"
                          className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                        >
                          <option value="200">$200</option>
                          <option value="300">$300</option>
                          <option value="400">$400</option>
                          <option value="500">$500</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button className="custom-gradient my-3 px-3 py-4 w-[90%] mx-auto">
                    Create Tournament
                  </button>
                </div>
              </div>
            ) : showUpdateProfile ? (
              <div className="bg-Background px-2 md:hidden">
                <div className="bg-Background  text-white pt-20 w-[99%] m-auto overflow-y-hidden">
                  <div className="flex mt-10   border-yellow-800 flex-col items-center">
                    <div className="flex flex-col items-center basis-[95%]">
                      <h2>Edit Profile</h2>
                      <div className=" border-red-700">
                        <label>
                          <Image
                            src={getuserinfo?.avatar}
                            alt="avatar"
                            width={100}
                            height={100}
                            className="w-[100%] rounded-full"
                          />
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className=" text-center text-Secondary">
                          Change Avatar
                        </p>
                      </div>
                    </div>
                    <div className="user-edit  space-y-4 w-[95%] m-auto basis-[90%]">
                      <div className="flex flex-col">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          placeholder={getuserinfo?.name}
                          value={formData?.name}
                          name="name"
                          onChange={handleInputChange}
                          className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                        />
                      </div>
                      <div className="flex flex-col ">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          placeholder={getuserinfo?.email}
                          name="email"
                          value={getuserinfo?.email}
                          onChange={handleInputChange}
                          className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                        />
                      </div>
                      <div className="flex flex-col ">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="number"
                          placeholder={getuserinfo?.phone?.toString()}
                          name="phone"
                          value={getuserinfo?.phone?.toString()}
                          onChange={handleInputChange}
                          className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                        />
                      </div>
                      <div className="flex justify-between gap-5 items-center">
                        <div className="flex flex-col basis-[45%] ">
                          <label htmlFor="dateOfBirth">DOB</label>
                          <input
                            type={typeDate}
                            name="dateOfBirth"
                            onChange={handleInputChange}
                            onFocus={() => setTypeDate("date")}
                            onBlur={() => setTypeDate("text")}
                            value={formData?.dateOfBirth
                              ?.toString()
                              .slice(0, 10)}
                            placeholder={getuserinfo?.dateOfBirth?.toString()}
                            className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                          />
                        </div>
                        <div className="flex flex-col basis-[45%] ">
                          <label htmlFor="gender">Gender</label>
                          <select
                            name="gender"
                            onChange={handleInputChange}
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
                          onChange={handleInputChange}
                          value={formData?.address?.toString()}
                          placeholder={getuserinfo?.address?.toString()}
                          className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                        />
                      </div>
                      <div className="flex  flex-wrap justify-between items-center ">
                        <div className="flex flex-col basis-full sm:basis-[40%] ">
                          <label htmlFor="country">Country</label>
                          <input
                            type="text"
                            name="country"
                            onChange={handleInputChange}
                            value={formData?.country?.toString()}
                            placeholder={getuserinfo?.country?.toString()}
                            className="placeholder:text-GreyLight px-1 py-4 rounded-sm bg-GreyDark outline-none"
                          />
                        </div>
                        <div className="flex flex-col basis-full sm:basis-[40%] ">
                          <label htmlFor="city">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData?.city?.toString()}
                            onChange={handleInputChange}
                            placeholder={getuserinfo?.city?.toString()}
                            className="placeholder:text-GreyLight px-1 py-4 rounded-sm bg-GreyDark outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col ">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                          type="number"
                          name="postalCode"
                          onChange={handleInputChange}
                          value={formData?.postalCode?.toString()}
                          placeholder={getuserinfo?.postalCode?.toString()}
                          className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleUpdateprofile}
                      className="custom-gradient px-3 py-4 w-[90%] mx-auto my-3"
                    >
                      {loading ? (
                        <div className="w-[50%] flex items-center h-[15px] m-auto  ">
                          <Image
                            src={`https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/users/loading.gif`}
                            alt="loader"
                            width={200}
                            height={100}
                          />
                        </div>
                      ) : (
                        "update"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="my-20 md:hidden">
                <Banner />
                <Games setTeenPattiGame={setTeenPattiGame} />
              </div>
            )}
          </section>

          {/* tab-laptop view section */}

          <section
            className={` hidden md:block body-container max-w-7xl mx-auto overflow-x-hidden ${
              showLogoutModal ||
              showBannedModal ||
              showTeenPattiGame ||
              showTransactionHistory
                ? " overflow-y-hidden"
                : ""
            }`}
          >
            {drawerOpen && <Overlay closeDrawer={ToggleDrawer} />}
            {showUpdateProfile && (
              <div className="hidden md:block">
                <Overlay closeDrawer={ToggleDrawer} />
              </div>
            )}
            {drawerOpen ? (
              <div
                className={`${
                  drawerOpen ? "translate-x-0 " : "-translate-x-full "
                }  w-[33%] lg:w-[28%] xl:w-[26%] hidden md:block md:fixed inset-y-0 left-0 top-0 h-full overflow-y-scroll scrollbar-thin  px-3 bottom-0 bg-Background text-white z-[100] `}
              >
                <div className="flex flex-col justify-between h-full py-6">
                  <div>
                    <div className=" w-full flex justify-end items-end">
                      <Image
                        src={
                          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/other/x.svg"
                        }
                        alt="close-icon"
                        className="w-[10%]"
                        width={50}
                        height={50}
                        onClick={() => setDrawerOpen(false)}
                      />
                    </div>
                    <div className="px-2 py-3 space-y-3 md:space-y-5  overflow-y-scroll scrollbar-thin ">
                      {/* user info */}
                      <div className="flex justify-between items-center ">
                        <div className="player-info flex justify-between gap-5 items-center">
                          <div className="image-container rounded-full">
                            <Image
                              src={getuserinfo?.avatar}
                              alt="user avatar"
                              width={50}
                              height={50}
                              className="text-center rounded-full"
                            />
                          </div>
                          <div className="flex flex-col ">
                            <p className="text-sm">{getuserinfo?.name}</p>
                            <p className="text-sm text-GreyLight">
                              {getuserinfo.email}
                            </p>
                          </div>
                        </div>
                        <Image
                          src={
                            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/edit.svg"
                          }
                          alt="user avatar"
                          width={50}
                          height={50}
                          className="text-center w-[7%]"
                          onClick={handleUpdateProfile}
                        />
                      </div>
                      {/* user game status */}
                      <div className="flex justify-between items-center   ">
                        <div className="border px-2 border-Background  pr-2 border-r-GreyLight border-r-1 text-center">
                          <p className="text-lg md:text-2xl ">
                            {(getuserinfo?.gamesWon || 0) +
                              (getuserinfo?.gamesLost || 0)}
                          </p>
                          <p className="text-sm md:text-xs text-GreyLight">
                            Game Played
                          </p>
                        </div>
                        <div className="border px-2 border-Background pr-2 border-r-GreyLight border-r-1  text-center">
                          <p className="text-base md:text-2xl ">
                            {getuserinfo?.gamesWon}
                          </p>
                          <p className="text-sm text-GreyLight md:text-xs">
                            Game Won
                          </p>
                        </div>
                        <div className="border px-2 border-Background pr-2 border-r-GreyLight border-r-1  text-center ">
                          <p className="text-base  md:text-2xl">
                            {getuserinfo?.gamesLost}
                          </p>
                          <p className="text-sm text-GreyLight md:text-xs">
                            Game Lost
                          </p>
                        </div>
                        <div className="text-center px-2 pr-2 ">
                          <p className="text-base md:text-2xl">
                            {getuserinfo?.wallet}
                          </p>
                          <p className="text-sm text-GreyLight md:text-xs">
                            Balance
                          </p>
                        </div>
                      </div>

                      {/* menu items */}
                      {Admintrue && (
                        <button
                          className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                          onClick={handleAccountMangement}
                        >
                          <div className="flex items-center gap-3 basis-[70%]">
                            <Image
                              src={
                                "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/trophy.svg"
                              }
                              alt="deposit icon"
                              width={50}
                              height={50}
                              className="w-[10%]"
                            />
                            <p className="text-base">Account Mangement</p>
                          </div>
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                            }
                            alt="right arrow icon"
                            width={50}
                            height={50}
                            className="w-[5%]"
                          />
                        </button>
                      )}
                      {Admintrue && (
                        <button
                          className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                          onClick={handleApprovedWinners}
                        >
                          <div className="flex items-center gap-3 basis-[70%]">
                            <Image
                              src={"/assets/drawer/users.svg"}
                              alt="deposit icon"
                              width={50}
                              height={50}
                              className="w-[10%]"
                            />
                            <p className="text-base">Approved Winners</p>
                          </div>
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                            }
                            alt="right arrow icon"
                            width={50}
                            height={50}
                            className="w-[5%]"
                          />
                        </button>
                      )}
                      {Admintrue && (
                        <button
                          onClick={handleBanned}
                          className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                        >
                          <div className="flex items-center gap-3 basis-[70%]">
                            <Image
                              src={
                                "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/banned.svg"
                              }
                              alt="deposit icon"
                              width={50}
                              height={50}
                              className="w-[8%]"
                            />
                            <p className="text-base">Banned Players</p>
                          </div>
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                            }
                            alt="right arrow icon"
                            width={50}
                            height={50}
                            className="w-[5%]"
                          />
                        </button>
                      )}
                      {Admintrue && (
                        <button
                          onClick={handleCreateTournament}
                          className="px-4   py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                        >
                          <div className="flex items-center gap-3 basis-[70%]">
                            <Image
                              src={
                                "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/create-tournament.svg"
                              }
                              alt="deposit icon"
                              width={50}
                              height={50}
                              className="w-[10%]"
                            />
                            <p className="text-base">Create Tournament</p>
                          </div>
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                            }
                            alt="right arrow icon"
                            width={50}
                            height={50}
                            className="w-[5%]"
                          />
                        </button>
                      )}
                      {Admintrue && (
                        <button
                          className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                          onClick={handleViewGames}
                        >
                          <div className="flex items-center gap-3 basis-[70%]">
                            <Image
                              src={
                                "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/eye.svg"
                              }
                              alt="deposit icon"
                              width={50}
                              height={50}
                              className="w-[9%]"
                            />
                            <p className="text-base">View Games</p>
                          </div>
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                            }
                            alt="right arrow icon"
                            width={50}
                            height={50}
                            className="w-[5%]"
                          />
                        </button>
                      )}

                      {/** ^^^^^^ admin part ^^^^ */}
                      <button
                        className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                        onClick={handleDeposit}
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/upload.svg"
                            }
                            alt="deposit icon"
                            width={50}
                            height={50}
                            className="w-[50%]"
                          />
                          <p className="text-base">Deposit</p>
                        </div>
                        <Image
                          src={
                            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                          }
                          alt="right arrow icon"
                          width={50}
                          height={50}
                          className="w-[5%]"
                        />
                      </button>
                      <button
                        className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                        onClick={handleWithDraw}
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/upload.svg"
                            }
                            alt="Withdraw icon"
                            width={50}
                            height={50}
                            className="w-[50%] rotate-180"
                          />
                          <p className="text-base">Withdraw</p>
                        </div>
                        <Image
                          src={
                            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                          }
                          alt="right arrow icon"
                          width={50}
                          height={50}
                          className="w-[5%]"
                        />
                      </button>
                      <button
                        className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                        onClick={handleTransactionHistory}
                      >
                        <div className="flex justify-start items-center gap-3 basis-[70%]">
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/clock.svg"
                            }
                            alt="Withdraw icon"
                            width={50}
                            height={50}
                            className="w-[9%]"
                          />
                          <p className="text-base">Transaction History</p>
                        </div>
                        <Image
                          src={
                            "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/arrow-right.svg"
                          }
                          alt="right arrow icon"
                          width={50}
                          height={50}
                          className="w-[5%]"
                        />
                      </button>
                      <div>
                        <button
                          onClick={toggleDropDown}
                          className="px-4 py-3 flex items-center rounded-sm justify-between  relative bg-GreyDark w-full"
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              src={
                                "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/settings.svg"
                              }
                              alt="Withdraw icon"
                              width={50}
                              height={50}
                              className="w-[30%] rotate-180"
                            />
                            <p className="text-base">Settings</p>
                          </div>
                          <Image
                            src={
                              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/chevron-down.svg"
                            }
                            alt="right arrow icon"
                            width={50}
                            height={50}
                            className={`w-[5%] ${
                              showDropDown ? "rotate-180" : "rotate-0"
                            } "" `}
                          />
                        </button>
                        {showDropDown && (
                          <div className="bg-GreyDark flex flex-col items-center gap-3 pl-12">
                            <a
                              href=""
                              className="border border-GreyDark border-b-GreyLight basis-[75%] w-full text-left pb-2"
                            >
                              About Game
                            </a>
                            <a
                              href="#"
                              className="border border-GreyDark border-b-GreyLight basis-[75%] w-full text-left pb-2"
                            >
                              T&C
                            </a>
                            <a
                              href="#"
                              className="border border-GreyDark border-b-GreyLight basis-[75%] w-full text-left pb-2"
                            >
                              Legal Notice
                            </a>
                            <a
                              href="#"
                              onClick={handleChangereset}
                              className="border border-GreyDark border-b-GreyLight basis-[75%] w-full text-left pb-2 "
                            >
                              Change Password
                            </a>
                            <a
                              href="#"
                              className="basis-[75%] w-full text-left pb-2  "
                            >
                              Help
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-8 text-center w-full border border-Secondary text-Secondary font-bold text-lg"
                  >
                    Log out
                  </button>
                </div>
              </div>
            ) : showCreateTournament ? (
              <div className="bg-Background absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[85%]  overflow-y-scroll scrollbar-thin   z-[120] w-[40%]">
                <div className="flex flex-col items-center">
                  <div>
                    <Image
                      src={
                        "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/other/x.svg"
                      }
                      alt="close tag"
                      width={50}
                      height={50}
                      className="w-[5%] absolute right-5 top-3 cursor-pointer"
                      onClick={() => setCreateTournament(false)}
                    />
                  </div>
                  <div className="flex  border-red-600 flex-col items-center w-full gap-1 mt-5">
                    <h2>Create Tournament</h2>
                    <div className="h-[30vh] bg-GreyDark   relative w-[90%] mx-auto">
                      <Image
                        src={
                          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/drawer/camera.svg"
                        }
                        alt="camera"
                        width={50}
                        height={50}
                        className="w-[10%] absolute left-1/2  top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10] "
                      />
                    </div>
                    <p className="text-Secondary">Upload Image</p>
                  </div>
                  <div className=" space-y-3 w-[90%] mx-auto">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="TournamentName">Tournament Name</label>
                      <input
                        type="text"
                        name="TournamentName"
                        placeholder="Tournament Name"
                        className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="TournamentDescription">
                        Tournament Description
                      </label>
                      <input
                        type="text"
                        name="TournamentDescription"
                        placeholder="Description"
                        className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="number"
                        name="phone"
                        onChange={handleInputChange}
                        className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                        placeholder="13242314"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col basis-[45%] gap-1 ">
                        <label htmlFor="NoOfGames">No. of Games</label>
                        <select
                          name="NoOfGames"
                          className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none "
                        >
                          <option value="7">7 Games</option>
                          <option value="8">8 Games</option>
                          <option value="9">9 Games</option>
                          <option value="10">10 Games</option>
                        </select>
                      </div>
                      <div className="flex flex-col  basis-[45%] gap-1">
                        <label htmlFor="NoOfPlayers">No. of Players</label>
                        <select
                          name="NoOfPlayers"
                          className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                        >
                          <option value="7">7 Players</option>
                          <option value="8">8 Players</option>
                          <option value="9">9 Players</option>
                          <option value="10">10 Players</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col basis-[45%] gap-1">
                        <label htmlFor="WinningAmount">Winning Amount</label>
                        <select
                          name="WinningAmount"
                          className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                        >
                          <option value="2000">$2000</option>
                          <option value="3000">$3000</option>
                          <option value="4000">$4000</option>
                          <option value="5000">$5000</option>
                        </select>
                      </div>
                      <div className="flex flex-col basis-[45%] gap-1">
                        <label htmlFor="EntryFee">Entry Fee</label>
                        <select
                          name="EntryFee"
                          className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                        >
                          <option value="200">$200</option>
                          <option value="300">$300</option>
                          <option value="400">$400</option>
                          <option value="500">$500</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button className="custom-gradient my-3 px-3 py-4 w-[90%] mx-auto">
                    Create Tournament
                  </button>
                </div>
              </div>
            ) : showUpdateProfile ? (
              <div>
                <div className="bg-Background px-2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[85%] overflow-y-scroll scrollbar-thin   z-[120] ">
                  <div className=" text-white pt-20 overflow-y-hidden relative">
                    <div>
                      <Image
                        src={
                          "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/other/x.svg"
                        }
                        alt="close tag"
                        width={50}
                        height={50}
                        className="w-[5%] absolute right-5 top-3"
                        onClick={() => setUpdateProfile(false)}
                      />
                    </div>
                    <div className="flex  border-red-700 flex-col items-center">
                      <div className="flex flex-col items-center basis-[90%]">
                        <h2>Edit Profile</h2>
                        <div>
                          <label>
                            <Image
                              src={getuserinfo?.avatar}
                              alt="avatar"
                              width={100}
                              height={100}
                              className="w-[100%] rounded-full"
                            />
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                          <p className="text-center text-Secondary">
                            Change Avatar
                          </p>
                        </div>
                      </div>
                      <div className="user-edit   space-y-4 w-[90%] basis-[90%]">
                        <div className="flex flex-col">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            placeholder={getuserinfo?.name}
                            value={formData?.name}
                            name="name"
                            onChange={handleInputChange}
                            className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            placeholder={getuserinfo?.email}
                            value={getuserinfo?.email}
                            name="email"
                            onChange={handleInputChange}
                            className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label htmlFor="phone">Phone Number</label>
                          <input
                            type="number"
                            placeholder={getuserinfo?.phone?.toString()}
                            value={getuserinfo?.phone?.toString()}
                            name="phone"
                            onChange={handleInputChange}
                            className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col basis-[45%] ">
                            <label htmlFor="dateOfBirth">DOB</label>
                            <input
                              type="date"
                              name="dateOfBirth"
                              onChange={handleInputChange}
                              value={formData?.dateOfBirth?.slice(0, 10)}
                              placeholder={getuserinfo?.dateOfBirth?.slice(
                                0,
                                10
                              )}
                              className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                            />
                          </div>
                          <div className="flex flex-col basis-[45%] ">
                            <label htmlFor="gender">Gender</label>
                            <select
                              name="gender"
                              value={formData?.gender}
                              onChange={handleInputChange}
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
                            value={formData?.address}
                            onChange={handleInputChange}
                            placeholder={getuserinfo?.address?.toString()}
                            className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                          />
                        </div>
                        <div className="flex  flex-wrap justify-between items-center ">
                          <div className="flex flex-col md:basis-full sm:basis-[40%] ">
                            <label htmlFor="country">Country</label>
                            <input
                              type="text"
                              name="country"
                              id=""
                              value={formData?.country}
                              onChange={handleInputChange}
                              placeholder={getuserinfo?.country?.toString()}
                              className="placeholder:text-GreyLight px-1 py-4 rounded-sm bg-GreyDark outline-none"
                            />
                          </div>
                          <div className="flex flex-col md:basis-full sm:basis-[40%] ">
                            <label htmlFor="city">City</label>
                            <input
                              type="text"
                              name="city"
                              value={formData?.city}
                              onChange={handleInputChange}
                              placeholder={getuserinfo?.city?.toString()}
                              className="placeholder:text-GreyLight px-1 py-4 rounded-sm bg-GreyDark outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col ">
                          <label htmlFor="postalCode">Postal Code</label>
                          <input
                            type="number"
                            name="postalCode"
                            value={formData?.postalCode}
                            onChange={handleInputChange}
                            placeholder={getuserinfo?.postalCode?.toString()}
                            className="placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleUpdateprofile}
                        className="custom-gradient px-3 py-4 w-[90%] mx-auto my-3"
                      >
                        {loading ? (
                          <div className="w-[50%] flex items-center h-[15px] m-auto  ">
                            <Image
                              src={`https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/users/loading.gif`}
                              alt="loader"
                              width={200}
                              height={100}
                            />
                          </div>
                        ) : (
                          "update"
                        )}
                      
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="hidden md:block my-10 ">
              <Banner />
              <Games setTeenPattiGame={setTeenPattiGame} />
            </div>
          </section>
          <section>
            {showLogoutModal && (
              <div>
                <div
                  className=" fixed inset-0 bg-black opacity-80 z-[50]     "
                  onClick={ToggleDrawer}
                ></div>
                <Logout setLogoutModal={setLogoutModal} />
              </div>
            )}
            {showBannedModal && (
              <div>
                <div
                  className=" fixed inset-0 bg-black opacity-80 z-[50]     "
                  onClick={ToggleDrawer}
                ></div>
                <BannedPlayers setLogoutModal={setBannedModal} />
              </div>
            )}
            {showTeenPattiGame && (
              <div>
                <div
                  className=" fixed inset-0 bg-black opacity-80 z-[50]     "
                  onClick={ToggleDrawer}
                ></div>
                <TeenPatti
                  setTeenPattiGame={setTeenPattiGame}
                  SetCreateprivatetable={SetCreateprivatetable}
                  SetshowJointable={SetshowJointable}
                  Setjoinprivatetable={Setjoinprivatetable}
                />
              </div>
            )}
            {showTransactionHistory && (
              <div>
                <div
                  className=" fixed inset-0 bg-black opacity-80 z-[50]     "
                  onClick={ToggleDrawer}
                ></div>
                <TransactionHistory
                  setTransactionHistory={setTransactionHistory}
                />
              </div>
            )}

            {/* inComplete */}
            {showAccountMangement && (
              <div>
                <div
                  className=" fixed inset-0 bg-black opacity-80 z-[50]     "
                  onClick={ToggleDrawer}
                ></div>
                <AccountManagement setAccountMangement={setAccountMangement} />
              </div>
            )}

            {showApprovedWinners && (
              <div>
                <div
                  className=" fixed inset-0 bg-black opacity-80 z-[50]     "
                  onClick={ToggleDrawer}
                ></div>
                <ApprovedWinners setApprovedWinners={setApprovedWinners} />
              </div>
            )}

            {showViewGames && (
              <div>
                <div
                  className=" fixed inset-0 bg-black opacity-80 z-[50]     "
                  onClick={ToggleDrawer}
                ></div>
                <ViewGames setViewGames={setViewGames} />
              </div>
            )}
            {showWithDraw && (
              <div>
                <div
                  className=" fixed inset-0 bg-black opacity-80 z-[50]     "
                  onClick={ToggleDrawer}
                ></div>
                <WithDraw setWithDraw={setWithDraw} />
              </div>
            )}
            {showDeposit && (
              <div>
                <div
                  className=" fixed inset-0 bg-black opacity-80 z-[50]     "
                  onClick={ToggleDrawer}
                ></div>
                <Deposit setDeposit={setDeposit} />
              </div>
            )}
            {showJointable && (
              <Shareinvite
                SetshowJointable={SetshowJointable}
                showJointable={false}
              />
            )}

            {Createprivatetable && (
              <CreateModel
                SetCreateprivatetable={SetCreateprivatetable}
                Createprivatetable={false}
              />
            )}

            {joinprivatetable && (
              <Joinmodal
                Setjoinprivatetable={Setjoinprivatetable}
                joinprivatetable={joinprivatetable}
              />
            )}

            {resetpassword && (
              <div>
                <div
                  className=" fixed inset-0 bg-black opacity-80 z-[50]     "
                  onClick={ToggleDrawer}
                ></div>
                <ResetpasswordModal Setresetpassword={Setresetpassword} />
              </div>
            )}
          </section>
        </main>
        <Toast />
      </PrivateRoute>
    </>
  );
};

export default Page;
