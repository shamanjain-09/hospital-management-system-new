import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    const [role, setRole] = useState(localStorage.getItem('role'));

    return (
        <div>
            {role ? (
                <Dashboard onLogout={() => setRole(null)} />
            ) : (
                <Login onLogin={(r) => setRole(r)} />
            )}
        </div>
    );
}

export default App;