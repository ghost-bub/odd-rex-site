import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// ═══════════════════════════════════════════════════════════════
// NAV — ALL animations live OUTSIDE React's render tree.
//
// React Router re-renders (and re-creates) Nav on every route
// change. Anything inside React's JSX gets destroyed mid-animation.
//
// Solution: every animated element is a vanilla DOM node managed
// at module level, inserted into the nav via useEffect on mount.
//
//   • @keyframes CSS         → document.head (permanent)
//   • Clapperboard overlay   → document.body (permanent)
//   • REC overlay            → document.body (permanent)
//   • Bubmario nav link      → vanilla <a>, re-inserted each mount
//   • Glitch-out clone       → document.body (temporary, for animation)
//
// React only renders the static nav structure (Studio, Freelance,
// About links). All animation logic is pure vanilla JS.
// ═══════════════════════════════════════════════════════════════

var NAV_STYLE_ID = 'odd-nav-keyframes'

var navCSS = [
  '@keyframes glitchIn {',
  '  0% { opacity: 0; transform: translateX(20px) skewX(-20deg); filter: blur(4px); clip-path: inset(40% 0 40% 0); }',
  '  20% { opacity: 0.6; transform: translateX(-8px) skewX(10deg); filter: blur(2px); clip-path: inset(10% 0 60% 0); }',
  '  40% { opacity: 0.3; transform: translateX(6px) skewX(-5deg); filter: blur(1px); clip-path: inset(50% 0 10% 0); }',
  '  60% { opacity: 0.8; transform: translateX(-3px) skewX(3deg); filter: blur(0); clip-path: inset(20% 0 30% 0); }',
  '  80% { opacity: 0.9; transform: translateX(1px) skewX(-1deg); clip-path: inset(5% 0 5% 0); }',
  '  100% { opacity: 1; transform: translateX(0) skewX(0); filter: blur(0); clip-path: inset(0 0 0 0); }',
  '}',
  '@keyframes glitchOut {',
  '  0% { opacity: 1; transform: translateX(0) skewX(0); clip-path: inset(0 0 0 0); }',
  '  30% { opacity: 0.7; transform: translateX(5px) skewX(8deg); clip-path: inset(20% 0 40% 0); }',
  '  60% { opacity: 0.3; transform: translateX(-10px) skewX(-15deg); filter: blur(2px); clip-path: inset(50% 0 10% 0); }',
  '  100% { opacity: 0; transform: translateX(20px) skewX(-20deg); filter: blur(4px); clip-path: inset(40% 0 40% 0); }',
  '}',
  '@keyframes slatePop {',
  '  0% { opacity: 0; transform: translateY(-50%) translateX(4px) scale(0.7); }',
  '  15% { opacity: 1; transform: translateY(-50%) translateX(-2px) scale(1.1); }',
  '  30% { transform: translateY(-50%) translateX(0) scale(1); }',
  '  100% { opacity: 0; transform: translateY(-50%) translateX(-6px) scale(0.9); }',
  '}',
  '@keyframes slateClap {',
  '  0% { transform: rotate(0deg); }',
  '  15% { transform: rotate(-25deg); }',
  '  30% { transform: rotate(2deg); }',
  '  45% { transform: rotate(-1deg); }',
  '  60% { transform: rotate(0deg); }',
  '  100% { transform: rotate(0deg); }',
  '}',
  '@keyframes recPop {',
  '  0% { opacity: 0; transform: translateY(-50%) translateX(4px) scale(0.6); }',
  '  15% { opacity: 1; transform: translateY(-50%) translateX(-2px) scale(1.15); }',
  '  30% { transform: translateY(-50%) translateX(0) scale(1); }',
  '  70% { opacity: 1; transform: translateY(-50%) translateX(0) scale(1); }',
  '  100% { opacity: 0; transform: translateY(-50%) translateX(-4px) scale(0.95); }',
  '}',
  '@keyframes recDotPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }',
].join('\n')

// ─── Module-level state ───
var stylesInjected = false
var slateTimer = null
var recTimer = null
var bubIsVisible = false
var slateFxEl = null
var slateArmEl = null
var recFxEl = null
var recDotEl = null
var bubLinkEl = null       // the vanilla <a> for bubmario
var navigateFn = null      // set by Nav component each mount

function ensureStyles() {
  if (stylesInjected) return
  if (document.getElementById(NAV_STYLE_ID)) { stylesInjected = true; return }
  var tag = document.createElement('style')
  tag.id = NAV_STYLE_ID
  tag.textContent = navCSS
  document.head.appendChild(tag)
  stylesInjected = true
}

function positionFx(fxEl, anchorId) {
  var anchor = document.getElementById(anchorId)
  if (!anchor || !fxEl) return
  var rect = anchor.getBoundingClientRect()
  fxEl.style.position = 'fixed'
  fxEl.style.visibility = 'hidden'
  fxEl.style.display = 'flex'
  var fxWidth = fxEl.offsetWidth || 30
  fxEl.style.visibility = ''
  fxEl.style.left = (rect.left - 10 - fxWidth) + 'px'
  fxEl.style.top = (rect.top + rect.height / 2) + 'px'
  fxEl.style.transform = 'translateY(-50%)'
  fxEl.style.zIndex = '200'
}

function triggerSlate() {
  var delay = bubIsVisible ? 400 : 0
  ensureStyles()
  if (!slateFxEl || !slateArmEl) return
  clearTimeout(slateTimer)
  slateFxEl.style.opacity = '0'
  slateFxEl.style.animation = 'none'
  slateArmEl.style.animation = 'none'
  void slateFxEl.offsetWidth
  slateTimer = setTimeout(function() {
    positionFx(slateFxEl, 'odd-nav-studio')
    void slateFxEl.offsetWidth
    slateFxEl.style.opacity = '1'
    slateFxEl.style.animation = 'slatePop 0.7s ease-out forwards'
    slateArmEl.style.animation = 'slateClap 0.7s ease-out forwards'
    slateTimer = setTimeout(function() {
      slateFxEl.style.opacity = '0'
      slateFxEl.style.animation = 'none'
      slateArmEl.style.animation = 'none'
    }, 750)
  }, delay)
}

function triggerRec() {
  var delay = bubIsVisible ? 400 : 0
  ensureStyles()
  if (!recFxEl || !recDotEl) return
  clearTimeout(recTimer)
  recFxEl.style.opacity = '0'
  recFxEl.style.animation = 'none'
  recDotEl.style.animation = 'none'
  void recFxEl.offsetWidth
  recTimer = setTimeout(function() {
    positionFx(recFxEl, 'odd-nav-freelance')
    void recFxEl.offsetWidth
    recFxEl.style.opacity = '1'
    recFxEl.style.animation = 'recPop 0.9s ease-out forwards'
    recDotEl.style.animation = 'recDotPulse 0.45s ease-in-out infinite'
    recTimer = setTimeout(function() {
      recFxEl.style.opacity = '0'
      recFxEl.style.animation = 'none'
      recDotEl.style.animation = 'none'
    }, 950)
  }, delay)
}

// ─── Bubmario glitch-out ───
// Creates a CLONE on document.body so the animation survives React re-render.
// The real bubLinkEl is hidden immediately.
function triggerBubGlitchOut() {
  if (!bubIsVisible || !bubLinkEl) return
  ensureStyles()
  bubIsVisible = false

  // Measure position of real link before hiding
  var rect = bubLinkEl.getBoundingClientRect()

  // Hide real link immediately
  bubLinkEl.style.display = 'none'
  bubLinkEl.style.animation = 'none'

  // Create a clone on document.body for the animation
  var clone = document.createElement('span')
  clone.textContent = 'bubmario'
  clone.style.cssText = 'position:fixed;z-index:201;pointer-events:none;' +
    'color:#EF9F27;font-size:12px;font-weight:500;letter-spacing:0.02em;' +
    "font-family:'Glitch Goblin','Space Grotesk',sans-serif;" +
    'top:' + rect.top + 'px;left:' + rect.left + 'px;' +
    'padding:4px 0;'
  document.body.appendChild(clone)
  void clone.offsetWidth
  clone.style.animation = 'glitchOut 0.35s ease-in forwards'
  setTimeout(function() {
    if (clone.parentNode) clone.parentNode.removeChild(clone)
  }, 400)
}

// ─── Bubmario glitch-in ───
// bubLinkEl is a vanilla DOM node (not React), so we can animate directly.
function triggerBubGlitchIn() {
  if (!bubLinkEl) return
  ensureStyles()
  bubIsVisible = true
  bubLinkEl.style.display = 'inline'
  bubLinkEl.style.animation = 'none'
  void bubLinkEl.offsetWidth
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      if (bubLinkEl) bubLinkEl.style.animation = 'glitchIn 0.5s ease-out forwards'
    })
  })
}

// ─── Create persistent DOM elements ───
function ensureAnimElements() {
  ensureStyles()
  if (slateFxEl) return

  // Clapperboard
  slateFxEl = document.createElement('span')
  slateFxEl.style.cssText = 'position:fixed;pointer-events:none;opacity:0;z-index:200;'
  slateFxEl.innerHTML = '<svg width="14" height="13" viewBox="0 0 22 20" fill="none">' +
    '<rect x="1" y="8" width="20" height="11" rx="1.5" fill="#F1EFE8" opacity="0.9"/>' +
    '<rect x="3" y="10" width="4" height="2" rx="0.5" fill="#0E0E0E" opacity="0.3"/>' +
    '<rect x="9" y="10" width="4" height="2" rx="0.5" fill="#0E0E0E" opacity="0.3"/>' +
    '<rect x="15" y="10" width="4" height="2" rx="0.5" fill="#0E0E0E" opacity="0.3"/>' +
    '<g id="odd-slate-arm" style="transform-origin:1px 8px">' +
    '<rect x="1" y="4" width="20" height="4.5" rx="1" fill="#F1EFE8"/>' +
    '<rect x="3" y="4" width="2.5" height="4.5" fill="#0E0E0E" opacity="0.7" transform="skewX(-12)"/>' +
    '<rect x="8" y="4" width="2.5" height="4.5" fill="#0E0E0E" opacity="0.7" transform="skewX(-12)"/>' +
    '<rect x="13" y="4" width="2.5" height="4.5" fill="#0E0E0E" opacity="0.7" transform="skewX(-12)"/>' +
    '<rect x="18" y="4" width="2.5" height="4.5" fill="#0E0E0E" opacity="0.7" transform="skewX(-12)"/>' +
    '</g></svg>'
  slateArmEl = slateFxEl.querySelector('#odd-slate-arm')
  document.body.appendChild(slateFxEl)

  // REC
  recFxEl = document.createElement('span')
  recFxEl.style.cssText = 'position:fixed;pointer-events:none;opacity:0;z-index:200;display:flex;align-items:center;gap:3px;padding:1px 5px;border-radius:3px;background:rgba(220,38,38,0.15);border:1px solid rgba(220,38,38,0.4);'
  recFxEl.innerHTML = '<div id="odd-rec-dot" style="width:5px;height:5px;border-radius:50%;background:#DC2626"></div>' +
    '<span style="font-size:7px;font-weight:700;color:#DC2626;letter-spacing:0.08em;font-family:JetBrains Mono,monospace">REC</span>'
  recDotEl = recFxEl.querySelector('#odd-rec-dot')
  document.body.appendChild(recFxEl)
}

// Create the bubmario <a> element once (module-level, persists across Nav remounts)
function ensureBubLink() {
  if (bubLinkEl) return
  bubLinkEl = document.createElement('a')
  bubLinkEl.id = 'odd-nav-bubmario'
  bubLinkEl.href = '/bubmario'
  bubLinkEl.textContent = 'bubmario'
  bubLinkEl.style.cssText = 'color:#EF9F27;font-size:12px;font-weight:500;' +
    'letter-spacing:0.02em;padding:4px 0;text-decoration:none;' +
    'border-bottom:1.5px solid transparent;display:none;' +
    "font-family:'Glitch Goblin','Space Grotesk',sans-serif;"
  bubLinkEl.addEventListener('click', function(e) {
    e.preventDefault()
    if (navigateFn) navigateFn('/bubmario')
  })
}

export default function Nav() {
  var location = useLocation()
  var navigate = useNavigate()
  var isBubmario = location.pathname === '/bubmario' || location.pathname.startsWith('/bubmario/')

  // Store navigate function so vanilla JS can use it
  navigateFn = navigate

  // On mount: create elements + insert bubmario link into nav
  useEffect(function() {
    ensureAnimElements()
    ensureBubLink()

    // Insert bubLinkEl into the nav links row (before the About link)
    var aboutLink = document.getElementById('odd-nav-about')
    if (aboutLink && bubLinkEl && aboutLink.parentNode) {
      aboutLink.parentNode.insertBefore(bubLinkEl, aboutLink)
    }

    // Update active border style
    if (bubLinkEl) {
      bubLinkEl.style.borderBottom = isBubmario
        ? '1.5px solid #EF9F27'
        : '1.5px solid transparent'
    }
  })

  // Handle route changes: glitch in/out
  useEffect(function() {
    if (!bubLinkEl) return
    if (isBubmario && !bubIsVisible) {
      triggerBubGlitchIn()
    }
    // Glitch-out is handled by onClick on Studio/Freelance/About
    // (not by route change, because the clone approach needs position BEFORE unmount)
  }, [location.pathname])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 48px',
      background: 'rgba(14,14,14,0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '0.5px solid rgba(255,255,255,0.06)',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6, background: '#F1EFE8',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, color: '#0E0E0E', fontFamily: "'Space Grotesk', sans-serif",
        }}>O</div>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#F1EFE8', letterSpacing: '-0.01em', fontFamily: "'Space Grotesk', sans-serif" }}>
          Odd Rex Studios
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
        {/* Studio — clapperboard + glitch-out */}
        <Link id="odd-nav-studio" to="/" onClick={function() { triggerSlate(); triggerBubGlitchOut() }} style={{
          color: location.pathname === '/' ? '#F1EFE8' : 'rgba(241,239,232,0.35)',
          fontSize: 12, fontWeight: 500, letterSpacing: '0.02em',
          padding: '4px 0', textDecoration: 'none',
          borderBottom: location.pathname === '/' ? '1.5px solid #888780' : '1.5px solid transparent',
          transition: 'all 0.3s ease',
        }}>
          Studio
        </Link>

        {/* Freelance — REC + glitch-out */}
        <Link id="odd-nav-freelance" to="/albert-video" onClick={function() { triggerRec(); triggerBubGlitchOut() }} style={{
          color: location.pathname === '/albert-video' ? '#F1EFE8' : 'rgba(241,239,232,0.35)',
          fontSize: 12, fontWeight: 500, letterSpacing: '0.02em',
          padding: '4px 0', textDecoration: 'none',
          borderBottom: location.pathname === '/albert-video' ? '1.5px solid #378ADD' : '1.5px solid transparent',
          transition: 'all 0.3s ease',
        }}>
          Freelance
        </Link>

        {/* Bubmario link is inserted here by useEffect (vanilla DOM, not React) */}

        {/* About — glitch-out */}
        <Link id="odd-nav-about" to="/about" onClick={function() { triggerBubGlitchOut() }} style={{
          color: location.pathname === '/about' ? '#F1EFE8' : 'rgba(241,239,232,0.35)',
          fontSize: 12, fontWeight: 500, letterSpacing: '0.02em',
          padding: '4px 0', textDecoration: 'none',
          borderBottom: location.pathname === '/about' ? '1.5px solid #888780' : '1.5px solid transparent',
          transition: 'all 0.3s ease',
        }}>
          About
        </Link>
      </div>
    </nav>
  )
}
