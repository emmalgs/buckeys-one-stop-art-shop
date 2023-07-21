import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

function AdminLogin() {
  const [loginSuccess, setLoginSuccess] = useState<string>('');
  const [logoutSuccess, setLogoutSuccess] = useState('');

  function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    }
    const email = target.email.value;
    const password = target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user.email as string
        setLoginSuccess(`Welcome back, ${user}`)
      })
      .catch((error: { message: string }) => {
        setLoginSuccess(`There was an error logging in: ${error.message}`)
      })
  }

  return (
    <div>
      <h1>Admin Login</h1>
      {loginSuccess}
      <form onSubmit={login}>
        <input type='email' name='email' placeholder='email' />
        <input type='password' name='password' placeholder='password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default AdminLogin;