import { COLORS } from '../theme/colors';

export default function Header({ totalCount, selectedView, setSelectedView }) {
  const tabStyle = (active) => ({
    padding: '8px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer',
    border: 'none', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.02em',
    background: active ? COLORS.accent : 'transparent',
    color: active ? '#fff' : COLORS.textMuted,
    transition: 'all 0.2s',
  });

  return (
    <div style={{ background: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)', borderBottom: `1px solid ${COLORS.border}`, padding: '20px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Panel de Control Financiero</div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: COLORS.text }}>Cesión de Derechos — Aptos</h1>
          <div style={{ color: COLORS.textDim, fontSize: 12, marginTop: 4 }}>Corte: Febrero 2026 · {totalCount} unidades en cartera</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {['resumen', 'cartera', 'clientes'].map(v => (
            <button key={v} style={tabStyle(selectedView === v)} onClick={() => setSelectedView(v)}>
              {v === 'resumen' ? '📊 Resumen' : v === 'cartera' ? '🏢 Cartera' : '👤 Clientes'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
