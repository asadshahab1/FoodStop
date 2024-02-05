import React, { useState, useEffect } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrCart } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import HomeView from '../components/HomeView';
import '../css/Home.css'
import Categories from '../components/Categories';
import "../css/Categories.css"
import { MdAdd } from "react-icons/md";
import axios from 'axios';
import { useAuth } from '../pages/AuthContext';
import { useLocation } from 'react-router-dom';


const Search = () => {
  const location = useLocation();
  const { state } = location;
  let searchItem = state ? state : [];
  const [keyword, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [result, setResult] = useState('hehe')
  const { token } = useAuth();

  useEffect(()=>{
    setProducts(searchItem)
  },[searchItem]);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/search', { keyword })
      .then((res) => {
        console.log('yha', res)
        console.log(res.data.result[0])
        setProducts(res.data.result[0])
      })
      .catch(e => console.log('eror baua'))
  }

  const addtocart = async (productID) => {
    try {
      const response = await axios.post('http://localhost:3000/add-to-cart',
        { productID }, {
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
    <div className='mydivvv'>
      <div className="upper-tool-row row ">


        <div className="search-bar">
          <form onSubmit={handleSearchSubmit}>
            <input
              className='search'
              type="text"
              placeholder="Search here"
              value={keyword}
              onChange={handleSearchChange}
            />
            <button className='search-btn' type="submit">
              <IoSearch size={20} color='white' />
            </button>
          </form>
        </div>

        <div className="icons-upper">
          <IoMdNotificationsOutline size={30} />
          <GrCart size={25} />
          <CgProfile size={25} />
          <CgProfile size={25} onClick={() => setSelectedItem('homeView')} style={{ cursor: 'pointer' }} />

        </div>
      </div>
      <div className='categoriesView'>
        <h3>Search Results: </h3>

        <div className='categories'>
  {products.length > 0 ? (
    products.map((myitem) => (
      <div className="categories-product column" key={myitem.ProductID}>
        <div className="discount">{myitem.Category}</div>

        <img src={`/images/${myitem.Images}`} alt={myitem.Title} />

        <div className='details-container'>
          <h4>{myitem.Title}</h4>
          <div className="height-p">
            <p>{myitem.ProductDescription}</p>
          </div>

          <div className="price-container">
            <h5 className='discounted-price'>Rs. {myitem.Price}</h5>

            <button className="product-add" onClick={() => addtocart(myitem.ProductID)}>
              <MdAdd size={25} />
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="no-products-found">
      <img className='imgg' src="/images/noresult.jpg" alt="Nothing Found" />
      {/* <p>No products found</p> */}
    </div>
  )}
</div>



        <br />
        <br />
        <br />


      </div>



    </div>
  )
}

export default Search