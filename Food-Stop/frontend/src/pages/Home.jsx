import React, {useState, useEffect} from 'react'
import { IoSearch } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrCart } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import HomeView from '../components/HomeView';
import '../css/Home.css'
import Categories from '../components/Categories';
import { IoHomeOutline } from "react-icons/io5";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const Home = () => {
const navigate = useNavigate()


  const [keyword, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState('homeView')

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
const name = 'banner06.png';




const handleSearchSubmit = (event) => {
  event.preventDefault();
  axios.post('http://localhost:3000/search', {keyword})
  .then((res)=>{
    // console.log('yha', res)
    // console.log(res.data.result[0])
    let products = res.data.result[0]
    console.log(products)
    navigate('/searchitem', {state: products})
    // setProducts(res.data.result[0])
  })
  .catch(e => console.log('eror baua'))
}

  const renderContent = () =>{
    switch (selectedItem) {
      case 'homeView':
        return <HomeView />;
    
      default:
        return <Categories item={selectedItem}/>;
    }
  }

  
  return (
    <>
      <div className="body-container row">

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
                <IoSearch size={20} color='white'/>
              </button>
            </form>
          </div>

          <div className="icons-upper">
            <IoMdNotificationsOutline size={30}/>
            <GrCart size={25}/>
            <CgProfile size={25} style={{cursor: 'pointer'}}/>
            <IoHomeOutline size={25} onClick={()=> setSelectedItem('homeView')} style={{cursor: 'pointer'}}/>

          </div>

        </div>

        <div className="home-container-outer ">
          <div className="home-container ">

            <div className="banner">

              {/* <img src="../src/assets/banner06.png" alt="banner image" /> */}
              <div className="banner-content">
                {/* <h4>Free Delivery</h4> */}
                {/* <Link to="/your-path" className="explore-btn">Explore our Products<GrLinkNext /></Link> */}
              </div>

              <div className="banner-image">
                <img src="../src/assets/banner06.png" alt="coffee banner" />
                {/* <img src={`/images/${name}`} alt="coffee banner" /> */}
              </div>

            </div>
            
            <div className="categories">
              <h3>Category </h3>

              <div className="sub-categories">

                <div className="categories-icon" onClick={()=>{ setSelectedItem('Fried Chicken')}}>
                  <img src="../src/assets/fc.png" alt="roll-img" />
                  <h5>Chicken</h5>
                </div>

                <div className="categories-icon" onClick={()=>{ setSelectedItem('Burger')}}>
                  <img src="../src/assets/burger.png" alt="burger-img" />
                  <h5>Burger</h5>
                </div>

                <div className="categories-icon" onClick={()=>{ setSelectedItem('Pizza')}}>
                  <img src="../src/assets/pizza.png" alt="pizza-img" />
                  <h5>Pizza</h5>
                </div>
                <div className="categories-icon" onClick={()=>{ setSelectedItem('Pan Asian')}}>
                  <img src="../src/assets/karahi.png" alt="cake" />
                  <h5>Desi</h5>
                </div>

                <div className="categories-icon" onClick={()=>{ setSelectedItem('Ice Cream')}}>
                  <img src="../src/assets/ice-cream.png" alt="icecream-img" />
                  <h5>IceCream</h5>
                </div>

                <div className="categories-icon" onClick={()=>{ setSelectedItem('Breakfast')}}>
                  <img src="../src/assets/sandwich.png" alt="sandwitch" />
                  <h5>BreakFast</h5>
                </div>

                <div className="categories-icon" onClick={()=>{ setSelectedItem('Drinks')}}>
                  <img src="../src/assets/tea.png" alt="tea" />
                  <h5>Drinks</h5>
                </div>

             

              </div>

            </div>
            
          </div>

          <div className="home-container-sidebar">
            <h4>Discounts</h4>

            <div className="home-sidebar-discounts column">

              <div className="discount-card row">
                <div className="discount-icon">
                  <img src="../src/assets/user1.jpg" alt="" />
                </div>
                <div className="discount-text column">
                  <h6>First Time Feast</h6>
                  <p>15% off on the first order Code: FIRSTBITE15</p>
                </div>
              </div>

              <div className="discount-card row">
                <div className="discount-icon">
                  <img src="../src/assets/announce.jpg" alt="" />
                </div>
                <div className="discount-text">
                  <h6>Happy Hour Special</h6>
                  <p>20% off on orders placed between 3-6 PM </p>
                </div>
              </div>

              <div className="discount-card row">
                <div className="discount-icon">
                  <img src="../src/assets/gift-voucher.jpg" alt="" />
                </div>
                <div className="discount-text">
                  <h6>Group Grub</h6>
                  <p>10% off on orders of above 1500 or more...</p>
                </div>
              </div>

              <div className="discount-card row">
                <div className="discount-icon">
                  <img src="../src/assets/coin.jpg" alt="" />
                </div>
                <div className="discount-text">
                  <h6>Loyal Eater Rewards</h6>
                  <p>Earn coins for every 100 rupees spent</p>
                </div>
              </div>

              <div className="discount-card row">
                <div className="discount-icon">
                  <img src="../src/assets/coins.jpg" alt="" />
                </div>
                <div className="discount-text">
                  <h6>Referral Fiesta</h6>
                  <p>Refer a friend &both get 15% off on next order.</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {renderContent()}
        

      </div>
    </>
  )
}


export default Home





