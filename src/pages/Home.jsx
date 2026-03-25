import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { SECTIONS } from '../data.js'

// ═══════════════════════════════════════════════════════════════
// VIDEO REEL BACKGROUND — rotating short film clips
// ═══════════════════════════════════════════════════════════════
// Drop short (10–30s) .mp4 clips into /public/reels/ and add
// them to this array. They'll crossfade behind the hero text.
// Use muted, trimmed highlight clips from each film.
//
// Recommended: export 720p or 1080p, H.264, ~2-4 MB each.
// ═══════════════════════════════════════════════════════════════
const REEL_CLIPS = [
  { src: '/reels/spoiled.mp4',              label: 'Spoiled' },
  { src: '/reels/spoiled-basement.mp4',     label: 'Spoiled — Basement' },
  { src: '/reels/parasocial.mp4',           label: 'Parasocial' },
  { src: '/reels/here-and-now.mp4',         label: 'Here and Now' },
  { src: '/reels/here-and-now-2.mp4',       label: 'Here and Now — 2' },
  { src: '/reels/quiet-storm.mp4',          label: 'Quiet Storm' },
  { src: '/reels/quiet-storm-open.mp4',     label: 'Quiet Storm — Opening' },
  { src: '/reels/quiet-storm-2.mp4',        label: 'Quiet Storm — 2' },
  { src: '/reels/quiet-storm-3.mp4',        label: 'Quiet Storm — 3' },
  { src: '/reels/quiet-storm-4.mp4',        label: 'Quiet Storm — 4' },
  { src: '/reels/i-am-scourge.mp4',         label: 'I Am Scourge' },
  { src: '/reels/i-am-scourge-2.mp4',       label: 'I Am Scourge — 2' },
  { src: '/reels/i-am-scourge-smile.mp4',   label: 'I Am Scourge — Smile' },
  { src: '/reels/hallowed-ground.mp4',      label: 'Hallowed Ground' },
  { src: '/reels/beat.mp4',                 label: 'Beat' },
  { src: '/reels/beat-door.mp4',            label: 'Beat — Door' },
  { src: '/reels/beat-phone.mp4',           label: 'Beat — Phone' },
  { src: '/reels/hallowed-ground-2.mp4',   label: 'Hallowed Ground — Fire' },
  { src: '/reels/hallowed-ground-3.mp4',   label: 'Hallowed Ground — Room' },
  { src: '/reels/hallowed-ground-4.mp4',   label: 'Hallowed Ground — Outdoors' },
  { src: '/reels/hallowed-ground-5.mp4',   label: 'Hallowed Ground — Portrait' },
  { src: '/reels/spoiled-2.mp4',           label: 'Spoiled — Conversation' },
  { src: '/reels/spoiled-clip-1.mp4',     label: 'Spoiled — Clip 1' },
  { src: '/reels/spoiled-clip-2.mp4',     label: 'Spoiled — Clip 2' },
  { src: '/reels/spoiled-clip-3.mp4',     label: 'Spoiled — Clip 3' },
]

function VideoReelBg() {
  // ═══════════════════════════════════════════════════════════════
  // MATCHES PREVIEW HTML EXACTLY:
  // - <video> tags in JSX (browser sees them on first paint)
  // - useEffect grabs by ID and runs vanilla JS crossfade
  // - No React state for playback, no createElement
  // ═══════════════════════════════════════════════════════════════

  useEffect(() => {
    var vA = document.getElementById('ors-vidA')
    var vB = document.getElementById('ors-vidB')
    var container = document.getElementById('ors-video-bg')
    if (!vA || !vB) return

    var idx = 0, showA = true

    // Load first clip — identical to preview HTML
    vA.src = REEL_CLIPS[0].src
    vA.load()
    vA.play().catch(function(){})

    // Rotate every 12s — identical to preview HTML
    var interval = setInterval(function() {
      idx = (idx + 1) % REEL_CLIPS.length
      showA = !showA
      var active = showA ? vA : vB
      var inactive = showA ? vB : vA
      active.src = REEL_CLIPS[idx].src
      active.load()
      active.play().catch(function(){})
      active.style.opacity = '0.3'
      inactive.style.opacity = '0'
    }, 12000)

    // Autoplay fallback
    function tryPlay() {
      var el = showA ? vA : vB
      if (el && el.paused && el.src) {
        el.play().catch(function(){})
        el.style.opacity = '0.3'
      }
    }
    document.addEventListener('click', tryPlay, { once: true })
    document.addEventListener('scroll', tryPlay, { once: true })
    document.addEventListener('touchstart', tryPlay, { once: true })

    // Hide if clips don't exist
    vA.onerror = function() { if (container) container.style.display = 'none' }

    return function() {
      clearInterval(interval)
      document.removeEventListener('click', tryPlay)
      document.removeEventListener('scroll', tryPlay)
      document.removeEventListener('touchstart', tryPlay)
    }
  }, [])

  var vidStyle = {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', transition: 'opacity 2s ease-in-out', pointerEvents: 'none',
  }

  return (
    <div id="ors-video-bg" style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      {/* Video tags in JSX — browser sees them on first paint, just like preview HTML */}
      <video id="ors-vidA" muted playsInline autoPlay loop style={{ ...vidStyle, opacity: 0.3 }} />
      <video id="ors-vidB" muted playsInline autoPlay loop style={{ ...vidStyle, opacity: 0 }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(14,14,14,0.42) 0%, rgba(14,14,14,0.3) 50%, rgba(14,14,14,0.4) 100%)',
      }} />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// THUMBNAIL SYSTEM
// ═══════════════════════════════════════════════════════════════
// Each project looks for a thumbnail image at:
//   /thumbs/{slug}.jpg
//
// To add a thumbnail for any project:
//   1. Take a screenshot or frame grab from the film (16:9 ratio, ~960x540 or larger)
//   2. Save it as a .jpg file
//   3. Name it to match the slug listed below
//   4. Drop it into: odd-rex-site/public/thumbs/
//
// File names (slugs):
//   spoiled.jpg          ← Spoiled (already has YouTube thumb as fallback)
//   i-am-scourge.jpg     ← I Am Scourge
//   quiet-storm.jpg      ← Quiet Storm
//   hallowed-ground.jpg  ← Hallowed Ground
//   beat.jpg             ← Beat
//   here-and-now.jpg     ← Here and Now
//   parasocial.jpg       ← Parasocial
//   go-see-a-movie.jpg   ← Go See A Movie! (podcast art)
//   journey-to-the-east.jpg ← Journey to the East (podcast art)
//
// That's it — the site picks them up automatically.
// ═══════════════════════════════════════════════════════════════

// Ordered newest → oldest
const FILM_PROJECTS = [
  {
    title: "Spoiled",
    slug: "spoiled",
    type: "Short Film — MIFA Award Winner",
    year: "2024",
    description: "Winner at the Milwaukee Independent Film Awards (MIFA). Jack Albert collaborated on this Odd Rex Studios production as a key creative contributor.",
    badge: "MIFA Award Winner",
    credit: "Collaboration",
    link: "https://youtu.be/jPgjOHR7_fk",
    videoId: "jPgjOHR7_fk",
  },
  {
    title: "Parasocial",
    slug: "parasocial",
    type: "Short Film",
    year: "2024",
    description: "Written, directed, and edited by Jack Albert. An Odd Rex Studios exploration of one-sided connection in the age of digital media.",
    link: "https://youtu.be/IureG4K3w3A",
    videoId: "IureG4K3w3A",
  },
  {
    title: "Here and Now",
    slug: "here-and-now",
    type: "Short Film",
    year: "2020",
    description: "A short film by Eric Pichardo, produced under the Odd Rex Studios banner.",
    badge: "Collaboration",
    link: "https://youtu.be/LRWX8AsQzKk",
    videoId: "LRWX8AsQzKk",
  },
  {
    title: "Quiet Storm",
    slug: "quiet-storm",
    type: "TV Pilot Episode",
    year: "2015",
    description: "A 54-minute pilot filmed across La Crosse, Wisconsin — blending English, Latin, and Mandarin in a multilingual crime narrative.",
    link: "https://youtu.be/18b4ksElZW4",
    videoId: "18b4ksElZW4",
  },
  {
    title: "I Am Scourge",
    slug: "i-am-scourge",
    type: "Short Film",
    year: "2014",
    description: "A man wallows in his regrets and failures as he comes to terms with who he really is. Shot at Wisconsin Lutheran College, Milwaukee.",
    link: "https://youtu.be/BUIw9x8q4pk",
    videoId: "BUIw9x8q4pk",
  },
  {
    title: "Hallowed Ground",
    slug: "hallowed-ground",
    type: "Short Film",
    year: "2013",
    description: "An Odd Rex Studios production scored by composer Daniel Hafenstein.",
    link: "https://youtu.be/IsB3x5iBm7c",
    videoId: "IsB3x5iBm7c",
  },
  {
    title: "Beat",
    slug: "beat",
    type: "Short Film",
    year: "2012",
    description: "An early Odd Rex Studios short — one of the first projects from the studio.",
    link: "https://www.youtube.com/watch?v=BxKJ-OxBlRk",
    videoId: "BxKJ-OxBlRk",
  },
]

const PODCASTS = [
  {
    title: "Go See A Movie!",
    slug: "go-see-a-movie",
    type: "Podcast",
    year: "2023–present",
    description: "A semimonthly film review podcast. Steph and Jack see movies (fairly frequently) and offer random and often unsolicited opinions on them all.",
    link: "https://podcasts.apple.com/us/podcast/go-see-a-movie/id1723542586",
    extraLinks: {
      apple: "https://podcasts.apple.com/us/podcast/go-see-a-movie/id1723542586",
      spotify: "https://open.spotify.com/show/go-see-a-movie",
    },
  },
  {
    title: "Journey to the East \u2013 A Dragon Ball Podcast",
    slug: "journey-to-the-east",
    type: "Podcast",
    year: "2025–present",
    description: "Jack Albert and Danny Hafenstein — two lifelong Dragon Ball fans and longtime creative collaborators — deep dive into the entirety of Dragon Ball: manga, anime, video games. Nothing ever dies, we will rise again! Dragon Soul!",
    link: "https://podcasts.apple.com/us/podcast/journey-to-the-east-a-dragon-ball-podcast/id1871745732",
    extraLinks: {
      apple: "https://podcasts.apple.com/us/podcast/journey-to-the-east-a-dragon-ball-podcast/id1871745732",
      youtube: "https://www.youtube.com/playlist?list=PL-8J4E9O1RJ_ojgpvNijCj2wruqzfecyz",
      spotify: "https://podcasters.spotify.com/pod/show/jack-albert47",
    },
  },
]

// Thumbnail component with smart fallback
function ProjectThumb({ film, isPodcast }) {
  const [imgError, setImgError] = useState(false)
  // Priority: local /thumbs/{slug}.jpg → YouTube thumb (if videoId) → placeholder
  const localSrc = `/thumbs/${film.slug}.jpg`
  const ytSrc = film.videoId ? `https://img.youtube.com/vi/${film.videoId}/hqdefault.jpg` : null
  const src = imgError && ytSrc ? ytSrc : localSrc

  return (
    <div style={{
      marginTop: 16, borderRadius: 8, overflow: 'hidden', maxWidth: 480,
      position: 'relative', aspectRatio: '16/9',
      background: 'rgba(255,255,255,0.03)',
    }}>
      <img
        src={src}
        alt={`${film.title} thumbnail`}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.85 }}
        loading="lazy"
        onError={(e) => {
          if (!imgError && ytSrc) {
            setImgError(true)
          } else {
            // Both failed — show a styled placeholder instead of broken image
            e.target.style.display = 'none'
          }
        }}
      />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.2)',
      }}>
        {isPodcast ? (
          <div style={{
            width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#0E0E0E"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z"/></svg>
          </div>
        ) : (
          <div style={{
            width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0E0E0E"><path d="M8 5v14l11-7z"/></svg>
          </div>
        )}
      </div>
    </div>
  )
}

// Extra links (Apple Podcasts, YouTube, Spotify)
function ExtraLinks({ links }) {
  if (!links) return null
  const linkStyle = {
    fontSize: 10, padding: '3px 10px', borderRadius: 10, textDecoration: 'none',
    background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)',
    color: 'rgba(241,239,232,0.5)', fontFamily: "'JetBrains Mono', monospace",
  }
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
      {links.apple && <a href={links.apple} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={linkStyle}>Apple Podcasts</a>}
      {links.youtube && <a href={links.youtube} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={linkStyle}>YouTube</a>}
      {links.spotify && <a href={links.spotify} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={linkStyle}>Spotify</a>}
    </div>
  )
}

// Film card component
function FilmCard({ film, isPodcast }) {
  const Wrapper = film.link ? 'a' : 'div'
  const wrapperProps = film.link ? { href: film.link, target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <Wrapper {...wrapperProps} style={{
      display: 'block', padding: '24px 28px', borderRadius: 12,
      background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)',
      textDecoration: 'none', transition: 'all 0.3s ease',
    }}>
      {film.badge && (
        <span style={{
          display: 'inline-block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '3px 10px', borderRadius: 10, background: 'rgba(241,239,232,0.06)',
          color: '#D3D1C7', fontFamily: "'JetBrains Mono', monospace", marginBottom: 12,
        }}>{film.badge}</span>
      )}
      <h3 style={{ fontSize: 24, fontWeight: 700, color: '#F1EFE8', margin: '0 0 4px', fontFamily: "'Space Grotesk', sans-serif" }}>
        {film.title}
      </h3>
      {film.credit && (
        <span style={{
          display: 'inline-block', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '2px 8px', borderRadius: 8, background: 'rgba(255,255,255,0.04)',
          color: 'rgba(241,239,232,0.4)', fontFamily: "'JetBrains Mono', monospace", marginBottom: 8,
        }}>{film.credit}</span>
      )}
      <p style={{ fontSize: 12, color: 'rgba(241,239,232,0.35)', margin: '0 0 12px', fontFamily: "'JetBrains Mono', monospace" }}>
        {film.type} {film.year && `· ${film.year}`}
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(241,239,232,0.5)', margin: 0, maxWidth: 480 }}>
        {film.description}
      </p>
      <ProjectThumb film={film} isPodcast={isPodcast} />
      <ExtraLinks links={film.extraLinks} />
    </Wrapper>
  )
}

export default function Home() {
  const ors = SECTIONS.find(s => s.id === 'ors')
  const [hoveredOffering, setHoveredOffering] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: '#0E0E0E' }}>
      <Nav />

      {/* Hero — filmmaking focused, with rotating video background */}
      <section style={{
        width: '100%', minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '120px 48px 80px', position: 'relative', overflow: 'hidden',
        background: ors.bgGrad,
      }}>
        <VideoReelBg />
        {/* Gradient gray box — feathers on all four edges */}
        <div style={{
          position: 'relative', zIndex: 1,
          background: 'radial-gradient(ellipse 80% 90% at 30% 50%, rgba(30,30,30,0.85) 0%, rgba(30,30,30,0.6) 50%, rgba(30,30,30,0) 80%)',
          padding: '40px 64px 40px 40px', borderRadius: 16,
          marginLeft: -40, marginRight: -64, marginTop: -20,
        }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{
              display: 'inline-block', padding: '4px 14px', borderRadius: 20,
              border: '1px solid #888780', color: '#B4B2A9',
              fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
              marginBottom: 20, fontFamily: "'JetBrains Mono', monospace",
            }}>Narrative filmmaking</div>

            <h1 style={{
              fontSize: 'clamp(42px, 7vw, 72px)', fontWeight: 700, color: '#F1EFE8',
              margin: '0 0 24px', lineHeight: 1.05,
              fontFamily: "'Special Elite', 'junkos typewriter', 'Courier New', monospace",
              letterSpacing: '0.02em',
            }}>Odd Rex Studios</h1>

            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(241,239,232,0.65)', maxWidth: 520, margin: '0 0 24px' }}>
              Original narrative projects rooted in cinematic craft. Story-driven work where every frame is intentional —
              from lookbook to final color. New, exciting, and thought-provoking films.
            </p>
            <h2 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: '#F1EFE8', margin: '0 0 32px', lineHeight: 1.2, fontFamily: "'Space Grotesk', sans-serif", opacity: 0.85 }}>
              Big Things Have Happened,<br/>
              <span style={{ color: '#888780' }}>Big Things Will Continue to Happen!</span>
            </h2>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://www.youtube.com/@OddRexStudios" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 8, background: 'rgba(255,0,0,0.15)',
                color: '#FF4444', fontSize: 14, fontWeight: 500, textDecoration: 'none',
                border: '0.5px solid rgba(255,0,0,0.3)', transition: 'all 0.3s ease',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.5a3 3 0 00-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4a3 3 0 00-2.1 2.1C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 002.1 2.1c1.9.4 9.4.4 9.4.4s7.5 0 9.4-.4a3 3 0 002.1-2.1c.5-1.9.5-5.5.5-5.5s0-3.6-.5-5.5zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z"/></svg>
                Watch on YouTube
              </a>
              <a href="https://www.facebook.com/OddRexStudios" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 8, background: 'rgba(24,119,242,0.15)',
                color: '#1877F2', fontSize: 14, fontWeight: 500, textDecoration: 'none',
                border: '0.5px solid rgba(24,119,242,0.3)', transition: 'all 0.3s ease',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
              <a href="https://www.imdb.com/name/nm5786933/" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 8, background: 'transparent',
                color: '#E8B708', fontSize: 14, fontWeight: 500, textDecoration: 'none',
                border: '0.5px solid rgba(232,183,8,0.2)', transition: 'all 0.3s ease',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14.31 9.588l.01-.01v4.834h-1.37V9.588h1.36zm5.33-1.1v7.024c0 .98-.794 1.774-1.775 1.774H6.135a1.774 1.774 0 01-1.775-1.774V8.488c0-.98.795-1.775 1.775-1.775h11.73c.98 0 1.775.795 1.775 1.775zM8.6 14.412V9.59H7.23v4.824h1.37zm2.674-3.063c0-.17-.072-.32-.225-.378-.153-.058-.344-.014-.45.116l-.698.978V9.588h-1.37v4.824h1.37v-2.07l.86 2.07h1.2l-1.092-2.354c.278-.23.405-.52.405-.71zm4.725-.59c0-.68-.399-1.172-1.273-1.172-.874 0-1.274.492-1.274 1.172v2.24c0 .68.4 1.172 1.274 1.172s1.273-.492 1.273-1.172v-2.24zm-1.181 2.36c0 .18-.033.3-.092.3s-.092-.12-.092-.3v-2.48c0-.18.033-.3.092-.3s.092.12.092.3v2.48z"/></svg>
                IMDb
              </a>
              <Link to="/about" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 8, background: 'transparent',
                color: '#888780', fontSize: 14, fontWeight: 500, textDecoration: 'none',
                border: '0.5px solid rgba(255,255,255,0.08)', transition: 'all 0.3s ease',
              }}>About the filmmaker</Link>
            </div>
          </div>
        </div>

      </section>

      {/* ════════ FILM PROJECTS ════════ */}
      <section style={{ padding: '100px 48px 60px', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(241,239,232,0.35)', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
          Film projects
        </p>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 700, color: '#F1EFE8', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 48px', letterSpacing: '-0.02em' }}>
          Short films & narrative work
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {FILM_PROJECTS.map((film, i) => <FilmCard key={i} film={film} isPodcast={false} />)}
        </div>
      </section>

      {/* ════════ PODCASTS ════════ */}
      <section style={{ padding: '60px 48px 60px', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(241,239,232,0.35)', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
          Podcasts
        </p>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 700, color: '#F1EFE8', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 48px', letterSpacing: '-0.02em' }}>
          Listen along
        </h2>
        <div className="podcast-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {PODCASTS.map((film, i) => <FilmCard key={i} film={film} isPodcast={true} />)}
        </div>
      </section>

      {/* What we do */}
      <section style={{ padding: '40px 48px 100px', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(241,239,232,0.35)', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
          Services
        </p>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 700, color: '#F1EFE8', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 32px', letterSpacing: '-0.02em' }}>
          What Odd Rex Studios does
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {ors.offerings.map((item, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredOffering(i)} onMouseLeave={() => setHoveredOffering(null)}
              style={{
                padding: '20px 24px', borderRadius: 10,
                background: hoveredOffering === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)',
                border: `0.5px solid ${hoveredOffering === i ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)'}`,
                transition: 'all 0.3s ease', cursor: 'default',
              }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: '#888780', marginBottom: 12, opacity: 0.5 }}/>
              <span style={{ fontSize: 14, color: hoveredOffering === i ? '#F1EFE8' : 'rgba(241,239,232,0.5)', transition: 'color 0.3s ease' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Say hello */}
      <section style={{ padding: '80px 48px 120px', maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F1EFE8', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 8px' }}>
          Say hello.
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(241,239,232,0.45)', margin: '0 0 24px' }}>
          Whether it's a project, collaboration, or just a question — I'd love to hear from you.
        </p>
        <ContactForm accent="#888780" />
      </section>

      <Footer showAVLink />
    </div>
  )
}
