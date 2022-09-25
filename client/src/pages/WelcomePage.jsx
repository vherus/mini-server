import { useNavigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import AdminArea from '../components/admin/AdminArea';

function WelcomePage() {
  // So i can set the logout link to '/'
  const navigate = useNavigate();

  // Signing out deletes your token from local storage to restrict you from certain urls
  const signOut = (event) => {
    event.preventDefault();
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '');
    navigate('../', { replace: true });
  };

  return (
    <div className='welcome__container'>
      <h2>Welcome Page</h2>
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

      <AdminArea />
    </div>
  );
}

export default WelcomePage;
