import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import { SCHEDULE, SECTIONS } from '../data.js'

export default function Schedule() {
  const bub = SECTIONS.find(s => s.id === '256cc')

  return (
    <div style={{ minHeight: '100vh', background: '#0E0E0E' }}>
      <Nav />

      <section style={{ padding: '140px 48px 80px', maxWidth: 700, margin: '0 auto' }}>
        <Link to="/bubmario" style={{ fontSize: 12, color: '#EF9F27', textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}>
          ← back to bubmario
        </Link>

        <div style={{ marginTop: 32, marginBottom: 48 }}>
          <div style={{
            display: 'inline-block', padding: '5px 16px', borderRadius: 20,
            background: 'rgba(239,159,39,0.1)', border: '1px solid rgba(239,159,39,0.25)',
            color: '#EF9F27', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            fontWeight: 500, marginBottom: 16, fontFamily: "'JetBrains Mono', monospace",
          }}>After hours</div>

          <h1 style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 700, color: '#F1EFE8', margin: '0 0 16px', fontFamily: "'Glitch Goblin', 'Space Grotesk', sans-serif" }}>
            Streaming schedule
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(241,239,232,0.5)', maxWidth: 520 }}>
            This isn't your typical 9-to-5 stream schedule. These are late-night sessions — after the day job, after the family stuff, after everything else. If you're up, come hang.
          </p>
        </div>

        {/* Schedule grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SCHEDULE.map((slot, i) => {
            const isModMon = slot.isModMondays
            const is256 = slot.is256CC

            const inner = (
              <div className="schedule-grid" style={{
                display: 'grid', gridTemplateColumns: '100px 100px 1fr', gap: 16, alignItems: 'center',
                padding: '18px 24px', borderRadius: 10,
                background: isModMon ? 'rgba(226,75,74,0.04)' : is256 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.02)',
                border: `0.5px solid ${isModMon ? 'rgba(226,75,74,0.15)' : is256 ? 'rgba(211,209,199,0.1)' : 'rgba(255,255,255,0.06)'}`,
                transition: 'all 0.3s ease',
                cursor: isModMon || is256 ? 'pointer' : 'default',
              }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#F1EFE8', margin: 0 }}>{slot.day}</p>
                  <p style={{ fontSize: 11, color: 'rgba(241,239,232,0.35)', margin: '2px 0 0', fontFamily: "'JetBrains Mono', monospace" }}>{slot.time}</p>
                </div>
                <div>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: slot.accent, marginBottom: 4 }}/>
                  <p style={{ fontSize: 13, fontWeight: 600, color: slot.accent, margin: 0,
                    fontFamily: isModMon ? "'Used Servers', 'JetBrains Mono', monospace" : is256 ? "'JetBrains Mono', monospace" : 'inherit',
                  }}>{slot.show}</p>
                </div>
                <div>
                  <p style={{ fontSize: 13, color: 'rgba(241,239,232,0.45)', margin: 0, fontStyle: is256 ? 'italic' : 'normal' }}>{slot.note}</p>
                  {isModMon && <p style={{ fontSize: 10, color: 'rgba(226,75,74,0.4)', margin: '4px 0 0', fontFamily: "'JetBrains Mono', monospace" }}>tap to explore →</p>}
                  {is256 && <p style={{ fontSize: 10, color: 'rgba(211,209,199,0.35)', margin: '4px 0 0', fontFamily: "'JetBrains Mono', monospace" }}>external link →</p>}
                </div>
              </div>
            )

            if (isModMon) {
              return <Link key={i} to="/bubmario/schedule/mod-mondays" style={{ textDecoration: 'none' }}>{inner}</Link>
            }
            if (is256 && slot.link) {
              return <a key={i} href={slot.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{inner}</a>
            }
            return <div key={i}>{inner}</div>
          })}
        </div>

        <div style={{ marginTop: 48, padding: '24px', borderRadius: 10, background: 'rgba(239,159,39,0.04)', border: '0.5px solid rgba(239,159,39,0.12)' }}>
          <p style={{ fontSize: 13, color: 'rgba(241,239,232,0.5)', margin: 0, lineHeight: 1.6 }}>
            All times are approximate — this is a side project, not a broadcast network. Streams usually go live within 30 minutes of the posted time.
            Follow{' '}
            <a href="https://twitter.com/bubmario" target="_blank" rel="noopener noreferrer" style={{ color: '#EF9F27' }}>@bubmario</a>{' '}
            for live notifications.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
