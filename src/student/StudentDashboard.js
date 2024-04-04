import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaBuffer, FaAlignJustify, FaBook, FaCalendarAlt } from "react-icons/fa";

const StudentDashboard = () => {

    const userId = localStorage.getItem('id');

  const [userdetails, setUserdetails] = useState([]);

  const fetchUserDetails = async () => {
    try {
        const url = process.env.REACT_APP_API_URL + 'user/' + userId;
        const response = await axios.get(url,{
          headers: {
            authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
          },
        });
        setUserdetails(response.data); // Update userdetails state with fetched data
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

  useEffect(() => {
    fetchUserDetails();
  }, [])

  return (
    <div>
      <div>
        <h2>Welcome, {userdetails && userdetails.name} </h2>
        <br></br>

        <div class="row">
          <div class="col-sm-6 col-lg-6">
            <Link to={`/profile/${userId}`} className='link-success'>
              <div class="card text-white bg-flat-color-1">
                <div class="card-body">
                  <div class="card-left pt-1 float-left">
                    <h3 class="mb-0 fw-r">
                      <span class="currency float-left mr-1">Profile</span>
                    </h3>
                    <br></br><br></br>
                    <p class="text-light mt-1 m-0">Your profile here</p>
                  </div>

                  <div class="card-right float-right text-right">
                    <FaAlignJustify />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* <div class="col-sm-6 col-lg-6">
            <Link to='/assignment' className='link-danger'>
              <div class="card text-white bg-flat-color-6">
                <div class="card-body">
                  <div class="card-left pt-1 float-left">
                    <h3 class="mb-0 fw-r">
                      <span class="count float-left">Assignments</span>
                    </h3>
                    <br></br><br></br>
                    <p class="text-light mt-1 m-0">Live Now</p>
                  </div>

                  <div class="card-right float-right text-right">
                    <FaBook />
                  </div>
                </div>
              </div>
            </Link>
          </div> */}

          {/* <div class="col-sm-6 col-lg-3">
            <Link to='/leaderboard' className='link-danger'>
              <div class="card text-white bg-flat-color-3">
                <div class="card-body">
                  <div class="card-left pt-1 float-left">
                    <h3 class="mb-0 fw-r">
                      <span class="count">Leaderboard</span>
                    </h3>
                    <br></br>
                    <p class="text-light mt-1 m-0">Coming Soon...</p>
                  </div>

                  <div class="card-right float-right text-right">
                    <FaBuffer />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div class="col-sm-6 col-lg-3">
            <Link to='/mystatus' className='link-danger'>
            <div class="card text-dark bg-warning">
                <div class="card-body">
                  <div class="card-left pt-1 float-left">
                    <h3 class="mb-0 fw-r">
                      <span class="count">My Status</span>
                    </h3>
                    
                  </div>

                  <div class="card-right float-right text-right">
                    <FaBuffer />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div class="col-sm-6 col-lg-3">
            <Link to='/quiz' className='link-danger'>
              <div class="card text-white bg-flat-color-2">
                <div class="card-body">
                  <div class="card-left pt-1 float-left">
                    <h3 class="mb-0 fw-r">
                      <span class="count">Quiz</span>
                    </h3>
                    <br></br>
                    <p class="text-light mt-1 m-0">Coming Soon...</p>
                  </div>

                  <div class="card-right float-right text-right">
                    <FaCalendarAlt />
                  </div>
                </div>
              </div>
            </Link>
          </div> */}
        </div>

        {/* <div className='row'>
          <div className='col-12'>
            <div class="alert alert-success" role="alert">
              Please, submit feedback after class to mark your attendance.
            </div>
          </div>
        </div> */}

      </div>

    </div>
  )
}

export default StudentDashboard
