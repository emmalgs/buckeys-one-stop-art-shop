import { auth } from '../../firebase';
import { useState } from 'react';
import { signOut } from 'firebase/auth';

function AdminLogout() {
  const [logoutSuccess, setLogoutSuccess] = useState('');

  function logout() {
    signOut(auth)
    .then(() => {
      setLogoutSuccess(`You are signed out`);
    })
    .catch((error: { message: string}) => {
      setLogoutSuccess(`There was an error signing out: ${error.message}`)
    });
  }
  return (
    <div className='logout'>
      <h2>Logout</h2>
      {logoutSuccess}
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default AdminLogout;

