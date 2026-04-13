import { Component, type ReactNode } from "react";
import { notifyError } from "@/lib/toast/notifyError";

interface IErrorBoundary {
  children: ReactNode;
  fallback: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  IErrorBoundary,
  IErrorBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    notifyError(error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default ErrorBoundary;
