import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import { SECTIONS } from '../data.js'

export default function ModMondays() {
  const section = SECTIONS.find(s => s.id === 'modmon')
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: '#0E0E0E' }}>
      <Nav />

      <section style={{ padding: '140px 48px 80px', maxWidth: 800, margin: '0 auto' }}>
        <Link to="/bubmario/schedule" style={{ fontSize: 12, color: '#E24B4A', textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}>
          ← back to schedule
        </Link>

        <div style={{ marginTop: 32, marginBottom: 48, background: section.bgGrad, padding: '48px 0' }}>
          <div style={{
            display: 'inline-block', padding: '5px 16px', borderRadius: 20,
            background: 'rgba(226,75,74,0.08)', border: '1px solid rgba(226,75,74,0.2)',
            color: '#E24B4A', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            fontWeight: 500, marginBottom: 20, fontFamily: "'JetBrains Mono', monospace",
          }}>Every monday · 10 PM CT</div>

          <h1 style={{
            fontSize: 'clamp(40px,7vw,72px)', fontWeight: 700, color: '#F1EFE8',
            margin: '0 0 20px', lineHeight: 1.05, fontFamily: "'Used Servers', 'JetBrains Mono', monospace",
            letterSpacing: '0.02em',
          }}>Mod Mondays</h1>

          <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(241,239,232,0.6)', maxWidth: 560 }}>
            {section.description}
          </p>
        </div>

        {/* Offerings grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {section.offerings.map((item, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{
                padding: '20px 24px', borderRadius: 10,
                background: hovered === i ? 'rgba(226,75,74,0.06)' : 'rgba(255,255,255,0.02)',
                border: `0.5px solid ${hovered === i ? 'rgba(226,75,74,0.25)' : 'rgba(255,255,255,0.06)'}`,
                transition: 'all 0.3s ease', cursor: 'default',
              }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: '#E24B4A', marginBottom: 12, opacity: 0.6 }}/>
              <span style={{ fontSize: 14, color: hovered === i ? '#F1EFE8' : 'rgba(241,239,232,0.5)', transition: 'color 0.3s ease' }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Recent builds teaser */}
        <div style={{ marginTop: 64, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#F1EFE8', margin: '0 0 12px', fontFamily: "'Space Grotesk', sans-serif" }}>
            What gets torn down on Mondays
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(241,239,232,0.45)', maxWidth: 500 }}>
            Server rack builds with Xeon processors and Quadro GPUs. Nintendo Switch RCM loader setups.
            Console restorations. GPU swaps on machines that were never meant to be opened.
            If it has screws, it's getting opened.
          </p>
        </div>
      </section>

      <Footer section={section} />
    </div>
  )
}
