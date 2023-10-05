import Image from 'next/image'
import React from 'react'

const TransactionHistory = ({ setTransactionHistory }: any) => {
  const transactionHistory = [
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
 
    <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-Background  flex flex-col gap-3 items-center z-[100] w-[75%] h-[80%] overflow-y-auto scrollbar-none sm:[72%] md:w-[65%] lg:w-[60%]'>
      <button className='relative custom-gradient py-3 px-4 w-full rounded-t-sm rounded-b-none' style={{ borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px' }}>
        <p className='text-base sm:text-lg md:text-xl lg:text-2xl'>Transaction History</p>
        <Image src={"/assets/other/x.svg"} onClick={() => setTransactionHistory(false)} alt='x' width={50} height={50} className='w-[4%] absolute right-3 top-1/2 transform -translate-y-1/2' />
      </button>
      {/* <div className='filter flex justify-between items-center w-[80%] ml-auto  px-3 '> 
      <label htmlFor="countries" className="block mb-2 text-sm sm:text-base md:text-lg lg:text-xl  font-medium w-[30%]">Filter By: {" "}</label> 
      <select id="countries" className="bg-GreyLight text-sm rounded-lg block w-[70%] py-1 "> <option className='bg-GreyLight text-sm rounded-lg' selected>All</option>
          <option className="bg-GreyLight text-sm rounded-lg" value="US">Tournament</option>
          <option className="bg-GreyLight text-sm rounded-lg" value="CA">1 V 1</option>
        </select>
      </div> */}  
      <div className='w-full flex flex-col gap-2 bg-Background '>
        {transactionHistory.map(history => (
          <div key={history.id} className='w-full px-2'>
            <p className='text-sm sm:text-base md:text-lg lg:text-xl '>{history.date}</p>
            <div className='px-3'>
              {history.transaction.map(transaction => (
                <div key={transaction.id} className='flex justify-between items-center p-2 bg-GreyDark my-2'>
                  <div className='flex flex-col'>
                    <h3 className='text-sm sm:text-base md:text-lg lg:text-xl'>{transaction.paymentOption}</h3>
                    <p className='text-xs sm:text-sm md:text-base lg:text-lg  text-GreyLight'>{transaction.time}</p>
                  </div>
                  <div className='flex justify-between text-lg sm:text-xl md:text-2xl lg:text-3xl'>
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

export default TransactionHistory