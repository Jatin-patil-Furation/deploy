import Image from 'next/image';
import React from 'react'

const page = () => {

    return (
      <div
        className=" bg-black
       bg-[url('/assets/users/userbackground.svg')]
        border-green-700  py-[20%] lg:py-[10%]"
      >
        <div
          className="w-[70%]  py-[12%] lg:py-1
         sm:w-[50%] 
         md:w-[60%] lg:w-[30%] 
         m-auto mb-10  border-green-600"
        >
          <Image
           
            src={
              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/users/sikkuserlogo.svg"
            }
            width={200}
            height={200}
            alt="sikkaace"
            className="w-[100%] sm:w-[70%] m-auto"
          />
        </div>

        <div
          className="w-[100%] relative bottom-0 py-[14%]
         sm:pt-[14%] md:pt-[16%]  
          lg:py-1 lg:pt-10
         sm:py-[10] md:py-[8%]  px-4 
         sm:w-[90%] m-auto    
         flex items-center justify-center 
          border-yellow-500"
        >
          <Image
           
            src={
              "https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/users/Bottomborder.svg"
            }
            width={800}
            height={100}
            alt="Acelocked"
            className="text-white color-white pt-40 lg:py-1"
          />
        </div>
      </div>
    );
}

export default page


