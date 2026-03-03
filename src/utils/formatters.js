export const parseQ = (val) => {
  if (val === null || val === undefined) return 0;
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  if (typeof val !== 'string') return 0;
  const cleaned = val.replace(/\s/g, '').replace(/Q/g, '').replace(/,/g, '');
  if (cleaned === '-' || cleaned === '' || cleaned === '0') return 0;
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

export const fmtQ = (n) => {
  if (n === 0) return 'Q0';
  const abs = Math.abs(n);
  if (abs >= 1e6) return `${n < 0 ? '-' : ''}Q${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${n < 0 ? '-' : ''}Q${(abs / 1e3).toFixed(0)}K`;
  return `Q${n.toFixed(0)}`;
};

export const fmtQFull = (n) => {
  if (n === 0) return 'Q\u00A00.00';
  return `${n < 0 ? '-' : ''}Q\u00A0${Math.abs(n).toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
