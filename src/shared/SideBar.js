import React from "react";
import logo from "../images/AdminLTELogo.png";
import { NavLink,Link } from "react-router-dom";

const SideBar = () => {
  const usertype = localStorage.getItem('usertype');
  const auth = localStorage.getItem('token');
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link className="brand-link">
        <img
          src={logo}
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light">{usertype}</span>
      </Link>
      { auth && usertype === "Admin" && (
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <NavLink to="/admindashboard" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/booklist" className="nav-link" activeClassName="active">
                <i class="nav-icon fas fa-table"></i>
                  <p>Booklist</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/appointbooks" className="nav-link" activeClassName="active">
                <i class="nav-icon fas fa-table"></i>
                  <p>Get BookList</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/submitbooks" className="nav-link" activeClassName="active">
                <i class="nav-icon fas fa-table"></i>
                  <p>Submit Book List</p>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
      { auth && usertype === "Student" && (
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <NavLink to="/studentdashboard" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/avaiablebooks" className="nav-link" activeClassName="active">
                <i class="nav-icon fas fa-table"></i>
                  <p>Booklist</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/getbooks" className="nav-link" activeClassName="active">
                <i class="nav-icon fas fa-table"></i>
                  <p>Get Book List</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/submitbooklist" className="nav-link" activeClassName="active">
                <i class="nav-icon fas fa-table"></i>
                  <p>Submit Book List</p>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
