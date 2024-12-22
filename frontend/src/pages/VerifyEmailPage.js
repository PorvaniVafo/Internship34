import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../api/authApi';

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            verifyEmail(token)
                .then((data) => {
                    setMessage(data);
                    setTimeout(() => navigate('/login'), 3000);
                })
                .catch((err) => setError(err.message || 'Invalid or expired token.'));
        } else {
            setError('Verification token is missing.');
        }
    }, [searchParams, navigate]);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message} Redirecting to login...</p>}
        </div>
    );
};

export default VerifyEmailPage;
