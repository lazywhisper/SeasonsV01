import { formatters } from '../../../utils/formatters';

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-3 py-2 rounded-lg"
        style={{
          background: 'rgba(17, 17, 19, 0.95)',
          border: '1px solid var(--seasons-border-hair)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        <p style={{ fontSize: '12px', color: 'var(--seasons-text-secondary)', marginBottom: '4px' }}>
          {label}
        </p>
        <p
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--seasons-text-primary)',
            fontFeatureSettings: "'tnum' 1",
          }}
        >
          {payload[0].name === 'apy' 
            ? formatters.percentage(payload[0].value, 1) 
            : formatters.currency(payload[0].value, 0)}
        </p>
      </div>
    );
  }
  return null;
};

export const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className="px-3 py-2 rounded-lg"
        style={{
          background: 'rgba(17, 17, 19, 0.95)',
          border: '1px solid var(--seasons-border-hair)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        <p style={{ fontSize: '12px', color: 'var(--seasons-text-secondary)', marginBottom: '4px' }}>
          {data.name}
        </p>
        <p
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--seasons-text-primary)',
            fontFeatureSettings: "'tnum' 1",
            marginBottom: '6px',
          }}
        >
          {data.value}%
        </p>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--seasons-text-tertiary)',
            fontFeatureSettings: "'tnum' 1",
          }}
        >
          {formatters.currency(data.amount, 0)}
        </p>
      </div>
    );
  }
  return null;
};
