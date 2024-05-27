import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./common/Home";
import Header from "./shared/Header";
import About from "./common/About";
import Service from "./common/Service";
import Login from "./common/Login";
import SignUp from "./common/SignUp";

import Dashboard from "./admin/Dashboard";
import Footer from "./shared/Footer";
import Profile from "./student/Profile";
import AdminBooklist from "./admin/AdminBooklist";
import BookAdd from "./admin/BookAdd";
import BookUpdate from "./admin/BookUpdate";
import ApppointGetBook from "./admin/AppointGetBook";
import SubmitGetBook from "./admin/SubmitGetBook";

import "./style.css";

//Student
import StudentDashboard from "./student/StudentDashboard";
import BookList from "./student/BookList";
import GetBookList from "./student/GetBookList";
import SubmitBookList from "./student/SubmitBooks";

import AdminHeader from "./shared/TopHeader";
import SideBar from "./shared/SideBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginStatus = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      setIsLoggedIn(true);
    }
  }, []);

  console.log(isLoggedIn);
  return (
    <>
      <BrowserRouter>
        <>
          {/* <Header /> */}
            <AdminHeader handleLogout={handleLogout} />
          {/* <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route
              path="/signup"
              element={<SignUp />}
            />
            {/* <Route path='/login' element={<Login />} /> */}
            <Route
              path="/login"
              element={
                <Login
                  isLoggedIn={isLoggedIn}
                  handleLoginStatus={handleLoginStatus}
                />
              }
            />
          </Routes>
          {
            isLoggedIn && (
              <>
                <SideBar />
                <div className="content-wrapper">
                  <Routes>
                    <Route path="/admindashboard" element={<Dashboard />} />
                    <Route path="/booklist" element={<AdminBooklist />} />
                    <Route path="/bookadd" element={<BookAdd />} />
                    <Route path="/bookupdate/:id" element={<BookUpdate />} />
                    <Route path="/appointbooks" element={<ApppointGetBook />} />
                    <Route path="/submitbooks" element={<SubmitGetBook />} />

                    <Route
                      path="/studentdashboard"
                      element={<StudentDashboard />}
                    />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/avaiablebooks" element={<BookList />} />
                    <Route path="/getbooks" element={<GetBookList />} />
                    <Route
                      path="/submitbooklist"
                      element={<SubmitBookList />}
                    />
                  </Routes>
                </div>
                <Footer />
              </>
            )

          }
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
