import React, { useState } from 'react';
import { login } from '../services/api';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('name', res.data.name);
            onLogin(res.data.role);
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>🏥 HMS Login</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button style={styles.button} type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex', justifyContent: 'center',
        alignItems: 'center', height: '100vh',
        background: '#f0f2f5'
    },
    card: {
        background: 'white', padding: '40px',
        borderRadius: '12px', width: '360px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    title: {
        textAlign: 'center', marginBottom: '24px',
        color: '#1a73e8'
    },
    input: {
        width: '100%', padding: '12px',
        marginBottom: '16px', borderRadius: '8px',
        border: '1px solid #ddd', fontSize: '14px',
        boxSizing: 'border-box'
    },
    button: {
        width: '100%', padding: '12px',
        background: '#1a73e8', color: 'white',
        border: 'none', borderRadius: '8px',
        fontSize: '16px', cursor: 'pointer'
    },
    error: { color: 'red', textAlign: 'center' }
};

export default Login;