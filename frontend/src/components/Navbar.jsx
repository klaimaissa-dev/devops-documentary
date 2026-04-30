import React from 'react';

const PAGES = [
  { id: 'intro',  label: 'What is DevOps?' },
  { id: 'chain',  label: 'The chain' },
  { id: 'impact', label: 'Why it matters' },
];

export default function Navbar({ activePage, setActivePage }) {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 32px',
      background: 'rgba(13,15,20,0.88)',
      backdropFilter: 'blur(12px)',
      borderBottom: '0.5px solid var(--border)',
    }}>
      <div style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.3px' }}>
        dev<span style={{ color: 'var(--blue)' }}>ops</span>.documentary
      </div>

      <div style={{ display: 'flex', gap: '4px' }}>
        {PAGES.map((p) => (
          <button key={p.id} onClick={() => setActivePage(p.id)} style={{
            padding: '7px 16px', borderRadius: '20px', cursor: 'pointer',
            fontSize: '12px', fontWeight: activePage === p.id ? 500 : 400,
            border: activePage === p.id ? '0.5px solid var(--blue)' : '0.5px solid var(--border)',
            background: activePage === p.id ? 'rgba(55,138,221,0.12)' : 'transparent',
            color: activePage === p.id ? 'var(--blue-light)' : 'var(--text-secondary)',
            transition: 'all 0.2s',
          }}>
            {p.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
