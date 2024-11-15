// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//{isRegistering ? "Already have an account? Log in" : "Need an account? Register"}
export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Retrieve user data from localStorage
        const storedUserData = localStorage.getItem(username);

        if (!storedUserData) {
            setMessage('User does not exist. Please register first.');
            return;
        }

        const userData = JSON.parse(storedUserData);

        // Verify password
        if (userData.password === password) {
            localStorage.setItem('isAuthenticated', 'true');
            setMessage('Login successful!');
            setUsername('');
            setPassword('');
            navigate('/account');
        } else {
            setMessage('Incorrect password. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 border rounded-lg shadow-lg bg-white mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Username:</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Password:</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
}
