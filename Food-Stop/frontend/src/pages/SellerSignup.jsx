import React, { useState } from "react";
import '../css/SignIn.css'
import { HiLockClosed } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMan } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";

import { BsFillTelephoneFill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { FaPassport } from "react-icons/fa";
import { GiAges } from "react-icons/gi";
import { FaAddressCard } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import BreadCrumb from "../components/Breadcrumb";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerSignup = () => {

  const [BusinessName, setBusinessName] = useState("");
  const [StoreName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [NTN, setNTN] = useState("");
  const [password, setPassword] = useState("");;


  const navigate = useNavigate();
  const navigateToSignIn = () => navigate('/seller-signin')


  const registered = () =>
    toast.success("Successfully Registered", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const failed = (msg) =>
    toast.error(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  

  const handleBusinessName = (event) => {
    setBusinessName(event.target.value);
  };
  const handleStoreName = (event) => {
    setStoreName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlephone = (event) => {
    setphone(event.target.value);
  };
  const handleNTN = (event) => {
    setNTN(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/register-seller", {
        BusinessName,
        StoreName,
        email,
        password,
        phone,
        NTN
      })
      .then((res) => {
        console.log("DATA SENT", res.data);

        if (res.data === "Successfully Registered") {
          registered();
          setTimeout(() => {
            navigateToSignIn();
          }, 1500);
        }
        else if(res.data === 'Email already registered'){
          failed('Registration Failed! User already exists')
        }
         else {
          failed('Registration Failed! Try Again');
        }
      })
      .catch((err) => console.log(err));

    setBusinessName("");
    setStoreName("");
    setEmail("");
    setphone("");
    setPassword("");
    setNTN("");
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* <div style={{ paddingTop: "65px" }}>
        <BreadCrumb title={"Sign Up"} />
      </div> */}

      <div className="sign-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h3 className="myh2">Register as Seller</h3>

          <div className="sign-input-container">
            <label className="inp-label" htmlFor="email">
              <MdAlternateEmail />
              Email
            </label>
            <input
              className="sign-inp"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>
          <div className="sign-input-container">
            <label className="inp-label" htmlFor="password">
              <HiLockClosed />
              Password
            </label>
            <input
              className="sign-inp"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>

          <div className="mycontainer">
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="BusinessName">
                <AiOutlineUser />
                Business Name
              </label>
              <input
                className="sign-inp"
                type="text"
                id="BusinessName"
                placeholder="Enter your name"
                value={BusinessName}
                onChange={handleBusinessName}
                required
              />
            </div>
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="StoreName">
                <AiOutlineUser />
                Store Name
              </label>
              <input
                className="sign-inp"
                type="text"
                id="StoreName"
                placeholder="Enter your store name"
                value={StoreName}
                onChange={handleStoreName}
                required
              />
            </div>
          </div>

          <div className="mycontainer">
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="mobile1">
                <BsFillTelephoneFill />
                Mobile No
              </label>
              <input
                className="sign-inp"
                type="tel"
                id="mobile1"
                pattern="[0-9]+"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={handlephone}
                required
              />
            </div>
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="mobile2">
                <FaRegAddressCard />
                NTN
              </label>
              <input
                className="sign-inp"
                type="number"
                pattern="[0-9]+"
                id="mobile2"
                placeholder="Enter your NTN number"
                value={NTN}
                onChange={handleNTN}
              />
            </div>
          </div>
          <button className="sign-btn" type="submit">
            Register
          </button>

          <div className="bottom-text">
            <span>Already have an account?</span>
            <Link to="/seller-signin">Sign In</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SellerSignup