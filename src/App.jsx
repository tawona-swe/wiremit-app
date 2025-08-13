import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';

// A simple component to display messages instead of using alert()
const MessageBox = ({ message, type, onClose }) => {
    if (!message) return null;

    const bgColor = type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700';

    return (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-lg border-2 z-50 shadow-lg ${bgColor} flex items-center justify-between`} role="alert">
            <span className="block sm:inline mr-4">{message}</span>
            <span className="flex-shrink-0">
                <button onClick={onClose} className="text-xl leading-none font-semibold">&times;</button>
            </span>
        </div>
    );
};

// A Higher-Order Component to protect routes
const ProtectedRoute = ({ user, children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [user, navigate]);
    return user ? children : null;
};

// Main App component
const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [fxRates, setFxRates] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });

    // useEffect to try and load the user from localStorage on initial load
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            setCurrentUser(user);
        }

        // Fetch FX rates from the API
        const fetchFxRates = async () => {
            try {
                const response = await fetch('https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const rates = data.reduce((acc, obj) => ({ ...acc, ...obj }), {});
                setFxRates(rates);
            } catch (error) {
                console.error("Error fetching FX rates:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFxRates();
    }, []);

    // Functions to be passed down as props
    const handleLogin = (user) => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };
    
    // Function to set messages for user feedback
    const showMessage = (text, type = 'success') => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 5000); // Hide message after 5 seconds
    };

    return (
        <BrowserRouter>
            <div className="font-sans">
                <script src="https://cdn.tailwindcss.com"></script>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
                <style>{` body { font-family: 'Inter', sans-serif; } `}</style>

                <MessageBox message={message.text} type={message.type} onClose={() => setMessage({ text: '', type: '' })} />
                
                <Routes>
                    <Route path="/signup" element={<SignupPage showMessage={showMessage} />} />
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} showMessage={showMessage} />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute user={currentUser}>
                            <Dashboard
                                currentUser={currentUser}
                                fxRates={fxRates}
                                isLoading={isLoading}
                                onLogout={handleLogout}
                                showMessage={showMessage}
                            />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<LoginPage showMessage={showMessage} onLogin={handleLogin} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;