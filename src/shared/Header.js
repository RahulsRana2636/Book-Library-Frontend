
import React, { useState } from 'react';
import '../style/Home.css'; 
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/bookStore.png';

const Header = ({ handleLogout }) => {
  const auth = localStorage.getItem('token');
  const navigate = useNavigate();
  const logout = () => {
    navigate('/login');
    handleLogout(); // Call handleLogout from App.js
    localStorage.clear();
  };

  
  const openMenu = () => {
    const sidemenu = document.getElementById('sidemenu');
    if (sidemenu) {
        sidemenu.style.right = "0";
    }
};

const closeMenu = () => {
    const sidemenu = document.getElementById('sidemenu');
    if (sidemenu) {
        sidemenu.style.right = "-200px";
    }
};

  return (
    <div>

        {
        auth ?
        // <ul>
        //   <li> <Link onClick={logout} to="/login">Logout </Link></li>
        // </ul>
        <>
        <header id="header" class="header">
                <div class="top-left">
                    <div class="navbar-header">
                        {/* <a class="navbar-brand" href="./"><img src={logo} alt="Logo" /></a> */}
                        <a class="navbar-brand hidden" href="./"><img src={logo} alt="Logo" /></a>
                        {/* <a id="menuToggle" class="menutoggle"><i class="fa fa-bars"></i></a> */}
                    </div>
                </div>
                <div class="top-right">
                    <div class="header-menu">

                        <div class="user-area dropdown float-right">
                            <div>
                                {
                                        <button className='btn btn-outline-danger' onClick={logout}>Logout</button>
                                    
                                }
                            </div>

                        </div>

                    </div>
                </div>
            </header></>
        
        :
        <nav id="navbar">
        <div id="logo">
          Book <span>Library</span>
        </div>
        <ul id="sidemenu">
           <li ><Link to='/'>Home</Link></li>
          <li ><Link to='/about'>About</Link></li>
          <li ><Link to='/service'>Service</Link></li>
                       <li> <Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <i class="fas fa-times" onClick={closeMenu}></i>
                </ul>
                <i class="fas fa-bars" onClick={openMenu}></i>
      </nav>
    //   <>
    //   <div id="mobile-navbar">
    //   <div id="logo">
    //       Book <span>Library</span>
    //  </div>
    //     <button id="menu-toggle" onClick={toggleNav}>
    //       <span></span>
    //       <span></span>
    //       <span></span>
    //     </button>
    //   </div>

    //   {/* Sidebar navigation */}
    //   <nav id="sidebar" className={isNavOpen ? 'open' : ''}>
    //     <ul>
    //       <li><a href="#">Home</a></li>
    //       <li><a href="#">About</a></li>
    //       <li><a href="#">Services</a></li>
    //       <li><a href="#">Contact</a></li>
    //     </ul>
    //   </nav>
    //   </>
        }
    </div>
  )
}

export default Header
