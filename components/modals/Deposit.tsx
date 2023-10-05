import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface DepositProps {
  setDeposit: React.Dispatch<React.SetStateAction<boolean>>;
}

const Deposit: React.FC<DepositProps> = ({ setDeposit }) => {
  const player = {
    id: 8732157843,
  };

  const userIdRef = useRef<HTMLParagraphElement | null>(null);
  const dollarAmountRef = useRef<HTMLParagraphElement | null>(null);

  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    if (userIdRef.current && dollarAmountRef.current) {
      const userIdText = userIdRef.current.textContent;
      const dollarAmountText = dollarAmountRef.current.textContent;

      // Create a temporary textarea element to copy the text
      const tempTextarea = document.createElement("textarea");
      tempTextarea.value = `${userIdText}\n${dollarAmountText}`;

      // Append the textarea element to the DOM (off-screen)
      document.body.appendChild(tempTextarea);

      // Select the text within the textarea element
      tempTextarea.select();

      // Execute the copy command
      document.execCommand("copy");

      // Remove the temporary textarea element
      document.body.removeChild(tempTextarea);

      // Set copySuccess to true to show a success message
      setCopySuccess(true);

      // Reset copySuccess after a brief delay (optional)
      setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    }
  };

  return (
       <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-[#111111] opacity-50"></div>
 
    <div>
      <div
        className={`w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-Background rounded-b-md z-[100]`}
      >
        <div>
          <button
            className="relative custom-gradient py-3 px-4 w-full rounded-t-sm rounded-b-none "
            style={{
              borderBottomRightRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Add to Balance
            </p>
            <Image
              src={"/assets/other/x.svg"}
              onClick={() => setDeposit(false)}
              alt="x"
              width={50}
              height={50}
              className="w-[4%] md:w-[3%] absolute right-3 md:right-6 top-1/2 transform -translate-y-1/2"
            />
          </button>
          <div className="banned-player-list bg-Background py-3 sm:py-4 md:py-5 lg:py-6">
            <div className="flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-6">
              <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg w-[90%] sm:w-[80%] md:w-[75%] lg:w-[72%] mx-auto">
                You will be redirected to our Telegram chat to request to add to
                / withdraw from game wallet balance. Please copy the text below
                and paste it in the chat box:
              </p>
              <div className="text-sm bg-GreyDark px-6 py-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5 flex flex-col rounded-sm w-[90%] sm:w-[80%] md:w-[75%] lg:w-[72%] mx-auto">
                <p ref={userIdRef}>User ID: {player.id}</p>
                <p ref={dollarAmountRef}>
                  Amount to be withdrawn to wallet (in USD): &lt;100$&gt;
                </p>
                <button
                  className="text-Secondary border rounded-sm border-Secondary basis-[40%] text-sm sm:text-sm md:text-base lg:text-xl mx-auto px-2 py-1"
                  onClick={handleCopy}
                >
                  Copy
                </button>
                {copySuccess && (
                  <p className="text-green-500">Copied to clipboard!</p>
                )}
              </div>
              <button className="custom-gradient px-2 py-3 text-sm sm:text-base md:text-lg lg:text-xl rounded-sm w-[90%] sm:w-[80%] md:w-[75%] lg:w-[72%] mx-auto">
                <Link href="https://t.me/sikkaplay">Redirect to Telegram</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Deposit;
