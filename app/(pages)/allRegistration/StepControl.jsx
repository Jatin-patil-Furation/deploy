"use client";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import Stepper from "./Stepper";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { auth } from "../../Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { Loginpost, Phoneloginpost, Signuppost } from "../../../redux/AuthReducer/Action";
import Toast from "../notification/Toast";
import { useRouter } from "next/navigation";
import "./step.css";
import Image from "next/image";

const countryCodes = [
  {
    code: "+91",
    country: "IN",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg",
  },
  {
    code: "+1",
    country: "Us",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg",
  },
  {
    code: "+44",
    country: "Uk",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg",
  },
  {
    code: "+49",
    country: "Ger",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DE.svg",
  },

  {
    code: "+93",
    country: "Af",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg",
  },
];
const StepControl = ({ currentStep, SetCurrentStep, steps }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: ""
  });
  
  
  useEffect(() => {
     const phonenum = JSON.parse(localStorage.getItem("userphone"))
      // console.log("user",phonenum)
      setFormData({
        name:"",
        email: "",
        phone:phonenum?.phone||"",
        dateOfBirth: ""
      });
  }, []);
    


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (e.target.tagName === "SELECT") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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

  const handlesubmit = () => {
    setLoading(true);
    const { name, email, phone, dateOfBirth, password } =
      formData;
    // Validate form data
    if (
      dateOfBirth.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      name.trim() === "" ||
      password.trim() === "" 
    ) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

   

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    const birthYear = parseInt(dateOfBirth.split("-")[0]);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (age < 18) {
      toast.error("Minimum age required: 18");
      setLoading(false);
      return;
    }

    console.log("checkingdata for firebase", formData.email, formData.password);
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        console.log("firebase", res);
        if (res?.user) {
          const senddatabackend = {
            name: formData.name,
            dateOfBirth: formData.dateOfBirth,
            email: formData.email,
            phone: formData.phone,
          };
 
            const phonecheck = {
               phone:formData.phone
            }
            dispatch(Phoneloginpost(phonecheck))
            .then((res)=>{
               if (res?.type === "PHONELOGINUSERSUCESS"){
                toast.error("This number is already exits try another")
                setLoading(false)
               }
               else{
                 dispatch(Signuppost(senddatabackend))
                   .then((res) => {
                     console.log("user backend send response", res);
                     if (
                       res?.type === "SIGNUPUSERSUCESS"
                     ) {
                       const payload = {
                         email: formData.email,
                       };
                       Loginpost(payload)(dispatch)
                         .then((res) => {
                           console.log("resapilogin", res);
                           if (res?.type === "LOGINUSERSUCESS") {
                             localStorage.setItem(
                               "Loggeduser",
                               JSON.stringify(res?.payload?.resData)
                             );
                             localStorage.setItem(
                               "token",
                               JSON.stringify(res?.payload?.token)
                             );
                             setLoading(false);
                             toast.success("Signup successful");
                             Loggeduser();
                           }
                         })
                         .catch((err) => {
                           console.log(err);
                           toast.error(err);
                           setLoading(false);
                         })
                         .finally(() => {
                           setLoading(false);
                         });
                     }
                   })
                   .catch((err) => {
                     console.log(err);
                     setLoading(false);
                     console.error("Error during signup API call:", err.status);
                   });
               }
            })
            .catch((err)=>{
              console.log("errphonecheck",err)
                setLoading(false);
            })

         
        } else {
          setLoading(false);
          toast.error("Firebase registration failed");
        }
      
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errorCode = error.code;
        console.log("errorcode", errorCode);
        console.log("errmessage", errorMessage);

        setFormData({
          name: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          password: "",
     
        });
        if (error.code === "auth/email-already-in-use") {
          toast.error("User already exists with this email.");
        } else {
          toast.error("An error occurred during signup.");
        }
        setLoading(false);
      });
  };

  const isFormValid = () => {
    const { name, phone, email, dateOfBirth, password } =
      formData;
    return (
      dateOfBirth.trim() !== "" &&
      email.trim() !== "" &&
      phone !== "" &&
      name.trim() !== null &&
      password.trim() !== "" 
    );
  };

  return (
    <>
      <div className=" px-2 pt-4 border-red-800">
        <div className="w-[100%] px-6 py-2  border-yellow-400">
          <label htmlFor="phone" className="text-white    px-2 text-sm">
            Name
          </label>
          <div className="flex  justify-between py-2 md:py-2 px-2 border-red-700 items-center">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full md:py-4 bg-[#1E1E1E] text-white  text-sm border-red-600  p-2 rounded "
              placeholder={"Enter Your Name" || formData.name}
            />
          </div>
          <label htmlFor="phone" className="text-white  px-2 text-sm">
            Email
          </label>
          <div className="flex justify-between py-2 md:py-2 px-2 border-red-700 items-center">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full md:py-4 bg-[#1E1E1E] text-white  text-sm border-red-600  p-2 rounded "
              placeholder={"Enter Email " || formData.email}
            />
          </div>
          <label htmlFor="phone" className="text-white  px-2 text-sm">
            Phone no
          </label>
          <div className="flex  px-2 justify-between py-1  border-red-700 items-center">
            <select
              className="w-[30%]    mr-2 text-sm py-2 md:py-4 text-white bg-[#1E1E1E] border-red-800 p-2 rounded"
              name="selectedCountryCode"
            >
              {countryCodes.map((countryCode, i) => (
                <option
                  className="flex justify-around "
                  key={i}
                  value={countryCode.code}
                >
                  {countryCode.country}

                  {countryCode.code}
                </option>
              ))}
            </select>

            <input
              type="phoneNumber"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-[70%] py-2 md:py-[14px] text-sm text-white  px-4 bg-[#1E1E1E] border-red-600 sm:w-2/3  rounded "
              placeholder={"Phone Number" || formData.phone}
            />
          </div>
          <label htmlFor="DOB" className="text-white    px-2 text-sm">
            DOB
          </label>
          <div className="flex  py-2 md:py-4 px-1 border-red-700 items-center">
            <input
              type="date"
              name="dateOfBirth"
              onChange={handleInputChange}
              value={formData?.dateOfBirth?.slice(0, 10)}
              // placeholder={formData?.dateOfBirth?.slice(0, 10)}
              className="w-full md:py-[.8rem] text-sm 
                text-uppercase bg-[#1E1E1E] text-white  border-red-600  p-2 rounded "
              placeholder="MM/DD/YYYY"
            />
          </div>

          <label htmlFor="phone" className="text-white  px-2 text-sm">
            Create Password
          </label>

          <div className="relative py-2 px-2 border-red-500">
            <input
              id="password"
              name="password"
              value={formData.password}
              type={passwordVisible ? "text" : "password"}
              autoComplete="current-password"
              required
              className="appearance-none password-input  relative block
           w-full px-6 py-2 md:py-4 bg-[#1E1E1E] 
              border-none
              text-white  p-2 rounded-lg
               z-10 sm:text-sm"
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

          <div className="px-2 pb-4">
            <div
              onClick={handlesubmit}
              className={`py-2 px-2  mt-5  
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
                // onClick={handlesubmit}
                className={`text-white py-1 px-2 md:font-semibold text-sm text-center `}
              >
                {loading ? (
                  <div className="w-[50%] flex items-center h-[15px] m-auto  ">
                    <Image
                      src={`https://s3.us-east-2.amazonaws.com/sikkaplay.com-assets/assets/users/loading.gif`}
                      alt="loader"
                      width={200}
                      height={100}
                    />
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </div>
          <div className="py-5 px-2  flex items-center text-center justify-center border-yellow-600 rounded-md">
            <div className="flex justify-between gap-2 border-red-600">
              <h2 className="text-[#636363] py-1 items-center text-sm sm:text-base text-center  font-normal">
                Alreay have an account ?{" "}
              </h2>
              <h2
                onClick={() => router.push("/login")}
                className="gradient-text hover:cursor-pointer py-1 sm:text-base underline "
              >
                Login{" "}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Toast />
    </>
  );
};
export default StepControl;
