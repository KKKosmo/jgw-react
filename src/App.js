import React, {useEffect, useState} from 'react';
import './App.css';
import Login from "./components/Login";
import Nav from "./components/Nav";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";

function App() {
    const [user, setUser] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await response.json();
                console.log(content.name);
                setUser(content.name);
            }
        )();
    });


    return (
        <div className="App">
            <BrowserRouter>
                <Nav name={user} setUser={setUser}/>

                <main className="form-signin">
                  <Routes>
                    <Route path="/" element={ <Home user={user} /> }></Route>
                    <Route path="/login" element={ <Login setUser={setUser} /> }></Route>
                  </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;