import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import '../css/Payment.css'
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from './AuthContext.jsx';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Payment = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [payment_method, setMethod] = useState('credit card')
  const [cardstate, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });



  const location = useLocation();
  const { state } = location;
  let price = state ? state : '0.00';


  const registered = () =>
  toast.success("Successfully Ordered, your order will be delivered in 30min", {
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

const handleSubmit = (e) =>{
  e.preventDefault();
  if (price > 0){
  axios.post('http://localhost:3000/place-order', {payment_method},
  {
    headers:{
      'Authorization': `${token}`,
    }
  })
  .then((res)=>{
    console.log('hogya order')
    registered()
    setTimeout(() => {
      navigate('/');
    }, 2000);
  })
  .catch((e) => {
    console.log(e, 'masla aya')
    failed('Some error occured !! ')
  })
} else{
  failed('No Products Added in cart')
}
 
}

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
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
      <h3 className='myh3'>Payment Details</h3>
      <div className='price'>Your total bill is <span>Rs.{price}</span></div>
      <div className='carddiv'>
        <Cards className='mycard'
          number={cardstate.number}
          expiry={cardstate.expiry}
          cvc={cardstate.cvc}
          name={cardstate.name}
          focused={cardstate.focus}
        />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="number"
              name="number"
              className='input'
              placeholder="Card Number"
              value={cardstate.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input
              type="text"
              name="name"
              className='input'
              placeholder="Your Name"
              value={cardstate.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div>
            <input
              type="date"
              name="expiry"
              className='input'
              pattern="(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])"
              placeholder="Expiry"
              value={cardstate.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input
              type="number"
              name="cvc"
              className='input'
              placeholder="CVC"
              value={cardstate.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <button className='mybtnhh' type='submit'>Pay</button>

          </div>
          
        </form>
      </div>
  
    </>

  );
}

export default Payment

