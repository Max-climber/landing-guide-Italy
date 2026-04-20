import { getRouteComponent } from './pages/routes.jsx'
import HomeHubPage from './pages/HomeHubPage'

function App() {
  const route = getRouteComponent(window.location.pathname)

  if (route?.Component) {
    const Page = route.Component
    return <Page />
  }

  return <HomeHubPage />
}

export default App
