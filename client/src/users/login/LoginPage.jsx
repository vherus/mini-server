import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import UserForm from './UserForm';

function LoginPage() {
  // user is state from form 
  const [user, setUser] = useState('');
  // why do i need a response outside of nice messages? 
  const [loginResponse, setLoginResponse] = useState({
    data: { token: '', user: {} },
  });

  let navigate = useNavigate();
  console.log('user', user);

  // I think this checks if you are alread logged in
  // useEffect(() => {
  //   const loadedToken =
  //     localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || '';
  //   setLoginResponse({ data: { token: loadedToken } });
  //   console.log('loaded', loadedToken);
  // }, []);

  // Login function. Connects to my API and sends the data entered
  // when clicked the user state is passed to the request. 
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

    // returning data from local:4000 as res.json is a token that can be used as your auth badge
    const login = await res.json();
    console.log('login', login);

    // saving the token to local storage
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, login.data);
    
    if (login.error) {
      return alert('Incorrect infomation entered')
    }

    setLoginResponse(login.data)

    console.log('loginresponse', loginResponse);
    
    // go to secured welcome page
    navigate('/welcome', {
      replace: true,
    });
  };

  // handle event for form 
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
      <UserForm handleChange={handleChange} handleSubmit={loginUser} user={user} />
      <Link id="user-registration-link" to="/register">
        sign up
      </Link>
    </div>
  );
}

export default LoginPage;
