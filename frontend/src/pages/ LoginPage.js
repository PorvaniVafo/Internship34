import React from 'react';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
    const handleLoginSuccess = () => {
        console.log('User logged in successfully');
    };

    return (
        <div>
            <h1>Login</h1>
            <AuthForm isLogin={true} onSuccess={handleLoginSuccess} />
        </div>
    );
};

export default LoginPage;
