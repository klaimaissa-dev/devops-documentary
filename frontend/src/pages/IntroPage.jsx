import React from 'react';
import AnimatedChain from '../components/AnimatedChain';

const STATS = [
  { value: '208×',  color: 'var(--blue)',  label: 'more frequent deployments — elite vs low performers' },
  { value: '2604×', color: 'var(--teal)',  label: 'faster recovery from incidents (hours vs months)' },
  { value: '50%',   color: 'var(--coral)', label: 'less time on unplanned rework and remediation' },
];

const PILLARS = [
  { icon: '🔄', bg: '#378ADD22', title: 'CI / CD', desc: 'Every commit triggers automated tests and deployment — zero manual steps.', page: 'chain' },
  { icon: '🛡️', bg: '#E24B4A22', title: 'Shift-left security', desc: 'Security scans run in the pipeline, catching vulnerabilities before production.', page: 'chain' },
  { icon: '📊', bg: '#EF9F2722', title: 'Observability', desc: 'Metrics, logs, and alerts give real-time visibility into production systems.', page: 'impact' },
  { icon: '🏗️', bg: '#7F77DD22', title: 'Infrastructure as Code', desc: 'Servers and clusters are version-controlled and reproducible like software.', page: 'impact' },
];

export default function IntroPage({ setActivePage }) {
  return (
    <div style={{ padding: '0 32px 64px', animation: 'fadeInUp 0.5s ease both' }}>

      {/* Hero */}
      <div style={{ padding: '60px 0 48px', textAlign: 'center', maxWidth: '540px', margin: '0 auto' }}>
        <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase',
          color: 'var(--blue)', fontWeight: 500, marginBottom: '18px' }}>
          A visual documentary
        </div>
        <h1 style={{ fontSize: '40px', fontWeight: 600, lineHeight: 1.12,
          letterSpacing: '-1.5px', marginBottom: '18px' }}>
          Software delivered<br />at the speed of{' '}
          <span style={{ color: 'var(--blue)' }}>trust</span>
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          DevOps unites development and operations into one continuous, automated,
          and monitored loop — so teams ship better software, faster.
        </p>
      </div>

      {/* Animated chain */}
      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
          color: 'var(--text-muted)', fontWeight: 500, marginBottom: '16px' }}>
          The 9-phase continuous loop
        </div>
        <AnimatedChain />
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '32px' }}>
        {STATS.map(s => (
          <div key={s.value} style={{ background: 'var(--surface)', border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '24px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '30px', fontWeight: 600, letterSpacing: '-1.5px',
              color: s.color, marginBottom: '8px' }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pillars */}
      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '14px' }}>
        Three pillars of DevOps
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {PILLARS.map(p => (
          <div key={p.title} onClick={() => setActivePage(p.page)}
            style={{ background: 'var(--surface)', border: '0.5px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '18px 20px', cursor: 'pointer',
              transition: 'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
            <div style={{ width: '30px', height: '30px', borderRadius: 'var(--radius-sm)',
              background: p.bg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', marginBottom: '12px', fontSize: '15px' }}>
              {p.icon}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '5px' }}>{p.title}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
