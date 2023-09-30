"use client";
import Cardanimate from "@/components/Animation/Cardanimate";
import SideShow from "@/components/modals/Sideshow";
import "./ani.css";
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Cardlefttop from "@/components/Animation/Cardlefttop";
import Cardleftmiddle from "@/components/Animation/Cardleftmiddle";
import Cardleftbottom from "@/components/Animation/Cardleftbottom";
import Righttop from "@/components/Animation/Righttop";
import Rightmiddle from "@/components/Animation/Rightmiddle";
import Rightbottom from "@/components/Animation/Rightbottom";
import Shareinvite from "@/components/modals/Shareinvite";

const LandscapePage = () => {
  const [notification, setNotification] = useState(null);
  const [gameStartCounter, setGameStartCounter] = useState(null);
  const [shareinvitecode, SetshareinviteCode] = useState(true);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [gameData, setPlayerGamingStatus] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [tableId, setTableId] = useState(null);
  const [players, setPlayers] = useState(null);
  const [tableDetails, setTableDetails] = useState(null);
  const [playerSlotIndex, setplayerSlotIndex] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [value, setValue] = useState(5000);
  const [cardSee, setCardSee] = useState(false);
  const [isBliend, setIsBliend] = useState(true);
  const [previousValue, setPreviousValue] = useState(null);
  const [hasDoubled, setHasDoubled] = useState(false);
  const [chips, setChip] = useState(2499000);
  const [sideShowModal, setSideShowModal] = useState(false);
  const [winReason, setWinReason] = useState(null);
  const [cardsInfo, setCardsInfo] = useState(null);
  const [Loggeduser, setLoggeduser] = useState(null);
  const [privateTableKey, setPrivateTableKey] = useState(null);

  const handleDouble = () => {
    if (!hasDoubled) {
      setPreviousValue(value);
      setValue(() => value * 2);
      setHasDoubled(true);
    }
  };

  const handleDeduct = () => {
    if (hasDoubled) {
      setValue(previousValue);
      setPreviousValue(null);
      setHasDoubled(false);
    }
  };

  useEffect(() => {
    // Check the screen orientation when the component mounts
    const checkOrientation = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };

    // Add an event listener to check orientation changes
    window.addEventListener("resize", checkOrientation);

    // Initial check
    checkOrientation();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  useEffect(() => {
    // Redirect to another page if it's in portrait mode on a mobile device
    if (isPortrait && window.innerWidth <= 768) {
      window.location.href = "/teen-patti-mobile"; // Replace with your desired URL
    }
  }, [isPortrait]);

  const socketRef = useRef(null);

  useEffect(() => {
    const Loggeduser = JSON.parse(localStorage.getItem("Loggeduser"));
    const privateTableKey = +JSON.parse(
      localStorage.getItem("privateTableKey")
    );
    setPrivateTableKey(() => privateTableKey);
    console.log(Loggeduser);
    setLoggeduser(() => Loggeduser);
    console.log(privateTableKey);
    console.log("connection start ");
    socketRef.current = io("https://newsocket.onrender.com/", {
      transports: ["websocket"],
    });
    socketRef.current.on("connect", () => {
      setIsSocketConnected(true);
      if (privateTableKey) {
        console.log("joining private invite key table");
        const data = {
          boot: 12000,
          key: privateTableKey,
        };
        socketRef.current.emit("private", data);
      } else {
        console.log("joining public table");
        socketRef.current.emit("public");
      }
      socketRef.current.emit("joinTable", {
        displayName: Loggeduser?.name,
        userName: Loggeduser?.name,
        chips: 2499000,
        guid: tableId,
        _id: Loggeduser?.id,
        fees: 0,
        avatar: Loggeduser?.avatar,
        id: socketId,
      });

      socketRef.current.on("notification", (data) => {
        console.log(data);
        setNotification(data?.message);
      });
      socketRef.current.on("newPlayerJoined", (newplayer) => {
        console.log("new player joined", newplayer);
      });
      socketRef.current.on("joinTable", (newplayer) => {
        setPlayerGamingStatus(() => newplayer);

        setplayerSlotIndex(() => newplayer?.slot?.split("slot")[1]);
        console.log(newplayer?.slot?.split("slot")[1]);
        setPlayerId(newplayer.id);
        console.log(newplayer.id);

        console.log("new player", newplayer);
      });
      socketRef.current.on("connectionSuccess", (data) => {
        console.log("connection is done", data);
      });
      socketRef.current.on("connectionSuccess", (data) => {
        setSocketId(data.id);
        setTableId(data.tableId);
      });
      socketRef.current.on("cardsSeen", (data) => {
        console.log("cardsInfo", data.cardsInfo);
        setCardsInfo(data.cardsInfo);
        console.log("players", data.players);
        setCardSee(true);
      });
      socketRef.current.on("betPlaced", (data) => {
        console.log("bet", data.bet);
        console.log("placedBy", data.placedBy);
        console.log("players", data.players);
        setPlayers(() => data.players);
        setTableDetails(data.table);

        let seenValue = null;

        for (const playerId in data?.players) {
          if (data?.players[playerId].turn === true) {
            seenValue = data?.players[playerId]?.seen;
            setSideShowModal(data?.players[playerId].isSideShowAvailable);
            break;
          }
        }

        setHasDoubled(false);
        if (data.table.lastBlind && !seenValue) {
          setValue(data.table.lastBet);
        }
        if (data.table.lastBlind && seenValue) {
          setValue(data.table.lastBet * 2);
        }
        if (!data.table.lastBlind && seenValue) {
          setValue(data.table.lastBet);
        }
        if (!data.table.lastBlind && !seenValue) {
          setValue(data.table.lastBet / 2);
        }
      });
      socketRef.current.on("sideShowResponded", (data) => {
        console.log("message", data.message);
        //todo: sideshow bet undefinded console.log("bet", data.bet);
        console.log("placedBy", data.placedBy);
        console.log("players", data.players);
        console.log("table", data.table);
        setPlayers(() => data.players);
        setTableDetails(data.table);
        setNotification(null);
      });
      socketRef.current.on("sideShowPlaced", (data) => {
        setNotification("Wait for opponent side show response");
        console.log("message", data.message);
        console.log("bet", data.bet);
        console.log("placedBy", data.placedBy);
        console.log("players", data.players);
        setPlayers(data.players);
        setTableDetails(data.table);
        console.log("table", data.table);
      });
      socketRef.current.on("showWinner", (data) => {
        console.log("winner data", data);
        setWinReason(data.message);
        setPlayers(data.players);
        setTableDetails(data.table);
      });
      socketRef.current.on("playerPacked", (data) => {
        console.log("bet", data.bet);
        console.log("placedBy", data.placedBy);
        console.log("players", data.players);
        console.log("table", data.table);
        setPlayers(() => data.players);
        setTableDetails(data.table);
      });
      socketRef.current.on("startNew", (data) => {
        setPlayers(data.players);
        setTableDetails(data.table);
        setCardSee(false);
        setValue(5000);
        setIsBliend(true);
        console.log(data);
        setWinReason(null);
        setCardsInfo(null);
        setNotification(null);
        const countdown = 5; // Replace with the timer value from your data
        setGameStartCounter(countdown);

        const timerInterval = setInterval(() => {
          setGameStartCounter((prevTimer) => {
            if (prevTimer <= 0) {
              clearInterval(timerInterval); // Stop the timer when it reaches 0
              return 0;
            } else {
              return prevTimer - 1;
            }
          });
        }, 1000);
      });
      socketRef.current.on("notification", (data) => {
        console.log(data);
      });
      socketRef.current.on("gameCountDown", (data) => {
        const countdown = data.count; // Replace with the timer value from your data
        if (data.count) {
          setGameStartCounter(countdown);

          const timerInterval = setInterval(() => {
            setGameStartCounter((prevTimer) => {
              if (prevTimer <= 0) {
                clearInterval(timerInterval); // Stop the timer when it reaches 0
                return 0;
              } else {
                return prevTimer - 1;
              }
            });
          }, 1000);
        }
      });
      socketRef.current.on("resetTable", (data) => {
        console.log(data.sentObj);
      });
    });
    return () => {
      socketRef.current.on("disconnect", () => {
        setIsSocketConnected(false);
        console.log("disconected");
      });
      if (gameStartCounter) {
        clearInterval(gameStartCounter);
      }
    };
  }, []);

  const handleBliend = () => {
    const socket = socketRef.current;
    if (isSocketConnected && socket) {
      // Emit the socket event here
      console.log("bliend called ", value);
      setChip((prev) => prev - value);
      socketRef.current.emit("placeBet", {
        player: {
          id: gameData?.id,
          playerInfo: gameData?.playerInfo,
        },
        bet: {
          amount: value,
          blind: isBliend,
          show: false,
        },
      });
    } else {
      console.log("Socket is not connected. Cannot emit event.");
    }
  };

  const handlePack = () => {
    if (isSocketConnected) {
      // Emit the socket event here
      console.log("pack called ", value);

      socketRef.current.emit("placePack", {
        player: {
          id: gameData?.id,
          playerInfo: gameData?.playerInfo,
        },
        bet: {
          amount: value,
          blind: isBliend,
        },
      });
    } else {
      console.log("Socket is not connected. Cannot emit event.");
    }
  };
  // todo : count of un packed plyaers
  const handleshow = () => {
    if (isSocketConnected) {
      // Emit the socket event here
      console.log("bliend called ", value);

      socketRef.current.emit("placeBet", {
        player: {
          id: gameData?.id,
          playerInfo: gameData?.playerInfo,
        },
        bet: {
          amount: value,
          blind: isBliend,
          show: true,
        },
      });
    } else {
      console.log("Socket is not connected. Cannot emit event.");
    }
  };
  const handlePlaceSideShow = () => {
    if (isSocketConnected) {
      // Emit the socket event here
      console.log("side showe called ");
      socketRef.current.emit("placeSideShow", {
        player: {
          id: gameData?.id,
          playerInfo: gameData?.playerInfo,
        },
        bet: {
          amount: value,
          blind: isBliend,
        },
      });
    } else {
      console.log("Socket is not connected. Cannot emit event.");
    }
  };

  const handleSeeCards = () => {
    setCardSee(() => true);
    setValue(() => value * 2);
    setIsBliend(false);
    if (isSocketConnected) {
      // Emit the socket event here
      console.log("seen card ");

      socketRef.current.emit("seeMyCards", {
        id: gameData?.id,
      });
    } else {
      console.log("Socket is not connected. Cannot emit event.");
    }
  };

  const handleResponseSideShowCancel = () => {
    if (isSocketConnected) {
      setSideShowModal(false);
      // Emit the socket event here
      console.log("side show");

      socketRef.current.emit("respondSideShow", {
        player: {
          id: gameData?.id,
          playerInfo: {
            userName: gameData?.playerInfo.userName,
          },
        },
        lastAction: "Denied",
      });
    } else {
      console.log("Socket is not connected. Cannot emit event.");
    }
  };
  const handleResponseSideShowAccept = () => {
    if (isSocketConnected) {
      setSideShowModal(false);
      // Emit the socket event here
      console.log("side show");
      socketRef.current.emit("respondSideShow", {
        player: {
          id: gameData?.id,
          playerInfo: {
            userName: gameData?.playerInfo.userName,
          },
        },
        lastAction: "Accepted",
      });
    } else {
      console.log("Socket is not connected. Cannot emit event.");
    }
  };

  const slotPlayerMap = {};

  if (players) {
    for (const playerKey in players) {
      const player = players[playerKey];
      const slot = player?.slot?.replace("slot", ""); // Extract the numeric part
      slotPlayerMap[slot] = player;
    }
  }

  console.log(players, tableDetails, playerId);
  console.log(slotPlayerMap, playerSlotIndex, slotPlayerMap?.[playerSlotIndex]);
  console.log(cardsInfo);
  console.log(Loggeduser?.avatar);

  return (
    <div className="min-h-screen relative  font-roboto bg-[url('/assets/landingPage/sikkaplaybg.svg')] bg-cover bg-no-repeat   overflow-y-clip mx-auto">
      <div className=" text-white relative h-[100vh] w-[100vw] space-y-10 mx-auto py-3 max-w-7xl">
        {/* navbar */}
        <div className="teen-patti-navbar  flex justify-between w-[80%] mx-auto ">
          <div className="left-container flex justify-between items-center gap-7 ">
            <div className="img-container">
              <img
                src={"/assets/Game-table/arrow-left.svg"}
                alt="left-arrow"
                className="w-[90%]"
                width={50}
                height={50}
              />
            </div>
            <button className="relative custom-gradient px-5 py-1">
              <img
                src={"/assets/Game-table/red-chip.svg"}
                alt="left-arrow"
                className="absolute  w-[30%] left-[-15%] top-[-2%]"
                width={50}
                height={50}
              />
              <p className="text-xs">Buy Coins</p>
            </button>
          </div>
          <div className="right-container flex justify-between gap-2">
            <div>
              <img
                src={"/assets/Game-table/message.svg"}
                alt="message icon"
                width={50}
                height={50}
                className="w-full cursor-pointer"
              />
            </div>
            <div>
              <img
                src={"/assets/Game-table/info-tag.svg"}
                alt="Info-tag"
                width={50}
                height={50}
                className="w-full cursor-pointer "
              />
            </div>
          </div>
        </div>
        {/* table */}
        <div className="h-[76%] w-[100%]">
          <div className="Img-container absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75vw] sml:w-[65vw] xl:w-[62vw] 2xl:w-[70vw]    max-w-7xl ">
            <d iv className="relative w-full h-full">
              <img
                src={"/assets/Game-table/table-background.svg"}
                alt="table"
                width={800}
                height={500}
                className="w-full h-full z-[50] "
              />
              {tableDetails?.amount && (
                <div className="absolute left-1/2 top-[30%]  -translate-x-1/2 -translate-y-1/2 ">
                  <div className="relative ">
                    <img
                      src={"/assets/Game-table/red-chip.svg"}
                      alt="red-chip"
                      width={50}
                      height={50}
                      className="w-8  absolute left-[-1rem] top-[0rem] z-[30] "
                    />
                    <div className="relative bg-[#005427]  px-12 py-1 z-[20] ">
                      {tableDetails?.amount}
                    </div>
                  </div>
                </div>
              )}
              <img
                className="absolute left-[49%] top-[-1rem] mxl:top-[-1rem] transform -translate-x-1/2 -translate-y-1/2 w-[19%] mxl:w-[20%]  2xl:w-[22%]"
                src={"/assets/Game-table/Game-host.svg"}
                alt="game-host"
                width={50}
                height={50}
              />

              {/* left- top*/}
              <div className="absolute left-[14%] lg:left-[17%] 2xl:left-[18%] top-[-1rem] 2xl:top-[-1rem] transform -translate-x-1/2 -translate-y-1/2 w-[35%] lg:w-[30%] 2xl:w-[25%]   h-[50%] md:h-[40%] 2xl:h-[30%] my-3  ">
                <div className="relative w-full h-full">
                  <div className="relative w-[50%]  ml-auto flex flex-col items-center gap-3 mr-2  ">
                    <p className="text-sm text-center lg:text-base">
                      {slotPlayerMap[(+playerSlotIndex + 4) % 7 || 7]
                        ? slotPlayerMap[(+playerSlotIndex + 4) % 7 || 7]
                            .playerInfo.userName
                        : "Sit Down"}
                    </p>
                    <div className="relative">
                      <div
                        className={`w-16 h-16 lg:w-24 lg:h-24   mxl:w-28 mxl:h-28 2xl:w-36 2xl:h-36 rounded-full  bg-center bg-no-repeat bg-cover relative overflow-hidden `}
                        style={{
                          backgroundImage: `url(${
                            slotPlayerMap[(+playerSlotIndex + 4) % 7 || 7]
                              ?.playerInfo?.avatar ||
                            " /assets/drawer/user-avatar.svg"
                          })`,
                        }}
                      >
                        {slotPlayerMap[(+playerSlotIndex + 4) % 7 || 7]
                          ?.active && (
                          <div className="absolute w-full h-[50%] bg-GreyLight opacity-80 font-bold py-1  xl:py-0 bottom-[-1rem] lg:bottom-[-1.3rem] 2xl:bottom-[-1.6rem]  left-0 text-center text-xs lg:text-base">
                            {slotPlayerMap[(+playerSlotIndex + 4) % 7 || 7]
                              ?.packed
                              ? "packed"
                              : slotPlayerMap[(+playerSlotIndex + 4) % 7 || 7]
                                  ?.seen
                              ? "Seen"
                              : "Blind"}
                          </div>
                        )}
                      </div>
                      {slotPlayerMap?.[(+playerSlotIndex + 4) % 7 || 7]
                        ?.winner && (
                        <img
                          src={"/assets/game/winning.gif"}
                          alt="win GIF"
                          width={200}
                          height={200}
                          className=" absolute w-80  h-full bottom-0 z-40"
                        />
                      )}
                      <div className="absolute inset-[-.5rem] flex items-center justify-center ring-2 ring-white rounded-full"></div>
                    </div>
                    {slotPlayerMap[(+playerSlotIndex + 4) % 7 || 7]?.active && (
                      <Cardlefttop
                        cardsInfo={
                          slotPlayerMap[(+playerSlotIndex + 4) % 7 || 7]
                            ?.cardSet?.cards
                        }
                      />
                    )}
                  </div>
                  {slotPlayerMap[(+playerSlotIndex + 4) % 7 || 7]?.active && (
                    <div className="absolute left-2 bottom-0 transform  transition-transform duration-[3000] ease-in-out">
                      <div className="relative bg-GreyDark opacity-80 border-GreyDark border-y-white border-y-[1px] px-6 py-[.10rem]">
                        <img
                          src={"/assets/Game-table/red-chip.svg"}
                          alt="red-chip"
                          width={50}
                          height={50}
                          className="w-7 lg:w-8 2xl:w-9 absolute left-[-1rem] top-[-.1rem] "
                        />
                        <p className="text-sm lg:text-base 2xl:text-xl">
                          {
                            slotPlayerMap[(+playerSlotIndex + 4) % 7 || 7]
                              ?.lastBet
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* left- middle*/}
              <div className="absolute left-[-1rem]  top-[40%] transform -translate-x-1/2 -translate-y-1/2 w-[35%] lg:w-[30%] 2xl:w-[25%]   h-[40%] 2xl:h-[30%] my-3  ">
                <div className="relative w-full h-full flex flex-col items-center gap-4 ">
                  <div className="relative w-[50%]  flex flex-col items-center gap-3   ">
                    <p className="text-sm text-center lg:text-base">
                      {slotPlayerMap[(+playerSlotIndex + 5) % 7 || 7]
                        ? slotPlayerMap[(+playerSlotIndex + 5) % 7 || 7]
                            .playerInfo.userName
                        : "Sit Down"}
                    </p>

                    <div className="relative">
                      <div
                        className="w-16 h-16 lg:w-24 lg:h-24 mxl:w-28 mxl:h-28 2xl:w-36 2xl:h-36 rounded-full  bg-center bg-no-repeat bg-cover relative overflow-hidden "
                        style={{
                          backgroundImage: `url(${
                            slotPlayerMap[(+playerSlotIndex + 5) % 7 || 7]
                              ?.playerInfo?.avatar ||
                            "/assets/drawer/user-avatar.svg"
                          })`,
                        }}
                      >
                        {slotPlayerMap[(+playerSlotIndex + 5) % 7 || 7]
                          ?.active && (
                          <div className="absolute w-full h-[50%] bg-GreyLight opacity-80 font-bold py-1 xl:py-0 bottom-[-1rem] lg:bottom-[-1.3rem] 2xl:bottom-[-1.6rem]  left-0 text-center text-xs lg:text-base   text-xs">
                            {slotPlayerMap[(+playerSlotIndex + 5) % 7 || 7]
                              ?.packed
                              ? "packed"
                              : slotPlayerMap[(+playerSlotIndex + 5) % 7 || 7]
                                  ?.seen
                              ? "Seen"
                              : "Blind"}
                          </div>
                        )}
                      </div>
                      {slotPlayerMap?.[(+playerSlotIndex + 5) % 7 || 7]
                        ?.winner && (
                        <img
                          src={"/assets/game/winning.gif"}
                          alt="win GIF"
                          width={200}
                          height={200}
                          className=" absolute w-80  h-full bottom-0 z-40"
                        />
                      )}
                      <div className="absolute inset-[-.5rem] flex items-center justify-center ring-2 ring-white rounded-full"></div>
                    </div>
                    {slotPlayerMap[(+playerSlotIndex + 5) % 7 || 7]?.active && (
                      <Cardleftmiddle
                        cardsInfo={
                          slotPlayerMap[(+playerSlotIndex + 5) % 7 || 7]
                            ?.cardSet?.cards
                        }
                      />
                    )}
                  </div>

                  {slotPlayerMap[(+playerSlotIndex + 5) % 7 || 7]?.active && (
                    <div className="">
                      <div className="relative bg-GreyDark opacity-80 border-GreyDark border-y-white border-y-[1px] px-6 py-[.10rem]">
                        <img
                          src={"/assets/Game-table/red-chip.svg"}
                          alt="red-chip"
                          width={50}
                          height={50}
                          className="w-7 lg:w-8 2xl:w-9 absolute left-[-1rem] top-[-.1rem] "
                        />
                        <p className="text-sm lg:text-base 2xl:text-xl">
                          {
                            slotPlayerMap[(+playerSlotIndex + 5) % 7 || 7]
                              .lastBet
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* left- bottom*/}
              <div className="absolute left-[8%] lg:left-[12%] 2xl:left-[13%] bottom-[-7rem] lg:bottom-[-7rem] 2xl:bottom-[-6rem] transform -translate-x-1/2 -translate-y-1/2 w-[35%] lg:w-[30%] 2xl:w-[25%]   h-[50%] md:h-[40%] 2xl:h-[30%] my-3  ">
                <div className="relative w-full h-full">
                  <div className="relative w-[50%]  ml-auto flex flex-col items-center gap-3 mr-2  ">
                    <p className="text-sm text-center lg:text-base">
                      {slotPlayerMap[(+playerSlotIndex + 6) % 7 || 7]
                        ? slotPlayerMap[(+playerSlotIndex + 6) % 7 || 7]
                            .playerInfo.userName
                        : "Sit Down"}
                    </p>
                    <div className="relative">
                      <div
                        className="w-16 h-16 lg:w-24 lg:h-24 mxl:w-28 mxl:h-28 2xl:w-36 2xl:h-36 rounded-full  bg-center bg-no-repeat bg-cover relative overflow-hidden "
                        style={{
                          backgroundImage: `url(${
                            slotPlayerMap[(+playerSlotIndex + 6) % 7 || 7]
                              ?.playerInfo?.avatar ||
                            "/assets/drawer/user-avatar.svg"
                          })`,
                        }}
                      >
                        {slotPlayerMap[(+playerSlotIndex + 6) % 7 || 7]
                          ?.active && (
                          <div className="absolute w-full h-[50%] bg-GreyLight opacity-80 font-bold py-1 xl:py-0 bottom-[-1rem] lg:bottom-[-1.3rem] 2xl:bottom-[-1.6rem]  left-0 text-center text-xs lg:text-base   text-xs">
                            {slotPlayerMap[(+playerSlotIndex + 6) % 7 || 7]
                              ?.packed
                              ? "packed"
                              : slotPlayerMap[(+playerSlotIndex + 6) % 7 || 7]
                                  ?.seen
                              ? "Seen"
                              : "Blind"}
                          </div>
                        )}
                      </div>
                      {slotPlayerMap?.[(+playerSlotIndex + 6) % 7 || 7]
                        ?.winner && (
                        <img
                          src={"/assets/game/winning.gif"}
                          alt="win GIF"
                          width={200}
                          height={200}
                          className=" absolute w-80  h-full bottom-0 z-40"
                        />
                      )}
                      <div className="absolute inset-[-.5rem] flex items-center justify-center ring-2 ring-white rounded-full"></div>
                    </div>
                    {slotPlayerMap[(+playerSlotIndex + 6) % 7 || 7]?.active && (
                      <Cardleftbottom
                        cardsInfo={
                          slotPlayerMap[(+playerSlotIndex + 6) % 7 || 7]
                            ?.cardSet?.cards
                        }
                      />
                    )}
                  </div>
                  {slotPlayerMap[(+playerSlotIndex + 6) % 7 || 7]?.active && (
                    <div className="absolute left-1 bottom-0">
                      <div className="relative bg-GreyDark opacity-80 border-GreyDark border-y-white border-y-[1px] px-6 py-[.10rem]">
                        <img
                          src={"/assets/Game-table/red-chip.svg"}
                          alt="red-chip"
                          width={50}
                          height={50}
                          className="w-7 lg:w-8 2xl:w-9 absolute left-[-1rem] top-[-.1rem] "
                        />
                        <p className="text-sm lg:text-base 2xl:text-xl">
                          {
                            slotPlayerMap[(+playerSlotIndex + 6) % 7 || 7]
                              .lastBet
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* right- top*/}
              <div className="absolute right-[-8rem]  top-[-1rem] 2xl:top-[-1rem] transform -translate-x-1/2 -translate-y-1/2 w-[35%] lg:w-[30%] 2xl:w-[25%]   h-[50%] md:h-[40%] 2xl:h-[30%] my-3  ">
                <div className="relative w-full h-full">
                  <div className="relative w-[50%]  mr-auto flex flex-col items-center gap-3 ml-2  ">
                    <p className="text-sm text-center lg:text-base">
                      {slotPlayerMap[(+playerSlotIndex + 3) % 7 || 7]
                        ? slotPlayerMap[(+playerSlotIndex + 3) % 7 || 7]
                            .playerInfo.userName
                        : "Sit Down"}
                    </p>
                    <div className="relative">
                      <div
                        className="w-16 h-16 lg:w-24 lg:h-24 mxl:w-28 mxl:h-28 2xl:w-36 2xl:h-36 rounded-full bg-center bg-no-repeat bg-cover relative overflow-hidden "
                        style={{
                          backgroundImage: `url(${
                            slotPlayerMap[(+playerSlotIndex + 3) % 7 || 7]
                              ?.playerInfo?.avatar ||
                            "/assets/drawer/user-avatar.svg"
                          })`,
                        }}
                      >
                        {slotPlayerMap[(+playerSlotIndex + 3) % 7 || 7]
                          ?.active && (
                          <div className="absolute w-full h-[50%] bg-GreyLight opacity-80 font-bold py-1 xl:py-0 bottom-[-1rem] lg:bottom-[-1.3rem] 2xl:bottom-[-1.6rem]  left-0 text-center text-xs lg:text-base   text-xs">
                            {slotPlayerMap[(+playerSlotIndex + 3) % 7 || 7]
                              ?.packed
                              ? "packed"
                              : slotPlayerMap[(+playerSlotIndex + 3) % 7 || 7]
                                  ?.seen
                              ? "Seen"
                              : "Blind"}
                          </div>
                        )}
                      </div>
                      {slotPlayerMap?.[(+playerSlotIndex + 3) % 7 || 7]
                        ?.winner && (
                        <img
                          src={"/assets/game/winning.gif"}
                          alt="win GIF"
                          width={200}
                          height={200}
                          className=" absolute w-80  h-full bottom-0 z-40"
                        />
                      )}
                      <div className="absolute inset-[-.5rem] flex items-center justify-center ring-2 ring-white rounded-full"></div>
                    </div>
                    {slotPlayerMap[(+playerSlotIndex + 3) % 7 || 7]?.active && (
                      <Righttop
                        cardsInfo={
                          slotPlayerMap[(+playerSlotIndex + 3) % 7 || 7]
                            ?.cardSet?.cards
                        }
                      />
                    )}
                  </div>
                  {slotPlayerMap[(+playerSlotIndex + 3) % 7 || 7]?.active && (
                    <div className="absolute right-1 bottom-0">
                      <div className="relative bg-GreyDark opacity-80 border-GreyDark border-y-white border-y-[1px] px-6 py-[.10rem]">
                        <img
                          src={"/assets/Game-table/red-chip.svg"}
                          alt="red-chip"
                          width={50}
                          height={50}
                          className="w-7 lg:w-8 2xl:w-9 absolute left-[-1rem] top-[-.1rem] "
                        />
                        <p className="text-sm lg:text-base 2xl:text-xl">
                          {
                            slotPlayerMap[(+playerSlotIndex + 3) % 7 || 7]
                              .lastBet
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* right- middle*/}

              <div className="absolute right-[-15rem] mxl:right-[-17rem] top-[40%] transform -translate-x-1/2 -translate-y-1/2 w-[35%] lg:w-[30%] 2xl:w-[25%]   h-[40%] 2xl:h-[30%] my-3  ">
                <div className="relative w-full h-full flex flex-col items-center gap-4 ">
                  <div className="relative w-[50%]  flex flex-col items-center gap-3   ">
                    <p className="text-sm text-center lg:text-base">
                      {slotPlayerMap[(+playerSlotIndex + 2) % 7 || 7]
                        ? slotPlayerMap[(+playerSlotIndex + 2) % 7 || 7]
                            .playerInfo.userName
                        : "Sit Down"}
                    </p>
                    <div className="relative">
                      <div
                        className="w-16 h-16 lg:w-24 lg:h-24 mxl:w-28 mxl:h-28 2xl:w-36 2xl:h-36 rounded-full  bg-center bg-no-repeat bg-cover relative overflow-hidden "
                        style={{
                          backgroundImage: `url(${
                            slotPlayerMap[(+playerSlotIndex + 2) % 7 || 7]
                              ?.playerInfo?.avatar ||
                            "/assets/drawer/user-avatar.svg"
                          })`,
                        }}
                      >
                        {slotPlayerMap[(+playerSlotIndex + 2) % 7 || 7]
                          ?.active && (
                          <div className="absolute w-full h-[50%] bg-GreyLight opacity-80 font-bold py-1 xl:py-0 bottom-[-1rem] lg:bottom-[-1.3rem] 2xl:bottom-[-1.6rem]  left-0 text-center text-xs lg:text-base   text-xs">
                            {slotPlayerMap[(+playerSlotIndex + 2) % 7 || 7]
                              ?.packed
                              ? "packed"
                              : slotPlayerMap[(+playerSlotIndex + 2) % 7 || 7]
                                  ?.seen
                              ? "Seen"
                              : "Blind"}
                          </div>
                        )}
                      </div>
                      {slotPlayerMap?.[(+playerSlotIndex + 2) % 7 || 7]
                        ?.winner && (
                        <img
                          src={"/assets/game/winning.gif"}
                          alt="win GIF"
                          width={200}
                          height={200}
                          className=" absolute w-80  h-full bottom-0 z-40"
                        />
                      )}
                      <div className="absolute inset-[-.5rem] flex items-center justify-center ring-2 ring-white rounded-full"></div>
                    </div>
                    {slotPlayerMap[(+playerSlotIndex + 2) % 7 || 7]?.active && (
                      <Rightmiddle
                        cardsInfo={
                          slotPlayerMap[(+playerSlotIndex + 2) % 7 || 7]
                            ?.cardSet?.cards
                        }
                      />
                    )}
                  </div>
                  {slotPlayerMap[(+playerSlotIndex + 2) % 7 || 7]?.active && (
                    <div className="border-2 border-red-700 ">
                      <div className="relative bg-GreyDark opacity-80 border-GreyDark border-y-white border-y-[1px] px-6 py-[.10rem]">
                        <img
                          src={"/assets/Game-table/red-chip.svg"}
                          alt="red-chip"
                          width={50}
                          height={50}
                          className="w-7 lg:w-8 2xl:w-9 absolute left-[-1rem] top-[-.1rem] "
                        />
                        <p className="text-sm lg:text-base 2xl:text-xl">
                          {
                            slotPlayerMap[(+playerSlotIndex + 2) % 7 || 7]
                              .lastBet
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* right- bottom*/}
              <div className="absolute right-[-8rem]  lg:right-[-9rem] 2xl:right-[-10rem]  bottom-[-7rem] lg:bottom-[-7rem] 2xl:bottom-[-6rem]  transform -translate-x-1/2 -translate-y-1/2 w-[35%] lg:w-[30%] 2xl:w-[25%]   h-[50%] md:h-[40%] 2xl:h-[30%] my-3  ">
                <div className="relative w-full h-full">
                  <div className="relative w-[50%]  mr-auto flex flex-col items-center gap-3 ml-2  ">
                    <p className="text-sm text-center lg:text-base">
                      {slotPlayerMap?.[(+playerSlotIndex + 1) % 7 || 7]
                        ? slotPlayerMap?.[(+playerSlotIndex + 1) % 7 || 7]
                            .playerInfo.userName
                        : "Sit Down"}
                    </p>
                    <div className="relative">
                      <div
                        className="w-16 h-16 lg:w-24 lg:h-24 mxl:w-28 mxl:h-28 2xl:w-36 2xl:h-36 rounded-full  bg-center bg-no-repeat bg-cover relative overflow-hidden "
                        style={{
                          backgroundImage: `url(${
                            slotPlayerMap[(+playerSlotIndex + 1) % 7 || 7]
                              ?.playerInfo?.avatar ||
                            "/assets/drawer/user-avatar.svg"
                          })`,
                        }}
                      >
                        {slotPlayerMap?.[(+playerSlotIndex + 1) % 7 || 7]
                          ?.active && (
                          <div className="absolute w-full h-[50%] bg-GreyLight opacity-80  font-bold py-1 xl:py-0 bottom-[-1rem] lg:bottom-[-1.3rem] 2xl:bottom-[-1.6rem]  left-0 text-center text-xs lg:text-base xl:text-base ">
                            {slotPlayerMap?.[(+playerSlotIndex + 1) % 7 || 7]
                              ?.packed
                              ? "packed"
                              : slotPlayerMap?.[(+playerSlotIndex + 1) % 7 || 7]
                                  ?.seen
                              ? "Seen"
                              : "Blind"}
                          </div>
                        )}
                      </div>
                      {slotPlayerMap?.[(+playerSlotIndex + 1) % 7 || 7]
                        ?.winner && (
                        <img
                          src={"/assets/game/winning.gif"}
                          alt="win GIF"
                          width={200}
                          height={200}
                          className=" absolute w-80  h-full bottom-0 z-40"
                        />
                      )}
                      <div className="absolute inset-[-.5rem] flex items-center justify-center ring-2 ring-white rounded-full"></div>
                    </div>
                    {slotPlayerMap[(+playerSlotIndex + 1) % 7 || 7]?.active && (
                      <Rightbottom
                        cardsInfo={
                          slotPlayerMap?.[(+playerSlotIndex + 1) % 7 || 7]
                            ?.cardSet?.cards
                        }
                      />
                    )}
                  </div>
                  {slotPlayerMap[(+playerSlotIndex + 1) % 7 || 7]?.active && (
                    <div className="absolute right-1 bottom-0">
                      <div className="relative bg-GreyDark opacity-80 border-GreyDark border-y-white border-y-[1px] px-6 py-[.10rem]">
                        <img
                          src={"/assets/Game-table/red-chip.svg"}
                          alt="red-chip"
                          width={50}
                          height={50}
                          className="w-7 lg:w-8 2xl:w-9 absolute left-[-1rem] top-[-.1rem] "
                        />
                        <p className="text-sm lg:text-base 2xl:text-xl">
                          {
                            slotPlayerMap?.[(+playerSlotIndex + 1) % 7 || 7]
                              .lastBet
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* player */}
              <div className="absolute left-1/2 bottom-[-6rem]  lg:bottom-[-4.3rem] mxl:bottom-[-5rem] transform -translate-x-1/2 -translate-y-1/2   ">
                <div className="relative w-full h-full">
                  <img
                    src={Loggeduser?.avatar}
                    alt="avatar"
                    width={50}
                    height={50}
                    className={`w-28 h-28 lg:w-36 lg:h-36 mxl:w-40 mxl:h-40 2xl:w-44 2xl:h-44  rounded-full border-${
                      slotPlayerMap?.[playerSlotIndex]?.winner
                        ? "yellow-200 shadow-2xl shadow-yellow-300 "
                        : "yellow-400"
                    }  border-4 `}
                  />
                  {slotPlayerMap?.[playerSlotIndex]?.winner && (
                    <img
                      src={"/assets/game/winning.gif"}
                      alt="win GIF"
                      width={200}
                      height={200}
                      className=" absolute w-80  h-full bottom-0 z-40"
                    />
                  )}
                </div>
                {slotPlayerMap[+playerSlotIndex]?.packed && (
                  <div className="absolute w-full h-[100%] rounded-full bg-GreyLight opacity-80 font-bold py-1 xl:py-0 bottom-0   left-0 text-center text-xs lg:text-base  flex justify-center items-center ">
                    <p>packed</p>
                  </div>
                )}
              </div>
            </d>
            <Cardanimate
              cardsInfo={cardsInfo || players?.[playerId]?.cardSet?.cards}
              seeplayingcard={players?.[playerId]?.seen}
            />
          </div>
        </div>
        {/* footer */}

        <div className="teen-patti-navbar  mx-auto  bottom-5 left-0  right-0 flex justify-evenly items-center w-[100%]   ">
          <div className="left-container flex justify-between items-center gap-7 ">
            {players?.[playerId]?.turn && !players?.[playerId]?.packed && (
              <button
                onClick={handlePack}
                className="custom-gradient px-3 py-1 text-base"
              >
                Pack
              </button>
            )}

            {players?.[playerId]?.turn &&
              !players?.[playerId]?.packed &&
              players?.[playerId]?.isSideShowAvailable &&
              cardSee && (
                <button
                  onClick={
                    tableDetails?.isShowAvailable
                      ? handleshow
                      : handlePlaceSideShow
                  }
                  className="custom-gradient px-3 py-1 text-base"
                >
                  {tableDetails?.isShowAvailable ? "show" : "Side Show"}
                </button>
              )}
          </div>
          <div
            className={`relative bg-GreyDark opacity-80 border-GreyDark border-y-white border-y-[1px] px-6 transform  transition-transform duration-[3000] ease-in-out z-[1000] `}
          >
            <img
              src={"/assets/Game-table/red-chip.svg"}
              alt="red-chip"
              width={50}
              height={50}
              className="absolute left-[-1.5rem] top-[0rem] h-full "
            />
            <p className=" text-center text-lg">{chips}</p>
          </div>
          <div className="right-container flex justify-between items-center gap-2">
            {players?.[playerId]?.turn && !players?.[playerId]?.packed && (
              <div className="flex justify-between items-center gap-4 ">
                <button
                  onClick={handleDeduct}
                  className="rounded-full border border-white flex justify-center items-center w-5 h-5 text-center"
                >
                  -
                </button>

                <button
                  onClick={handleBliend}
                  className="custom-gradient px-3 py-1 text-base  btn-parent group flex flex-col"
                >
                  <span className="btn-child group-hover:w-24 group-hover:h-24"></span>
                  <p className="basis-full">{isBliend ? "Blind" : "Chaal"}</p>
                  <p>{value}</p>
                </button>
                <button
                  onClick={handleDouble}
                  className="bg-Secondary rounded-full border border-white  flex justify-center items-center w-5 h-5"
                >
                  +
                </button>
              </div>
            )}
          </div>
          {!players?.[playerId]?.packed &&
            players?.[playerId]?.active &&
            !cardSee && (
              <button
                className=" custom-gradient btn-parent text-white group"
                onClick={handleSeeCards}
              >
                <span className="btn-child"></span>
                <span className="relative">See</span>
              </button>
            )}
        </div>
      </div>
      {playerId && players?.[playerId]?.sideShowTurn && sideShowModal && (
        <SideShow
          handleResponseSideShowCancel={handleResponseSideShowCancel}
          handleResponseSideShowAccept={handleResponseSideShowAccept}
        />
      )}
      {!(playerId && players?.[playerId]?.sideShowTurn && sideShowModal) &&
        notification && (
          <div className=" text-center  absolute px-10 py-6 bg-GreyDark opacity-80 text-white text-2xl left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-1/2 font-semibold w-[80%]">
            {notification}
          </div>
        )}
      {winReason && (
        <div className=" text-center  absolute px-10 py-6 bg-GreyDark opacity-80 text-white text-2xl left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-1/2 font-semibold w-[80%]">
          {winReason}
        </div>
      )}
      {players?.[playerId]?.active &&
        gameStartCounter !== 0 &&
        gameStartCounter !== null &&
        !notification && (
          <div className="text-center  absolute px-10 py-6 bg-GreyDark opacity-80 text-white text-2xl left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-1/2 font-semibold w-[80%]">
            Game Starts in {gameStartCounter} Seconds
          </div>
        )}
      {!players?.[playerId]?.active &&
        gameStartCounter !== 0 &&
        !notification && (
          <div className="text-center  absolute px-10 py-3 bg-GreyDark opacity-80 text-white text-2xl left-1/2 top-[10%] transform -translate-x-1/2 -translate-y-1/2 font-semibold w-[80%]">
            Please Wait For End Of Current Game
          </div>
        )}

      {shareinvitecode && privateTableKey && (
        <Shareinvite
          SetshareinviteCode={SetshareinviteCode}
          joincode={privateTableKey}
        />
      )}
    </div>
  );
};

export default LandscapePage;
