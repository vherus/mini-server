import React from 'react';

// cant get to accept user info in return. keeps crashing app. 
function Profile({ user }) {
  console.log('user', user);
  const { id, email, profile } = user.foundUser;
  console.log('id , email, profile ', id, email, profile);

  return (
    <div>
      <h2>My Profile</h2>   
    </div>
  );
}

export default Profile;
