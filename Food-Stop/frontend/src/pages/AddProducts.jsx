import React, { useEffect, useState } from 'react';
import UpperRow from '../components/UpperRow'
import "../css/ViewProducts.css";
import {Link, useParams} from "react-router-dom"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { BiMoney, BiDollar } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";

const AddProducts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [product_title, setproduct_title] = useState("");
  const [productDescription, setproductDescription] = useState("");
  const [productPrice, setproductPrice] = useState('');
  const [productImagePath, setproductImagePath] = useState('');
  const [category, setcategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const {id} = useParams()
  const token = localStorage.getItem('sellerToken')

  const handleTitle = (event) => {
    setproduct_title(event.target.value);
  };
  const handleDescription = (event) => {
    setproductDescription(event.target.value);
  };
  const handlePrice = (event) => {
    setproductPrice(event.target.value);
  };
  const handleImagePath = (event) => {
    setproductImagePath(event.target.value);
  };
  const handleDiscount = (event) => {
    setcategory(event.target.value);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const registered = () =>
    toast.success("Product Added Successfully", {
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



  const handleSubmit = (event) => {
    event.preventDefault();

//     const formData = new FormData();
// formData.append('product_title', product_title);
// formData.append('productDescription', productDescription);
// formData.append('productImage', selectedFile); // Assuming productImage is a file input
// formData.append('category', category);
// formData.append('productPrice', productPrice);

// console.log(formData)


    console.log(token, product_title, productDescription, productImagePath, category, productPrice)
    axios.post('http://localhost:3000/upload-product', {product_title, productDescription, productImagePath, category, productPrice},
    {
      headers : {
        'Authorization': `${token}`
      }
    }).then((res)=>{
      console.log('chla gya')
      registered()

    })
    .catch((e) => {
      failed('Some error occured')
      console.log(e, 'nh gya hoga')})
    

    setcategory('')
    setproductDescription('')
    setproductImagePath('')
    setSelectedFile(null)
    setproduct_title('')
    setproductPrice('')
  };

  
  return (

    <div className='sellerdashboard-main'>
      {/* <UpperRow/> */}

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
          <h2 className="myh2">Add New Food</h2>

          <form className="product-form row" onSubmit={handleSubmit} encType="multipart/form-data">

            <div className="form-left ">

              <div className="left-input">
                <h4>Title</h4>
                <div className="input-group">
                  <input
                    className="sign-inp"
                    type="text"
                    id="fare"
                    placeholder="New Title"
                    value={product_title}
                    onChange={handleTitle}
                    required
                  />

                </div>

              </div>

              <div className="left-input">
                <h4>Description</h4>
                <div className="input-group">
                  <textarea
                    className="desc-inp"
                    type="text"
                    id="fare"
                    placeholder="New Description"
                    value={productDescription}
                    onChange={handleDescription}
                    required
                  />

                </div>
              </div>

            </div>

            <div className="form-right">

              <div className="right-input">
                <h4>Price</h4>
                <div className="input-group">
                  <input
                    className="sign-inp"
                    type="number"
                    id="fare"
                    placeholder="New Price"
                    value={productPrice}
                    onChange={handlePrice}
                    required
                  />

                </div>
              </div>

              <div className="right-input">
                <h4>Image Path</h4>
                <div className="input-group">
                <input
                
                  className="sign-inp"
                  type="text"
                  id="fare"
                  placeholder="Image path"
                  value={productImagePath}
                  onChange={handleImagePath}
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
                    placeholder="New Category"
                    value={category}
                    onChange={handleDiscount}
                    required
                  />

                </div>
              </div>
              
            </div>

            <button className="sign-btn" type="submit">
              Add Food
            </button>

          </form>


          <div className="bottom-text">
            <span>Don't want to Add Food?</span>
            <Link to="/seller/">Go Back</Link>
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

export default AddProducts
