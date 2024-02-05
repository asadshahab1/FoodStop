import React from 'react'
import { Outlet } from 'react-router-dom'

const SellerLayout = () => {
  return (
    <div className='Seller'>
      <Outlet/>
    </div>
  )
}

export default SellerLayout
