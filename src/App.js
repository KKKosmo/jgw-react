import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./dist/Login";
import Nav from "./dist/Nav";
import Home from "./dist/Home";
import MainFormSubmit from "./dist/MainFormSubmit";
import EditForm from './dist/EditForm';
import EventHistory from './dist/EventHistory';

function App() {
    const [user, setUser] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();
                setUser(content.name);
            }
        )();
    });


    return (
        <div className="App">
            <BrowserRouter>
                <Nav name={user} setUser={setUser} />

                <main className="form-signin">
                    <Routes>
                        <Route path="/" element={<Home user={user} />}></Route>
                        <Route path="/login" element={<Login setUser={setUser} />}></Route>
                        <Route path="/mainFormSubmit" element={<MainFormSubmit user={user} />}></Route>
                        <Route path="/eventHistory" element={<EventHistory />} />
                        <Route path="/edit/:id" element={<EditForm />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;