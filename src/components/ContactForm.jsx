import { useState, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════
// EmailJS Configuration — TWO separate forms, TWO email targets
// ═══════════════════════════════════════════════════════════════
//
// FORM 1: Albert Video / A/V Productions → jacka4256@gmail.com
//   Used on the A/V (freelance) page
//
// FORM 2: Odd Rex Studios → oddrex@gmail.com
//   Used on the About page
//
// HOW TO SET UP:
// 1. Go to https://www.emailjs.com → create a free account
// 2. Add TWO Gmail services:
//    • One connected to jacka4256@gmail.com → note its Service ID
//    • One connected to oddrex@gmail.com   → note its Service ID
// 3. Create an email template with variables:
//    {{from_name}}, {{reply_to}}, {{subject}}, {{message}}
//    (You can reuse the same template for both, or make two)
// 4. Go to Account → API Keys → copy your Public Key
// 5. Fill in the values below:

const EMAILJS_CONFIGS = {
  av: {
    service:  'YOUR_AV_SERVICE_ID',      // Gmail service for jacka4256@gmail.com
    template: 'YOUR_AV_TEMPLATE_ID',     // e.g. 'template_xyz789'
    key:      'YOUR_PUBLIC_KEY',          // same public key for both
  },
  ors: {
    service:  'YOUR_ORS_SERVICE_ID',     // Gmail service for oddrex@gmail.com
    template: 'YOUR_ORS_TEMPLATE_ID',    // e.g. 'template_abc123'
    key:      'YOUR_PUBLIC_KEY',          // same public key for both
  },
}

export default function ContactForm({ accent = '#378ADD', gradient, formId = 'ors' }) {
  const [status, setStatus] = useState(null)
  const [focused, setFocused] = useState(null)
  const formRef = useRef()

  const config = EMAILJS_CONFIGS[formId] || EMAILJS_CONFIGS.ors

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const emailjs = await import('@emailjs/browser')
      await emailjs.sendForm(config.service, config.template, formRef.current, config.key)
      setStatus('sent')
      formRef.current.reset()
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.03)',
    border: `0.5px solid ${focused === field ? 'rgba(241,239,232,0.2)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 8, color: '#F1EFE8', fontSize: 14,
    fontFamily: "'Inter', system-ui, sans-serif", outline: 'none',
    transition: 'border-color 0.3s ease', boxSizing: 'border-box',
  })

  const btnBg = gradient ? `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` : accent

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="form-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <input name="from_name" type="text" placeholder="Name" required style={inputStyle('name')}
          onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
        <input name="reply_to" type="email" placeholder="Email" required style={inputStyle('email')}
          onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
      </div>
      <input name="subject" type="text" placeholder="Subject" style={inputStyle('subject')}
        onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)} />
      <textarea name="message" placeholder="Tell me about your project..." rows={5} required
        style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
        onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
      <button type="submit" disabled={status === 'sending'} style={{
        width: '100%', padding: '14px 24px', background: btnBg, border: 'none', borderRadius: 8,
        color: '#0E0E0E', fontSize: 15, fontWeight: 600, cursor: 'pointer',
        fontFamily: "'Space Grotesk', sans-serif", opacity: status === 'sending' ? 0.6 : 1,
        transition: 'all 0.3s ease',
      }}>
        {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent!' : status === 'error' ? 'Error — try again' : 'Send message'}
      </button>
    </form>
  )
}
