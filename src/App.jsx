import { useState, useMemo, useEffect } from 'react';
import { COLORS } from './theme/colors';
import { parseCSV } from './utils/parseData';
import { useDrillDown } from './hooks/useDrillDown';
import Header from './components/Header';
import Filters from './components/Filters';
import KPIRow from './components/KPIRow';
import DrillDownModal from './components/DrillDownModal';
import ResumenView from './components/views/ResumenView';
import CarteraView from './components/views/CarteraView';
import ClientesView from './components/views/ClientesView';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterEstatus, setFilterEstatus] = useState('TODOS');
  const [filterBloque, setFilterBloque] = useState('TODOS');
  const [filterPrecal, setFilterPrecal] = useState('TODOS');
  const [filterCliente, setFilterCliente] = useState('');
  const [filterRazon, setFilterRazon] = useState('TODOS');
  const [filterTipo, setFilterTipo] = useState('TODOS');
  const [selectedView, setSelectedView] = useState('resumen');
  const [sortCol, setSortCol] = useState('difFebrero');
  const [sortDir, setSortDir] = useState('asc');

  const drill = useDrillDown();

  useEffect(() => {
    fetch('/data.csv')
      .then(r => r.text())
      .then(text => {
        setData(parseCSV(text));
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    return data.filter(r => {
      if (filterEstatus !== 'TODOS' && r.estatus !== filterEstatus) return false;
      if (filterBloque !== 'TODOS' && r.bloque !== parseInt(filterBloque)) return false;
      if (filterPrecal !== 'TODOS' && r.precalificacion !== filterPrecal) return false;
      if (filterCliente && !r.cliente.toLowerCase().includes(filterCliente.toLowerCase())) return false;
      if (filterRazon !== 'TODOS' && r.razonCompra !== filterRazon) return false;
      if (filterTipo !== 'TODOS' && r.tipoCliente !== filterTipo) return false;
      return true;
    });
  }, [data, filterEstatus, filterBloque, filterPrecal, filterCliente, filterRazon, filterTipo]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortCol], bv = b[sortCol];
      if (typeof av === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }, [filtered, sortCol, sortDir]);

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  };

  const stats = useMemo(() => {
    const d = filtered;
    const totalVenta = d.reduce((s, r) => s + r.precioVenta, 0);
    const totalPlusvalia = d.reduce((s, r) => s + r.plusvalia, 0);
    const totalEnganche = d.reduce((s, r) => s + r.engancheTotal, 0);
    const totalPagado = d.reduce((s, r) => s + r.enganchePagado, 0);
    const totalDiferencia = d.reduce((s, r) => s + r.difFebrero, 0);
    const atrasados = d.filter(r => r.estatus === 'ATRASADO').length;
    const alDia = d.filter(r => r.estatus === 'AL DIA').length;
    const aprobados = d.filter(r => r.precalificacion === 'APROBADA').length;
    const denegados = d.filter(r => r.precalificacion === 'DENEGADA').length;
    const na = d.filter(r => r.precalificacion === 'N/A').length;
    const disponible = d.filter(r => r.precalificacion === 'DISPONIBLE').length;
    const pctCobro = totalEnganche > 0 ? (totalPagado / totalEnganche * 100) : 0;
    return { totalVenta, totalPlusvalia, totalEnganche, totalPagado, totalDiferencia, atrasados, alDia, aprobados, denegados, na, disponible, pctCobro, count: d.length };
  }, [filtered]);

  const bloqueData = useMemo(() => {
    const map = {};
    filtered.forEach(r => {
      const k = `Bloque ${r.bloque}`;
      if (!map[k]) map[k] = { name: k, unidades: 0, venta: 0, pagado: 0, difFebrero: 0 };
      map[k].unidades++;
      map[k].venta += r.precioVenta;
      map[k].pagado += r.enganchePagado;
      map[k].difFebrero += r.difFebrero;
    });
    return Object.values(map).sort((a, b) => a.name.localeCompare(b.name));
  }, [filtered]);

  const modeloData = useMemo(() => {
    const map = {};
    filtered.forEach(r => {
      const k = r.modelo;
      if (!map[k]) map[k] = { name: k, unidades: 0, venta: 0, plusvalia: 0 };
      map[k].unidades++;
      map[k].venta += r.precioVenta;
      map[k].plusvalia += r.plusvalia;
    });
    return Object.values(map).sort((a, b) => b.venta - a.venta).slice(0, 15);
  }, [filtered]);

  const clienteAgg = useMemo(() => {
    const map = {};
    filtered.forEach(r => {
      if (!map[r.cliente]) map[r.cliente] = { name: r.cliente, unidades: 0, venta: 0, pagado: 0, difFebrero: 0, plusvalia: 0 };
      map[r.cliente].unidades++;
      map[r.cliente].venta += r.precioVenta;
      map[r.cliente].pagado += r.enganchePagado;
      map[r.cliente].difFebrero += r.difFebrero;
      map[r.cliente].plusvalia += r.plusvalia;
    });
    return Object.values(map).sort((a, b) => b.venta - a.venta);
  }, [filtered]);

  const uniqueBloques = useMemo(() => [...new Set(data.map(r => r.bloque))].sort(), [data]);
  const uniquePrecal = useMemo(() => [...new Set(data.map(r => r.precalificacion))].sort(), [data]);
  const uniqueRazon = useMemo(() => [...new Set(data.map(r => r.razonCompra).filter(Boolean))].sort(), [data]);
  const uniqueTipo = useMemo(() => [...new Set(data.map(r => r.tipoCliente).filter(Boolean))].sort(), [data]);

  if (loading) {
    return (
      <div style={{ background: COLORS.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.text, fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Cargando datos...</div>
          <div style={{ color: COLORS.textDim, fontSize: 13 }}>Panel de Control Financiero</div>
        </div>
      </div>
    );
  }

  const sortedForCartera = { rows: sorted, _sortCol: sortCol, _sortDir: sortDir, _onSort: handleSort };

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', color: COLORS.text, fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <Header totalCount={data.length} selectedView={selectedView} setSelectedView={setSelectedView} />

      <Filters
        filterEstatus={filterEstatus} setFilterEstatus={setFilterEstatus}
        filterBloque={filterBloque} setFilterBloque={setFilterBloque}
        filterPrecal={filterPrecal} setFilterPrecal={setFilterPrecal}
        filterCliente={filterCliente} setFilterCliente={setFilterCliente}
        filterRazon={filterRazon} setFilterRazon={setFilterRazon}
        filterTipo={filterTipo} setFilterTipo={setFilterTipo}
        uniqueBloques={uniqueBloques} uniquePrecal={uniquePrecal}
        uniqueRazon={uniqueRazon} uniqueTipo={uniqueTipo}
        filteredCount={filtered.length} totalCount={data.length}
      />

      <div style={{ padding: '20px 28px' }}>
        <KPIRow stats={stats} />

        {selectedView === 'resumen' && (
          <ResumenView filtered={filtered} stats={stats} bloqueData={bloqueData} modeloData={modeloData} openDrillDown={drill.openDrillDown} />
        )}

        {selectedView === 'cartera' && (
          <CarteraView sorted={sortedForCartera} allData={data} />
        )}

        {selectedView === 'clientes' && (
          <ClientesView clienteAgg={clienteAgg} filtered={filtered} openDrillDown={drill.openDrillDown} />
        )}
      </div>

      <DrillDownModal
        drillDown={drill.drillDown} drillFiltered={drill.drillFiltered}
        drillSearch={drill.drillSearch} setDrillSearch={drill.setDrillSearch}
        drillSortCol={drill.drillSortCol} drillSortDir={drill.drillSortDir}
        handleDrillSort={drill.handleDrillSort} onClose={drill.closeDrillDown}
      />
    </div>
  );
}
