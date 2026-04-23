import { Component } from 'react';

/**
 * Top-level error boundary. Catches render/effect errors in the tree below,
 * shows a friendly fallback, and offers a reload.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Don't spam the console in production; a crash reporter would hook here.
    if (import.meta.env?.DEV) {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          role="alert"
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            gap: '1rem',
          }}
        >
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Something went sideways 🛰️</h1>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: 480 }}>
            An unexpected error crashed this page. Refresh to try again — if it keeps happening,
            please let me know.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--color-primary)',
              color: 'var(--color-text)',
              border: 0,
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              cursor: 'pointer',
              minHeight: 44,
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
