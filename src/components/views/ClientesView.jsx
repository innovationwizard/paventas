import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { COLORS } from '../../theme/colors';
import { fmtQ, fmtQFull } from '../../utils/formatters';
import SectionTitle from '../ui/SectionTitle';
import CustomTooltip from '../charts/CustomTooltip';

export default function ClientesView({ clienteAgg, filtered, openDrillDown }) {
  const thStyle = {
    padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: COLORS.textDim,
    textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap',
    borderBottom: `1px solid ${COLORS.border}`, userSelect: 'none',
    fontFamily: "'DM Sans', sans-serif", cursor: 'default',
  };

  const tdStyle = { padding: '10px 12px', fontSize: 13, borderBottom: `1px solid ${COLORS.border}`, fontFamily: "'DM Sans', sans-serif" };

  return (
    <>
      {/* Top clients bar */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20, marginBottom: 22 }}>
        <SectionTitle sub="Top 15 clientes por valor de cartera">Concentración por Cliente</SectionTitle>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={clienteAgg.slice(0, 15)} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis type="number" tick={{ fill: COLORS.textDim, fontSize: 10 }} tickFormatter={v => fmtQ(v)} />
            <YAxis dataKey="name" type="category" tick={{ fill: COLORS.textMuted, fontSize: 10 }} width={180} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: COLORS.textMuted }} />
            <Bar dataKey="venta" name="Valor Venta" fill={COLORS.accent} radius={[0, 4, 4, 0]} style={{ cursor: 'pointer' }}
              onClick={(data) => openDrillDown(`Cliente: ${data.name}`, filtered.filter(r => r.cliente === data.name))} />
            <Bar dataKey="pagado" name="Pagado" fill={COLORS.green} radius={[0, 4, 4, 0]} style={{ cursor: 'pointer' }}
              onClick={(data) => openDrillDown(`Cliente: ${data.name}`, filtered.filter(r => r.cliente === data.name))} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Client table */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}` }}>
          <SectionTitle sub={`${clienteAgg.length} clientes únicos`}>Resumen por Cliente</SectionTitle>
        </div>
        <div style={{ overflowX: 'auto', maxHeight: 500 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
            <thead>
              <tr>
                {['Cliente', 'Unidades', 'Valor Total', 'Pagado', 'Dif. Feb', 'Plusvalía'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clienteAgg.map((c, i) => (
                <tr key={i}>
                  <td style={{ ...tdStyle, color: COLORS.text, fontWeight: 500 }}>{c.name}</td>
                  <td style={{ ...tdStyle, textAlign: 'center', color: COLORS.accentLight, fontWeight: 600 }}>{c.unidades}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: COLORS.text }}>{fmtQFull(c.venta)}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: COLORS.text }}>{fmtQFull(c.pagado)}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: c.difFebrero >= 0 ? COLORS.green : COLORS.red }}>{fmtQFull(c.difFebrero)}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: c.plusvalia >= 0 ? COLORS.green : COLORS.red }}>{fmtQFull(c.plusvalia)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
