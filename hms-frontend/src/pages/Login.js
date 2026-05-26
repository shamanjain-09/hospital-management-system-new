import React, { useState } from 'react';
import { login } from '../services/api';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await login({ email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('name', res.data.name);
            onLogin(res.data.role);
        } catch (err) {
            setError('Invalid email or password');
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>🏥 Hospital Management</h2>
                <p style={styles.subtitle}>Sign in to your account</p>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label style={styles.label}>Email</label>
                    <input style={styles.input} type="email"
                        placeholder="admin@hospital.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <label style={styles.label}>Password</label>
                    <input style={styles.input} type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <button style={styles.button} type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
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
        background: 'linear-gradient(135deg, #1a73e8, #0d47a1)'
    },
    card: {
        background: 'white', padding: '40px',
        borderRadius: '16px', width: '380px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
    },
    title: { textAlign: 'center', marginBottom: '4px', color: '#1a73e8' },
    subtitle: { textAlign: 'center', color: '#888', marginBottom: '24px', fontSize: '14px' },
    label: { fontSize: '13px', color: '#555', fontWeight: 'bold' },
    input: {
        width: '100%', padding: '12px', marginBottom: '16px',
        marginTop: '4px', borderRadius: '8px', border: '1px solid #ddd',
        fontSize: '14px', boxSizing: 'border-box'
    },
    button: {
        width: '100%', padding: '12px', background: '#1a73e8',
        color: 'white', border: 'none', borderRadius: '8px',
        fontSize: '16px', cursor: 'pointer', marginTop: '8px'
    },
    error: {
        color: 'red', textAlign: 'center', background: '#fff0f0',
        padding: '8px', borderRadius: '6px', marginBottom: '12px'
    }
};

export default Login;