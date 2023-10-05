import React, { useState } from 'react'
import Image from 'next/image'

const BannedPlayers = ({ setLogoutModal }: any) => {
    const BannedPlayerList = [
        {
            id: 1,
            name: "Player-Name",
            avatar: "/assets/drawer/user-avatar.svg"
        }, {
            id: 2,
            name: "Player-Name",
            avatar: "/assets/drawer/user-avatar.svg"
        },
        {
            id: 3,
            name: "Player-Name",
            avatar: "/assets/drawer/user-avatar.svg"
        },
        {
            id: 4,
            name: "Player-Name",
            avatar: "/assets/drawer/user-avatar.svg"
        },
        {
            id: 5,
            name: "Player-Name",
            avatar: "/assets/drawer/user-avatar.svg"
        },

    ]
    const [showUnblock, setUnblock] = useState(false);

    return (
           <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-[#111111] opacity-50"></div>
 
        <div>

            {!showUnblock ? (
                <div className={` ${showUnblock ? "w-[75%] " : "w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%]"} absolute left-1/2  top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-Background    z-[100]`}>
                    <div>
                        <button className='relative custom-gradient py-3 px-4 w-full rounded-t-sm rounded-b-none' style={{ borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px' }}>
                            <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl'>
                                Banned Player
                            </p>
                            <Image src={"/assets/other/x.svg"} onClick={() => setLogoutModal(false)} alt='x' width={50} height={50} className='w-[4%] md:w-[3%]  absolute right-3  md:right-6 top-1/2 transform  -translate-y-1/2 ' />
                        </button>
                        <div className='banned-player-list  bg-Background p-1 sm:p-2 md:p-3 lg:p-4'>
                            {
                                BannedPlayerList.map((player) =>
                                    <div key={player.id} className='rounded-sm px-3 sm:px-4 py-2 flex justify-between bg-GreyDark m-3'>
                                        <div className='flex items-center gap-2'>
                                            <Image src={player.avatar} alt='player-avatar' width={50} height={50} className='w-[20%]' />
                                            <p className='text-sm sm:text-sm md:text-base lg:text-lg'>{player.name}</p>
                                        </div>
                                        <button className='custom-gradient text-xs py-2 px-3 sm:text-sm md:text-base lg:text-lg ' onClick={() => setUnblock(true)}>
                                            Unblock
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>) : (
                    <div className={`w-[75%] sm:w-[60%] md:w-[55%] lg:w-[50%] absolute left-1/2  top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-Background    z-[100]`}>
                <div className='py-6 px-5 flex flex-col gap-8 w-full  '>
                    <p className='text-center basis-2/3 text-lg sm:text-xl md:text-2xl lg:text-3xl'> Are you sure you want to Unblock Player Name?
                    </p>
                    <div className='flex justify-between w-[75%] mx-auto gap-3'>
                        <button className="border border-opacity-100 px-5 py-2 text-sm sm:text-base md:text-lg lg:text-xl rounded-sm " style={{ borderImage: 'linear-gradient(111deg, rgba(173, 11, 64, 0.88) 9.86%, #ff1917 63.95%) 1' }} onClick={() => setUnblock(false)}>
                            Cancel
                        </button>
                        <button className='custom-gradient px-6 py-2 text-sm sm:text-base md:text-lg lg:text-xl rounded-sm'>
                            Kick
                        </button>
                    </div>
                </div>
                </div>
            )}

        </div>
    </div>
    )
}

export default BannedPlayers