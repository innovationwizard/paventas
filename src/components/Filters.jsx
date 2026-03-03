import { COLORS } from '../theme/colors';
import MultiSelect from './ui/MultiSelect';

export default function Filters({ filterEstatus, setFilterEstatus, filterBloque, setFilterBloque, filterPrecal, setFilterPrecal, filterCliente, setFilterCliente, filterRazon, setFilterRazon, filterTipo, setFilterTipo, uniqueBloques, uniquePrecal, uniqueRazon, uniqueTipo, filteredCount, totalCount }) {
  const inputStyle = {
    background: '#1e293b', color: COLORS.text, border: `1px solid ${COLORS.borderAccent}`,
    borderRadius: 6, padding: '7px 12px', fontSize: 13, outline: 'none', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
  };

  const hasFilters = filterEstatus.length || filterBloque.length || filterPrecal.length || filterCliente || filterRazon.length || filterTipo.length;

  return (
    <div style={{ padding: '14px 28px', borderBottom: `1px solid ${COLORS.border}`, background: 'rgba(17,24,39,0.6)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontSize: 12, color: COLORS.textDim, fontWeight: 600, letterSpacing: '0.05em' }}>FILTROS:</span>
      <MultiSelect label="Estatus" options={['ATRASADO', 'AL DIA']} selected={filterEstatus} onChange={setFilterEstatus}
        formatOption={v => v === 'AL DIA' ? 'Al Día' : v.charAt(0) + v.slice(1).toLowerCase()} />
      <MultiSelect label="Bloque" options={uniqueBloques} selected={filterBloque} onChange={setFilterBloque}
        formatOption={v => `Bloque ${v}`} />
      <MultiSelect label="Precalif." options={uniquePrecal} selected={filterPrecal} onChange={setFilterPrecal} />
      <MultiSelect label="Razón" options={uniqueRazon} selected={filterRazon} onChange={setFilterRazon} />
      <MultiSelect label="Tipo cliente" options={uniqueTipo} selected={filterTipo} onChange={setFilterTipo} />
      <input
        type="text" placeholder="🔍 Buscar cliente..." value={filterCliente}
        onChange={e => setFilterCliente(e.target.value)}
        style={{ ...inputStyle, width: 180 }}
      />
      {hasFilters ? (
        <button onClick={() => { setFilterEstatus([]); setFilterBloque([]); setFilterPrecal([]); setFilterCliente(''); setFilterRazon([]); setFilterTipo([]); }}
          style={{ ...inputStyle, cursor: 'pointer', color: COLORS.red, borderColor: COLORS.red, background: 'transparent', fontSize: 12 }}>
          ✕ Limpiar
        </button>
      ) : null}
      <span style={{ fontSize: 12, color: COLORS.textMuted, marginLeft: 'auto' }}>{filteredCount} de {totalCount} registros</span>
    </div>
  );
}
