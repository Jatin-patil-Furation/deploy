"use client";

import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
}

const Error: React.FC<ToastProps> = ({ message }) => {
  const [showToast, setShowToast] = useState(true);
  console.log("msg",message)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-800 text-white p-4 rounded shadow-lg transition-opacity cursor-pointer ${
        showToast ? "opacity-100" : "opacity-0"
      }`}
    >
      <p className="font-semibold">Toast Notification</p>
      <p>{message}</p>
    </div>
  );
};

export default Error;

/**
 *  className={`w-[20%] flex justify-center fixed top-1 item-center left-3 right-0  bg-gray-800 text-white p-4 rounded shadow-lg transition-opacity ${
        showToast ? "opacity-100" : "opacity-0"
      }`}
 */
