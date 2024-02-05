import React, { useState, useEffect } from 'react';
import '../css/ViewCart.css'; 
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useAuth } from './AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';


const ViewCart = () => {
  const { token } = useAuth();
  const navigateToPayment = useNavigate()

  const [cartItems, setCartItems] = useState([]);
  // const [cartItems, setCartItems] = useState('');
  const [data, setData] = useState(null);

  const [totalUniqueProducts, setTotalUniqueProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    // console.log(token)
      axios.get('http://localhost:3000/cart', {
        headers: {
          'Authorization': `${token}`,
          
        },
      })
      .then(response => {
        console.log(response.data.data[0])
        
        setCartItems(response.data.data[0])
      
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    },[]);


const always = ()=>{
  axios.get('http://localhost:3000/cart', {
    headers: {
      'Authorization': `${token}`,
      
    },
  })
  .then(response => {
    console.log(response.data.data[0])
    
    setCartItems(response.data.data[0])
  
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}

    const handleToggleEdit = () => {
      console.log('ff')
      console.log(token)
        axios.post('http://localhost:3000/update-cart', cartItems, {
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          },
        })
      .then((res)=>{       
        console.log('here')
        console.log(res)
      })
      .catch(err => console.log(err))

      setEditMode(!editMode);
    };


  useEffect(() => {
    const uniqueProducts = new Set(cartItems.map(item => item.ProductID));
    setTotalUniqueProducts(uniqueProducts.size);

    const total = cartItems.reduce((acc, item) => acc + item.Quantity * item.ProductPrice, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleQuantityChange = (id, change) => {
    if (editMode) {
      const updatedCartItems = cartItems.map(item => {
        if (item.ProductID === id) {
          return { ...item, Quantity: Math.max(0, item.Quantity + change) };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    }
  };

  const handleDeleteItem = id => {
    if (editMode) {
      const updatedCartItems = cartItems.filter(item => item.ProductID !== id);
      setCartItems(updatedCartItems);
    }
  };


  const handleProceedToCheckout = () => {
    if (cartItems.length>0){
    if (!editMode) {
  
      console.log("Proceeding to Checkout...");
      console.log(cartItems)
      navigateToPayment('/payment', {state: totalPrice})
    }
  } else{
    alert('Cart is empty')
  }
  };


  return (
    <div className="cart-containercc">
      <h3>Your Cart</h3>
      <p>You have {totalUniqueProducts} products in your cart.</p>
      <div className="cartcc">
        <table className="cart-tablecc">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>S.No</th>
              <th style={{ width: '55%', paddingLeft:'32px' }}>Products</th>
              <th style={{ width: '20%' , paddingLeft:'22px'}}>Quantity</th>
              <th style={{ width: '10%' }}>Price</th>
              <th style={{ width: '10%' }}>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.ProductID}>
                <td style={{ width: '5%', fontSize:'14px' }}>{index + 1}.</td>
                <td style={{ width: '55%' }}>
                  <div className="product-infocc">
                    <img src={`/images/${item.Images}`} alt={`Product ${item.ProductID}`} className="product-imagecart" />
                    <span className='pn'>{item.ProductTitle}</span>
                  </div>
                </td>
                <td style={{ width: '20%' }}>
                  <div className="quantity-containercc">
                    <FaMinus className='q-btn' onClick={() => handleQuantityChange(item.ProductID, -1)} disabled={!editMode}/>
                    <span className='qp'>{item.Quantity}</span>
                    <FaPlus className='q-btn' onClick={() => handleQuantityChange(item.ProductID, 1)} disabled={!editMode}/>
                  </div>
                </td>
                <td style={{ width: '10%' }}>Rs.{(item.Quantity * item.ProductPrice).toFixed(2)}</td>
                <td style={{ width: '10%' }}>
                  <MdDelete className='dbtn' onClick={() => handleQuantityChange(item.ProductID, -item.Quantity)} disabled={!editMode}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cart-summarycc">
        <div className="totalcc">
          <span>Total:</span> Rs. {totalPrice.toFixed(2)}/
        </div>
        <div>
        <button className="edit-toggle-btn" onClick={handleToggleEdit}>
          {editMode ? 'Save' : 'Edit'}
        </button>
        <button className="checkout-btncc" onClick={handleProceedToCheckout} disabled={editMode}>
          Proceed to Checkout
        </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
