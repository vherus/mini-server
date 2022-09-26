import React from 'react';
import { useState } from 'react';
import Header from './header/Header';

// user gets stuck on first to log in
// needs empty '' function for text boxes
// if field is left out it goes blank!
function Profile({ user }) {
  console.log('user', user);
  const [profileData, setProfileData] = useState({})

  const { id, email, profile } = user
  console.log('id , email, profile ', id, email, profile);


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('submitting data');

    const res = await fetch(`http://localhost:4000/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    const changedData = await res.json()
    console.log('changedData', changedData);
    
  }


  // handle event for form 
  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    console.log('value', value);
    console.log('name', name);

    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  return (
    <div>
      <Header />
      <h2>My Profile</h2>   
      <div>
      <p>Id: {id}</p>
      <p>Email: {email}</p>
      <p>Username: {profile.firstName}</p>
      <p>First Name: {profile.firstName}</p>
      <p>Last Name: {profile.lastName}</p>
      <p>Bio: {profile.bio}</p>
      </div>
      <div>

        <form onSubmit={handleSubmit}>

          <label htmlFor='email'>
            Email
            <input 
              type='email' 
              name='email' 
              value={profileData.email} 
              onChange={handleChange} />
          </label>
          <label htmlFor='username'>
            Username
            <input 
              type='text' 
              name='username' 
              // value={profileData.username} 
              onChange={handleChange} />
          </label>
          <label htmlFor='firstName'>
            First Name
            <input 
              type='text' 
              name='firstName' 
              // value={profileData.firstName}       
              onChange={handleChange} />
          </label>
          <label htmlFor='lastName'>
            Last Name
            <input 
              type='text' 
              name='lastName' 
              // value={profileData.lastName}       
              onChange={handleChange} />
          </label>
          <label htmlFor='bio'>
           Bio
            <input 
              type='textarea' 
              name='bio' 
              rows={5}
              // value={profileData.bio}       
              onChange={handleChange} />
          </label>
          <input type='submit' name='submit' />

        </form>
      </div>
    </div>

  );
}

export default Profile;
