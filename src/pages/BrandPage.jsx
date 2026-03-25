import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { SECTIONS, BIO_FREELANCER } from '../data.js'

// ═══════════════════════════════════════════════════════════════
// HERO BACKGROUND — full-page drop-in image or video
// ═══════════════════════════════════════════════════════════════
// Drop a hero image or video into /public/heroes/:
//   /public/heroes/av-hero.jpg     (or .mp4)  — Albert Video page
//   /public/heroes/bub-hero.jpg    (or .mp4)  — bubmario page
//   /public/heroes/mod-hero.jpg    (or .mp4)  — Mod Mondays page
//
// The component checks for video first, then image.
// If neither exists, it falls back to the section gradient.
// ═══════════════════════════════════════════════════════════════
function HeroBg({ sectionId }) {
  const [mediaType, setMediaType] = useState(null) // 'video' | 'image' | null
  const videoRef = useRef(null)
  const slug = sectionId === 'av' ? 'av' : sectionId === '256cc' ? 'bub' : sectionId === 'modmon' ? 'mod' : sectionId

  useEffect(() => {
    // Try video first
    const vid = document.createElement('video')
    vid.src = `/heroes/${slug}-hero.mp4`
    vid.onloadeddata = () => setMediaType('video')
    vid.onerror = () => {
      // Try image
      const img = new Image()
      img.src = `/heroes/${slug}-hero.jpg`
      img.onload = () => setMediaType('image')
      img.onerror = () => setMediaType(null)
    }
    return () => { vid.src = '' }
  }, [slug])

  if (!mediaType) return null

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      {mediaType === 'video' ? (
        <video
          ref={videoRef}
          src={`/heroes/${slug}-hero.mp4`}
          muted playsInline autoPlay loop
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}
        />
      ) : (
        <img
          src={`/heroes/${slug}-hero.jpg`}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}
        />
      )}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(14,14,14,0.7) 0%, rgba(14,14,14,0.4) 40%, rgba(14,14,14,0.85) 100%)',
      }} />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PORTFOLIO — Client & professional work from Frame.io portfolio
// ═══════════════════════════════════════════════════════════════
// Thumbnail system: place images in /public/portfolio/{slug}.jpg
// The component will look for that file first; if missing, it
// shows the category icon as a placeholder — no broken images.

const PORTFOLIO_CATEGORIES = [
  { key: 'ministry',    label: 'Ministry & Worship',  icon: '✦' },
  { key: 'wedding',     label: 'Weddings',            icon: '◇' },
  { key: 'corporate',   label: 'Corporate & Events',  icon: '▪' },
  { key: 'documentary', label: 'Documentary',         icon: '◉' },
  { key: 'education',   label: 'Education',           icon: '△' },
]

const PORTFOLIO_ITEMS = [
  // Ministry & Worship
  { title: 'Men of His Word — 2024 Recap',        category: 'ministry',    slug: 'men-of-his-word',        desc: 'Live worship event recap' },
  { title: 'Love Has Won — Music Video',           category: 'ministry',    slug: 'love-has-won',           desc: 'Church worship music video' },
  { title: 'St. Marcus — Journey of Discipleship',  category: 'ministry',    slug: 'stmarcus-discipleship',  desc: 'Ministry overview' },
  { title: 'St. Marcus — Generosity Promo',         category: 'ministry',    slug: 'stmarcus-generosity',    desc: 'Church promotional' },
  { title: 'General Fund — I AM',                   category: 'ministry',    slug: 'general-fund-iam',       desc: 'Ministry fundraising' },
  { title: 'Time of Grace — 2019 Closing Titles',   category: 'ministry',    slug: 'tog-closing-titles',     desc: 'Broadcast media' },
  { title: 'Pastor Jeske — A Look Back',            category: 'ministry',    slug: 'pastor-jeske-lookback',  desc: 'Documentary tribute' },
  { title: 'Chant Claire Christmas — Song Clip',    category: 'ministry',    slug: 'chant-claire',           desc: 'Choral performance' },

  // Weddings
  { title: 'Matt & Melissa Thompson — Engagement',  category: 'wedding',     slug: 'thompson-engagement',    desc: 'Engagement film' },
  { title: 'Rachel & Will Bailey — Highlight Reel', category: 'wedding',     slug: 'bailey-wedding',         desc: 'Wedding highlight reel' },
  { title: 'Chase & Lydia Jones — Wedding',         category: 'wedding',     slug: 'jones-wedding',          desc: 'Wedding featurette' },

  // Corporate & Events
  { title: 'DJ Magician — Sizzle Reel 2024',        category: 'corporate',   slug: 'dj-magician',            desc: 'Live concert/event production' },
  { title: 'PTC-Rockwell-CAMA Partnership',          category: 'corporate',   slug: 'ptc-rockwell',           desc: 'Corporate trade show' },
  { title: 'StMarcus School — Gala 2021 Recap',      category: 'corporate',   slug: 'gala-2021',              desc: 'School gala event' },
  { title: 'Gala 2023 — Sponsorship Video',          category: 'corporate',   slug: 'gala-2023',              desc: 'Nonprofit gala sponsorship' },
  { title: 'Awake & Alive — Winter 2019 Recap',      category: 'corporate',   slug: 'awake-alive',            desc: 'Event recap' },
  { title: 'HannahRicke — Hiking in the Sky',        category: 'corporate',   slug: 'hannahricke-hiking',     desc: 'Documentary/art event' },

  // Documentary
  { title: '42 — The Life & Career of Mark Jeske',   category: 'documentary', slug: '42-mark-jeske',          desc: 'Feature documentary trailer' },
  { title: 'Mile Marker #4 — Marya Haegler',         category: 'documentary', slug: 'mile-marker-4',          desc: 'Documentary interview series' },
  { title: 'Mile Marker #5 — Gene Schulz',           category: 'documentary', slug: 'mile-marker-5',          desc: 'Documentary interview series' },

  // Education
  { title: 'Thrive Time — Middle School Lesson 1',   category: 'education',   slug: 'thrive-time',            desc: 'Educational curriculum' },

  // Ministry (additional)
  { title: 'TOG — August 2018 Transition Promo',      category: 'ministry',    slug: 'tog-aug-2018',           desc: 'Broadcast promo' },
  { title: 'TOG — July 2018 Premium',                 category: 'ministry',    slug: 'tog-jul-2018',           desc: 'Broadcast premium' },
  { title: 'TOG — February 2019 Premium',             category: 'ministry',    slug: 'tog-feb-2019',           desc: 'Broadcast premium' },

  // Corporate (additional)
  { title: 'The Core — "Reap What You Root" Trailer', category: 'corporate',   slug: 'the-core-trailer',       desc: 'Promotional trailer' },
]

function PortfolioThumb({ item }) {
  const [imgOk, setImgOk] = useState(true)
  const cat = PORTFOLIO_CATEGORIES.find(c => c.key === item.category)
  return (
    <div style={{
      borderRadius: 10, overflow: 'hidden', position: 'relative',
      background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)',
      aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {imgOk ? (
        <img
          src={`/portfolio/${item.slug}.jpg`}
          alt={item.title}
          onError={() => setImgOk(false)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <span style={{ fontSize: 28, opacity: 0.15 }}>{cat?.icon || '▪'}</span>
      )}
    </div>
  )
}

function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const scrollRef = useRef(null)
  const filtered = activeFilter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(p => p.category === activeFilter)

  const scroll = (dir) => {
    if (!scrollRef.current) return
    const amount = 300
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section style={{ padding: '80px 48px 40px', maxWidth: 900, margin: '0 auto' }}>
      <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(241,239,232,0.35)', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
        Portfolio
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h2 style={{ fontSize: 'clamp(24px,4vw,34px)', fontWeight: 700, color: '#F1EFE8', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>
          Selected work
        </h2>
        {/* Carousel arrows */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => scroll('left')} style={{
            width: 36, height: 36, borderRadius: 8, border: '0.5px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)', color: '#F1EFE8', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease',
          }}>←</button>
          <button onClick={() => scroll('right')} style={{
            width: 36, height: 36, borderRadius: 8, border: '0.5px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)', color: '#F1EFE8', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease',
          }}>→</button>
        </div>
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(241,239,232,0.5)', margin: '0 0 32px' }}>
        A cross-section of professional projects — ministry broadcasts, weddings, corporate media, documentary, and educational content.
      </p>

      {/* Category filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        <button onClick={() => setActiveFilter('all')} style={{
          padding: '6px 16px', borderRadius: 20, border: '0.5px solid',
          borderColor: activeFilter === 'all' ? 'rgba(55,138,221,0.5)' : 'rgba(255,255,255,0.08)',
          background: activeFilter === 'all' ? 'rgba(55,138,221,0.12)' : 'transparent',
          color: activeFilter === 'all' ? '#378ADD' : 'rgba(241,239,232,0.45)',
          fontSize: 12, cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace",
          transition: 'all 0.3s ease',
        }}>All</button>
        {PORTFOLIO_CATEGORIES.map(cat => (
          <button key={cat.key} onClick={() => setActiveFilter(cat.key)} style={{
            padding: '6px 16px', borderRadius: 20, border: '0.5px solid',
            borderColor: activeFilter === cat.key ? 'rgba(55,138,221,0.5)' : 'rgba(255,255,255,0.08)',
            background: activeFilter === cat.key ? 'rgba(55,138,221,0.12)' : 'transparent',
            color: activeFilter === cat.key ? '#378ADD' : 'rgba(241,239,232,0.45)',
            fontSize: 12, cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace",
            transition: 'all 0.3s ease',
          }}>{cat.icon} {cat.label}</button>
        ))}
      </div>

      {/* Horizontal carousel */}
      <div
        ref={scrollRef}
        className="carousel-scroll"
        style={{
          display: 'flex', gap: 16, overflowX: 'auto', scrollSnapType: 'x mandatory',
          paddingBottom: 16,
        }}
      >
        {filtered.map((item, i) => (
          <a key={i} href="https://f.io/Rds8xVay" target="_blank" rel="noopener noreferrer" style={{
            minWidth: 280, maxWidth: 280, flexShrink: 0, scrollSnapAlign: 'start',
            borderRadius: 12, overflow: 'hidden',
            background: 'rgba(255,255,255,0.02)',
            border: '0.5px solid rgba(255,255,255,0.06)',
            transition: 'all 0.3s ease', textDecoration: 'none', display: 'block',
          }}>
            <PortfolioThumb item={item} />
            <div style={{ padding: '12px 16px' }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: '#F1EFE8', margin: '0 0 4px', fontFamily: "'Space Grotesk', sans-serif" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 11, color: 'rgba(241,239,232,0.35)', margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
                {item.desc}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Drop-in instructions (HTML comment won't render but code comment helps) */}
      {/* To add thumbnails: save 16:9 JPGs to /public/portfolio/{slug}.jpg */}
    </section>
  )
}

function PixelJack() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => navigate('/bubmario')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="???"
      style={{
        position: 'fixed', bottom: 24, right: 24, cursor: 'pointer', zIndex: 50,
        transition: 'transform 0.3s ease', transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <svg width="48" height="56" viewBox="0 0 12 14" style={{ imageRendering: 'pixelated' }}>
        <rect x="3" y="0" width="6" height="2" fill="#3B2F1A"/>
        <rect x="2" y="1" width="8" height="1" fill="#3B2F1A"/>
        <rect x="2" y="2" width="8" height="4" fill="#F0C8A0"/>
        <rect x="4" y="3" width="1" height="1" fill="#1A1A1A"/>
        <rect x="7" y="3" width="1" height="1" fill="#1A1A1A"/>
        <rect x="5" y="5" width="2" height="1" fill="#C88870"/>
        <rect x="2" y="6" width="8" height="4" fill="#2A2A2A"/>
        <rect x="0" y="7" width="2" height="3" fill="#2A2A2A"/>
        <rect x="10" y="7" width="2" height="3" fill="#2A2A2A"/>
        <rect x="5" y="7" width="2" height="2" fill="#F1EFE8"/>
        <rect x="2" y="10" width="3" height="2" fill="#1A3055"/>
        <rect x="7" y="10" width="3" height="2" fill="#1A3055"/>
        <rect x="2" y="12" width="3" height="2" fill="#4A4A4A"/>
        <rect x="7" y="12" width="3" height="2" fill="#4A4A4A"/>
      </svg>
      {hovered && (
        <div style={{
          position: 'absolute', bottom: '100%', right: 0, marginBottom: 8,
          padding: '4px 10px', borderRadius: 6, background: 'rgba(14,14,14,0.9)',
          border: '0.5px solid rgba(255,255,255,0.1)', whiteSpace: 'nowrap',
          fontSize: 11, color: '#EF9F27', fontFamily: "'Glitch Goblin', monospace",
        }}>player 2 <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>?</span></div>
      )}
    </div>
  )
}

function SocialIcon({ type, url }) {
  const [hov, setHov] = useState(false)
  const icons = {
    youtube: 'M23.5 6.5a3 3 0 00-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4a3 3 0 00-2.1 2.1C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 002.1 2.1c1.9.4 9.4.4 9.4.4s7.5 0 9.4-.4a3 3 0 002.1-2.1c.5-1.9.5-5.5.5-5.5s0-3.6-.5-5.5zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z',
    twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    instagram: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z',
    facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    twitch: 'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z',
  }
  const labels = { youtube: 'YouTube', twitter: 'X / Twitter', instagram: 'Instagram', twitch: 'Twitch', facebook: 'Facebook' }
  if (!icons[type]) return null
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      title={labels[type] || type}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={(e) => { e.stopPropagation(); window.open(url, '_blank', 'noopener,noreferrer') }}
      style={{
        width: 36, height: 36, borderRadius: 8,
        background: hov ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
        border: hov ? '0.5px solid rgba(255,255,255,0.2)' : '0.5px solid rgba(255,255,255,0.08)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s ease', textDecoration: 'none',
        cursor: 'pointer', position: 'relative', zIndex: 5,
      }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill={hov ? 'rgba(241,239,232,0.85)' : 'rgba(241,239,232,0.5)'}><path d={icons[type]}/></svg>
    </a>
  )
}

export default function BrandPage({ sectionId }) {
  const section = SECTIONS.find(s => s.id === sectionId)
  const [hovered, setHovered] = useState(null)
  if (!section) return null

  const isAV = section.id === 'av'
  const isBub = section.id === '256cc'
  const accent = section.isMonochrome ? '#888780' : section.accent
  const avBio = isAV ? BIO_FREELANCER : null

  return (
    <div style={{ minHeight: '100vh', background: '#0E0E0E' }}>
      <Nav />

      {/* Hero — supports drop-in background image/video from /public/heroes/ */}
      <section style={{ padding: '140px 48px 80px', maxWidth: 900, margin: '0 auto', background: section.bgGrad, minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <HeroBg sectionId={section.id} />
        <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-block', padding: '4px 14px', borderRadius: 20,
          border: `1px solid ${accent}66`, color: accent,
          fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
          marginBottom: 20, fontFamily: "'JetBrains Mono', monospace", alignSelf: 'flex-start',
        }}>{section.tagline}</div>

        {isAV ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
              <defs><linearGradient id="av-brand" x1="0" y1="0" x2="80" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#639922"/><stop offset="100%" stopColor="#378ADD"/>
              </linearGradient></defs>
              <text x="0" y="42" fill="url(#av-brand)" fontFamily="'Astron Boy','Space Grotesk',sans-serif" fontWeight="700" fontSize="50" letterSpacing="-1">AV</text>
            </svg>
            <h1 style={{ fontSize: 'clamp(36px,6vw,56px)', fontWeight: 700, color: '#F1EFE8', margin: 0, lineHeight: 1.05, fontFamily: section.titleFont }}>
              Albert Video
            </h1>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: isBub ? 20 : 0, marginBottom: 20 }}>
            {/* Circular profile picture — drop-in: save as /public/profile-bubmario.jpg */}
            {isBub && (
              <div style={{
                width: 80, height: 80, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(239,159,39,0.08)', border: '2px solid rgba(239,159,39,0.25)',
                overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img
                  src="/bubmario-header.jpg"
                  alt="bubmario"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                />
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '100%', height: '100%', position: 'absolute',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(239,159,39,0.3)">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
            )}
            <h1 style={{
              fontSize: 'clamp(40px,7vw,64px)', fontWeight: 700, color: '#F1EFE8',
              margin: 0, lineHeight: 1.05, fontFamily: section.titleFont,
              letterSpacing: isBub ? '0.02em' : '-0.02em',
            }}>{section.label}</h1>
          </div>
        )}

        <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(241,239,232,0.6)', maxWidth: 600, margin: '0 0 40px' }}>
          {section.description}
        </p>

        {/* Socials */}
        {section.socials && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 40, position: 'relative', zIndex: 10, pointerEvents: 'auto' }}>
            {Object.entries(section.socials).map(([type, url]) => (
              <SocialIcon key={type} type={type} url={url} />
            ))}
          </div>
        )}

        {/* Schedule link for bubmario */}
        {isBub && (
          <Link to="/bubmario/schedule" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 24px', borderRadius: 8, background: accent + '22',
            color: accent, fontSize: 14, fontWeight: 500, textDecoration: 'none',
            border: `0.5px solid ${accent}44`, transition: 'all 0.3s ease', alignSelf: 'flex-start',
          }}>
            After hours schedule →
          </Link>
        )}



        {/* Bold hero headline */}
        {isAV && (
          <>
            <h2 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, color: '#F1EFE8', margin: '40px 0 0', lineHeight: 1.15, fontFamily: "'Space Grotesk', sans-serif", maxWidth: 550, opacity: 0.9 }}>
              Broadcast-quality production.<br/>
              <span style={{ color: accent, opacity: 0.7 }}>Every single frame.</span>
            </h2>
            <a href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24,
              padding: '14px 28px', borderRadius: 8, background: 'linear-gradient(135deg, #639922, #378ADD)',
              color: '#0E0E0E', fontSize: 15, fontWeight: 600, textDecoration: 'none',
              border: 'none', transition: 'all 0.3s ease',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              Work with me! →
            </a>

            {/* Service pricing */}
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
              {/* 1. Broadcast Video Production */}
              <div style={{
                padding: '16px 20px', borderRadius: 10,
                background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)',
              }}>
                <div className="service-card-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#F1EFE8', fontFamily: "'Space Grotesk', sans-serif" }}>
                    Broadcast Video Production
                  </span>
                  <span style={{ fontSize: 12, color: '#378ADD', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap' }}>
                    starting at $100/hr
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 12 }}>
                  {['Broadcast-standard video production', 'Holistic post-production pipeline', 'Corporate, ministry, and wedding video media', 'Crew management & scheduling'].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 4, height: 4, borderRadius: 2, background: '#378ADD', opacity: 0.5, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'rgba(241,239,232,0.5)' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Live Sound & A/V */}
              <div style={{
                padding: '16px 20px', borderRadius: 10,
                background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)',
              }}>
                <div className="service-card-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#F1EFE8', fontFamily: "'Space Grotesk', sans-serif" }}>
                    Live Sound &amp; General A/V
                  </span>
                  <span style={{ fontSize: 12, color: '#378ADD', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap' }}>
                    starting at $75/hr
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 12 }}>
                  {['Line-by-line musical level sound mixing', 'Dante Level 3 Certified audio mix buildout and auditing', 'Can provide own equipment or use house equipment'].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 4, height: 4, borderRadius: 2, background: '#378ADD', opacity: 0.5, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'rgba(241,239,232,0.5)' }}>{s}</span>
                      {i === 1 && (
                        <a href="https://www.getdante.com" target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0, marginLeft: 4 }}>
                          <img src="https://brandfetch.com/audinate.com?fallback=404" alt="Dante" style={{ height: 14, opacity: 0.5, verticalAlign: 'middle' }}
                            onError={(e) => { e.target.style.display = 'none' }} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Computer & Tech Support */}
              <div style={{
                padding: '16px 20px', borderRadius: 10,
                background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)',
              }}>
                <div className="service-card-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#F1EFE8', fontFamily: "'Space Grotesk', sans-serif" }}>
                    Computer &amp; Tech Support
                  </span>
                  <span style={{ fontSize: 12, color: '#378ADD', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap' }}>
                    starting at $50/hr
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 12 }}>
                  {['macOS, Windows, and your fav Linux flavor — I am platform agnostic', 'Remote and in-person holistic device setup and troubleshooting', 'Computer maintenance & building, Server Maintenance, AI workflows'].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 4, height: 4, borderRadius: 2, background: '#378ADD', opacity: 0.5, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'rgba(241,239,232,0.5)' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {isBub && (
          <h2 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, color: '#F1EFE8', margin: '40px 0 0', lineHeight: 1.15, fontFamily: "'Glitch Goblin', 'Space Grotesk', sans-serif", maxWidth: 550, opacity: 0.9 }}>
            Games. Culture.<br/>
            <span style={{ color: accent, opacity: 0.7 }}>Forged In Tbell.</span>
          </h2>
        )}

        {/* Offerings */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 40 }}>
          {section.offerings.map((item, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{
                padding: '16px 20px', borderRadius: 10,
                background: hovered === i ? (accent + '10') : 'rgba(255,255,255,0.02)',
                border: `0.5px solid ${hovered === i ? accent + '44' : 'rgba(255,255,255,0.06)'}`,
                transition: 'all 0.3s ease', cursor: 'default',
              }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: accent, marginBottom: 10, opacity: 0.6 }}/>
              <span style={{ fontSize: 14, color: hovered === i ? '#F1EFE8' : 'rgba(241,239,232,0.55)' }}>{item}</span>
            </div>
          ))}
        </div>
        </div>{/* close zIndex:1 wrapper */}
      </section>

      {/* About section (Albert Video only) */}
      {isAV && (
        <section style={{ padding: '80px 48px 40px', maxWidth: 750, margin: '0 auto' }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(241,239,232,0.35)', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
            About
          </p>
          <h2 style={{ fontSize: 'clamp(24px,4vw,34px)', fontWeight: 700, color: '#F1EFE8', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 8px' }}>
            {avBio.name}
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(241,239,232,0.4)', margin: '0 0 20px', fontFamily: "'JetBrains Mono', monospace" }}>
            {avBio.title}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {avBio.credentials.map((c, i) => (
              <span key={i} style={{
                fontSize: 11, padding: '4px 12px', borderRadius: 12,
                background: 'rgba(55,138,221,0.08)', border: '0.5px solid rgba(55,138,221,0.2)',
                color: '#378ADD', fontFamily: "'JetBrains Mono', monospace",
              }}>{c}</span>
            ))}
          </div>
          {avBio.bio.split('\n\n').map((p, i) => (
            <p key={i} style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(241,239,232,0.55)', margin: '0 0 20px' }}>{p}</p>
          ))}

          {/* Testimonials + Director Gallery */}
          {avBio.testimonials && avBio.testimonials.length > 0 && (
            <div style={{ marginTop: 64 }}>
              <h2 style={{
                fontSize: 'clamp(24px,4vw,34px)', fontWeight: 700, color: '#F1EFE8',
                fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 8px', letterSpacing: '-0.02em',
              }}>
                What people say
              </h2>
              <p style={{
                fontSize: 'clamp(16px,2.5vw,22px)', fontWeight: 500, color: 'rgba(241,239,232,0.4)',
                fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 32px', lineHeight: 1.3,
                fontStyle: 'italic',
              }}>
                "Your quality of work...is far and above anyone else."
              </p>
              <p style={{
                fontSize: 13, color: 'rgba(241,239,232,0.35)', margin: '-24px 0 32px',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                — Sam W., Educator
              </p>
              <div className="testimonial-layout" style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
                {/* Testimonials — left side */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {avBio.testimonials.map((t, i) => (
                    <div key={i} style={{
                      padding: '20px 24px', borderRadius: 10,
                      background: 'rgba(255,255,255,0.02)', borderLeft: '2px solid rgba(55,138,221,0.3)',
                      textAlign: 'left',
                    }}>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(241,239,232,0.55)', margin: 0, fontStyle: 'italic' }}>
                        "{t.quote.split(/\{([^}]+)\}/).map((part, j) =>
                          j % 2 === 1
                            ? <span key={j} style={{ color: '#F1EFE8', fontWeight: 600, fontStyle: 'normal' }}>{part}</span>
                            : part
                        )}"
                      </p>
                      {t.name && (
                        <p style={{
                          fontSize: 12, color: 'rgba(241,239,232,0.35)', marginTop: 10, marginBottom: 0,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}>
                          — {t.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {/* Photo gallery — right side */}
                <div className="director-gallery" style={{
                  width: 200, flexShrink: 0,
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6,
                }}>
                  {Array.from({ length: 26 }, (_, i) => i + 1).filter(n => n !== 17 && n !== 26).map(n => (
                    <div key={n} style={{
                      borderRadius: 6, overflow: 'hidden', aspectRatio: '1',
                      background: 'rgba(255,255,255,0.03)',
                    }}>
                      <img
                        src={`/gallery/director-${n}.jpg`}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.7, transition: 'opacity 0.3s ease' }}
                        onMouseOver={e => e.target.style.opacity = '1'}
                        onMouseOut={e => e.target.style.opacity = '0.7'}
                        onError={e => { e.target.parentElement.style.display = 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Thrive Time Curriculum feature (Albert Video only) — above portfolio */}
      {isAV && (
        <section style={{ padding: '80px 48px 40px', maxWidth: 750, margin: '0 auto' }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(241,239,232,0.35)', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
            Featured project
          </p>
          <h2 style={{ fontSize: 'clamp(24px,4vw,34px)', fontWeight: 700, color: '#F1EFE8', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 8px' }}>
            Thrive Time Curriculum
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(241,239,232,0.4)', margin: '0 0 24px', fontFamily: "'JetBrains Mono', monospace" }}>
            Video production for Dr. Rhoda Wolle's K–8 social-emotional learning curriculum
          </p>

          <div style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(241,239,232,0.55)' }}>
            <p style={{ margin: '0 0 20px' }}>
              Thrive Time is a Christ-centered, brain-based social-emotional learning curriculum developed by Dr. Rhoda Wolle, an educational psychologist dedicated to helping students understand how their minds and emotions work. Spanning grades 4K through 8th and implemented in over 70 schools, the curriculum covers ten monthly topics — from understanding the brain and building self-awareness to conflict resolution, servant leadership, and Christ-centered identity development. Each lesson is taught primarily through video, keeping lesson planning minimal for teachers while making the content accessible and engaging for young learners.
            </p>
            <p style={{ margin: '0 0 20px' }}>
              Jack Albert served as the video production lead, working closely with Dr. Wolle to translate her research-backed educational framework into a visual format that resonates with students at every grade level. The production spanned scripting, shooting, editing, and post-production across the full academic year of lesson modules. Each month demanded a distinct approach — brain science segments called for motion graphics and clear visual explanations, while relationship skills and identity development lessons leaned into narrative storytelling and real-world scenarios students could connect with.
            </p>
            <p style={{ margin: '0 0 20px' }}>
              This collaboration represents the kind of work Jack values most — projects where production craft serves a meaningful purpose. Thrive Time isn't just content; it's a tool that helps kids understand themselves, manage their emotions, and grow into thoughtful, resilient people. Shaping how an entire curriculum looks, sounds, and feels on screen is exactly the intersection of technical skill and human impact that drives his work at Albert Video.
            </p>
          </div>

          <a href="https://rhodawolle.com/thrivetimecurriculum" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 8,
            padding: '12px 24px', borderRadius: 8, background: 'linear-gradient(135deg, #639922, #378ADD)',
            color: '#0E0E0E', fontSize: 14, fontWeight: 600, textDecoration: 'none',
            border: 'none', transition: 'all 0.3s ease',
          }}>
            Learn more at rhodawolle.com →
          </a>
        </section>
      )}

      {/* Portfolio grid (Albert Video only) */}
      {isAV && <PortfolioSection />}

      {/* Contact form (Albert Video only) */}
      {section.hasContactForm && (
        <section id="contact" style={{ padding: '80px 48px 120px', maxWidth: 600, margin: '0 auto' }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(241,239,232,0.35)', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
            Get in touch
          </p>
          <h2 style={{ fontSize: 'clamp(24px,4vw,34px)', fontWeight: 700, color: '#F1EFE8', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 12px' }}>
            Let's work together.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(241,239,232,0.5)', margin: '0 0 32px' }}>
            Have a project in mind? Need a crew? Reach out and let's talk production.
          </p>
          <ContactForm accent={section.accent} gradient={section.gradient} formId="av" />
        </section>
      )}

      <Footer section={section} />
    </div>
  )
}
