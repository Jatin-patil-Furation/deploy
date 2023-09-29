/* eslint-disable react/no-unescaped-entities */
"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import orline from "../../../public/assets/users/orline.svg";
import Image from "next/image";
import googlelogo from "../../../public/assets/users/gogle.svg";
import Applelogo from "../../../public/assets/users/Apple.svg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { auth } from "../../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from "../notification/Toast";


import { useDispatch, useSelector } from "react-redux";
import { Loginpost } from "@/redux/AuthReducer/Action";


const EmailLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigateTosignupPage = () => {
    router.push("/createuser");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isFormValid = () => {
    const { email, password } = formData;
    return email.trim() !== "" && password.trim() !== "";
  };

 

  const Loggeduser = () => {
    const datauser = localStorage.getItem("Loggeduser");
    const logedinfo = datauser ? JSON.parse(datauser) : null;
    if (!logedinfo) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        console.log("usercredentail", userCredential);

        Loginpost(formData)(dispatch)
          .then((res) => {
            console.log("resapi", res);
            if (
              res?.type === "LOGINUSERSUCESS" ){
              
              localStorage.setItem(
                "Loggeduser",
                JSON.stringify(res?.payload?.resData)
              );
              localStorage.setItem(
                "token",
                JSON.stringify(res?.payload?.token)
              );
              toast.success("Login Sucesss");
              Loggeduser();
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error(err);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        toast.error(error.message);
      });
    console.log(formData);
  };

   const handleGoogleLogin = async () => {
     if (!isChecked) {
       toast.success("min age 18 Check if you are 18");
     } else {
       try {
         const user = await googleSignIn();
         console.log(user);

         const payload = {
           name: user?.user?.displayName,
           email: user?.user?.email,
           avatar: user?.user?.photoURL,
         };
         //  console.log("sendbackd",payload)
         const loginuser = {
           email: user?.user?.email,
         };
         console.log("loginuser", loginuser);
         Signuppost(payload)(dispatch)
           .then((res) => {
             console.log("userbackendsendresponse", res);

             Loginpost(loginuser)(dispatch)
               .then((res) => {
                 console.log("res", res);
                 if (
                   res?.type === "LOGINUSERSUCESS" &&
                   res?.payload.msg ===
                     "login successful, please take the token and keep it safe"
                 ) {
                   localStorage.setItem(
                     "Loggeduser",
                     JSON.stringify(res?.payload?.resData)
                   );
                   localStorage.setItem(
                     "token",
                     JSON.stringify(res?.payload?.token)
                   );
                   toast.success("Signup Sucesssful");
                   router.push("/dashboard");
                 } else {
                   toast.error("something went wrong");
                 }
               })
               .catch((err) => {
                 console.log(err);
                 toast.error(err);
               });
           })
           .catch((err) => {
             console.log(err);
             toast.error(err);
           });
       } catch (error) {
         console.log(error);
         toast.error(error);
       }
     }
   };

  return (
    <div className="w-[100%] px-2">
      <form onSubmit={handleSubmit}>
        <label htmlFor="phone" className="text-white m-1   text-sm">
          Email address
        </label>
        <div className="flex justify-between py-1  border-red-700 items-center">
          <input
            type="email"
            name="email"
            className="w-full text-white px-4 bg-[#1E1E1E]
           border-red-600  p-2 rounded "
            placeholder=" Email Address"
            onChange={handleInputChange}
          />
        </div>
        <label htmlFor="password" className="text-white m-1   text-sm">
          Password
        </label>

        <div className="relative py-1  border-red-500">
          <input
            id="password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            autoComplete="current-password"
            required
            className="appearance-none  relative block
           w-full px-4 py-2 bg-[#1E1E1E] 
              border-none
              text-white  p-2 rounded
               z-10 "
            placeholder="Password"
            onChange={handleInputChange}
          />
          <div
            className="absolute  px-4 border-green-500 
          inset-y-0 right-0 
         flex items-center z-10 text-sm leading-5"
          >
            <button
              type="button"
              className="text-white"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <AiFillEyeInvisible className="h-5 w-5" />
              ) : (
                <AiFillEye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`py-2 px-2 mt-5 
         ${
           isFormValid()
             ? "bg-gradient-to-t from-[#AD0B40] to-[#FF1917]"
             : "bg-[#636363]"
         }
       flex items-center justify-center
        cursor-pointer
       border-yellow-600 rounded-md`}
        >
          <button
            type="submit"
            className={`text-white hover:cursor-pointer py-1 px-2 font-semibold text-sm text-center `}
          >
            Login
          </button>
        </div>
      </form>
      <div className="px-2 py-4 flex items-center justify-center border-yellow-600 rounded-md">
        <Image src={orline} alt="orline" />
      </div>


      <div className="py-2">
        <div className=" py-2  bg-[#1E1E1E] flex items-center justify-center border-yellow-600 rounded-md">
          <div className="py-1 px-2 flex justify-between gap-2 border-red-600">
            <Image src={Applelogo} alt="Applelogo" />
            <h2 className="text-white text-center m-auto text-sm">
              {" "}
              Continue with Apple{" "}
            </h2>
          </div>
        </div>
      </div>

      <div className="py-5 px-2 flex items-center justify-center border-yellow-600 rounded-md">
        <div className="flex justify-between gap-2 border-red-600">
          <h2 className="text-[#636363] text-sm sm:text-base font-normal">
            Don't have an account?{" "}
          </h2>
          <h2
            onClick={navigateTosignupPage}
            className="text-[#CA2446] hover:cursor-pointer text-sm font-normal sm:text-base underline block"
          >
            {" "}
            SignUp{" "}
          </h2>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default EmailLogin;
