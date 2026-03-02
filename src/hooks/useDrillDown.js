import { useState, useMemo, useCallback, useEffect } from 'react';

export function useDrillDown() {
  const [drillDown, setDrillDown] = useState(null);
  const [drillSearch, setDrillSearch] = useState('');
  const [drillSortCol, setDrillSortCol] = useState('difFebrero');
  const [drillSortDir, setDrillSortDir] = useState('asc');

  const openDrillDown = useCallback((title, records) => {
    setDrillDown({ title, records });
    setDrillSearch('');
    setDrillSortCol('difFebrero');
    setDrillSortDir('asc');
  }, []);

  const closeDrillDown = useCallback(() => setDrillDown(null), []);

  const drillFiltered = useMemo(() => {
    if (!drillDown) return [];
    let rows = drillDown.records;
    if (drillSearch) {
      const q = drillSearch.toLowerCase();
      rows = rows.filter(r => r.cliente.toLowerCase().includes(q) || r.apto.toLowerCase().includes(q) || r.modelo.toLowerCase().includes(q));
    }
    return [...rows].sort((a, b) => {
      const av = a[drillSortCol], bv = b[drillSortCol];
      if (typeof av === 'number') return drillSortDir === 'asc' ? av - bv : bv - av;
      return drillSortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }, [drillDown, drillSearch, drillSortCol, drillSortDir]);

  const handleDrillSort = useCallback((col) => {
    if (drillSortCol === col) setDrillSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setDrillSortCol(col); setDrillSortDir('asc'); }
  }, [drillSortCol]);

  useEffect(() => {
    if (!drillDown) return;
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') closeDrillDown(); };
    document.addEventListener('keydown', handler);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', handler); };
  }, [drillDown, closeDrillDown]);

  return {
    drillDown, drillFiltered, drillSearch, setDrillSearch,
    drillSortCol, drillSortDir, handleDrillSort,
    openDrillDown, closeDrillDown,
  };
}
