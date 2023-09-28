import React from 'react'
import {  GoogleAuthProvider,  signInWithPopup, RecaptchaVerifier,signInWithPhoneNumber,Auth,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";

 export const googleSignIn = () => {
   const googleAuthProvider = new GoogleAuthProvider();
   return signInWithPopup(auth, googleAuthProvider);
 };

 
  export const  setUpCaptcha =(number: string) => {
    console.log(number, "SetupCapta")
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" },
    );
    console.log(recaptchaVerifier, "console.log(recaptchaVerifier);");
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

export const verifyOTP = async (confirmationResult: any, otp: string) => {
  try {
    const userCredential = await confirmationResult.confirm(otp);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};


const Google = () => {
  return (
    <div className='border-2'>
        

    </div>
  )
}

export default Google