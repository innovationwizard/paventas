import { COLORS } from '../theme/colors';

export default function Filters({ filterEstatus, setFilterEstatus, filterBloque, setFilterBloque, filterPrecal, setFilterPrecal, filterCliente, setFilterCliente, uniqueBloques, uniquePrecal, filteredCount, totalCount }) {
  const selectStyle = {
    background: '#1e293b', color: COLORS.text, border: `1px solid ${COLORS.borderAccent}`,
    borderRadius: 6, padding: '7px 12px', fontSize: 13, outline: 'none', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
  };

  const hasFilters = filterEstatus !== 'TODOS' || filterBloque !== 'TODOS' || filterPrecal !== 'TODOS' || filterCliente;

  return (
    <div style={{ padding: '14px 28px', borderBottom: `1px solid ${COLORS.border}`, background: 'rgba(17,24,39,0.6)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontSize: 12, color: COLORS.textDim, fontWeight: 600, letterSpacing: '0.05em' }}>FILTROS:</span>
      <select value={filterEstatus} onChange={e => setFilterEstatus(e.target.value)} style={selectStyle}>
        <option value="TODOS">Estatus: Todos</option>
        <option value="ATRASADO">Atrasado</option>
        <option value="AL DIA">Al Día</option>
      </select>
      <select value={filterBloque} onChange={e => setFilterBloque(e.target.value)} style={selectStyle}>
        <option value="TODOS">Bloque: Todos</option>
        {uniqueBloques.map(b => <option key={b} value={b}>Bloque {b}</option>)}
      </select>
      <select value={filterPrecal} onChange={e => setFilterPrecal(e.target.value)} style={selectStyle}>
        <option value="TODOS">Precalificación: Todas</option>
        {uniquePrecal.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <input
        type="text" placeholder="🔍 Buscar cliente..." value={filterCliente}
        onChange={e => setFilterCliente(e.target.value)}
        style={{ ...selectStyle, width: 180 }}
      />
      {hasFilters && (
        <button onClick={() => { setFilterEstatus('TODOS'); setFilterBloque('TODOS'); setFilterPrecal('TODOS'); setFilterCliente(''); }}
          style={{ ...selectStyle, cursor: 'pointer', color: COLORS.red, borderColor: COLORS.red, background: 'transparent', fontSize: 12 }}>
          ✕ Limpiar
        </button>
      )}
      <span style={{ fontSize: 12, color: COLORS.textMuted, marginLeft: 'auto' }}>{filteredCount} de {totalCount} registros</span>
    </div>
  );
}
