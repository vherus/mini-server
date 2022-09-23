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
    console.log('wokring');

    const { email, password } = user;

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

    const value = await res.json();
    console.log('value', value);

    navigate('/', {
      replace: true,
    });
  };


  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

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
