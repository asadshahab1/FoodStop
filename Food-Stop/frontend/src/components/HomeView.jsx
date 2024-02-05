import React, {useEffect, useState} from 'react';
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { GrCart } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { PiWechatLogoLight } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GrLinkNext } from "react-icons/gr";
import { TbDiscount2 } from "react-icons/tb";
import {Rate} from 'antd'
import axios from 'axios';
import { MdAdd } from "react-icons/md";

import '../css/Home.css'
import { useAuth } from '../pages/AuthContext';


const HomeView = () => {

   const [Hotproducts, setHotProducts] = useState([])
   const { token } = useAuth();


    useEffect(()=>{
        axios.get('http://localhost:3000/hot-products')
        .then((res)=>{
          console.log(res.data.result[0])
          setHotProducts(res.data.result[0])
        }).catch(e => console.log('err', e))
    }, [])

    const addtocart = async (productID) => {
        try {
          const response = await axios.post('http://localhost:3000/add-to-cart',
          {productID}, {
            headers: {
              'Authorization': `${token}` 
           
            },
          });
      
          console.log('Product added successfully:', response.data.message);
        } catch (error) {
          
          console.error('Error adding product:', error.response ? error.response.data : error.message);
          alert('Please Login first')
        }
      };
      

  return (
    <div>
        <>
            <div className="popular-dishes ">
            <h3>Popular Dishes</h3>

            <div className="row gap-25 margin-left-5">
                {Hotproducts.map((item)=>(
                    <div className="popular-dish-card" key={item.ProductID}>
                <div className="discount-tag">
                    {item.Category}
                </div>
                <img src={`/images/${item.Images}`} alt="Product" className="product-image" />

                <div className="row gap-2">

                    <div className="rating">
                    <Rate allowHalf defaultValue={4.5} disabled/>
                    </div>

                    <div className="product-info">
                    <h4 className="title">{item.Title}</h4>
                    <p className="price">Rs.{item.Price}</p>
                    </div>

                    <button className="product-add" style={{height:'40px'}} onClick={()=> addtocart(item.ProductID)}>
                  <MdAdd size={25} />
                </button>
                </div>

                </div>
                ))}
                

        

            </div>

            </div>

            <div className="ad-banner row">

            <div className="ad-text-portion column">
                <div className="title">
                <h3>We care about the quality of <br/> our <b>products</b></h3>
                </div>

                <div className="description">
                <p>Drinking coffee is one of the most global things you do each days here I can spend a long and comfortable time with this workspace.</p>

                </div>

                <div className="services">

                <div className="d-flex row">

                    <div className="sub-service row">
                    <div className="services-icon">
                        <PiWechatLogoLight size={43} color='white'/>
                    </div>
                    <div className="services-lines">
                        <h5>Active Community</h5>
                        <p>You Can reach out whenever you want!</p>
                    </div>
                    </div>

                    <div className="sub-service row">
                    <div className="services-icon bg-white">
                        <TbTruckDelivery size={43} color='#EA627B'/>
                    </div>
                    <div className="services-lines">
                        <h5>Fast Delivery</h5>
                        <p>Get Your Food within 35 min at your doorstep</p>
                    </div>
                    </div>

                    <div className="sub-service row">
                    <div className="services-icon bg-white">
                        <RiSecurePaymentLine size={43} color='#EA627B'/>
                    </div>
                    <div className="services-lines">
                        <h5>Secure Payment</h5>
                        <p>Offering secure payments to our valueable customers</p>
                    </div>
                    </div>

                    <div className="sub-service row">
                    <div className="services-icon bg-white ">
                        <TbDiscount2 size={43} color='#EA627B'/>
                    </div>
                    <div className="services-lines">
                        <h5>Discounts</h5>
                        <p>Weekly disocunts on top rated food</p>
                    </div>
                    </div>

                </div>
                </div>

                <div className="explore-more">
                <Link className='explore-btn'>Expore our Foods <GrLinkNext /></Link>
                </div>

            </div>

            <div className="ad-image-portion">
                <img src="../src/assets/Ad-img2.png" alt="" />
            </div>


            </div>

            <div className="weekly-special">
            <div className="title">
                <h3>Weekly Special</h3>
            </div>

            <div className="weekly-inside-cards row">

                <div className="weekly-cards">
                <div className="weekly">
                    <div className="discount-line">20%</div>
                    <img src="../src/assets/banners/tikka1.jpg" alt="tikka-img" />
                </div>

                <div className="inside-weekly column">
                    <div className="">
                    <h4>Spicy Tikka</h4>
                    </div>
                    <div className="">
                    <p><s>$20</s></p>
                    <h4>$15</h4>
                    </div>
                    <div className="">Add to Cart</div>
                </div>
                </div>

                <div className="weekly-cards">
                <div className="weekly">
                    <div className="discount-line">20%</div>
                    <img src="../src/assets/banners/drink.jpg" alt="tikka-img" />
                </div>

                <div className="inside-weekly column">
                    <div className="">
                    <h4>Strawberry Juice</h4>
                    </div>
                    <div className="">
                    <h4>$15</h4>
                    </div>
                    <div className="">Add to Cart</div>
                </div>
                </div>

                <div className="weekly-cards">

                <div className="weekly">
                    <div className="discount-line">20%</div>
                    <img src="../src/assets/banners/icecream1.jpg" alt="tikka-img" />
                </div>

                <div className="inside-weekly column">
                    <div className="">
                    <h4>Spicy Tikka</h4>
                    </div>
                    <div className="">
                    <h4>$15</h4>
                    </div>
                    <div className="">Add to Cart</div>
                </div>
                </div>

            </div>

            </div>

            <div className="coffee-banner">
            <div className="banner-content">
                <h4>Check out Our <br/> Best Coffee </h4>
                <Link to="/your-path" className="explore-btn">Explore our Products<GrLinkNext /></Link>
            </div>
            <div className="banner-image">
                <img src="../src/assets/banners/coffee-banner3.jpg" alt="coffee banner" />
            </div>

            </div>

            <div className="product-card">
            </div>
        </>
    </div>
  )
}

export default HomeView
