import React from 'react';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
    return (
        <div>
            <h1>Register</h1>
            <AuthForm isLogin={false} />
        </div>
    );
};

export default RegisterPage;
