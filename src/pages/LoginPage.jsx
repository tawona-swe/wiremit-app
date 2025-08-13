import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin, showMessage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = ({ email, password }) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            onLogin(user);
            showMessage('Login successful!');
            navigate('/dashboard');
        } else {
            showMessage('Invalid email or password.', 'error');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            showMessage('Email and password are required.', 'error');
            return;
        }
        handleLoginSubmit({ email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
            {/* Background Image Container with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/img/bg.jpg')` }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            {/* Login Form Container */}
            <div className="relative w-full max-w-md bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/30">
                <div className="flex justify-center mb-6">
                    <img style={{width: '65px', height: '100%'}} src="/img/logo.png" alt="Logo" />
                </div>
                <h4 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h4>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/80"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/80"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="w-full p-2 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-700 transition-colors">Log In</button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Don't have an account?{' '}
                    <button onClick={() => navigate('/signup')} className="text-orange-500 font-bold hover:underline">Sign up</button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
