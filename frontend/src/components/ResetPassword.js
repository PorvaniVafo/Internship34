import React, { useState } from 'react';
import { resetPassword } from '../api/authApi';

const ResetPassword = () => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await resetPassword(token, newPassword);
            setMessage(response);
        } catch (err) {
            setError(err.message || 'Something went wrong.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Reset Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword;
