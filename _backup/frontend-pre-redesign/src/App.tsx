import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import Technology from './pages/Technology'
import Results from './pages/Results'
import Roadmap from './pages/Roadmap'
import Resources from './pages/Resources'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="technology" element={<Technology />} />
        <Route path="results" element={<Results />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="resources" element={<Resources />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
