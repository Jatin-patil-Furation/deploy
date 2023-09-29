"use client";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import Stepper from "./Stepper";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { auth } from "../../Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { Signuppost } from "../../../redux/AuthReducer/Action";
import Toast from "../notification/Toast";
import { useRouter } from "next/navigation";
import "./step.css"

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
const StepControl = ({
  currentStep,
  SetCurrentStep,
  steps,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
    password: "",
    confirmpassword: "",
  });
  const usersignupdata = useSelector(
    (store) => store.AuthReducer.userdata
  );
   const [registrationError, setRegistrationError] = useState(null);

  console.log("usersingupres", usersignupdata);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (
    e
  ) => {
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

  console.log("formdata", formData);

  const handlelogin = () => {
    const { password, confirmpassword } = formData;
    if (password.trim() === "" || confirmpassword.trim() === "") {
      toast.error("Please fill in both password fields.");
      return false;
    }
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if(password.length<6  ){
        toast.error("Password must be greater then 6 character");
        return false
    }

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {

         console.log("firebase",res);

        const senddatabackend = {
          name: formData.name,
          dateOfBirth: formData.dateOfBirth,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          country: formData.country,
          city: formData.city,
          postalCode: formData.postalCode,
          address: formData.address,
        };
        dispatch(Signuppost(senddatabackend))

          .then((res) => {
            console.log("res", res);
            // console.log("userbackendsendresponse", res.payload);
          
             if (res.type === "SIGNUPUSERSUCESS" && 
             res.payload.msg==="User created successfully"
             ) {
               router.push("/login");
               toast.success("Signup Sucesss");
             }
            
           })
          .catch((err) => {
           
            toast.error(err);
              toast.error(err);
              setFormData({
                name: "",
                email: "",
                phone: "",
                dateOfBirth: "",
                gender: "",
                address: "",
                country: "",
                city: "",
                postalCode: "",
                password: "",
                confirmpassword: "",
              });
             console.log(err);
          });
      })
      .catch((err) => {
         toast.error("Email already in use");
          setRegistrationError("Email already in use");
         setFormData({
           name: "",
           email: "",
           phone: "",
           dateOfBirth: "",
           gender: "",
           address: "",
           country: "",
           city: "",
           postalCode: "",
           password: "",
           confirmpassword: "",
         });
        toast.error(err)
        console.log(err);
      })
  };
 useEffect(() => {
 
   if (registrationError) {
     SetCurrentStep(1);
   }
 }, [registrationError]);
  const handleNextClick = () => {
    if (isFormValidform()) {
      SetCurrentStep((prev) => prev + 1);
    } else {
      toast.error("All field are required");
    }
  };

  const isFormValidform = () => {
    const { name, email, phone } = formData;
    return name.trim() !== "" && email.trim() !== "" && phone.trim() !== "";
  };
  const handleSecondNextClick = () => {
    const { dateOfBirth } = formData;
    const age = parseInt(dateOfBirth);

    if (age > 2004) {
      toast.error("Min age required: 18");
    } else if (isFormValiddate()) {
      SetCurrentStep((prev) => prev + 1);
    } else {
      toast.error("All field are required");
    }
  };

  const isFormValiddate = () => {
    const { dateOfBirth, gender, address, country, city, postalCode } =
      formData;
    const age = parseInt(dateOfBirth);

    return (
      dateOfBirth.trim() !== "" &&
      address.trim() !== "" &&
      postalCode !== null &&
      gender.trim() !== "" &&
      country.trim() !== "" &&
      city.trim() !== ""
    );
  };

  const isFormValid = () => {
    const { password, confirmpassword } = formData;
    return (
      password.trim() !== "" &&
      confirmpassword.trim() &&
      password === confirmpassword
    );
  };

  return (
    <>
      <div className=" px-2 border-red-800">
        <Stepper
          currentStep={currentStep}
          SetCurrentStep={SetCurrentStep}
          steps={steps}
        />

        {currentStep === 1 && (
          <div className="w-[100%] px-6 py-4 border-yellow-400">
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
                // placeholder="Full Name"
                placeholder={"Full Name" || formData.name}
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
                placeholder={"Email Address" || formData.email}
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

            <div className="px-2">
              <div
                onClick={handleNextClick}
                className={`py-2 px-2  mt-5
          
         ${
           isFormValidform()
             ? "bg-gradient-to-t from-[#AD0B40] to-[#FF1917]"
             : "bg-[#636363]"
         }
         flex items-center justify-center
          cursor-pointer
         border-yellow-600 rounded-md`}
              >
                <button
                  type="submit"
                  className="text-white py-1 px-2
                   font-semibold text-sm text-center "
                >
                  Next
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
        )}
        {currentStep === 2 && (
          <div className="w-[100%] px-6 py-2  border-yellow-400">
            <div className=" border-yellow-500 gap-2 flex justify-between">
              <div className="w-[50%] px-1 border-red-600">
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
              </div>

              <div className=" w-[50%] border-red-600">
                <label htmlFor="phone" className="text-white    px-2 text-sm">
                  Gender
                </label>
                <div
                  className={`flex justify-between 
           
          text-sm   py-2 md:py-4 px-1 border-yellow-700 items-center`}
                >
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-[100%] px-1 py-[.7rem] md:py-[15px] mr-2 text-white  bg-[#1E1E1E] border-red-800 p-2 rounded"
                  >
                    <option value="Select">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="other">other</option>
                  </select>
                </div>
              </div>
            </div>

            {/**  addreesss */}

            <label htmlFor="phone" className="text-white  px-2 text-sm">
              Address
            </label>
            <div className="flex justify-between py-2 md:py-4 px-2 border-red-700 items-center">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full md:py-4 text-white   text-sm bg-[#1E1E1E] border-red-600  p-2 rounded "
                placeholder=" Address"
              />
            </div>

            {/**** city ***/}

            <div className=" border-yellow-500 gap-2  flex justify-between">
              <div className="w-[50%] border-red-600">
                <label htmlFor="Country" className="text-white    px-2 text-sm">
                  Country
                </label>
                <div className="flex justify-between py-2  px-2 text-sm md:py-4  border-yellow-700 items-center">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-[100%] text-white  px-2 py-[.7rem] md:py-4 mr-2  bg-[#1E1E1E] border-red-800 p-2 rounded"
                  >
                    <option value="Select">Select</option>
                    <option value="India">India</option>
                    <option value="United states">United states</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              <div className=" w-[50%] border-red-600">
                <label htmlFor="phone" className="text-white    px-2 text-sm">
                  City
                </label>
                <div className="flex justify-between py-2 md:py-4  border-yellow-700 items-center">
                  <select
                    name="city"
                    onChange={handleInputChange}
                    className="w-[100%] px-2  text-sm
             text-white  py-[.7rem] md:py-4 mr-2  bg-[#1E1E1E] border-red-800 p-2 rounded"
                  >
                    <option value="Select">Select</option>
                    <option value="Agra">Agra</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Dehli">Dehli</option>
                    <option value="banglore">banglore</option>
                  </select>
                </div>
              </div>
            </div>

            <label htmlFor="Postal code" className="text-white  px-2 text-sm">
              Postal Code
            </label>
            <div className="flex justify-between py-2 md:py-4 px-2 border-red-700 items-center">
              <input
                type="number"
                name="postalCode"
                onChange={handleInputChange}
                value={formData.postalCode}
                className="w-full md:py-4 
           text-sm text-white  bg-[#1E1E1E] border-red-600  p-2 rounded "
                placeholder="Postal Code"
              />
            </div>

            <div className="px-2 pb-4">
              <div
                onClick={handleSecondNextClick}
                className={`py-2 px-2  mt-5 ${
                  isFormValiddate()
                    ? "bg-gradient-to-t from-[#AD0B40] to-[#FF1917]"
                    : "bg-[#636363]"
                }
        flex items-center justify-center 
           cursor-pointer
        border-yellow-600 rounded-md`}
              >
                <button
                  className={`text-white  py-1 px-2 md:font-semibold text-sm text-center `}
                >
                  One more step to go !
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="w-[100%] px-6 py-2  border-yellow-400">
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

            <label
              htmlFor="Confirm password"
              className="text-white px-2 text-sm"
            >
              Confirm Password
            </label>

            <div className="relative py-2 px-2 border-red-500">
              <input
                id="password"
                name="confirmpassword"
                value={formData.confirmpassword}
                type={passwordVisible ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none  password-input relative block
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
                onClick={handlelogin}
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
                  onClick={handlelogin}
                  className={`text-white py-1 px-2 md:font-semibold text-sm text-center `}
                >
                  Let get started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toast />
    </>
  );

        }
export default StepControl;
