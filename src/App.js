import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './components/Login.tsx';
import Logout from './components/Logout.tsx';
import EditsComponent from './components/EditsComponent.tsx';
import MainFormSubmit from './components/MainFormSubmit.tsx';
import api from './components/api.tsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log(isAuthenticated);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <AuthenticatedRoutes onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

const AuthenticatedRoutes = ({ onLogout }) => {
  return (
    <>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<EditsComponent />} />
        <Route path="/mainFormSubmit" element={<MainFormSubmit />} />
        <Route path="/logout" element={<Logout onLogout={onLogout} />} />
      </Route>
    </>
  );
};

export default App;
