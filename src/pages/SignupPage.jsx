import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = ({ showMessage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = ({ name, email, password }) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.email === email)) {
            showMessage('An account with this email already exists.', 'error');
            return;
        }
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        showMessage('Account created successfully! Please log in.');
        navigate('/login');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            showMessage('All fields are required.', 'error');
            return;
        }
        handleSignup({ name, email, password });
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

            {/* Signup Form Container */}
            <div className="relative w-full max-w-md bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/30">
                <div className="flex justify-center mb-3">
                    <img style={{width: '65px', height: '100%'}} src="/img/logo.png" alt="Logo" />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/80"
                            placeholder="Enter your name"
                        />
                    </div>
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
                    <button type="submit" className="w-full p-2 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-700 transition-colors">Sign Up</button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <button onClick={() => navigate('/login')} className="text-orange-500 font-bold hover:underline">Log in</button>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
