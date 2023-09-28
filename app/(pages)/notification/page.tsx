'use client';
// components/Toast.tsx







// pages/index.tsx
import React from 'react';
import { toast } from 'react-toastify';
import ToastContainer from './Toast';

const HomePage = () => {
  const showToast = () => {
    toast.success('Hello, Toast!', {
      position: 'top-center',
    });
  };

  return (
    <div>
      <h1 className='border-red text-white'>Hello, Next.js!</h1>
      <button className='text-white' onClick={showToast}>Show Toast</button>
      <ToastContainer />
    </div>
  );
};

export default HomePage;












// import React, { useEffect, useState } from "react";

// interface ToastProps {
//   message: string;
// }

// const Toast: React.FC<ToastProps> = ({ message }) => {
//   const [showToast, setShowToast] = useState(true);

//   useEffect(() => {
//     // Close the toast after a delay (e.g., 3000 milliseconds)
//     const timer = setTimeout(() => {
//       setShowToast(false);
//     }, 3000);

//     // Clear the timer when the component unmounts
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div
     
//       className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-4 rounded shadow-lg transition-opacity cursor-pointer ${
//         showToast ? "opacity-100" : "opacity-0"
//       }`}
//     >
//       <p className="font-semibold">Toast Notification</p>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Toast;

/**
 *  className={`w-[20%] flex justify-center fixed top-1 item-center left-3 right-0  bg-gray-800 text-white p-4 rounded shadow-lg transition-opacity ${
        showToast ? "opacity-100" : "opacity-0"
      }`}
 */