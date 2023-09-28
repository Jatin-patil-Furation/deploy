import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Navbar = ({ setDrawerOpen, drawerOpen }: any) => {
  const playerWallet = 125;
 const router = useRouter();

   const homeredirect=() =>{
   router.push("/")   
   }

  return (
    <nav className=" border-red-950 fixed left-0 top-3 right-0 z-40">
      <div
        className="fixed  px-2 sm:px-12  mx-auto  
        w-[90%] flex justify-between items-center  
        backdrop-blur-md bg-opacity-20 p-3 max-w-7xl
      dashboardnav
      "
      >
        {!drawerOpen ? (
          <Image
            src={"/assets/landingPage/menu.svg"}
            alt="menu-icon"
            width={50}
            height={50}
            className="w-[4%] h-[40%]  sm:w-[4%] lg:w-[2.5%] lg:h-[2.5%%] hover:cursor-pointer"
            onClick={() => setDrawerOpen(true)}
          />
        ) : (
          <Image
            src={"/assets/other/x.svg"}
            alt="close-icon"
            width={50}
            height={50}
            className="w-[7%] h-[7%] lg:w-[2.5%] lg:h-[2.5%%] hover:cursor-pointer"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        <Image
          onClick={homeredirect}
          src={"/assets/landingPage/sikkafontfilled.svg"}
          alt="sikkaplay-icon"
          width={50}
          height={50}
          className="w-[35%] hover:cursor-pointer lg:w-[20%]"
        />

        <button className="custom-gradient px-1 py-1 md:p-2 lg:p-3 text-sm">
          <span className="hidden md:inline ">Total Balance:</span> $
          {playerWallet}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
