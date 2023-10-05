import Image from 'next/image'
import React from 'react'

const TournamentWinners = ({ setTournamentWinners }: any) => {
  const winnerHistory = [
    {
      id: 1,
      date: "12th July 2023",
      transaction: [{
        id: 101,
        paymentOption: "Razorpay",
        time: "11:47 AM",
        isAdded: true,
        amount: 100
      }, {
        id: 102,
        paymentOption: "Razorpay",
        time: "11:47 AM",
        isAdded: true,
        amount: 100
      }, {
        id: 103,
        paymentOption: "Razorpay",
        time: "11:47 AM",
        isAdded: true,
        amount: 100
      }]
    },
    {
      id: 2,
      date: "12th July 2023",
      transaction: [{
        id: 106,
        paymentOption: "Razorpay",
        time: "11:47 AM",
        isAdded: true,
        amount: 100
      }, {
        id: 104,
        paymentOption: "Razorpay",
        time: "11:47 AM",
        isAdded: true,
        amount: 100
      }, {
        id: 105,
        paymentOption: "Razorpay",
        time: "11:47 AM",
        isAdded: true,
        amount: 100
      }]
    },
    {
      id: 3,
      date: "12th July 2023",
      transaction: [{
        id: 106,
        paymentOption: "Razorpay",
        time: "11:47 AM",
        isAdded: true,
        amount: 100
      }, {
        id: 104,
        paymentOption: "Razorpay",
        time: "11:47 AM",
        isAdded: true,
        amount: 100
      }, {
        id: 105,
        paymentOption: "Razorpay",
        time: "11:47 AM",
        isAdded: true,
        amount: 100
      }]
    },
    {
      id: 4,
      date: "12th July 2023",
      transaction: [{
        id: 106,
        paymentOption: "Razorpay",
        time: "11:47 AM",
        isAdded: true,
        amount: 100
      }, {
        id: 104,
        paymentOption: "Razorpay",
        time: "11:47 AM",
        isAdded: true,
        amount: 100
      }, {
        id: 105,
        paymentOption: "Razorpay",
        time: "11:47 AM",
        isAdded: true,
        amount: 100
      }]
    },
    
  ]
  return (
       <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-[#111111] opacity-50"></div>
 
    <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-Background  flex flex-col gap-3 items-end z-[100] w-[75%] h-[80%] overflow-y-auto scrollbar'>
      <button className='relative custom-gradient py-3 px-4 w-full rounded-t-sm rounded-b-none' style={{ borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px' }}>
        <p className='text-xl'>Transaction History</p>
        <Image src={"/assets/other/x.svg"} onClick={() => setTournamentWinners(false)} alt='x' width={50} height={50} className='w-[4%] absolute right-3 top-1/2 transform -translate-y-1/2' />
      </button>
      <div className=' w-[70%]'>
        <div className='filter flex justify-between items-center '>
            <label htmlFor="countries" className="block mb-2 text-base font-medium w-[20%]">Filter By: { " " }</label>
            <select id="countries" className="bg-GreyLight text-sm rounded-lg block w-[70%] py-2.5 ">
              <option className='bg-GreyLight text-sm rounded-lg' selected>All</option>
              <option className="bg-GreyLight text-sm rounded-lg" value="US">Tournament</option>
              <option className="bg-GreyLight text-sm rounded-lg" value="CA">1 V 1</option>
            </select>
        </div>
      </div>
      <div className='w-full flex flex-col gap-2 bg-Background '>
        {winnerHistory.map(history => (
          <div key={history.id} className='w-full px-2'>
            <p>{history.date}</p>
            <div className='px-3'>
              {history.transaction.map(transaction => (
                <div key={transaction.id} className='flex justify-between items-center p-2 bg-GreyDark my-2'>
                  <div className='flex flex-col'>
                    <h3>{transaction.paymentOption}</h3>
                    <p className='text-xs text-GreyLight'>{transaction.time}</p>
                  </div>
                  <div className='flex justify-between text-lg'>
                    <span>{transaction.isAdded ? "+$" : "-$"}</span>
                    <p>{transaction.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
     </div>
  )
}

export default TournamentWinners