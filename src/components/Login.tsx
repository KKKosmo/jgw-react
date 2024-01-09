import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from "react-router-dom";

const Login = (props: { setUser: (user: string) => void }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name,
        password
      })
    });

    const content = await response.json();

    setRedirect(true);
    console.log(content.user);
    props.setUser(content.user);
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
      <input type="text" className="form-control" placeholder="Username" required
        onChange={e => setName(e.target.value)}
      />

      <input type="password" className="form-control" placeholder="Password" required
        onChange={e => setPassword(e.target.value)}
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>
  );
};

export default Login;