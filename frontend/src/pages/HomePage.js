import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Welcome to My Diary</h1>
            <p>Your private place to write and manage your thoughts.</p>
            <div className="home-links">
                <Link to="/login" className="button-link">Login</Link>
                <Link to="/register" className="button-link">Register</Link>
            </div>
        </div>
    );
};

export default HomePage;
