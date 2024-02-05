import React, { useEffect, useState } from 'react';
import '../css/UserProfile.css';

const UserProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  // console.log(storedUser)

  return (
    <div className="profile-container">
      <h3>User Profile</h3>
      <div className="profile-section">
        <div className="user-info">
          <div className="form-row">
            <div className="form-col">
              <label>
                First Name:
                <input type="text" name="fname" value={storedUser.FName} readOnly />
              </label>
              <label>
                Last Name:
                <input type="text" name="lname" value={storedUser.LName} readOnly />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={storedUser.Email} readOnly />
              </label>
            
            </div>
            <div className="form-col">
            <label style={{display: 'flex', flexDirection:'column'}}>
                Phone No:
                <input type="text" name="phoneno" value={storedUser.Phoneno} readOnly />
              </label>
              <label>
                Address:
                <textarea name="address" value={storedUser.Address} readOnly />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
