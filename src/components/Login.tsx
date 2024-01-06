import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ name: '', password: '' });

  const handleLogin = () => {
    onLogin(credentials);
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
