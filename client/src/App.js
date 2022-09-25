import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './users/registration/RegistrationPage';
import LoginPage from './users/login/LoginPage';
import WelcomePage from './pages/WelcomePage';
import TestPage from './pages/TestPage';
import { useEffect, useState } from 'react';
// import jwt_decode from 'jwt-decode';

function App() {
  const [user, setUser] = useState('')

  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          <Route element={<AuthenticateUser />}>
            <Route path='/welcome' element={<WelcomePage />} />

          </Route>

          <Route path='/testpage' element={<TestPage />} />
        </Routes>
      </main>
    </div>
  );
}

// Runs on every page to check if you have a token which will mean you are logged in
function isLoggedIn() {
  console.log('isloggedIn');
  const loadedToken = localStorage.getItem('token');
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