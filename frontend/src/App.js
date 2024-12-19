import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/edit/:id" element={<EditPage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
