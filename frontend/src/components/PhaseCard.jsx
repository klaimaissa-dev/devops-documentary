import React, { useState } from 'react';

export default function PhaseCard({ phase, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const c = phase.badge_color || '#378ADD';

  return (
    <div style={{
      border: `0.5px solid ${open ? c : 'var(--border)'}`,
      borderRadius: 'var(--radius-lg)', marginBottom: '10px',
      overflow: 'hidden', transition: 'border-color 0.2s',
    }}>
      {/* Header — click to toggle */}
      <div onClick={() => setOpen(o => !o)} style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '14px 18px', cursor: 'pointer',
        background: 'var(--surface)',
      }}>
        {/* Animated dot */}
        <div style={{
          width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
          background: open ? c : 'var(--border)',
          transform: open ? 'scale(1.3)' : 'scale(1)',
          transition: 'all 0.2s',
        }} />
        {/* Badge */}
        <span style={{
          fontSize: '10px', fontWeight: 500, padding: '3px 10px',
          borderRadius: '12px', flexShrink: 0,
          background: c + '22', color: c, border: `0.5px solid ${c}44`,
        }}>
          {phase.badge}
        </span>
        {/* Title */}
        <span style={{ fontSize: '14px', fontWeight: 500, flex: 1 }}>
          {phase.name}
        </span>
        {/* Tool tag */}
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>
          {phase.tool_example}
        </span>
        {/* Chevron */}
        <span style={{
          fontSize: '11px', color: 'var(--text-muted)',
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}>▶</span>
      </div>

      {/* Expandable body */}
      {open && (
        <div style={{
          padding: '0 18px 18px 40px',
          background: 'var(--surface)',
          borderTop: '0.5px solid var(--border)',
          animation: 'fadeInUp 0.25s ease both',
        }}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)',
            lineHeight: 1.7, margin: '12px 0 10px' }}>
            {phase.description}
          </p>
          {phase.cli_example && (
            <pre style={{
              background: 'var(--surface2)', borderRadius: 'var(--radius-sm)',
              borderLeft: '3px solid var(--blue)', padding: '10px 14px',
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: 'var(--text-secondary)', whiteSpace: 'pre-wrap',
            }}>
              {phase.cli_example}
            </pre>
          )}
          <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>
            Tools: <span style={{ color: 'var(--blue-light)', fontWeight: 500 }}>
              {phase.tool_example}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
