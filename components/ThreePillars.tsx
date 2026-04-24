const PILLARS = [
  {
    n: '01',
    label: 'RESEARCH',
    title: 'Research',
    body: 'We investigate the physical limits of machine intelligence. Our research teams work at the intersection of perception science, causal reasoning and hardware — asking a single question: how does a machine reliably understand the world it is actually in? Every project begins here, grounded in real environments, real sensors and real failure modes.',
  },
  {
    n: '02',
    label: 'DEVELOPMENT',
    title: 'Development',
    body: 'Research becomes systems. We translate findings into modular, production-ready software: sensor fusion pipelines, physical intelligence middleware, embodied reasoning engines. Our development cycle runs close to hardware, with continuous testing in the environments our systems will eventually operate in — not controlled labs, but the messy physical world.',
  },
  {
    n: '03',
    label: 'INTEGRATION',
    title: 'Integration',
    body: 'Systems become deployments. We work directly with industrial partners to integrate our technology into existing infrastructure — logistics, manufacturing, field robotics. Integration is not the last step. It is where we learn the most, and where every assumption made in research and development gets tested against reality.',
  },
]

const mono = "'Courier Prime', 'Courier New', monospace"

const btn: React.CSSProperties = {
  width: '16px', height: '14px',
  border: '1.5px solid', borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
  background: '#C0C0C0', color: '#000', fontSize: '8px',
  cursor: 'default', display: 'inline-flex', alignItems: 'center',
  justifyContent: 'center', padding: 0, fontFamily: 'Arial, sans-serif',
}

interface Props {
  bg: string
  fg: string
  border: string
}

export default function ThreePillars({ bg, fg, border }: Props) {
  return (
    <section style={{ background: bg, color: fg, borderTop: `0.5px dashed ${border}` }}>
      {/* Label row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '8px 12px', borderBottom: `0.5px dashed ${border}`,
        fontFamily: mono, fontSize: '9px', textTransform: 'uppercase',
        letterSpacing: '0.08em', opacity: 0.5,
      }}>
        <span>KEDORION</span>
        <span style={{ flex: '0 0 20px', borderTop: `0.5px dashed ${border}` }} />
        <span>THREE LEVELS</span>
        <span style={{ flex: '0 0 20px', borderTop: `0.5px dashed ${border}` }} />
        <span>V. 001</span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '28px',
        padding: '32px 24px 40px',
      }}>
        {PILLARS.map((p) => (
          <div key={p.n} style={{
            display: 'flex', flexDirection: 'column',
            border: '2px solid', borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
            boxShadow: '1px 1px 0 #0a0a0a',
            background: '#C0C0C0',
          }}>
            {/* Title bar */}
            <div style={{
              background: 'linear-gradient(to right, #000080, #1084D0)',
              padding: '3px 4px 3px 6px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              gap: '4px', userSelect: 'none',
            }}>
              <span style={{ color: '#FFF', fontFamily: 'Arial, sans-serif', fontSize: '11px', fontWeight: 700 }}>
                {p.label}
              </span>
              <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
                <button tabIndex={-1} style={btn}>─</button>
                <button tabIndex={-1} style={btn}>□</button>
                <button tabIndex={-1} style={{ ...btn, fontSize: '7px' }}>✕</button>
              </div>
            </div>

            {/* Menu bar */}
            <div style={{
              display: 'flex', background: '#C0C0C0',
              borderBottom: '1px solid #808080', padding: '1px 4px',
            }}>
              {['File', 'Edit', 'View'].map(m => (
                <span key={m} style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#000', padding: '1px 6px', cursor: 'default' }}>{m}</span>
              ))}
            </div>

            {/* Body */}
            <div style={{
              background: '#FFFFFF',
              border: '2px solid', borderColor: '#808080 #FFFFFF #FFFFFF #808080',
              margin: '4px', padding: '16px 14px 20px',
              display: 'flex', flexDirection: 'column', gap: '10px', flex: 1,
            }}>
              <div style={{ fontFamily: mono, fontSize: '9px', color: '#808080', letterSpacing: '0.08em' }}>{p.n}</div>
              <h3 style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: 'clamp(20px, 2.8vw, 42px)',
                fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '-0.03em', lineHeight: 0.9,
                margin: 0, color: '#000080',
              }}>{p.title}</h3>
              <p style={{ fontFamily: mono, fontSize: '12px', lineHeight: 1.75, letterSpacing: '0.02em', color: '#222', margin: 0 }}>{p.body}</p>
            </div>

            {/* Status bar */}
            <div style={{ display: 'flex', gap: '2px', padding: '2px 4px 4px', background: '#C0C0C0' }}>
              {['Ready', 'KEDORION R&D'].map(s => (
                <span key={s} style={{
                  fontFamily: 'Arial, sans-serif', fontSize: '10px', color: '#000',
                  border: '1.5px solid', borderColor: '#808080 #FFF #FFF #808080',
                  padding: '1px 6px', flex: 1,
                }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .three-pillars-grid { grid-template-columns: 1fr !important; gap: 20px !important; padding: 24px 16px 32px !important; }
        }
      `}</style>
    </section>
  )
}
