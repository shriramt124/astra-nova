import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Astrology from './components/Astrology'; // Assuming Astrology is the component for the astrology page
import Login from './components/Login'; // Assuming Login is the component for the login page
import Signup from './components/Signup'; // Assuming Signup is the component for the signup page
//import Home from './components/Home'; // Assuming Home is the component for the home page
import Navbar from './components/Navbar'; // Importing the Navbar component
//import HomePage from './components/Home';

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual login logic
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogin = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                // Handle login error
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });
            if (response.ok) {
                setIsLoggedIn(false);
            } else {
                // Handle logout error
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogout} isScrolled={isScrolled} />
            <Routes>
                {isLoggedIn ? (
                    <>

                        <Route path="/astrology" element={<Astrology />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<App />} />

                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
                    </>
                )}
            </Routes>
        </div>
    );
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </StrictMode>
);
