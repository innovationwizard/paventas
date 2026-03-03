import { useState, useRef, useEffect } from 'react';
import { COLORS } from '../../theme/colors';

export default function MultiSelect({ label, options, selected, onChange, formatOption }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const allSelected = selected.length === 0;
  const display = allSelected ? `${label}: Todos` : selected.length === 1 ? `${label}: ${formatOption ? formatOption(selected[0]) : selected[0]}` : `${label}: ${selected.length} sel.`;

  const toggle = (val) => {
    if (selected.includes(val)) onChange(selected.filter(v => v !== val));
    else onChange([...selected, val]);
  };

  const baseStyle = {
    background: '#1e293b', color: COLORS.text, border: `1px solid ${allSelected ? COLORS.borderAccent : COLORS.accent}`,
    borderRadius: 6, padding: '7px 12px', fontSize: 13, cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif", userSelect: 'none', position: 'relative', whiteSpace: 'nowrap',
  };

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <div style={baseStyle} onClick={() => setOpen(!open)}>
        {display} <span style={{ fontSize: 10, marginLeft: 4 }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 100,
          background: '#1e293b', border: `1px solid ${COLORS.borderAccent}`, borderRadius: 6,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)', minWidth: '100%', maxHeight: 220, overflowY: 'auto',
        }}>
          <div
            style={{ padding: '6px 12px', fontSize: 12, cursor: 'pointer', color: allSelected ? COLORS.accent : COLORS.textMuted, borderBottom: `1px solid ${COLORS.border}` }}
            onClick={() => { onChange([]); setOpen(false); }}
          >
            Todos
          </div>
          {options.map(opt => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const displayLabel = formatOption ? formatOption(val) : String(val);
            const checked = selected.includes(val);
            return (
              <div key={val} style={{ padding: '6px 12px', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: checked ? COLORS.text : COLORS.textMuted }}
                onClick={() => toggle(val)}>
                <span style={{
                  width: 14, height: 14, borderRadius: 3, border: `1px solid ${checked ? COLORS.accent : COLORS.borderAccent}`,
                  background: checked ? COLORS.accent : 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: '#fff', flexShrink: 0,
                }}>{checked ? '✓' : ''}</span>
                {displayLabel}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
