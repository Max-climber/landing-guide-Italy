import { getRouteComponent } from './pages/routes.jsx'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const route = getRouteComponent(window.location.pathname)

  if (!route?.Component) {
    return <NotFoundPage />
  }

  const Page = route.Component
  return <Page />
}

export default App
