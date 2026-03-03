import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, Label } from 'recharts';
import { COLORS, PIE_COLORS } from '../../theme/colors';
import { fmtQ } from '../../utils/formatters';
import SectionTitle from '../ui/SectionTitle';
import CustomTooltip from '../charts/CustomTooltip';
import PieTooltip from '../charts/PieTooltip';

export default function ResumenView({ filtered, stats, bloqueData, modeloData, openDrillDown }) {
  const estatusData = [
    { name: 'Atrasado', value: stats.atrasados },
    { name: 'Al Día', value: stats.alDia },
  ].filter(d => d.value > 0);

  const precalData = [
    { name: 'Aprobada', value: stats.aprobados },
    { name: 'Denegada', value: stats.denegados },
    { name: 'N/A', value: stats.na },
    { name: 'Disponible', value: stats.disponible },
  ].filter(d => d.value > 0);

  const totalCount = stats.count;

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginBottom: 22 }}>
        {/* Estatus Cobros Pie */}
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20 }}>
          <SectionTitle sub="Distribución actual">Estatus de Cobros</SectionTitle>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={estatusData} cx="50%" cy="45%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value"
                label={({ cx, cy, midAngle, outerRadius, index, name, value, percent }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 22;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return <text x={x} y={y} fill={PIE_COLORS[index]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight={600} fontFamily="'DM Sans', sans-serif">{name}: {value} ({(percent * 100).toFixed(0)}%)</text>;
                }}
                labelLine={false}
                onClick={(data) => { const m = { 'Atrasado': 'ATRASADO', 'Al Día': 'AL DIA' }; if (m[data.name]) openDrillDown(`Estatus: ${data.name}`, filtered.filter(r => r.estatus === m[data.name])); }}>
                {estatusData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} style={{ cursor: 'pointer' }} />)}
              </Pie>
              <Tooltip content={<PieTooltip totalCount={totalCount} />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Precalificación Pie */}
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20 }}>
          <SectionTitle sub="Estado hipotecario">Precalificación Bancaria</SectionTitle>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={precalData} cx="50%" cy="45%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value"
                label={({ cx, cy, midAngle, outerRadius, index, name, value, percent }) => {
                  const RADIAN = Math.PI / 180;
                  const fills = [COLORS.green, COLORS.red, COLORS.textDim, COLORS.amber];
                  const radius = outerRadius + 22;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return <text x={x} y={y} fill={fills[index]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight={600} fontFamily="'DM Sans', sans-serif">{name}: {value} ({(percent * 100).toFixed(0)}%)</text>;
                }}
                labelLine={false}
                onClick={(data) => { const m = { 'Aprobada': 'APROBADA', 'Denegada': 'DENEGADA', 'N/A': 'N/A', 'Disponible': 'DISPONIBLE' }; if (m[data.name]) openDrillDown(`Precalificación: ${data.name}`, filtered.filter(r => r.precalificacion === m[data.name])); }}>
                {precalData.map((_, i) => <Cell key={i} fill={[COLORS.green, COLORS.red, COLORS.textDim, COLORS.amber][i]} style={{ cursor: 'pointer' }} />)}
              </Pie>
              <Tooltip content={<PieTooltip totalCount={totalCount} />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bloque Bar */}
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20 }}>
          <SectionTitle sub="Cantidad de unidades por bloque PCV">Análisis por Bloque</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={bloqueData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="name" tick={{ fill: COLORS.textDim, fontSize: 11 }} />
              <YAxis tick={{ fill: COLORS.textDim, fontSize: 10 }} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="unidades" name="Unidades" fill={COLORS.accent} radius={[4, 4, 0, 0]} style={{ cursor: 'pointer' }}
                onClick={(data) => { const b = parseInt(data.name.replace('Bloque ', '')); openDrillDown(`${data.name}`, filtered.filter(r => r.bloque === b)); }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Modelo analysis — commented out
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20, marginBottom: 22 }}>
        <SectionTitle sub="Top 15 modelos por valor total de venta">Análisis por Modelo de Apartamento</SectionTitle>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={modeloData} layout="vertical" barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis type="number" tick={{ fill: COLORS.textDim, fontSize: 10 }} tickFormatter={v => fmtQ(v)} />
            <YAxis dataKey="name" type="category" tick={{ fill: COLORS.textMuted, fontSize: 11 }} width={50} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: COLORS.textMuted }} />
            <Bar dataKey="venta" name="Precio Venta" fill={COLORS.accent} radius={[0, 4, 4, 0]} style={{ cursor: 'pointer' }}
              onClick={(data) => openDrillDown(`Modelo: ${data.name}`, filtered.filter(r => r.modelo === data.name))} />
            <Bar dataKey="plusvalia" name="Plusvalía" fill={COLORS.green} radius={[0, 4, 4, 0]} style={{ cursor: 'pointer' }}
              onClick={(data) => openDrillDown(`Modelo: ${data.name}`, filtered.filter(r => r.modelo === data.name))} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      */}
    </>
  );
}
