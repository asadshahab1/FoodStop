import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import SellerLayout from './components/SellerLayout';
import Seller from './pages/Seller';
import ViewCart from './pages/ViewCart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Payment from './pages/Payment';
import SellerSignup from './pages/SellerSignup';
import SellerSignin from './pages/SellerSignin';
import Search from './pages/Search';
import ContactPage from './pages/ContactPage';

import ViewProducts from './pages/ViewProducts';
import EditProducts from './pages/EditProducts';
import AddProducts from './pages/AddProducts';
import DeleteProducts from './pages/DeleteProducts';
import EditFoodTwo from './pages/EditFoodTwo';




function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>} >
            <Route index element={<Home/>} />
            <Route path='/user-profile' element={<UserProfile/>}/>
            <Route path='/viewcart' element={<ViewCart/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/contact' element={<ContactPage/>}/>
            <Route path='/searchitem' element={<Search/>}/>
            <Route path='/seller-signup' element={<SellerSignup/>} />  
            <Route path='/seller-signin' element={<SellerSignin/>} />  

          </Route>

          <Route path='/seller/' element={<SellerLayout />} >
            <Route index element={<Seller/>} />  
            <Route path='/seller/view-products' element={<ViewProducts/>} />
            <Route path='/seller/edit-products' element={<EditProducts/>} />
            <Route path='/seller/add-products' element={<AddProducts/>} />
            <Route path='/seller/delete-products' element={<DeleteProducts/>} />
            <Route path='/seller/editfoodtwo/:product_id/:price' element={<EditFoodTwo/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App



