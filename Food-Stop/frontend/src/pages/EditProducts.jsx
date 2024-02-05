import React from 'react'
import "../css/ViewProducts.css";
import UpperRow from '../components/UpperRow'
import { useState, useEffect } from 'react';
import { GiHotMeal } from "react-icons/gi";
import { Link } from 'react-router-dom';
import axios from 'axios';


const EditProducts = () => {
  const token = localStorage.getItem('sellerToken')
  const sid = localStorage.getItem('sellerID')
  const [products, setProducts] = useState([])

  useEffect(()=>{
    window.scrollTo(0,0)
  },[]);

  useEffect(()=>{
    axios.get('http://localhost:3000/view-products',{
      headers : {
        'Authorization': `${token}`,
        'seller_id' : `${sid}`
      }
    })
    .then((res)=>{
      console.log('aya mal')
      setProducts(res.data.result[0])
    })
    .catch(e => console.log('nh aya', e))
  },[])
  

  return (

    <div className='sellerdashboard-main'>
      <UpperRow/>

      <div className="order-main">

      <div className="v-new-orders">
        <h5>All Products</h5>

        <div className='order-heading d-flex py-2 gap-2 '>

        <p className="order-title-01">PRODUCT ID</p>
          <p className="order-title-02">TITLE</p>
          <p className="order-title-03">PRICE</p>
          <p className="order-title-04">DESCRIPTION</p>
          <p className="order-title-05 px-1">CATEGORY</p>
          <p className="order-title-06 px-1">EDIT</p>

        </div>

        <div className="line">
          <div className="flight-info-stop__stopline-wrapper flex v-center">
            <svg className="flight-info-stop__line" xmlns="http://www.w3.org/2000/svg">

              <line
                className="flight-info-stop__path"
                x1="15"
                y1="70%"
                x2="90%"
                y2="70%"
              />

            </svg>
          </div>
        </div>


        <div>

          {products.map((myitem, index)=>(


            <div className="row" key={myitem.ProductID} >

              <div className="order-detail d-flex">
                <GiHotMeal className='order-icon' size={25} />
                <p className="order-custom-01">{myitem.ProductID}</p>
                <p className="order-custom-02">{myitem.Title}</p>
                <p className="order-custom-03">Rs.{myitem.Price}</p>
                <p className="order-custom-04">{myitem.ProductDescription}</p>
                <p className="order-custom-05 px-1">{myitem.Category}</p>
                <div className='search-button'>
    <Link style={{textDecoration:'none'}} to={`/seller/editfoodtwo/${myitem.ProductID}/${myitem.Price}`} ><p>Edit </p></Link>
                </div>

              </div>


            </div>

            
          ))}


        </div>
      </div>

      </div>
      
      <br />
      <br />

    </div>
    

  )
}

export default EditProducts
