import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Nav = (props: { name: string, setUser: (name: string) => void }) => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        props.setUser('');
        handleNavCollapse(); // Close the menu after logout
    }

    let menu;
    if (props.name === '') {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link" onClick={handleNavCollapse}>Login</Link>
                    <h1 className='navText'>Please log in first</h1>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav mb-2 mb-md-0">
                <li className='nav-item active'>
                    <Link to="/" className="navbar-brand" onClick={handleNavCollapse}>Home</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/login" className="nav-link" onClick={() => { logout(); }}>Logout</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/MainFormSubmit" className="nav-link" onClick={handleNavCollapse}>New Book</Link>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">

                {/* Navbar Brand */}
                <Link to="/" className="navbar-brand" onClick={handleNavCollapse}>Your Brand Name</Link>

                {/* Navbar Toggler */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded={!isNavCollapsed ? true : false} 
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Items */}
                <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarNav">
                    {menu}
                </div>

            </div>
        </nav>
    );
};

export default Nav;
