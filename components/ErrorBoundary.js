import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='text-center py-12'>
          <h2 className='text-2xl font-bold mb-4'>Something went wrong</h2>
          <p className='mb-4'>Please try refreshing the page</p>
          <button
            onClick={() => window.location.reload()}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
