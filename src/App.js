import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EditsComponent from './components/EditsComponent.tsx';
import MainFormSubmit from './components/MainFormSubmit.tsx';
import Login from './components/Login.tsx';
import Logout from './components/Logout.tsx';
import api from './components/api.tsx';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  console.log('React: init token =', localStorage.getItem('authToken'));

  const handleLogin = async (credentials) => {
    try {
      const response = await api.post('/login', credentials);

      if (response.status >= 200 && response.status < 300) {
        const token = response.data.token;

        // Save the token
        localStorage.setItem('authToken', token);

        // Log the id property of the token
        console.log('React: Login Successful, token id =', token?.id);

        setLoggedIn(true);
      } else if (response.status === 401) {
        console.error('Unauthorized - Invalid credentials');
      } else {
        console.error('Login failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
    }
  };

  const handleLogout = async () => {
    try {
      // Retrieve token from local storage
      const authToken = localStorage.getItem('authToken');
      console.log('Auth Token:', authToken);

      if (authToken) {
        await api.post('/logout', null, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        // Clear the token from local storage after successful logout
        localStorage.removeItem('authToken');
        setLoggedIn(false);
      } else {
        console.error('Authentication token is missing');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? <EditsComponent /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/mainFormSubmit" element={<MainFormSubmit />} />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
};

export default App;
