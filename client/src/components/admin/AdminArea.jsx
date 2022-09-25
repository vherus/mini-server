import { Input } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteUser from './components/DeleteUser';
import FindUser from './components/FindUser';
import './style.css';

function AdminArea() {
  const [userId, setUserId] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [foundUser, setFoundUser] = useState(null);

  useEffect(() => {
    console.log('useEffect');
    // declair a async function inside useeffect
    const getUsers = async () => {
      const res = await fetch(`http://localhost:4000/users`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        // body: JSON.stringify(userId),
      });

      const getUsersReturn = await res.json();
      console.log('getUsersReturn', getUsersReturn);

      setUsersList(getUsersReturn.users);
    };
    console.log('getUsers', getUsers());
    console.log('usersList', usersList);
  }, []);

  const deleteUser = async (event) => {
    event.preventDefault();
    console.log('delete clicked');

    const res = await fetch(`http://localhost:4000/user/${userId.userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(userId),
    });

    const effectDelete = await res.json();
    console.log('effectDelete', effectDelete);

    // Do I need more here?
  };

  // cant get this to work. when you try to comeback it cant find state and wants to load. So may work when tried out but you cant log back in
  const findUser = async (event) => {
    event.preventDefault();
    console.log('finding users');

    const res = await fetch(`http://localhost:4000/user/${userId.userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const foundUserResult = await res.json();
    console.log('found user', foundUserResult);

    setFoundUser(foundUserResult.foundUser);
    console.log('state user', foundUser);
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

  return (
    <section>
      <h2>Admin Area</h2>
      <DeleteUser handleSubmit={deleteUser} handleChange={handleChange} />

      <h2>Find User</h2>
      <FindUser handleSubmit={findUser} handleChange={handleChange} />
      {foundUser && <p>Email: {foundUser.email}</p>}
      {foundUser && <a href='/'>Profile </a>}

      <h3>List of Users</h3>
      {usersList &&
        usersList.map((user, index) => {
          return (
            <ul>
              <li key={index}>
                ID: {user.id} Email: {user.email}
              </li>
            </ul>
          );
        })}
    </section>
  );
}

export default AdminArea;
