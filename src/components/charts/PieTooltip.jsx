import { COLORS } from '../../theme/colors';

export default function PieTooltip({ active, payload, totalCount }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{ background: '#1e293b', border: `1px solid ${COLORS.borderAccent}`, borderRadius: 8, padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
      <div style={{ color: COLORS.text, fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{d.name}</div>
      <div style={{ color: d.payload.fill, fontSize: 12 }}>{d.value} unidades ({((d.value / totalCount) * 100).toFixed(1)}%)</div>
    </div>
  );
}
