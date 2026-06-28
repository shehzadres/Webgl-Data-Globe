import { ErrorBoundary } from './components/ErrorBoundary'
import { AppRouter } from './AppRouter'

export default function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  )
}
