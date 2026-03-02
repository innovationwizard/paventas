import { COLORS } from '../../theme/colors';

export default function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <h3 style={{ color: COLORS.text, fontSize: 16, fontWeight: 700, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{children}</h3>
      {sub && <div style={{ color: COLORS.textDim, fontSize: 12, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
