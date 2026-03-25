import { useState, useEffect } from 'react'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import { BIO_FILMMAKER as BIO } from '../data.js'

// Hero background drop-in for About page
// Place image at /public/heroes/about-hero.jpg or video at /public/heroes/about-hero.mp4
function AboutHeroBg() {
  const [mediaType, setMediaType] = useState(null)

  useEffect(() => {
    const vid = document.createElement('video')
    vid.src = '/heroes/about-hero.mp4'
    vid.onloadeddata = () => setMediaType('video')
    vid.onerror = () => {
      const img = new Image()
      img.src = '/heroes/about-hero.jpg'
      img.onload = () => setMediaType('image')
      img.onerror = () => setMediaType(null)
    }
    return () => { vid.src = '' }
  }, [])

  if (!mediaType) return null

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      {mediaType === 'video' ? (
        <video src="/heroes/about-hero.mp4" muted playsInline autoPlay loop
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
      ) : (
        <img src="/heroes/about-hero.jpg" alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
      )}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(14,14,14,0.6) 0%, rgba(14,14,14,0.4) 40%, rgba(14,14,14,0.9) 100%)',
      }} />
    </div>
  )
}

export default function About() {
  return (
    <div style={{ minHeight: '100vh', background: '#0E0E0E' }}>
      <Nav />

      {/* Hero banner with drop-in background */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '140px 48px 80px', maxWidth: 720, margin: '0 auto' }}>
        <AboutHeroBg />
        <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(241,239,232,0.35)', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
          About
        </p>

        {/* Faded pull-quote headline */}
        <h2 style={{
          fontSize: 'clamp(24px,4vw,38px)', fontWeight: 700, color: 'rgba(241,239,232,0.12)',
          fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 40px', lineHeight: 1.2,
          fontStyle: 'italic', maxWidth: 600,
        }}>
          "It was clear from take one, day one that Jack's calling is behind the camera."
        </h2>

        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 48 }}>
          {/* Profile photo */}
          <div style={{
            width: 160, height: 200, borderRadius: 12, background: 'rgba(255,255,255,0.04)',
            border: '0.5px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            overflow: 'hidden',
          }}>
            <img src="/profile-jack.jpg" alt="Jack Albert" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span style="font-size:48px;font-weight:700;color:rgba(241,239,232,0.1);font-family:Space Grotesk,sans-serif">JA</span>' }} />
          </div>

          <div style={{ flex: 1, minWidth: 280 }}>
            <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F1EFE8', margin: '0 0 6px', fontFamily: "'Space Grotesk', sans-serif" }}>
              {BIO.name}
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(241,239,232,0.45)', margin: '0 0 20px', fontFamily: "'JetBrains Mono', monospace" }}>
              {BIO.title}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {BIO.credentials.map((c, i) => (
                <span key={i} style={{
                  fontSize: 11, padding: '4px 12px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)',
                  color: 'rgba(241,239,232,0.5)', fontFamily: "'JetBrains Mono', monospace",
                }}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        {BIO.bio.split('\n\n').map((p, i) => (
          <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(241,239,232,0.6)', margin: '0 0 24px' }}>
            {p.includes('filmography') ? p.split('filmography').map((part, j) =>
              j === 0 ? <span key={j}>{part}<a href="https://www.imdb.com/name/nm5786933/" target="_blank" rel="noopener noreferrer" style={{ color: '#E8B708', textDecoration: 'underline', textUnderlineOffset: 3 }}>filmography</a></span> : part
            ) : p}
          </p>
        ))}
        </div>{/* close zIndex:1 wrapper */}
      </section>

      {/* Casual DM note */}
      <section style={{ padding: '40px 48px 120px', maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F1EFE8', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 12px' }}>
          Say hi.
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(241,239,232,0.5)', margin: 0 }}>
          Feel free to send me a DM on{' '}
          <a href="https://x.com/JackJacksMind" target="_blank" rel="noopener noreferrer" style={{ color: '#F1EFE8', textDecoration: 'underline', textUnderlineOffset: 3 }}>Twitter</a>,{' '}
          <a href="https://bsky.app/profile/jackjacksmind.bsky.social" target="_blank" rel="noopener noreferrer" style={{ color: '#F1EFE8', textDecoration: 'underline', textUnderlineOffset: 3 }}>BlueSky</a>, or{' '}
          <a href="https://www.threads.net/@jackjacksmind" target="_blank" rel="noopener noreferrer" style={{ color: '#F1EFE8', textDecoration: 'underline', textUnderlineOffset: 3 }}>Threads</a>{' '}
          if you want to say hi. I'm always down for quick conversation, especially over a bite to eat. Do you like Taco Bell? If so, I'm already on my way. Otherwise, support me here at my{' '}
          <a href="https://buymeacoffee.com/JackAlbertORS" target="_blank" rel="noopener noreferrer" style={{ color: '#FFDD00', textDecoration: 'underline', textUnderlineOffset: 3 }}>BMC link</a>.
        </p>
      </section>

      <Footer showPixelJack />
    </div>
  )
}
