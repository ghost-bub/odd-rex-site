import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import BrandPage from './pages/BrandPage.jsx'
import About from './pages/About.jsx'
import Schedule from './pages/Schedule.jsx'
import ModMondays from './pages/ModMondays.jsx'
import { SECTIONS } from './data.js'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      {SECTIONS.filter(s => s.slug !== '/').map(s => (
        <Route key={s.id} path={s.slug} element={<BrandPage sectionId={s.id} />} />
      ))}
      <Route path="/bubmario/schedule" element={<Schedule />} />
      <Route path="/bubmario/schedule/mod-mondays" element={<ModMondays />} />
    </Routes>
  )
}
