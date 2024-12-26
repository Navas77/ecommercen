import React, { useContext, useState } from 'react';
import { assets } from "../assets/assets";
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { ShopContext } from '../context/ShopContext';

function Navbar() {

  const [visible, setVisible] = useState(false)
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const Logout = () => {
    navigate("/login")
    localStorage.removeItem("token")
    setToken("")
    setCartItems({})

  }


  return (
    <div className='navbarmaindiv'>
      <Link to="/">
        <img src={assets.logo} className='imglogo' alt='' />
      </Link>
      <ul className='ul1'>
        <NavLink to="/" className="navlinktag">
          <p>HOME</p>
          <hr className='hr1' />
        </NavLink>
        <NavLink to="/collection" className="navlinktag">
          <p>COLLECTION</p>
          <hr className='hr1' />
        </NavLink>
        <NavLink to="/about" className="navlinktag">
          <p>ABOUT</p>
          <hr className='hr1' />
        </NavLink>
        <NavLink to="/contact" className="navlinktag">
          <p>CONTACT</p>
          <hr className='hr1' />
        </NavLink>
      </ul>
      <div className='navlinkdiv2'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='searchicon' alt="" />
        <div className='group'>

          <img onClick={() => token ? null : navigate("/login")} src={assets.profile_icon} className='profileicon' alt="" />
         {/* Drop down */}
           {token && 
           <div className='dropdown-menu'>
           <div className='dropdown-content'>
             <p onClick={()=>navigate("/my-profile")} className='paramyprofile'>my Profile</p>
             <p onClick={()=>navigate("/orders")} className='paramyprofile'>Orders</p>
             <p onClick={Logout} className='paramyprofile'>Logout</p>
           </div>
         </div>
}
          

        </div>
        <Link to="/cart" className='linkcart'>
          <img src={assets.cart_icon} className='cartimage' alt="" />
          <p className='cartbottomnumber'>{getCartCount()}</p>

        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='menu-icon' alt="" />

      </div>
      {/* side bar menu for small screen*/}
      <div className={`sidebarmenu ${visible ? "open" : ""}`}>
        <div className='sidebarmenusubdiv'>
          <div onClick={() => setVisible(false)} className='sidebarmenusubsubdiv'>
            <img className='img4' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="WW" to="/" >HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="WW" to="/collection" >COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="WW" to="/about" >ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="WW" to="/contact" >CONTACT</NavLink>
        </div>
      </div>

    </div>
  );
}

export default Navbar;
