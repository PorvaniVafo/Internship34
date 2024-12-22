import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../api/authApi';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            verifyEmail(token)
                .then((data) => {
                    setMessage(data);
                    setTimeout(() => {
                        navigate('/diary');
                    }, 3000);
                })
                .catch((err) => {
                    setError(err.message || 'Invalid or expired token.');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setError('Verification token is missing.');
            setIsLoading(false);
        }
    }, [searchParams, navigate]);

    return (
        <div className="verify-email-page">
            {isLoading && <p style={{ color: 'blue' }}>Verifying your email...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!isLoading && message && (
                <p style={{ color: 'green' }}>
                    {message} Redirecting to your diary page...
                </p>
            )}
        </div>
    );
};

export default VerifyEmail;
