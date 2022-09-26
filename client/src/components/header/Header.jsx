import React from 'react'
import './style.css'
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


function Header() {
    const navigate = useNavigate();

  // Signing out deletes your token from local storage to restrict you from certain urls
  const signOut = (event) => {
    event.preventDefault();
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '');
    navigate('../', { replace: true });
  };

  const protectedPage = (event) => {
    event.preventDefault();
    navigate('/testpage', { replace: true });
  }

  const loadHomePage = (event) => {
    event.preventDefault();
    navigate('/welcome', { replace: true });
  }

  const loadProfile = (event) => {
    event.preventDefault();
    navigate('/profile', { replace: true });
  }

  return (
    <header>
        <div className='logout'>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: 'grey',
            justifyContent: 'end',
            alignContent: 'center',
            width: '100vw',
            padding: '1rem',
          }}
        >
            <Box>
            <Stack spacing={2} direction='row'>
              <Button
                variant='contained'
                onClick={loadHomePage}
                sx={{
                  marginRight: '3rem',
                }}
              >
                Home
              </Button>
            </Stack>
          </Box>
          <Box>
            <Stack spacing={2} direction='row'>
              <Button
                variant='contained'
                onClick={loadProfile}
                sx={{
                  marginRight: '3rem',
                }}
              >
                Profile
              </Button>
            </Stack>
          </Box>

          <Box>
            <Stack spacing={2} direction='row'>
              <Button
                variant='contained'
                onClick={protectedPage}
                sx={{
                  marginRight: '3rem',
                }}
              >
                Protected
              </Button>
            </Stack>
          </Box>

          <Box>
            <Stack spacing={2} direction='row'>
              <Button
                variant='contained'
                onClick={signOut}
                sx={{
                  marginRight: '3rem',
                }}
              >
                Logout
              </Button>
            </Stack>
          </Box>
        </Box>
      </div>
    </header>
  )
}

export default Header