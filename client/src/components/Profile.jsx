import React from 'react';
import Header from './header/Header';

// doesnt render info half the time. db likes to crash a bit as well in terminal when starting up
function Profile({ user }) {
  console.log('user', user);
  const { id, email, profile } = user.foundUser;
  console.log('id , email, profile ', id, email, profile);

  return (
    <div>
      <Header />
      <h2>My Profile</h2>   
      <p>My Id: {id}</p>
      <p>My Email: {email}</p>
      <p>Username: {profile.firstName}</p>
      <p>First Name: {profile.firstName}</p>
      <p>Last Name: {profile.lastName}</p>
      <p>my Bio: {profile.bio}</p>
    </div>
  );
}

export default Profile;
