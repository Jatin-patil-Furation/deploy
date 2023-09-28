import React, { useState } from 'react'
import Image from 'next/image'

const ApprovedWinners = ({ setApprovedWinners }: any) => {
    const approvedWinnersList = [
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

    return (
        <div className={`w-[95%] absolute left-1/2  top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-Background    z-[100]`}>
            <div>
                <button className='relative custom-gradient py-3 px-4 w-full rounded-t-sm rounded-b-none' style={{ borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px' }}>
                    <p className='text-xl'>
                    Approve Winners
                    </p>
                    <Image src={"/assets/other/x.svg"} onClick={() => setApprovedWinners(false)} alt='x' width={50} height={50} className='w-[4%] absolute right-3  top-1/2 transform  -translate-y-1/2 ' />
                </button>
                <div className='banned-player-list  bg-Background'>
                    {
                        approvedWinnersList.map((player) =>
                            <div key={player.id} className='rounded-sm px-3  py-2 flex justify-between bg-GreyDark m-3'>
                                <div className='flex items-center gap-2'>
                                    <Image src={player.avatar} alt='player-avatar' width={50} height={50} className='w-[25%]' />
                                    <div className='flex flex-col gap-1'>
                                    <p>{player.name}</p>
                                    <p className='text-GreyLight'>Game id :{ " " + player.id}</p>
                                    </div>
                                </div>
                                <button className='custom-gradient text-xs py-2 px-3' >
                                    Send Money
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ApprovedWinners