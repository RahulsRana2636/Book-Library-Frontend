import React from "react";
import { Link,useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
// import '../style/Admin.css';

const AdminHeader = ({ handleLogout })  => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('token');
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
    <>
      {auth ? (
        //  <nav className="navbars navbar-expand navbar-white navbar-light">
          <nav class="main-header navbar navbar-expand navbar-white navbar-light header"> 
          <ul className="navbar-nav ml-auto">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link
                  class="nav-link"
                  data-widget="pushmenu"
                  to='#'
                >
                  <i class="fas fa-bars"></i>
                </Link>
              </li>
              {/* <li class="nav-item d-none d-sm-inline-block">
                <Link to="index3.html" class="nav-link">
                  Home
                </Link>
              </li> */}
            </ul>
            <li className="nav-item">
            <button className='btn btn-outline-danger my-2' onClick={logout}>Logout</button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav id="navbar">
        <div id="logo">
          Book <span>Library</span>
        </div>
        <ul className="ul" id="sidemenu">
           <li className="li"><Link to='/'>Home</Link></li>
          <li className="li"><Link to='/about'>About</Link></li>
          <li className="li"><Link to='/service'>Service</Link></li>
                       <li className="li"><Link to="/signup">Sign Up</Link></li>
                        <li className="li"><Link to="/login">Login</Link></li>
                        <i class="fas fa-times lfas" onClick={closeMenu}></i>
                </ul>
                <i class="fas fa-bars lfas" onClick={openMenu}></i>
      </nav>
      )}
    </>
  
  );
};

export default AdminHeader;
