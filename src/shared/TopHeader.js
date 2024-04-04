import React, { useContext, useEffect } from 'react';
// import { DataAppContext } from '../DataContext';
import { Link, useNavigate } from 'react-router-dom';
// import logo from '../images/logo_full.png';

const TopHeader = () => {

    // const localContext = useContext(DataAppContext);
    // const navigate = useNavigate();

    // const { appstate, logout_user } = localContext;
    // const { loginstatus } = appstate;

    // const studentpages = ['/myStatus', '/class', '/assignment'];
    // const teacherpages = [];

    // const checkLoginandRedirect = () => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         navigate('/login')
    //     }
    // }

    // const checkUserTypeandRedirect = () => {
    //     const usertype = localStorage.getItem('usertype');
    //     if (usertype === 'student') {
    //         let pageurl = window.location.pathname;
    //         if(studentpages.indexOf(pageurl) === -1) {
    //             navigate('/accessdenied')
    //         }
    //     }
    // }

    // useEffect(() => {
    //     checkLoginandRedirect();
    //     checkUserTypeandRedirect();
    // }, [])
    const auth = localStorage.getItem('token');
    const navigate = useNavigate();
    const logout = () =>{
      navigate('/login')
        localStorage.clear();
    }
    return (

        <>
            <header id="header" class="header">
                <div class="top-left">
                    <div class="navbar-header">
                    <nav id="navbar">
        <div id="logo">
          Book <span>Library</span>
        </div>
        </nav>
                        {/* <a class="navbar-brand" href="./"><img src={logo} alt="Logo" /></a>
                        <a class="navbar-brand hidden" href="./"><img src={logo} alt="Logo" /></a>
                        <a id="menuToggle" class="menutoggle"><i class="fa fa-bars"></i></a> */}
                    </div>
                </div>
                {/* <div class="top-right">
                    <div class="header-menu">
                        <div class="user-area dropdown float-right">
                            <div> */}
                                {/* {
                                    loginstatus && (
                                        <button className='btn btn-outline-danger' onClick={logout_user}>Logout</button>
                                    )
                                }
                                {
                                    (!loginstatus && (window.location.pathname !== '/')) && (<Link className='btn btn-outline-success' to="/login">Login</Link>)
                                } */}
                                        auth ?
        <ul>
          <li> <Link onClick={logout} to="/login">Logout </Link></li>
        {/* <li class={url === '/about' && 'active'}><Link to='/about'>About</Link></li>
         <li class={url === '/services' && 'active'}><Link to='/services'>Services</Link></li> */}
        </ul>
        :
        <ul >
           <li ><Link to='/'>Home</Link></li>
          <li ><Link to='/about'>About</Link></li>
          <li ><Link to='/service'>Service</Link></li>
                       <li> <Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                            {/* </div>
                           
                        </div> */}

                    {/* </div> */}
                {/* </div> */}
            </header>
        </>
    )
}

export default TopHeader
