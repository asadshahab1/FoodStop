import React, { useDeferredValue } from 'react'
import "../css/Seller.css"
import { FaUserAlt, FaUserCircle } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { MdFlight, MdAddBox, MdFlightTakeoff } from 'react-icons/md'
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbCategory } from 'react-icons/tb'
import { BiDollar } from 'react-icons/bi'
import { AiFillEdit } from 'react-icons/ai'
import { BsViewList } from 'react-icons/bs'
import { MdDeleteOutline } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaOpencart } from "react-icons/fa";
import adminIcon from '../assets/man-with-laptop-light.png'
import { useEffect, useState } from 'react';
import UpperRow from '../components/UpperRow'
import RevenueGraph from '../components/RevenueGraph'
import axios from 'axios';

// const timeFormat = (time) => {
//   const newTime = new Date(time);
//   const options = { hour: 'numeric', minute: 'numeric', hour12: true };
//   return newTime.toLocaleTimeString('en-US', options);
// };

// const dateFormat = (date)=>{
//   const newDate = new Date(date)
//   const options = { month: 'long', day: 'numeric', year: 'numeric' };
//   return newDate.toLocaleDateString('en-US', options)
// }


const Seller = () => {
  const token = localStorage.getItem('sellerToken')
  const s = localStorage.getItem('sellerDetail')
  const sid = localStorage.getItem('sellerID')


  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [revenue, setRevenue] = useState('')
  const [totalP, setTotalP] = useState('')
  const [order, setOrder] = useState('')
  
  const [selectedStatus, setSelectedStatus] = useState('queued');

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // const [isDropdownVisible, setDropdownVisible] = useState(false)
  // const toggleDropdown = () =>{
  //   setDropdownVisible(!isDropdownVisible)
  // }


const [orderHistory, setOrderHistory] = useState([])
  const orders = [
    {
      order: 'Order #01',
      status: 'placed',
      date: '2023, 1 Jan',
      address: 'New city road 2535, Downtown New York, America',
      total: '$45',
      payment: 'Cash',
    },
    {
      order: 'Order #02',
      status: 'processing',
      date: '2023, 5 Feb',
      address: 'Metropolitan Avenue 123, Los Angeles, California, America',
      total: '$75',
      payment: 'Credit Card',
    },
    {
      order: 'Order #03',
      status: 'delivered',
      date: '2023, 15 Mar',
      address: 'Greenwood Street 987, Chicago, Illinois, America',
      total: '$120',
      payment: 'Online Transfer',
    },
    {
      order: 'Order #04',
      status: 'cancelled',
      date: '2023, 20 Apr',
      address: 'Oceanfront View 456, Miami Beach, Florida, America',
      total: '$60',
      payment: 'PayPal',
    },
    {
      order: 'Order #05',
      status: 'shipped',
      date: '2023, 10 May',
      address: 'Mountain Ridge Lane 789, San Francisco, California, America',
      total: '$90',
      payment: 'Debit Card',
    },
    {
      order: 'Order #06',
      status: 'placed',
      date: '2023, 3 Jun',
      address: 'Sunset Boulevard 654, Las Vegas, Nevada, America',
      total: '$55',
      payment: 'Cash',
    },
    {
      order: 'Order #07',
      status: 'processing',
      date: '2023, 12 Jul',
      address: 'Cityscape Drive 321, Seattle, Washington, America',
      total: '$100',
      payment: 'Credit Card',
    },
    {
      order: 'Order #08',
      status: 'delivered',
      date: '2023, 18 Aug',
      address: 'Highland Vista Street 789, Denver, Colorado, America',
      total: '$80',
      payment: 'Online Transfer',
    },
  ];


  useEffect(() => {
    axios.get('http://localhost:3000/get-product-count', {
      headers: {
        'Authorization': `${token}`,
        'seller_id' : `${sid}`
      }
    })
      .then((res) => {
        // console.log('pc', res.data.result[0][0].product_count);
        setTotalP(res.data.result[0][0].product_count)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/get-revenue', {
      headers: {
        'Authorization': `${token}`,
        'seller_id' : `${sid}`
      }
    })
      .then((res) => {
        // console.log('rev', res.data.result[0][0].Revenue);
        setRevenue(res.data.result[0][0].Revenue)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/get-order-count', {
      headers: {
        'Authorization': `${token}`,
        'seller_id' : `${sid}`
      }
    })
      .then((res) => {
        // console.log('rev', res.data.result[0][0].order_count);
        setOrder(res.data.result[0][0].order_count)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/seller-orders', {
      headers: {
        'Authorization': `${token}`,
      }
    })
      .then((res) => {
        // console.log('rev', res.data.result[0][0].order_count);
        // console.log('sare', res.data.result[0])
        setOrderHistory(res.data.result[0])
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, [])


const handleclick = (id) => {
  console.log('clicking', id)
}

  const navigate = useNavigate();
  // const navigateToAddFlight = () => navigate('/addflight', {state: adminIDdashboard})

  const handleLogout = () => {
    localStorage.removeItem('sellerToken')
    localStorage.removeItem('sellerDetail')
    localStorage.removeItem('sellerID')
    navigate('/')
  }
  const dateFormat = (date)=>{
    const newDate = new Date(date)
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return newDate.toLocaleDateString('en-US', options)
  }
  

  return (
    <>
      <div className='sellerdashboard-main'>

        <UpperRow />

        <div className="seller-welcome d-flex">
          <div className="side-text">
            <h3>Welcome to {s} Dashboard🎉</h3>
            <p>Perform all user related operations and manage them.</p>
            {/* <div className='btn-div'> */}
              <button className='btn' style={{fontWeight:'bold'}} onClick={handleLogout}>Log out</button>
            {/* </div> */}
          </div>

          <div className="side-icon">
            <img src={adminIcon} alt="Admin Icon" />
          </div>

        </div>


        <div className="d-flex gap-4 totals">

          <div className="card-body-01 ">
            <div className='card-body-inner d-flex '>
              <div>
                <p>Orders Completed</p>
                <h5>{order}</h5>
              </div>
              <div><FiUsers className='totals-icon' /></div>
            </div>
            <div className="progress  radius-10 mt-4" style={{ height: '4.5px' }}>
              <div className="progress-bar " role="progressbar" style={{ width: '26%' }}></div>
            </div>
          </div>

          <div className="card-body-02">
            <div className='card-body-inner d-flex'>
              <div>
                <p>Total Products</p>
                <h5>{totalP}</h5>
              </div>
              <div><MdFlight className='totals-icon' /></div>
            </div>
            <div className="progress radius-10 mt-4" style={{ height: '4.5px' }}>
              <div className="progress-bar " role="progressbar" style={{ width: '36%' }}></div>
            </div>

          </div>

          <div className="card-body-03">
            <div className='card-body-inner d-flex'>
              <div >
                <p>Total Revenue</p>
                <h5>{revenue}</h5>
              </div>
              <div><TbCategory className='totals-icon' /></div>
            </div>
            <div className="progress radius-10 mt-4" style={{ height: '4.5px' }}>
              <div className="progress-bar" role="progressbar" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div className="card-body-04">
            <div className='card-body-inner d-flex'>
              <div>
                <p>Current Order</p>
              </div>
              <div><BiDollar className='totals-icon' /></div>
            </div>
            <div className="progress radius-10 mt-4" style={{ height: '4.5px' }}>
              <div className="progress-bar" role="progressbar" style={{ width: '40%' }}></div>
            </div>

          </div>

        </div>

        <div className="chart-graph column d-flex">

          <div className="revenue-chart">
            <h3>Daily Revenue Analysis</h3>
            <RevenueGraph />
          </div>

          <div className='seller-function d-flex gap-4'>
            <h3>Record Control Panel</h3>

            <div className="view-ft  ">
              <div className="icon-div">
                <BsViewList className='function-icon' />
              </div>

              <Link to="/seller/view-products"><h5 style={{ color: 'black ' }}>View Products</h5></Link>

            </div>

            <div className="add-ft ">
              <MdAddBox className='function-icon' />
              <Link to="/seller/add-products"><h5 style={{ color: 'black ' }}>Add Products</h5></Link>
            </div>

            <div className="edit-ft ">
              <AiFillEdit className='function-icon' />
              <Link to="/seller/edit-products"><h5 style={{ color: 'black ' }}>Edit Product Price</h5></Link>
            </div>

            <div className="delete-ft">
              <MdDeleteOutline className='function-icon' />
              <Link to="/seller/delete-products"><h5 style={{ color: 'black ' }}>Delete Product</h5></Link>
            </div>

          </div>

        </div>

        <div className="order-main">

          <div className="v-new-orders">
            <h5>All Orders</h5>

            <div className='order-heading1 d-flex py-2 gap-2 '>

              <p className="s-order-title-01">ORDER ID</p>
              <p className="s-order-title-02">STATUS</p>
              <p className="s-order-title-03">DATE</p>
              <p className="s-order-title-04">ADDRESS</p>
              <p className="s-order-title-05 px-1">TOTAL</p>
              <p className="s-order-title-06 px-1">PAY METHOD</p>
              {/* <p className="s-order-title-06 px-1">CHANGE STATUS</p> */}

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
              {orderHistory.map((myitem, index) => (


                <div className="row" key={index}>

                  <div className="order-detail d-flex">
                    <FaOpencart className='order-icon' size={30} />
                    <p className="s-order-seller-01">OrderID {myitem.OrderID}</p>
                    <p className="s-order-seller-02">{myitem.OrderStatus}</p>
                    <p className="s-order-seller-03">{dateFormat(myitem.OrderDate)}</p>
                    <p className="s-order-seller-04">{myitem.CustomerAddress}</p>
                    <p className="s-order-seller-05 px-1">{myitem.TotalAmount}</p>
                    <p className="s-order-seller-06">{myitem.Payment_Method}</p>
                    {/* <label for="status">Select Order Status:</label> */}
                    {/* <select id="status" name="status" value={selectedStatus} onChange={(e)=>setSelectedStatus(e.target.value)}>
          <option value="queued">Queued</option>
          <option value="placed">Placed</option>
          <option value="inprocess">In Process</option>
          <option value="delivered">Delivered</option>
        </select>
        <button onClick={handleclick}>Change</button> */}

                    {/* <div><RiArrowDropDownLine className='dropdown-btn' size={30} onClick={() => toggleDropdown(index)} /></div> */}
                  </div>

                  {/* <div className='order-detail-deep'>

                    {openDropdownIndex === index && (
                      <div className="dropdown-content row ">

                        <div className="order-menu column">
                          <h6>Order Menu</h6>

                          <div className="order-menu-div row">
                            <img src="../src/assets/roll.jpg" alt="item-img" />
                            <div>
                              <h5>Zinger Roll</h5>
                              <p>x1</p>
                            </div>
                            <h4>PKR 499</h4>
                          </div>


                        </div>

                        <div className="line">
                          <div className="product-info-stop__stopline-wrapper flex v-center">
                            <svg className="product-info-stop__line" xmlns="http://www.w3.org/2000/svg">

                              <line
                                className="product-info-stop__path"
                                x1="50%"
                                y1="10%"
                                x2="50%"
                                y2="90%"
                              />

                            </svg>
                          </div>
                        </div>

                        <div className="delivery-info">
                          <h6>Delivery Info</h6>
                          <p>Delivery Time <span>10 min</span> </p>
                          <p>Distance <span>2.5 Km</span> </p>

                        </div>

                        <div className="line">
                          <div className="product-info-stop__stopline-wrapper flex v-center">
                            <svg className="product-info-stop__line" xmlns="http://www.w3.org/2000/svg">

                              <line
                                className="product-info-stop__path"
                                x1="50%"
                                y1="10%"
                                x2="50%"
                                y2="90%"
                              />

                            </svg>
                          </div>
                        </div>

                        <div className="order-info">
                          <h6>Status <p>Completed</p>  </h6>
                          <h6>Date <p>June 1, 2024</p>  </h6>
                          <h6>Bills <p>Order #01</p>  </h6>
                          <h6>Date Paid <p>June 1, 2024</p>  </h6>
                        </div>

                        <div className="line">
                          <div className="product-info-stop__stopline-wrapper flex v-center">
                            <svg className="product-info-stop__line" xmlns="http://www.w3.org/2000/svg">

                              <line
                                className="product-info-stop__path"
                                x1="50%"
                                y1="10%"
                                x2="50%"
                                y2="90%"
                              />

                            </svg>
                          </div>
                        </div>

                        <div className="order-price">
                          <h6>Total</h6>
                          <p><span>$</span>50.00 </p>
                        </div>


                      </div>
                    )}
                  </div> */}

                </div>


              ))}


            </div>
          </div>

        </div>

        <br />
        <br />

      </div>

    </>
  )
}

export default Seller





