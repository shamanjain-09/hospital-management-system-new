import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    const [role, setRole] = useState(localStorage.getItem('role'));

    const handleLogin = (userRole) => {
        setRole(userRole);
    };

    const handleLogout = () => {
        setRole(null);
    };

    return (
        <div>
            {role ? (
                <Dashboard onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;