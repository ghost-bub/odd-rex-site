import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function PixelJack() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <span
      onClick={(e) => { e.stopPropagation(); navigate('/bubmario') }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="???"
      style={{
        display: 'inline-block', cursor: 'pointer', position: 'relative',
        transition: 'transform 0.3s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        marginLeft: 6, verticalAlign: 'middle',
      }}
    >
      <svg width="10" height="12" viewBox="0 0 12 14" style={{ imageRendering: 'pixelated', display: 'block' }}>
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
        <span style={{
          position: 'absolute', bottom: '100%', right: -4, marginBottom: 4,
          padding: '2px 6px', borderRadius: 4, background: 'rgba(14,14,14,0.95)',
          border: '0.5px solid rgba(255,255,255,0.1)', whiteSpace: 'nowrap',
          fontSize: 8, color: '#EF9F27', fontFamily: "'Glitch Goblin', monospace",
          pointerEvents: 'none',
        }}>player 2?</span>
      )}
    </span>
  )
}

export default function Footer({ section, showAVLink, showPixelJack }) {
  return (
    <footer style={{
      borderTop: '0.5px solid rgba(255,255,255,0.06)',
      padding: '40px 48px 32px', maxWidth: 1200, margin: '0 auto',
    }}>
      {showAVLink && (
        <p style={{ fontSize: 13, color: 'rgba(241,239,232,0.4)', marginBottom: 24, textAlign: 'center' }}>
          Want to check out my freelance and corporate work?{' '}
          <Link to="/albert-video" style={{ color: '#378ADD', textDecoration: 'underline' }}>Go here</Link>
        </p>
      )}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 5, background: '#F1EFE8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: '#0E0E0E', fontFamily: "'Space Grotesk', sans-serif",
          }}>O</div>
          <span style={{ fontSize: 12, color: 'rgba(241,239,232,0.35)', fontFamily: "'Special Elite', 'junkos typewriter', 'JetBrains Mono', monospace" }}>
            &copy; Odd Rex Studios {new Date().getFullYear()}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <p style={{ fontSize: 11, color: 'rgba(241,239,232,0.2)', fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>
            All rights reserved.
          </p>
          <a href="https://buymeacoffee.com/JackAlbertORS" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 10, color: '#FFDD00', fontFamily: "'JetBrains Mono', monospace",
            textDecoration: 'none', padding: '3px 10px', borderRadius: 10,
            background: 'rgba(255,221,0,0.08)', border: '0.5px solid rgba(255,221,0,0.2)',
            transition: 'all 0.3s ease',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107l.009-.042a18.43 18.43 0 011.466-.124c1.085-.053 2.171-.055 3.255.017.476.032.956.081 1.425.168.148.028.3.06.437.128.093.044.174.129.154.24-.019.11-.14.168-.238.196-.375.107-.774.125-1.16.142-.822.035-1.646.037-2.468.004-.823-.033-1.644-.103-2.46-.222-.273-.04-.551-.04-.818.023-.297.07-.529.299-.564.608-.04.355.186.652.508.766.442.157.909.221 1.373.26a24.81 24.81 0 003.7.037c.58-.04 1.158-.109 1.73-.214.326-.06.65-.137.966-.24.406-.134.802-.378.939-.8.066-.204.053-.426.021-.636zM2.983 14.75l-.09.45c-.032.163.025.326.1.471.162.31.476.5.82.547.344.048.683-.035.998-.15.46-.168.883-.425 1.248-.744.365-.318.687-.69.948-1.1.26-.408.457-.85.582-1.312.081-.299.127-.607.137-.916.004-.117-.013-.237-.044-.352-.06-.222-.23-.39-.44-.46-.211-.072-.44-.044-.638.052-.197.096-.36.255-.463.449-.162.305-.244.652-.237 1.002.005.273.063.55.07.824.006.213-.018.44-.095.64-.077.2-.213.37-.38.5-.168.13-.363.22-.568.267-.204.046-.418.042-.618-.015a.757.757 0 01-.423-.33.757.757 0 01-.077-.525l.09-.452c.035-.17-.022-.34-.1-.489-.165-.313-.482-.503-.83-.55-.346-.048-.687.037-1.002.154a3.823 3.823 0 00-1.27.76 3.869 3.869 0 00-.936 1.13c-.252.413-.44.86-.556 1.327-.075.303-.113.613-.116.924-.001.119.016.24.05.356.065.22.24.384.452.45.213.066.443.034.636-.06.193-.1.352-.26.45-.456.157-.31.233-.66.22-1.012-.01-.275-.072-.55-.082-.824-.008-.213.016-.44.09-.642.076-.203.21-.374.378-.505.167-.132.362-.223.567-.27.206-.047.42-.045.622.01.158.043.301.14.399.276.098.137.141.305.106.468z"/></svg>
            BMC
          </a>
          {showPixelJack && <PixelJack />}
        </div>
      </div>
      {section?.fontAttribution && (
        <p style={{ fontSize: 10, color: 'rgba(241,239,232,0.18)', marginTop: 16, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace" }}>
          {section.fontAttribution.note}
        </p>
      )}
    </footer>
  )
}
