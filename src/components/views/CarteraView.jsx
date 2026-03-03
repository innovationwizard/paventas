import { useState } from 'react';
import { COLORS } from '../../theme/colors';
import { fmtQFull } from '../../utils/formatters';
import Badge from '../ui/Badge';
import SectionTitle from '../ui/SectionTitle';

export default function CarteraView({ sorted, allData }) {
  const [selectedRow, setSelectedRow] = useState(null);

  const thStyle = (col, sortCol) => ({
    padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: COLORS.textDim,
    textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', whiteSpace: 'nowrap',
    borderBottom: `1px solid ${COLORS.border}`, userSelect: 'none',
    fontFamily: "'DM Sans', sans-serif",
    background: sortCol === col ? 'rgba(59,130,246,0.08)' : 'transparent',
  });

  const tdStyle = { padding: '10px 12px', fontSize: 13, borderBottom: `1px solid ${COLORS.border}`, fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' };

  const columns = [
    ['cliente', 'Cliente'], ['apto', 'Apto'], ['modelo', 'Modelo'],
    ['precioVenta', 'Precio Venta'], ['precioSugerido', 'P. Sugerido'],
    ['plusvalia', 'Plusvalía'], ['engancheTotal', 'Enganche Plan'],
    ['enganchePagado', 'Pagado'], ['difFebrero', 'Dif. Feb'],
    ['estatus', 'Estatus'], ['bloque', 'Bloque'], ['precalificacion', 'Precalif.'],
    ['razonCompra', 'Razón Compra'], ['tipoCliente', 'Tipo Cliente'],
  ];

  return (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SectionTitle sub={`${sorted.length} registros · Click en columna para ordenar`}>Detalle de Cartera</SectionTitle>
      </div>
      <div style={{ overflowX: 'auto', maxHeight: 600 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1200 }}>
          <thead>
            <tr>
              {columns.map(([col, label]) => (
                <th key={col} style={thStyle(col, sorted._sortCol)} onClick={() => sorted._onSort(col)}>
                  {label} {sorted._sortCol === col ? (sorted._sortDir === 'asc' ? '▲' : '▼') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.rows.map((r) => (
              <tr key={r.id} style={{ cursor: 'pointer', background: selectedRow === r.id ? 'rgba(59,130,246,0.08)' : 'transparent' }}
                onClick={() => setSelectedRow(selectedRow === r.id ? null : r.id)}>
                <td style={{ ...tdStyle, color: COLORS.text, fontWeight: 500, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.cliente}</td>
                <td style={{ ...tdStyle, color: COLORS.textMuted }}>{r.apto}</td>
                <td style={{ ...tdStyle, color: COLORS.accentLight, fontWeight: 600 }}>{r.modelo}</td>
                <td style={{ ...tdStyle, color: COLORS.text, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtQFull(r.precioVenta)}</td>
                <td style={{ ...tdStyle, color: COLORS.textMuted, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtQFull(r.precioSugerido)}</td>
                <td style={{ ...tdStyle, textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: r.plusvalia >= 0 ? COLORS.green : COLORS.red }}>{fmtQFull(r.plusvalia)}</td>
                <td style={{ ...tdStyle, color: COLORS.textMuted, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtQFull(r.engancheTotal)}</td>
                <td style={{ ...tdStyle, color: COLORS.text, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmtQFull(r.enganchePagado)}</td>
                <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: r.difFebrero >= 0 ? COLORS.green : COLORS.red }}>{fmtQFull(r.difFebrero)}</td>
                <td style={tdStyle}><Badge color={r.estatus === 'ATRASADO' ? COLORS.red : COLORS.green} bg={r.estatus === 'ATRASADO' ? COLORS.redBg : COLORS.greenBg}>{r.estatus}</Badge></td>
                <td style={{ ...tdStyle, textAlign: 'center', color: COLORS.textMuted }}>{r.bloque}</td>
                <td style={tdStyle}>
                  <Badge
                    color={r.precalificacion === 'APROBADA' ? COLORS.green : r.precalificacion === 'DENEGADA' ? COLORS.red : COLORS.textDim}
                    bg={r.precalificacion === 'APROBADA' ? COLORS.greenBg : r.precalificacion === 'DENEGADA' ? COLORS.redBg : 'rgba(100,116,139,0.12)'}
                  >{r.precalificacion}</Badge>
                </td>
                <td style={{ ...tdStyle, color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{r.razonCompra}</td>
                <td style={{ ...tdStyle, color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{r.tipoCliente}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Detail panel */}
      {selectedRow !== null && (() => {
        const r = allData.find(d => d.id === selectedRow);
        if (!r) return null;
        return (
          <div style={{ padding: 20, borderTop: `1px solid ${COLORS.border}`, background: 'rgba(59,130,246,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h4 style={{ margin: 0, fontSize: 16, color: COLORS.text }}>{r.cliente}</h4>
                <div style={{ color: COLORS.textDim, fontSize: 13, marginTop: 4 }}>Apto {r.apto} · Modelo {r.modelo} · Bloque {r.bloque} · {r.m2Total.toFixed(2)} m² totales</div>
              </div>
              <button onClick={() => setSelectedRow(null)} style={{ background: 'transparent', border: 'none', color: COLORS.textDim, cursor: 'pointer', fontSize: 18 }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginTop: 16 }}>
              {[
                ['Precio Venta', fmtQFull(r.precioVenta)],
                ['Precio Sugerido', fmtQFull(r.precioSugerido)],
                ['Plusvalía', fmtQFull(r.plusvalia)],
                ['Enganche Plan', fmtQFull(r.engancheTotal)],
                ['Pactado Feb 2026', fmtQFull(r.enganchePactado)],
                ['Enganche Pagado', fmtQFull(r.enganchePagado)],
                ['Diferencia Feb', fmtQFull(r.difFebrero)],
                ['Diferencia Total', fmtQFull(r.diferencia)],
                ['Precio/m²', fmtQFull(r.precioM2)],
                ['m² Interno', `${r.m2Interno} m²`],
                ['m² Terraza', `${r.m2Terraza} m²`],
                ['Razón de Compra', r.razonCompra || '—'],
                ['Tipo de Cliente', r.tipoCliente || '—'],
              ].map(([label, val], i) => (
                <div key={i} style={{ padding: '10px 14px', background: COLORS.card, borderRadius: 6, border: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: 10, color: COLORS.textDim, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{val}</div>
                </div>
              ))}
            </div>
            {r.comentarios && r.comentarios !== '0' && (
              <div style={{ marginTop: 14, padding: '12px 16px', background: COLORS.amberBg, borderRadius: 6, border: `1px solid rgba(245,158,11,0.3)` }}>
                <div style={{ fontSize: 11, color: COLORS.amber, fontWeight: 600, marginBottom: 4 }}>COMENTARIOS DE PRECALIFICACIÓN</div>
                <div style={{ fontSize: 13, color: COLORS.text }}>{r.comentarios}</div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
