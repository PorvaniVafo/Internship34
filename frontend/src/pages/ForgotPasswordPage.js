import React, { useState } from 'react';
import { requestPasswordReset } from '../api/authApi';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await requestPasswordReset(email);
            setMessage(response);
        } catch (err) {
            setError(err.message || 'Something went wrong.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Forgot Password</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Send Reset Link</button>
        </form>
    );
};

export default ForgotPasswordPage;
