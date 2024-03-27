import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:3000/login', { email, password })
  .then(res => {
    const { token, clientId } = res.data; // Destructure the response to get token and clientId
    localStorage.setItem('token', token);
    localStorage.setItem('clientId', clientId); // Store the user's ID in local storage
    console.log('Login successful');
    // Redirect upon successful login
    window.location.href = '/Home'; // Redirect using JavaScript
  })
  .catch(err => {
    setError('Invalid email or password');
    console.error('Login error:', err);
  });
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default Login;