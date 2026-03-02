import KPICard from './ui/KPICard';
import { COLORS } from '../theme/colors';
import { fmtQ } from '../utils/formatters';

export default function KPIRow({ stats }) {
  return (
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 22 }}>
      <KPICard label="Valor de Cartera" value={fmtQ(stats.totalVenta)} sub={`${stats.count} unidades`} color={COLORS.accent} icon="💰" />
      <KPICard label="Plusvalía Total" value={fmtQ(stats.totalPlusvalia)} sub={stats.totalVenta > 0 ? `${(stats.totalPlusvalia / stats.totalVenta * 100).toFixed(1)}% sobre venta` : ''} color={COLORS.green} icon="📈" />
      <KPICard label="Enganche Pagado" value={fmtQ(stats.totalPagado)} sub={`${stats.pctCobro.toFixed(1)}% de lo requerido`} color={COLORS.cyan} icon="✅" />
      <KPICard label="Brecha de Cobro" value={fmtQ(stats.totalDiferencia)} sub={stats.totalDiferencia < 0 ? 'Saldo pendiente' : 'Superávit'} color={stats.totalDiferencia < 0 ? COLORS.red : COLORS.green} icon="⚠️" />
      <KPICard label="Tasa de Atraso" value={`${stats.count > 0 ? (stats.atrasados / stats.count * 100).toFixed(0) : 0}%`} sub={`${stats.atrasados} de ${stats.count}`} color={COLORS.red} icon="🔴" />
    </div>
  );
}
