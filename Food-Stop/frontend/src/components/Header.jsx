import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'
import { LuLayoutDashboard } from "react-icons/lu";
import { FaHotjar } from "react-icons/fa";
import { TbDiscount2 } from "react-icons/tb";
import { LuWallet } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { AiOutlineTeam } from "react-icons/ai";
import { MdLogin } from "react-icons/md";
import { MdToc } from "react-icons/md";
import { GrRestaurant } from "react-icons/gr";
import { useAuth } from '../pages/AuthContext.jsx';
import '../css/Layout.css'
import Home from '../pages/Home';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Header = () => {
  const { token, logout } = useAuth();



  const handleLogout = () => {
    logout();
    alert('Successfully Logged Out')
  };
  return (

    <>
 
      <div className="sidebar-container">

        <div className="sidebar1" >

          <div className="profile">
            <img className='img-div1' src="../src/assets/logo2.png" alt="logo here" />
          </div>

          <div className="groups">

            <div className='items'>

              <div className='sub-link'>
                <LuLayoutDashboard size={25} />
                <Link className='link-text' to={'/'}>
                  <div> Home </div>
                </Link>
              </div>

              <div className='sub-link'>
                <LuShoppingCart size={25} />
                <Link className='link-text' to={'/viewcart'}>
                  <div> View Cart </div>
                </Link>
              </div>

              {/* <div className='sub-link'>
              <TbDiscount2 size={25}/>
                <Link className='link-text'>
                <div> Discounts </div>
                </Link>
              </div> */}

              {/* <div className='sub-link'>
              <LuWallet size={25}/>
                <Link className='link-text'>
                <div> Wallet </div>
                </Link>
              </div> */}

              <div className='sub-link'>
                <CgProfile size={25} />
                <Link className='link-text' to={'/user-profile'}>
                  <div> Profile </div>
                </Link>
              </div>

              <div className='sub-link'>
                <AiOutlineTeam size={25} />
                <Link className='link-text' to={'/contact'}>
                  <div> Contact </div>
                </Link>
              </div>

              <div className='sub-link'>
                <GrRestaurant size={25} />
                <Link className='link-text' to={'/seller-signin'}>
                  <div> Sell now </div>
                </Link>
              </div>

              <div className='sub-link'>
                {token ? (
                  <>
                    <MdLogin size={25} />
                    <div onClick={handleLogout} className='link-text1'>
                      Logout
                    </div>
                  </>
                ) : (
                  <>
                    <MdLogin size={25} />
                    <Link className='link-text' to={'signin'}>
                      <div>Login</div>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Header














