import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './users/registration/RegistrationPage';
import LoginPage from './users/login/LoginPage';
import WelcomePage from './pages/WelcomePage';
import TestPage from './pages/TestPage';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';

// Profile route doesnt work inside autheticate 
function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    console.log('App useEffect');
    const id = getLoggedInUserId()
    console.log('id', id);
    // declair a async function inside useeffect
    const getUser = async () => {
      const res = await fetch(`http://localhost:4000/user/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        // body: JSON.stringify(userId),
      });

      const getUserReturn = await res.json();
      console.log('getUserReturn', getUserReturn);

      setUser(getUserReturn);
    };
    console.log('getUser', getUser());
    console.log('user', user);
  }, []);

  const getLoggedInUserId = () => {
    const loadedToken = localStorage.getItem('token');
    console.log('loadedToken', loadedToken);
    if (loadedToken === null || loadedToken === '') {
      return null;
    }
    const decoded = jwt_decode(loadedToken);
    console.log('decoded token', decoded);
    console.log('userEmail decoded', decoded.email);
    console.log('userId decoded', decoded.id);
    return decoded.id;
  };

  return (
    <div className='App'>
      <main>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegistrationPage />} />

          <Route element={<AuthenticateUser />}>
            <Route path='/welcome' element={<WelcomePage />} />
          </Route>

            <Route path='/profile' element={<Profile user={user}/>} />

          <Route element={<CheckAdmin />}>
            <Route path='/testpage' element={<TestPage />} />
          </Route>
        </Routes>

        <Box>
          <Stack spacing={2} direction='row'>
            <Button
              variant='contained'
              onClick={getLoggedInUserId}
              sx={{
                margin: '1rem',
              }}
            >
              Test Token Decode
            </Button>
          </Stack>
        </Box>
      </main>
    </div>
  );
}

// Runs on every page to check if you have a token which will mean you are logged in
function isLoggedIn() {
  console.log('isloggedIn');
  const loadedToken = localStorage.getItem('token');
  console.log('token', loadedToken);
  return !(loadedToken === '');
}

export default App;

// If user passes the above test and has a token they are taken to <WelcomePage /> or '/'
const AuthenticateUser = ({ children, redirectPath = '/' }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />;
  }
  console.log('authenicateUser');
  return <WelcomePage />;
};

const CheckAdmin = (user) => {
  console.log('checking admin status');
  console.log('user', user);
};
