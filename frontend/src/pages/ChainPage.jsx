import React from 'react';
import useFetch  from '../hooks/useFetch';
import PhaseCard from '../components/PhaseCard';

export default function ChainPage() {
  const { data: phases, loading, error } = useFetch('/api/phases');

  return (
    <div style={{ padding: '32px', animation: 'fadeInUp 0.5s ease both' }}>

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
          color: 'var(--blue)', fontWeight: 500, marginBottom: '8px' }}>
          The DevOps chain
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.5px' }}>
          9 phases, one continuous loop
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)',
          marginTop: '6px', lineHeight: 1.6 }}>
          Click any phase to expand its description, tools, and a real CLI example.
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px',
          marginTop: '14px', background: '#378ADD14',
          border: '0.5px solid #378ADD44', borderRadius: '20px',
          padding: '6px 14px', fontSize: '12px', color: 'var(--blue-light)' }}>
          ↻ Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → Improve → Plan…
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '12px', padding: '60px 0', color: 'var(--text-secondary)' }}>
          <div style={{ width: '24px', height: '24px',
            border: '2px solid var(--border)', borderTop: '2px solid var(--blue)',
            borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <span>Loading phases from API…</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ background: 'var(--surface)', border: '0.5px solid #E24B4A44',
          borderRadius: 'var(--radius-lg)', padding: '20px',
          color: '#E24B4A', fontSize: '13px' }}>
          Could not load phases: {error}.<br />
          Make sure the backend is running on port 4000.
        </div>
      )}

      {/* Phase cards */}
      {phases && (
        <div style={{ position: 'relative', paddingLeft: '24px' }}>
          <div style={{ position: 'absolute', left: '4px', top: '24px', bottom: '24px',
            width: '0.5px', background: 'var(--border)' }} />
          {phases.map((phase, i) => (
            <PhaseCard key={phase.id} phase={phase} defaultOpen={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
