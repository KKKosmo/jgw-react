import React from 'react';
import api from './api.tsx';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await api.post('/logout');
      onLogout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
 