import AdminArea from '../components/admin/AdminArea';
import Header from '../components/header/Header';

function WelcomePage() {
  
  // useEffect
  // get email from token
  // find user by email
  // get users from api using :id as url
  // set isAdmin to true if res.data.data.use.role === admin


  return (
    <div className='welcome__container'>
      <h2>Welcome Page</h2>
      <Header />
      <AdminArea />
    </div>
  );
}

export default WelcomePage;
