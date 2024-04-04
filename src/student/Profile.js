import React, { useEffect, useState } from 'react';
import '../style/Profile.css'; 
import { useParams } from 'react-router-dom';
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null); // Initialize profile as null

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = process.env.REACT_APP_API_URL + 'user/' + id;
        const response = await axios.get(url,{
          headers: {
            authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
          },
        });
        setProfile(response.data); // Update profile state with fetched data
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile(); // Call the fetchProfile function
  }, [id]); // Add id as a dependency to re-fetch profile when id changes

  return (
    <>
      <section id="book">
        <div className="row">
          <div className="col-md-6 mx-auto text-center">
            <h1 className="my-3">My Profile</h1>
            {profile ? ( // Render profile data if available
              <div id="profilestudent">
                <ul>
                  <li>Name: {profile.name}</li>
                  <li>Email: {profile.email}</li>
                  <li>User Type: {profile.usertype}</li>
                </ul>
              </div>
            ) : (
              <p>Loading profile...</p> // Display a loading message while fetching profile
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
