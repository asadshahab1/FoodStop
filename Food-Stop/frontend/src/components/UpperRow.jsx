import React from 'react';
import '../css/UpperRow.css'
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrCart } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

const UpperRow = () => {

  const navigate = useNavigate()
  const hehe = ()=>{
    navigate('/seller')
  }
  return (

    <div className="top-row row ">

        <div className="title-bar">
            <h3>Seller Dashboard</h3>
        </div>

        <div className="top-icons">
            <IoMdNotificationsOutline size={30}/>
            <GrCart size={25}/>
            <CgProfile size={25} style={{cursor: 'pointer'}} onClick={hehe}/>
        </div>

    </div>
  )
}

export default UpperRow
