import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = { hasError: false, errorMessage: '' };

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught in boundary: ', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong: {this.state.errorMessage}</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;