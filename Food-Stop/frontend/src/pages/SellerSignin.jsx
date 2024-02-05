import React, { useEffect, useState } from 'react'
import '../css/SignIn.css'
import { MdAlternateEmail } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
// import BreadCrumb from "../components/Breadcrumb";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SellerSignin = () => {
  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registered = () =>
  toast.success("Successfully Logged In", {
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


  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/seller-login", {email, password})
    .then((res) => {
      // console.log(res);
      console.log("DATA SENT");
      console.log(res.data.data)
      const detail = res.data.data.BusinessName
      const detail2 = res.data.data.SellerID
      if (res.data.data === "No such email exists") {
         failed("Account doesn't exist");
        setEmail('')
        setPassword('')

      } 
      else if(res.data.data === 'Incorrect Password'){
        failed('Incorrect Password! Try Again')
        setPassword('')
      }
      else {
        let token = res.data.token
         
        localStorage.setItem('sellerToken', token);
        localStorage.setItem('sellerDetail', detail);
        localStorage.setItem('sellerID', detail2);
    // login(token)
        registered()
        setTimeout(() => {
          navigate('/seller');
        }, 2000);
      }
    })
    .catch((err) => {
      console.log('err', err)
      
    });
  }
  
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
      {/* <div style={{paddingTop:'65px'}}>
        <BreadCrumb title={"Sign In"} />
      </div> */}

      <div className="sign-container" style={{height: '450px'}}>
          <form className="signin-form" onSubmit={handleSubmit}>
            <h3 className='myh2'>Sign In to Seller Dashboard</h3>
            <div className="sign-input-container">
              <label className='inp-label' htmlFor="email"><MdAlternateEmail/>Email</label>
              <input
                className='sign-inp'
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmail}
                required
              />
            </div>
            <div className="sign-input-container">
              <label className='inp-label' htmlFor="password"><HiLockClosed/>Password</label>
              <input
              className='sign-inp'
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePassword}
                required
              />
            </div>
            <button className='sign-btn' type="submit">Sign In</button>
            <div className="bottom-text">
              <span>Don't have an account?</span>
              <Link to='/seller-signup'>Sign Up</Link>
            </div>
          </form>
      </div>

    </>
  )
}
export default SellerSignin