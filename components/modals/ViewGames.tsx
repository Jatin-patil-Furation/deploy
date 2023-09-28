import React, { useState } from 'react'
import Image from 'next/image'

const ViewGames = ({ setViewGames }: any) => {
    const ongoingGames = [
        {
            id: 1,
            name: "Online Game",
            playerCount: 5,
            isPrivate: true,
            bootAmount: 400,
        },
        {
            id: 2,
            name: "Online Game",
            playerCount: 5,
            isPrivate: true,
            bootAmount: 400,
        },
        {
            id: 3,
            name: "Online Game",
            playerCount: 5,
            isPrivate: false,
            bootAmount: 400,
        },
        {
            id: 1,
            name: "Online Game",
            playerCount: 5,
            isPrivate: true,
            bootAmount: 400,
        },
    ]

    return (
        <div className={`w-[95%] absolute left-1/2  top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-Background    z-[100]`}>
            <div>
                <button className='relative custom-gradient py-3 px-4 w-full rounded-t-sm rounded-b-none' style={{ borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px' }}>
                    <p className='text-xl'>
                        View Games
                    </p>
                    <Image src={"/assets/other/x.svg"} onClick={() => setViewGames(false)} alt='x' width={50} height={50} className='w-[4%] absolute right-3  top-1/2 transform  -translate-y-1/2 ' />
                </button>
                <div className='banned-player-list  bg-Background'>
                    {
                        ongoingGames.map((game) =>
                            <div key={game.id} className='rounded-sm px-3  py-2 flex justify-between items-center bg-GreyDark m-3'>
                                <div className='flex flex-col items-start gap-2'>
                                    <h3>
                                        {game.name}{" "} ({game.playerCount} {" Players"})
                                    </h3>
                                    <p className='text-GreyLight'>
                                        Game ID: {" "}{game.id}
                                    </p>
                                </div>
                                {
                                    game.isPrivate && (
                                        <p className='text-green-500'>Boot Amt: {" "} {game.bootAmount}</p>)
                                } 
                                <button className='custom-gradient text-xs py-2 px-3'>
                                    Join
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewGames