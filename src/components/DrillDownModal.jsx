import { COLORS } from '../theme/colors';
import { fmtQFull } from '../utils/formatters';
import Badge from './ui/Badge';

export default function DrillDownModal({ drillDown, drillFiltered, drillSearch, setDrillSearch, drillSortCol, drillSortDir, handleDrillSort, onClose }) {
  if (!drillDown) return null;

  const mTh = (col) => ({
    padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700,
    color: COLORS.textDim, textTransform: 'uppercase', letterSpacing: '0.08em',
    cursor: 'pointer', whiteSpace: 'nowrap', borderBottom: `1px solid ${COLORS.border}`,
    userSelect: 'none', fontFamily: "'DM Sans', sans-serif",
    background: drillSortCol === col ? 'rgba(59,130,246,0.08)' : 'transparent',
  });

  const mTd = {
    padding: '10px 12px', fontSize: 13, borderBottom: `1px solid ${COLORS.border}`, fontFamily: "'DM Sans', sans-serif",
  };

  const cols = [
    ['cliente', 'Cliente'], ['apto', 'Apto'], ['modelo', 'Modelo'],
    ['precioVenta', 'Precio Venta'], ['enganchePagado', 'Pagado'],
    ['difFebrero', 'Dif. Feb'], ['estatus', 'Estatus'], ['bloque', 'Bloque'], ['precalificacion', 'Precalif.'],
  ];

  const totals = drillFiltered.reduce((s, r) => ({ v: s.v + r.precioVenta, p: s.p + r.enganchePagado, d: s.d + r.difFebrero }), { v: 0, p: 0, d: 0 });

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: COLORS.card, border: `1px solid ${COLORS.borderAccent}`, borderRadius: 12, width: '95%', maxWidth: 1100, maxHeight: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: COLORS.text, fontFamily: "'DM Sans', sans-serif" }}>{drillDown.title}</h3>
            <div style={{ color: COLORS.textDim, fontSize: 12, marginTop: 4 }}>{drillFiltered.length} de {drillDown.records.length} registros</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: `1px solid ${COLORS.border}`, borderRadius: 6, color: COLORS.textMuted, cursor: 'pointer', fontSize: 18, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        <div style={{ padding: '12px 24px', borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
          <input type="text" placeholder="Buscar cliente, apto o modelo..." value={drillSearch} onChange={e => setDrillSearch(e.target.value)}
            style={{ background: '#1e293b', color: COLORS.text, border: `1px solid ${COLORS.borderAccent}`, borderRadius: 6, padding: '8px 14px', fontSize: 13, width: '100%', maxWidth: 400, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
            <thead style={{ position: 'sticky', top: 0, background: COLORS.card, zIndex: 1 }}>
              <tr>{cols.map(([col, label]) => (
                <th key={col} style={mTh(col)} onClick={() => handleDrillSort(col)}>{label} {drillSortCol === col ? (drillSortDir === 'asc' ? '▲' : '▼') : ''}</th>
              ))}</tr>
            </thead>
            <tbody>
              {drillFiltered.map(r => (
                <tr key={r.id} onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.06)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ ...mTd, color: COLORS.text, fontWeight: 500, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.cliente}</td>
                  <td style={{ ...mTd, color: COLORS.textMuted }}>{r.apto}</td>
                  <td style={{ ...mTd, color: COLORS.accentLight, fontWeight: 600 }}>{r.modelo}</td>
                  <td style={{ ...mTd, textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: COLORS.text }}>{fmtQFull(r.precioVenta)}</td>
                  <td style={{ ...mTd, textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: COLORS.text }}>{fmtQFull(r.enganchePagado)}</td>
                  <td style={{ ...mTd, textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: r.difFebrero >= 0 ? COLORS.green : COLORS.red }}>{fmtQFull(r.difFebrero)}</td>
                  <td style={mTd}><Badge color={r.estatus === 'ATRASADO' ? COLORS.red : COLORS.green} bg={r.estatus === 'ATRASADO' ? COLORS.redBg : COLORS.greenBg}>{r.estatus}</Badge></td>
                  <td style={{ ...mTd, textAlign: 'center', color: COLORS.textMuted }}>{r.bloque}</td>
                  <td style={mTd}><Badge color={r.precalificacion === 'APROBADA' ? COLORS.green : r.precalificacion === 'DENEGADA' ? COLORS.red : COLORS.textDim} bg={r.precalificacion === 'APROBADA' ? COLORS.greenBg : r.precalificacion === 'DENEGADA' ? COLORS.redBg : 'rgba(100,116,139,0.12)'}>{r.precalificacion}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 24px', borderTop: `1px solid ${COLORS.border}`, display: 'flex', gap: 24, fontSize: 12, color: COLORS.textMuted, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>
          <span>Total Venta: <strong style={{ color: COLORS.text }}>{fmtQFull(totals.v)}</strong></span>
          <span>Total Pagado: <strong style={{ color: COLORS.text }}>{fmtQFull(totals.p)}</strong></span>
          <span>Dif. Feb: <strong style={{ color: totals.d >= 0 ? COLORS.green : COLORS.red }}>{fmtQFull(totals.d)}</strong></span>
        </div>
      </div>
    </div>
  );
}
