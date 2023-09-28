import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
const Logout = ({setLogoutModal}:any) => {
    const router = useRouter()
    // const userinfo= JSON.parse(localStorage.getItem("Loggeduser"))

   const handleUserLogout = () =>{
     localStorage.clear()
       router.push("/")
   }

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-Background py-3 px-10 sm:py-5  md:py-7 lg:py-9 flex flex-col gap-5 items-center   z-[100]">
      <Image
        src={"/assets/other/power.svg"}
        alt="logout icon"
        width={50}
        height={50}
        className="w-[20%]"
      />
      <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl">
        Are you sure you want to Logout?
      </p>
      <div className="flex justify-between basis-full gap-3">
        <button
          onClick={() => {
            setLogoutModal(false);
          }}
          className="border border-opacity-100 px-5 py-2 text-sm rounded-sm  sm:text-base md:text-lg lg:text-xl  "
          style={{
            borderImage:
              "linear-gradient(111deg, rgba(173, 11, 64, 0.88) 9.86%, #ff1917 63.95%) 1",
          }}
        >
          Cancel
        </button>
        <button
          onClickCapture={handleUserLogout}
          className="custom-gradient px-5 py-2 text-sm rounded-sm sm:text-base md:text-lg lg:text-xl "
          onClick={() => {
            setLogoutModal(false);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout 