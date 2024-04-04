import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { DataAppContext } from '../DataContext';

const LeftPanel = () => {
    const usertype = localStorage.getItem('usertype');
    const auth = localStorage.getItem('token');

    const openMenu = () => {
        const sidemenu = document.getElementById('sidemenu');
        if (sidemenu) {
            sidemenu.style.left = "0";
        }
    };
    
    const closeMenu = () => {
        const sidemenu = document.getElementById('sidemenu');
        if (sidemenu) {
            sidemenu.style.left = "-200px";
        }
    };
    

    return (

        <>
            <aside id="left-panel" class="left-panel">
                <nav class="navbar navbar-expand-sm navbar-default">
                    <div id="main-menu" class="main-menu collapse navbar-collapse">


                        <ul class="nav navbar-nav" id="leftsidemenu">

                            <li class="menu-title">&nbsp;</li>
                            {
                                (auth && (usertype === 'Admin')) && (
                                    <>
                                        <li class="menu-item-has-children"><b>Admin Options</b></li>
                                        <li class="menu-item-has-children dropdown"><Link to='/admindashboard' className=''>DashBoard</Link></li>
                                        {/* <li class="menu-item-has-children dropdown"><Link to='/userslist' >Users List</Link></li> */}
                                        <li class="menu-item-has-children dropdown"><Link to='/booklist' >Book List</Link></li>
                                        <li class="menu-item-has-children dropdown"><Link to='/appointbooks' >Get Book List</Link></li> 
                                        <li class="menu-item-has-children dropdown"><Link to='/submitbooks' >Submit Book List</Link></li> 

                                        <li class="menu-item-has-children"><b>Student Options</b></li>
                                    </>
                                )
                            }

                            {
                                (auth && (usertype === 'Student')) && (
                                    <>
                                        <li class="menu-item-has-children dropdown"><Link to='/studentdashboard' className=''>DashBoard</Link></li>
                                        <li class="menu-item-has-children dropdown"><Link to='/avaiablebooks' >Book List</Link></li>
                                        <li class="menu-item-has-children dropdown"><Link to='/getbooks' >Get Book List</Link></li>
                                        <li class="menu-item-has-children dropdown"><Link to='/submitbooklist' >Submit Book List</Link></li>
                                    </>
                                )
                            }
                                        <i class="fas fa-times" onClick={closeMenu}></i>
                             </ul>
                <i class="fas fa-bars" onClick={openMenu}></i>
                    </div>
                </nav>

            </aside>
        </>
    )
}

export default LeftPanel
