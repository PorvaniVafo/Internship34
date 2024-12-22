import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18+
import App from './App'; // Main App Component
import './index.css'; // Import your styles

// Get the root element from your HTML
const rootElement = document.getElementById('root');

// Create and render the React app
const root = createRoot(rootElement); // Using createRoot for React 18
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
