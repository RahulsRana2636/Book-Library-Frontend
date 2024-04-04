import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './common/Home';
import Header from './shared/Header';
import About from './common/About'
import Service from './common/Service';
import Login from './common/Login';
import SignUp from './common/SignUp';

import Dashboard from './admin/Dashboard';
import LeftPanel from './shared/LeftPanel';
import Footer from './shared/Footer';
import Profile from './student/Profile';
import AdminBooklist from './admin/AdminBooklist';
import BookAdd from './admin/BookAdd';
import BookUpdate from './admin/BookUpdate';
import ApppointGetBook from './admin/AppointGetBook';
import SubmitGetBook from './admin/SubmitGetBook';


// import TopHeader from './shared/TopHeader';
// import './template.css';
import './style.css';
// import './cs-skin-elastic.css';

//Student 
import StudentDashboard from './student/StudentDashboard';
import BookList from './student/BookList';
import GetBookList from './student/GetBookList';
import SubmitBookList from './student/SubmitBooks';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
const handleLoginStatus = () => {
  setIsLoggedIn(true);
};

const handleLogout = () => {
  setIsLoggedIn(false);
};
useEffect(() => {
  const auth = localStorage.getItem('token');
  if (auth) {
    setIsLoggedIn(true);
  }
}, []);

  return (
    <>
      <BrowserRouter>
      <>
              {/* <Header /> */}
              <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
              <Routes>
              <Route path='/' element={<Home />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/service' element={<Service />} />
                  <Route path='/signup' element={<SignUp handleLoginStatus={handleLoginStatus} />} />
                  {/* <Route path='/login' element={<Login />} /> */}
                  <Route path='/login' element={<Login handleLoginStatus={handleLoginStatus} />} />
              </Routes>
              {isLoggedIn && 
                 <div id="right-panel" class="right-panel">
                   <LeftPanel />          
                   <div className='right-content'>
                <Routes>
                  <Route path='/admindashboard' element={<Dashboard />} />
                  <Route path='/booklist' element={<AdminBooklist />} />
                  <Route path='/bookadd' element={<BookAdd />} />
                  <Route path='/bookupdate/:id' element={<BookUpdate />} />
                  <Route path='/appointbooks' element={<ApppointGetBook />} />
                  <Route path='/submitbooks' element={<SubmitGetBook />} />

                  <Route path='/studentdashboard' element={<StudentDashboard />} />
                  <Route path='/profile/:id' element={<Profile />} />
                  <Route path='/avaiablebooks' element={<BookList />} />
                  <Route path='/getbooks' element={<GetBookList />} />
                  <Route path='/submitbooklist' element={<SubmitBookList />} />

                  
                  
                </Routes>
                </div>
              <Footer />
            </div>
}
</>
      </BrowserRouter>
            

    </>
  );
}

export default App;
