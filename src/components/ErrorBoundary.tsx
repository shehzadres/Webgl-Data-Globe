import { Component, type ReactNode } from 'react'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className={styles.container} role="alert">
          <div className={styles.inner}>
            <h1 className={styles.title}>RENDERING ERROR</h1>
            <p className={styles.message}>
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
            <button
              className={styles.btn}
              onClick={() => window.location.reload()}
            >
              Reload Application
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
