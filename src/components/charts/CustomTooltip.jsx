import { COLORS } from '../../theme/colors';
import { fmtQFull } from '../../utils/formatters';

export default function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1e293b', border: `1px solid ${COLORS.borderAccent}`, borderRadius: 8, padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
      <div style={{ color: COLORS.text, fontSize: 13, fontWeight: 600, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
          {p.name}: {typeof p.value === 'number' ? fmtQFull(p.value) : p.value}
        </div>
      ))}
    </div>
  );
}
