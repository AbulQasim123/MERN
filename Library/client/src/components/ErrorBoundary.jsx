import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error", error, info);
        // yahan Sentry / LogRocket / API call ja sakta hai
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="p-4 text-center">
                        <h5>Something went wrong</h5>
                        <p>Please refresh or try again later.</p>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
