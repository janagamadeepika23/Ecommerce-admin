import React from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='Navbar'>
<img className="logo" src={assets.logo} alt="logo"/>
<img className='profile' src={assets.profile_image} alt="profile"/>
    </div>
  )
}

export default Navbar