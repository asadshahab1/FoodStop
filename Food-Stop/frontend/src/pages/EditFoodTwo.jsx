import React, { useEffect, useState } from 'react';
import UpperRow from '../components/UpperRow'
import "../css/ViewProducts.css";
import {Link, useParams} from "react-router-dom"
// import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { BiMoney, BiDollar } from "react-icons/bi";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
// import moment from "moment";


const EditFoodTwo = () => {
  const token = localStorage.getItem('sellerToken')
  const sid = localStorage.getItem('sellerID')
  
  useEffect(()=>{
    window.scrollTo(0,0)
  },[]);

  // const [newtitle, setNewTitle] = useState("");
  // const [newdescription, setNewDescription] = useState("");
  // const [newprice, setNewPrice] = useState('');
  // const [newcategory, setNewcategory] = useState('');
  const { product_id, price} = useParams()
  console.log(product_id, price)

  const [oldprice, setoldprice] = useState(price)
  const [product_price, setPrice] = useState('')

  const handlePrice = (event) => {

    event.preventDefault()
    setPrice(event.target.value);
  };
  // const handleDescription = (event) => {
  //   setNewDescription(event.target.value);
  // };
  // const handlePrice = (event) => {
  //   setNewPrice(event.target.value);
  // };
  // const handlecategory = (event) => {
  //   setNewcategory(event.target.value);
  // };



  const registered = () =>
    toast.success("Price Updated Successfully", {
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


  // useEffect(()=>{
  //   axios.get(`http://localhost:4200/editflighttwo/${id}`)
  //   .then(res => {
  //     console.log("ID SEND")
  //     console.log(res.data[0]);
  //     setDepartureCity(res.data[0].departure_city);
  //     setArrivalTime(timeFormat(res.data[0].arr_datetime))
  //     setDepartureTime(timeFormat(res.data[0].depart_datetime))
  //     setArrivalDate(dateFormat(res.data[0].arr_datetime))
  //     setDepartureDate(dateFormat(res.data[0].depart_datetime))
  //     setArrivalCity(res.data[0].arrival_city);
  //     setEconomyFare(res.data[0].economy_fare);
  //     setFirstClassFare(res.data[0].first_class_fare);
  //     setBusinessFare(res.data[0].business_fare);
  //     setEconomySeats(res.data[0].economy_seats);
  //     setFirstClassSeats(res.data[0].first_class_seats);
  //     setBusinessSeats(res.data[0].business_seats);
  //     setDepartureDateTime(res.data[0].depart_datetime)
  //     setArrivalDateTime(res.data[0].arr_datetime)
  //     console.log(arrivalDateTime)
  //     console.log(departureDateTime)

  //   })
  //   .catch(err => console.log(err))
    
  // }, [id, departureDate, arrivalDate ])


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(product_id, product_price)
    axios.post('http://localhost:3000/edit-price',{product_id, product_price} ,{
        headers : {
          'Authorization': `${token}`,
          'seller_id' : `${sid}`
        }
    }).then(res =>{
      console.log('hoa lch', res)
      registered()
      

    })
    .catch(e => console.log('masla', e))

  };


  return (

    <div className='sellerdashboard-main'>
      <UpperRow/>

      <div className='editfood-main'>

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


        <div className="sign-container ">
          <h2 className="myh2">Change Price</h2>

          <form className="product-form row" onSubmit={handleSubmit} >

            <div className="form-left ">

              <div className="left-input">
                <h4>Old Price</h4>
                <div className="input-group">
                  <input
                    className="sign-inp"
                    type="number"
                    id="fare"
                    placeholder="Old Price"
                    disabled
                    value={oldprice}
                   
                    required
                  />

                </div>

              </div>

              <div className="left-input">
                <h4>New Price</h4>
                <div className="input-group">
                  <input
                    className="sign-inp"
                    type="number"
                    id="fare"
                    min={0}
                    placeholder="New Price"
                    value={product_price}
                    onChange={handlePrice}
                    required
                  />

                </div>
              </div>

            </div>

            {/* <div className="form-right">

              <div className="right-input">
                <h4>Price</h4>
                <div className="input-group">
                  <input
                    className="sign-inp"
                    type="text"
                    id="fare"
                    placeholder="New Price"
                    value={newprice}
                    onChange={handlePrice}
                    required
                  />

                </div>
              </div>

              <div className="right-input">
                <h4>Category</h4>
                <div className="input-group">
                <input
                  className="sign-inp"
                  type="text"
                  id="fare"
                  placeholder="New category"
                  value={newcategory}
                  onChange={handlecategory}
                  required
                />

                </div>
              </div>

             
              
            </div> */}

            <button className="sign-btn" type="submit">
              Update Details
            </button>

          </form>


          <div className="bottom-text">
            <span>Don't want to update?</span>
            <Link to="/seller/edit-products">Go Back</Link>
          </div>

        </div>

        <br />
        <br />
        <br />


      </div>

      <br />
      <br />
      <br />
      <br />


    </div>
  )
}

export default EditFoodTwo
