import { COLORS } from '../../theme/colors';

export default function KPICard({ label, value, sub, color, icon }) {
  return (
    <div style={{
      background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10,
      padding: '18px 20px', flex: '1 1 180px', minWidth: 180,
      borderTop: `3px solid ${color || COLORS.accent}`,
    }}>
      <div style={{ color: COLORS.textDim, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
        {icon && <span style={{ marginRight: 6 }}>{icon}</span>}{label}
      </div>
      <div style={{ color: COLORS.text, fontSize: 26, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}
