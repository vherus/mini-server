import { Input } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import DeleteUser from './components/DeleteUser';
import './style.css';

function AdminArea() {
  const [userId, setUserId] = useState(0);

  const deleteUser = async (event) => {
    event.preventDefault()
    console.log('delete clicked');

    const res = await fetch(`http://localhost:4000/${userId.userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(userId),
    });

    const effectDelete = await res.json();
    console.log('effectDelete', effectDelete);

    // Do I need more here?
  };

  // form handling input from user
  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    console.log('value', value);

    setUserId({
      ...userId,
      [name]: Number(value),
    });
  };

  console.log('userId', userId);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('submitted');
  //   console.log('event', event.target.name);
  // };

  return (
    <section>
      <h2>Admin Area</h2>
      <DeleteUser handleSubmit={deleteUser} handleChange={handleChange} />
    </section>
  );
}

export default AdminArea;
