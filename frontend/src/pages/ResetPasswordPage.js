import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/authApi';

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = searchParams.get('token');
        if (!token) {
            setError('Token is missing.');
            return;
        }

        try {
            const response = await resetPassword(token, newPassword);
            setMessage(response);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.message || 'Failed to reset password.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Reset Password</h1>
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPasswordPage;
