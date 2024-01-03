import React, { useState } from 'react';
import api from './api.tsx';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ name: '', password: '' });

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', credentials);
      if (response.status === 200 || response.status === 201) {
        onLogin();
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  // Function to extract token from cookie header
  const extractTokenFromCookie = (setCookieHeader) => {
    // Your implementation to extract the token from the cookie header
    // Example: You might use regex or a library like cookie-parser
    // For simplicity, let's assume the token is in the format 'token=<your_token>'
    const match = setCookieHeader.find(cookie => cookie.startsWith('token='));
    return match ? match.split('=')[1] : undefined;
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={credentials.name}
          onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
