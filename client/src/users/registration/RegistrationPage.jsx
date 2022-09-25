import UserForm from './UserForm';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import client from '../../utils/client';
import './style.css';
import React, { useState } from 'react';


function RegistrationPage() {
  const [user, setUser] = useState('');
  let navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();
    // Take the data entered from user 
    const { email, password } = user;
    // connect to the API i set up in server under route below
      // can i change stringify to just user
    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        password 
      }),
    });

    // not sure why i do this
    const value = await res.json();
    console.log('value', value);

    // sent to homepage/login once registered successfully
    navigate('/', {
      replace: true,
    });
  };

  // form handling input from user
  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // sign up info form returned 
  return (
    <div>
      <UserForm
        handleChange={handleChange}
        handleSubmit={registerUser}
        user={user}
      />
      <Link id="user-registration-link" to="/">
        Log in
      </Link>
    </div>
  );
}

export default RegistrationPage;
