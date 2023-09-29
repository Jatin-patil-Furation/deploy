"use client"
import Image from 'next/image'
import React from 'react'

const page = () => {

    return (
        <div className='bg-Background text-white pt-20 min-h-screen' >
            <div className='flex flex-col items-center'>
                <div className='flex flex-col items-center w-full gap-1'>
                    <h2>Create Tournament</h2>
                    <div className='h-[30vh] bg-GreyDark   relative w-[90%] mx-auto'>
                        <Image src={"/assets/drawer/camera.svg"} alt='camera' width={50} height={50} className='w-[10%] absolute left-1/2  top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10] ' />
                    </div>
                    <p className='text-Secondary'>Upload Image</p>
                </div>
                <div className=' space-y-3 w-[90%] mx-auto'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="TournamentName">Tournament Name</label>
                        <input type="text" name="TournamentName" id="" placeholder='Tournament Name' className='placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="TournamentDescription">Tournament Description</label>
                        <input type="text" name="TournamentDescription" id="" placeholder='Description' className='placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="phone-no">Phone Number</label>
                        <input type="number" name="phone-no" id="" className='placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none' placeholder='13242314' />
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col basis-[45%] gap-1 '>
                            <label htmlFor="NoOfGames">No. of Games</label>
                            <select name="NoOfGames" id="" className='placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none '>
                                <option value="7">7 Games</option>
                                <option value="8">8 Games</option>
                                <option value="9">9 Games</option>
                                <option value="10">10 Games</option>
                            </select>
                        </div>
                        <div className='flex flex-col  basis-[45%] gap-1'>
                            <label htmlFor="NoOfPlayers">No. of Players</label>
                            <select name="NoOfPlayers" id="" className='placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none' >
                                <option value="7">7 Players</option>
                                <option value="8">8 Players</option>
                                <option value="9">9 Players</option>
                                <option value="10">10 Players</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col basis-[45%] gap-1'>
                            <label htmlFor="WinningAmount">Winning Amount</label>
                            <select name="WinningAmount" id="" className='placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none'>
                                <option value="2000">$2000</option>
                                <option value="3000">$3000</option>
                                <option value="4000">$4000</option>
                                <option value="5000">$5000</option>
                            </select>
                        </div>
                        <div className='flex flex-col basis-[45%] gap-1'>
                            <label htmlFor="EntryFee">Entry Fee</label>
                            <select name="EntryFee" id="" className='placeholder:text-GreyLight px-2 py-4 rounded-sm bg-GreyDark outline-none'>
                                <option value="200">$200</option>
                                <option value="300">$300</option>
                                <option value="400">$400</option>
                                <option value="500">$500</option>
                            </select>
                        </div>
                    </div>

                </div>
                <button className='custom-gradient my-3 px-3 py-4 w-[90%] mx-auto'>
                    Create Tournament
                </button>
            </div>

        </div>
    )
}

export default page