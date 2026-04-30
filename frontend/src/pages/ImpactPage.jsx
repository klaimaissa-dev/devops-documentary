import React, { useEffect, useRef, useState } from 'react';
import Quiz from '../components/Quiz';

const COMPANIES = [
  { name: 'Netflix',  stat: '500+',   color: 'var(--red)',    desc: 'Deploys 500+ times per day using Spinnaker and automated canary analysis.' },
  { name: 'Amazon',   stat: '~1/sec', color: 'var(--amber)',  desc: 'A deployment every second — microservices, containers, and GitOps at scale.' },
  { name: 'Google',   stat: 'SRE',    color: 'var(--blue)',   desc: 'Invented Site Reliability Engineering — the backbone of modern DevOps.' },
  { name: 'GitLab',   stat: '100%',   color: 'var(--purple)', desc: 'Fully remote, fully GitOps — their own platform is their DevOps showcase.' },
];

const BARS = [
  { label: 'Elite',   note: 'Multiple deploys/day',    pct: 95, color: 'var(--teal)'   },
  { label: 'High',    note: 'Once/week to once/day',   pct: 68, color: 'var(--blue)'   },
  { label: 'Medium',  note: 'Once/week to once/month', pct: 40, color: 'var(--amber)'  },
  { label: 'Low',     note: 'Once/month or less',      pct: 18, color: 'var(--red)'    },
];

function BarChart() {
  const [go, setGo] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Animate bars only when they scroll into view
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setGo(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: '32px' }}>
      <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '16px' }}>
        Deployment frequency — DORA 2023 benchmarks
      </div>
      {BARS.map(b => (
        <div key={b.label} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            fontSize: '12px', marginBottom: '5px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>{b.label} performers</span>
            <span style={{ color: 'var(--text-muted)' }}>{b.note}</span>
          </div>
          <div style={{ height: '7px', background: 'var(--surface2)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '4px', background: b.color,
              width: go ? `${b.pct}%` : '0%',
              transition: 'width 1.3s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ImpactPage({ setActivePage }) {
  return (
    <div style={{ padding: '32px', animation: 'fadeInUp 0.5s ease both' }}>
      <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
        color: 'var(--blue)', fontWeight: 500, marginBottom: '8px' }}>
        Industry impact
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.5px', marginBottom: '24px' }}>
        Why every company is going DevOps
      </h2>

      {/* Company cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '32px' }}>
        {COMPANIES.map(co => (
          <div key={co.name} style={{ background: 'var(--surface)', border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '18px 20px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>{co.name}</div>
            <div style={{ fontSize: '26px', fontWeight: 600, letterSpacing: '-1px',
              color: co.color, marginBottom: '8px' }}>{co.stat}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{co.desc}</div>
          </div>
        ))}
      </div>

      <BarChart />

      {/* Quote */}
      <div style={{ background: 'var(--surface)', borderLeft: '3px solid var(--blue)',
        borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
        padding: '20px 24px', marginBottom: '32px' }}>
        <div style={{ fontSize: '15px', fontStyle: 'italic', lineHeight: 1.65, marginBottom: '10px' }}>
          "DevOps is not a goal, but a never-ending process of continual improvement."
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          — Jez Humble, co-author of Continuous Delivery (2010)
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '0.5px solid var(--border)', margin: '32px 0' }} />

      <Quiz />

      <hr style={{ border: 'none', borderTop: '0.5px solid var(--border)', margin: '32px 0' }} />

      <button onClick={() => setActivePage('chain')}
        style={{ background: 'transparent', border: '0.5px solid var(--border)',
          borderRadius: 'var(--radius-md)', padding: '11px 20px',
          fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue-light)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
        ← Explore the DevOps chain
      </button>
    </div>
  );
}
