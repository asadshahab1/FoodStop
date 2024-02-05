import React from 'react'
import "../css/ViewProducts.css";
import UpperRow from '../components/UpperRow'
import { useState, useEffect } from 'react';
import { GiHotMeal } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import axios from 'axios';


const ViewProducts = () => {
  const token = localStorage.getItem('sellerToken')
  const sid = localStorage.getItem('sellerID')

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };
const [products, setProducts] = useState([])
//   const products = [
//     {
//         ProductID: '201',
//         Title: 'Crispy Tikka fdsf dfd',
//         price: 'Rs. 999',
//         description: 'Any one Value Burger from Crispy Chicken OR Fiery Chicken with 1 Drink',
//         discount: '15%',
//         quantity: '41',
//     },
//     {
//         product: 'Product #02',
//         title: 'Spicy Wings Combo',
//         price: 'Rs. 799',
//         description: 'Spicy Chicken Wings with Fries and a Soft Drink',
//         discount: '10%',
//         quantity: '30',
//     },
//     {
//         product: 'Product #03',
//         title: 'Cheese Delight Pizza',
//         price: 'Rs. 599',
//         description: 'Delicious Cheese Pizza with a variety of toppings',
//         discount: '20%',
//         quantity: '25',
//     },
//     {
//         product: 'Product #04',
//         title: 'Vegetarian Pasta',
//         price: 'Rs. 899',
//         description: 'Creamy and Flavorful Vegetarian Pasta with Garlic Bread',
//         discount: '18%',
//         quantity: '35',
//     },
//     {
//         product: 'Product #05',
//         title: 'Chocolate Lovers Dessert',
//         price: 'Rs. 499',
//         description: 'Indulge in a rich Chocolate Dessert with Ice Cream',
//         discount: '12%',
//         quantity: '28',
//     },
//     {
//         product: 'Product #06',
//         title: 'Fresh Fruit Salad',
//         price: 'Rs. 349',
//         description: 'Healthy and Refreshing Fresh Fruit Salad Bowl',
//         discount: '15%',
//         quantity: '20',
//     },
//     {
//         product: 'Product #07',
//         title: 'Iced Caramel Macchiato',
//         price: 'Rs. 199',
//         description: 'Chilled Iced Caramel Macchiato for coffee lovers',
//         discount: '8%',
//         quantity: '15',
//     },
//     {
//         product: 'Product #08',
//         title: 'Mango Tango Smoothie',
//         price: 'Rs. 299',
//         description: 'Enjoy a Tropical Mango Tango Smoothie',
//         discount: '10%',
//         quantity: '18',
//     },
//     {
//         product: 'Product #09',
//         title: 'Grilled Chicken Salad',
//         price: 'Rs. 449',
//         description: 'Healthy Grilled Chicken Salad with Fresh Greens',
//         discount: '15%',
//         quantity: '22',
//     },
// ];


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
        <h6 style={{overflow: 'hidden'}}>Total Products : {products.length}</h6>

        <div className='order-heading d-flex py-2 gap-2 '>

          <p className="order-title-01">PRODUCT ID</p>
          <p className="order-title-02">TITLE</p>
          <p className="order-title-03">PRICE</p>
          <p className="order-title-04">DESCRIPTION</p>
          <p className="order-title-05 px-1">CATEGORY</p>

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


            <div className="row" key={myitem.ProductID}>

              <div className="order-detail d-flex">
                <GiHotMeal className='order-icon' size={25} />
                <p className="order-custom-01">{myitem.ProductID}</p>
                <p className="order-custom-02">{myitem.Title}</p>
                <p className="order-custom-03">Rs.{myitem.Price}</p>
                <p className="order-custom-04">{myitem.ProductDescription}</p>
                <p className="order-custom-05 px-1">{myitem.Category}</p>
              </div>


            </div>

            
          ))}


        </div>
      </div>

      </div>

    </div>
  )
}

export default ViewProducts
