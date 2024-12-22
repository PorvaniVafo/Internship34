import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: '' };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.message || 'An unexpected error occurred.' };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught in ErrorBoundary:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, errorMessage: '' });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: '#ffe6f2',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        maxWidth: '500px',
                        margin: '50px auto',
                    }}
                >
                    <h1 style={{ color: '#b30047' }}>Oops!</h1>
                    <p style={{ color: '#333' }}>Something went wrong:</p>
                    <p style={{ color: '#e60073', marginBottom: '20px' }}>{this.state.errorMessage}</p>
                    <button
                        onClick={this.handleRetry}
                        style={{
                            backgroundColor: '#ff66a3',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        Retry
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
