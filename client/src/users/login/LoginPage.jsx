import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import UserForm from './UserForm';

function LoginPage() {
  const [user, setUser] = useState('');
  const [loginResponse, setLoginResponse] = useState({
    data: { token: '', user: {} },
  });
  let navigate = useNavigate();

  console.log('user', user);

  // useEffect(() => {
  //   const loadedToken =
  //     localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || '';
  //   setLoginResponse({ data: { token: loadedToken } });
  // }, []);

  const loginUser = async (event) => {
    event.preventDefault()
    console.log('login clicked');

    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const login = await res.json();

    console.log('login', login);

    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, login.data);

    // setLoginResponse(res.data);
    setLoginResponse(`Welcome back ${user.email}`)

    navigate('/welcome', {
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
      <UserForm handleChange={handleChange} handleSubmit={loginUser}/>
      <Link id="user-registration-link" to="/register">
        sign up
      </Link>
    </div>
  );
}

export default LoginPage;
