import * as React from 'react';
import './error-boundary.scss';

export interface ErrorBoundaryProps {
  children: React.ReactNode
}

export interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public render(): React.ReactElement | React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-message">
          <h1>Something went wrong.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
