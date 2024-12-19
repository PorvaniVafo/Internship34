import React, { useState } from 'react';
import { registerUser, loginUser } from '../api/authApi';
import { useHistory } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validation';

const AuthForm = ({ isLogin, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Invalid email format');
            return;
        }
        if (!validatePassword(password)) {
            setError('Password is too weak');
            return;
        }

        setLoading(true);
        try {
            if (isLogin) {
                await loginUser(email, password);
                onSuccess();
                history.push('/');
            } else {
                await registerUser(email, password);
                history.push('/login');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p>{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
            </button>
        </form>
    );
};

export default AuthForm;
