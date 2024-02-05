import React, { useEffect, useState } from 'react'
import "../css/Categories.css"
import { MdAdd } from "react-icons/md";
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';


const Categories = ({item}) => {

  const [products, setProducts] = useState([])
  const { token } = useAuth();

  // const products = [
  //   {
  //     id: 1,
  //     name: 'Super Savor Deal',
  //     description: 'Any one Value Burger from Crispy Chicken OR Fiery Chicken with 1 Drink',
  //     originalPrice: 899,
  //     discountedPrice: 599,
  //     discount: '34% OFF',
  //     imageUrl: '../src/assets/roll.jpg',
  //   },
  //   {
  //     id: 2,
  //     name: 'Deluxe Combo',
  //     description: 'A combination of Deluxe Burger, Fries, and a Large Drink',
  //     originalPrice: 1099,
  //     discountedPrice: 899,
  //     discount: '18% OFF',
  //     imageUrl: '../src/assets/deluxe_combo.jpg',
  //   },
  //   {
  //     id: 3,
  //     name: 'Chicken Feast',
  //     description: 'Feast on a variety of chicken items with this special combo',
  //     originalPrice: 1299,
  //     discountedPrice: 999,
  //     discount: '23% OFF',
  //     imageUrl: '../src/assets/chicken_feast.jpg',
  //   },
  //   {
  //     id: 4,
  //     name: 'Vegetarian Delight',
  //     description: 'A delightful combination of vegetarian burgers and sides',
  //     originalPrice: 799,
  //     discountedPrice: 599,
  //     discount: '25% OFF',
  //     imageUrl: '../src/assets/vegetarian_delight.jpg',
  //   },
  //   {
  //     id: 5,
  //     name: 'Family Pack',
  //     description: 'Perfect for family gatherings - a mix of burgers, sides, and drinks',
  //     originalPrice: 1899,
  //     discountedPrice: 1499,
  //     discount: '21% OFF',
  //     imageUrl: '../src/assets/family_pack.jpg',
  //   },
  //   {
  //     id: 6,
  //     name: 'Crunchy Wrap Combo',
  //     description: 'Savor the crunch with our special wrap combo',
  //     originalPrice: 699,
  //     discountedPrice: 499,
  //     discount: '29% OFF',
  //     imageUrl: '../src/assets/crunchy_wrap_combo.jpg',
  //   },
  // ];


  useEffect(() => {
    // console.log(item)
    const fetchProducts = async () => {
      try {
        // Use the dynamically changing category in the API endpoint
        const response = await axios.get(`http://localhost:3000/products/${item}`);
        // console.log('ff', response.data.items[0])
        setProducts(response.data.items[0]);
        console.log(response.data.items, item)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [item]);


  // const addtocart = (p_id) =>{
  //     axios.post("http://localhost:3000/add-to-cart", 
  //     {headers: {
  //       'Authorization': `${token}`,
  //       'productID' : `${p_id}`
  //     }}).then((res)=>{
  //       console.log('kch hao')
  //     })
  //     .catch(err=> console.log(err))
  //     console.log(p_id)
  // }


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
    <div className='categoriesView'>
      <h3>{item}</h3>
      
        <div className='categories'>
          {products.map((myitem)=>(
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
  
                <button className="product-add" onClick={()=> addtocart(myitem.ProductID)}>
                  <MdAdd size={25} />
                </button>
  
              </div>
  
            </div>
          </div>
          ))}
          
        </div>


      <br />
      <br />
      <br />
      

    </div>


  )
}

export default Categories



