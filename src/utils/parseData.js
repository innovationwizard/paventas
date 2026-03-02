import Papa from 'papaparse';
import { parseQ } from './formatters';

export function parseCSV(csvText) {
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });

  return parsed.data.map((r, i) => ({
    id: i,
    cliente: (r.Cliente || '').trim(),
    apto: (r['No. Apartamento'] || '').trim(),
    modelo: (r['Modelo'] || r['Modelo '] || '').trim(),
    precioVenta: parseQ(r['Precio de venta']),
    m2Interno: parseFloat(r['Metraje interno']) || 0,
    m2Terraza: parseFloat(r['Metraje terraza']) || 0,
    m2Total: parseFloat(r['Metraje total']) || 0,
    precioM2: parseQ(r['Precio m2 actual']),
    precioSugerido: parseQ(r['Precio actual sugerido']),
    plusvalia: parseQ(r['GAP Plusval\u00eda'] || r['GAP Plusval\x92a']),
    engancheTotal: parseQ(r['Enganche total plan de pagos']),
    enganchePactado: parseQ(r['Enganche pactado a Febrero 2026']),
    enganchePagado: parseQ(r['Enganche pagado']),
    difFebrero: parseQ(r['Diferencia a Febrero']),
    diferencia: parseQ(r['Diferencia']),
    estatus: (r['Estatus cobros'] || '').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase(),
    bloque: parseInt(r['Bloque PCV']) || 0,
    precalificacion: (r['Estatus Precalificaci\u00f3n'] || r['Estatus Precalificaci\x97n'] || '').trim(),
    comentarios: (r['Comentarios de Precalificaci\u00f3n'] || r['Comentarios de Precalificaci\x97n '] || '').trim(),
  }));
}
