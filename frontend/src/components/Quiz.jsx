import React, { useState, useEffect } from 'react';

const KEYS = ['a', 'b', 'c', 'd'];
const BASE = process.env.REACT_APP_API_URL || '';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers,   setAnswers]   = useState({});
  const [result,    setResult]    = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [submitting,setSubmitting]= useState(false);

  useEffect(() => {
    fetch(`${BASE}/api/quiz`)
      .then(r => r.json())
      .then(j => { setQuestions(j.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const submit = async () => {
    setSubmitting(true);
    const res  = await fetch(`${BASE}/api/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    });
    const json = await res.json();
    setResult(json.data);
    setSubmitting(false);
  };

  if (loading) return (
    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Loading questions…</p>
  );

  if (result) {
    const color = result.percentage >= 80 ? 'var(--teal)'
                : result.percentage >= 50 ? 'var(--amber)' : 'var(--red)';
    return (
      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '52px', fontWeight: 600,
          letterSpacing: '-2px', color, marginBottom: '8px' }}>
          {result.percentage}%
        </div>
        <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '6px' }}>
          {result.score} / {result.total} correct
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          {result.percentage >= 80 ? 'Excellent! Solid DevOps foundation.' :
           result.percentage >= 50 ? 'Good effort — review the chain to fill the gaps.' :
           'Keep learning — the chain page is a great place to start.'}
        </div>
        <button onClick={() => { setResult(null); setAnswers({}); }} style={{
          background: 'var(--blue)', color: '#fff', border: 'none',
          borderRadius: 'var(--radius-md)', padding: '10px 24px',
          fontSize: '13px', fontWeight: 500, cursor: 'pointer',
        }}>Try again</button>
      </div>
    );
  }

  const allAnswered = questions.length > 0 &&
    Object.keys(answers).length === questions.length;

  return (
    <div>
      <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '20px' }}>
        Test your DevOps knowledge
      </div>
      {questions.map(q => (
        <div key={q.id} style={{ background: 'var(--surface)',
          border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)',
          padding: '20px', marginBottom: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: 500,
            marginBottom: '14px', lineHeight: 1.5 }}>
            {q.question}
          </div>
          {KEYS.filter(k => q.options[k]).map(key => {
            const sel = answers[q.id] === key;
            return (
              <div key={key}
                onClick={() => setAnswers(p => ({ ...p, [q.id]: key }))}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', borderRadius: 'var(--radius-md)',
                  marginBottom: '6px', cursor: 'pointer', fontSize: '13px',
                  border: `0.5px solid ${sel ? 'var(--blue)' : 'var(--border)'}`,
                  background: sel ? 'rgba(55,138,221,0.08)' : 'transparent',
                  transition: 'all 0.15s',
                }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                  border: `1.5px solid ${sel ? 'var(--blue)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {sel && <div style={{ width: '8px', height: '8px',
                    borderRadius: '50%', background: 'var(--blue)' }} />}
                </div>
                <span style={{ color: sel ? 'var(--blue-light)' : 'var(--text-primary)' }}>
                  <strong style={{ color: 'var(--text-muted)', marginRight: '6px' }}>{key}.</strong>
                  {q.options[key]}
                </span>
              </div>
            );
          })}
        </div>
      ))}
      <button onClick={submit} disabled={!allAnswered || submitting} style={{
        width: '100%', padding: '13px',
        background: allAnswered ? 'var(--blue)' : 'var(--surface2)',
        color: allAnswered ? '#fff' : 'var(--text-muted)',
        border: 'none', borderRadius: 'var(--radius-md)',
        fontSize: '14px', fontWeight: 500,
        cursor: allAnswered ? 'pointer' : 'not-allowed',
        transition: 'background 0.2s',
      }}>
        {submitting ? 'Submitting…'
          : allAnswered ? 'Submit answers'
          : `Answer all ${questions.length} questions`}
      </button>
    </div>
  );
}
