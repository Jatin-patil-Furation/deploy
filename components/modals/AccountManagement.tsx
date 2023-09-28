"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const AccountManagement = ({ setAccountMangement }: any) => {
  const initialWinners = [
    {
      id: 1,
      name: "player_1",
      avatar: "",
      actionAmount: 100
    },
    {
      id: 2,
      name: "player_1",
      avatar: "",
      actionAmount: 100
    },
    {
      id: 3,
      name: "player_1",
      avatar: "",
      actionAmount: 100
    },
    {
      id: 4,
      name: "player_1",
      avatar: "",
      actionAmount: 100
    },
    {
      id: 5,
      name: "player_1",
      avatar: "",
      actionAmount: 100
    },
    {
      id: 6,
      name: "player_1",
      avatar: "",
      actionAmount: 100
    },
    {
      id: 7,
      name: "player_1",
      avatar: "",
      actionAmount: 100
    },
    {
      id: 8,
      name: "player_1",
      avatar: "",
      actionAmount: 100
    },
    {
      id: 9,
      name: "player_1",
      avatar: "",
      actionAmount: 100
    },
    {
      id: 10,
      name: "player_1",
      avatar: "",
      actionAmount: 100
    },
  ];
  const [ammount, SetAmount] = useState<string>("")
  const [winners, setWinners] = useState(initialWinners);
  const [searchedId, setSearchedId] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [addBalance, setAddBalance] = useState(false);
  const [withdrawBalance, setWithdrawBalance] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idToSearch = e.target.value;
    setSearchedId(idToSearch);

    if (idToSearch) {
      const filteredWinners = initialWinners.filter((player) =>
        player.id.toString().includes(idToSearch)
      );
      setWinners(filteredWinners);
    } else {
      setWinners(initialWinners);
    }
  };

  const handleAddBalanceClick = (player: any) => {
    setSelectedPlayer(player);
    setAddBalance(true);
    setWithdrawBalance(false);
  };

  const handleWithdrawBalanceClick = (player: any) => {
    setSelectedPlayer(player);
    setAddBalance(false);
    setWithdrawBalance(true);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
    setAddBalance(false);
    setWithdrawBalance(false);
  };

  console.log(addBalance, withdrawBalance);

  const handleconfirmationpayment = () =>{
     console.log("data",ammount)
  }

  return (
    <div
      className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-x-hidden bg-Background  flex flex-col gap-3 items-center z-[100] w-[75%] ${
        !addBalance && !withdrawBalance && " h-[80%] overflow-y-auto "
      }   sm:[72%] md:w-[65%] lg:w-[60%] scrollbar-none `}
    >
      <button
        className="relative custom-gradient py-3 w-full rounded-t-sm rounded-b-none"
        style={{
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          {addBalance
            ? " Add Balance to User’s Account"
            : withdrawBalance
            ? "Withdraw Balance to User’s Account"
            : "Account Management"}
        </p>
        <Image
          src={"/assets/other/x.svg"}
          onClick={() => setAccountMangement(false)}
          alt="x"
          width={50}
          height={50}
          className="w-[4%] absolute right-3 top-1/2 transform -translate-y-1/2"
        />
      </button>
      {!addBalance && !withdrawBalance && (
        <div className="w-full mx-auto ">
          <div className="search tab w-[80%] mx-auto ">
            <input
              type="search"
              name="userid"
              id=""
              className="w-full placeholder:px-3 focus:outline-none text-white bg-GreyLight rounded-md px-3 py-1"
              placeholder="Search by User-id"
              value={searchedId}
              onChange={handleSearch}
            />
          </div>
          <div className="list py-4 space-y-2 w-[80%] mx-auto  ">
            {winners.length === 0 ? (
              <p>No users found</p>
            ) : (
              winners.map((player) => {
                return (
                  <div
                    key={player.id}
                    className=" bg-GreyDark rounded-md flex justify-between flex-wrap p-3 items-center"
                  >
                    <div className="player-info basis-[40%] flex gap-2  items-center">
                      <Image
                        src={"/assets/drawer/user-avatar.svg"}
                        onClick={() => setAccountMangement(false)}
                        alt="x"
                        width={50}
                        height={50}
                        className="w-10 sm:w-12 md:w-14 lg:w-16 rounded-full "
                      />
                      <div className="flex  flex-col gap-1">
                        <p className="text-base sm:text-lg md:text-xl lg;text-xl">
                          {player.name}
                        </p>
                        <p className="text-GreyLight text-sm sm:text-base md:text-lg lg:text-xl">
                          {player.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 basis-[40%] sm:basis-[50%] md:basis-[55%] lg:basis-[60%] justify-around h-[80%] my-auto items-center">
                      <button
                        className="custom-gradient rounded-md px-2 py-1 basis-[45%] text-xs sm:text-base md:text-lg lg:text-xl "
                        onClick={() => handleAddBalanceClick(player)}
                      >
                        Add to Balance
                      </button>
                      <button
                        className="custom-gradient rounded-md px-2 py-1 basis-[45%] text-xs sm:text-base md:text-lg lg:text-xl"
                        onClick={() => handleWithdrawBalanceClick(player)}
                      >
                        Withdraw Money
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {selectedPlayer && (addBalance || withdrawBalance) && (
        <div className="modal w-[80%] mx-auto space-y-2 px-3 py-4">
          <div className="bg-GreyDark w-full px-5 py-5">
            <div className="flex flex-col sm:flex-row justify-between ">
              <p>User ID:{selectedPlayer.id}</p>
              <p>Current Balance: {selectedPlayer.actionAmount}</p>
            </div>
            <div>
              Amount to be added to wallet (in USD):{" "}
              <input
                type="number"
                name=""
                id=""
                onChange={(e) => SetAmount(e.target.value)}
                className="bg-[#303030] focus:outline-none py-2 px-3 w-full sm:w-[30%] rounded-md"
                placeholder="Enter Amount "
              />
            </div>
          </div>
          <Link href={"https://t.me/sikkaplay"}>
            <button
              onClick={handleconfirmationpayment}
              className="custom-gradient px-3 py-2 w-full "
            >
              Confirm
            </button>
          </Link>
          {/* <button onClick={closeModal}>Close Modal</button> */}
        </div>
      )}
    </div>
  );
};

export default AccountManagement;
 