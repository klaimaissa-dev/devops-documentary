import React, { useState, useEffect } from 'react';

const PHASES = [
  { icon: '📋', label: 'Plan',    color: '#7F77DD' },
  { icon: '💻', label: 'Code',    color: '#378ADD' },
  { icon: '🔨', label: 'Build',   color: '#1D9E75' },
  { icon: '🧪', label: 'Test',    color: '#EF9F27' },
  { icon: '🚀', label: 'Release', color: '#D85A30' },
  { icon: '📦', label: 'Deploy',  color: '#378ADD' },
  { icon: '⚙️', label: 'Operate', color: '#1D9E75' },
  { icon: '📈', label: 'Monitor', color: '#E24B4A' },
  { icon: '✨', label: 'Improve', color: '#7F77DD' },
];

export default function AnimatedChain() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % PHASES.length), 750);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto',
      padding: '8px 0 12px', scrollbarWidth: 'none' }}>
      {PHASES.map((p, i) => (
        <React.Fragment key={p.label}>
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '46px', height: '46px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px',
              background: active === i ? p.color + '22' : 'var(--surface)',
              border: `1.5px solid ${active === i ? p.color : 'var(--border)'}`,
              transform: active === i ? 'scale(1.15)' : 'scale(1)',
              boxShadow: active === i ? `0 0 14px ${p.color}44` : 'none',
              transition: 'all 0.3s ease',
            }}>
              {p.icon}
            </div>
            <span style={{
              fontSize: '10px', fontWeight: 500, letterSpacing: '0.5px',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
              color: active === i ? p.color : 'var(--text-muted)',
              transition: 'color 0.3s',
            }}>
              {p.label}
            </span>
          </div>
          {i < PHASES.length - 1 && (
            <div style={{ width: '24px', flexShrink: 0, height: '1px',
              background: 'var(--border)', position: 'relative', top: '-12px' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
