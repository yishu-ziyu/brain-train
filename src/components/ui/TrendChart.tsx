import React from 'react';

interface ChartPoint {
  x: number;
  y: number;
  value: number;
  label: string;
}

interface TrendChartProps {
  data: { value: number; label: string }[];
  height?: number;
  color?: string;
  lowerIsBetter?: boolean;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  height = 120,
  color = 'var(--color-accent-primary)',
  lowerIsBetter = false,
}) => {
  if (data.length < 2) return null;

  const padding = 20;
  const width = 1000; // viewBox width
  
  // Find min/max for scaling
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  // Calculate points
  const points: ChartPoint[] = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    
    // Normalize y
    let normalized = (d.value - min) / range;
    if (lowerIsBetter) {
      normalized = 1 - normalized; // Invert so lower value appears higher on chart
    }
    
    const y = height - padding - normalized * (height - padding * 2);
    
    return { x, y, value: d.value, label: d.label };
  });

  // Generate SVG path
  const pathData = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    
    // Simple cubic bezier curve
    const prev = points[i - 1];
    const cpX = prev.x + (point.x - prev.x) / 2;
    return `${acc} C ${cpX},${prev.y} ${cpX},${point.y} ${point.x},${point.y}`;
  }, '');

  return (
    <div style={{ width: '100%', height: `${height}px`, position: 'relative' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
        preserveAspectRatio="none"
      >
        {/* Helper line for min/max if needed, omitting for clean look */}
        
        {/* Stroke */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ vectorEffect: 'non-scaling-stroke' }}
        />
        
        {/* Data points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="6"
              fill="var(--color-bg-primary)"
              stroke={color}
              strokeWidth="3"
              style={{ vectorEffect: 'non-scaling-stroke' }}
            />
            {/* Show value for first and last point */}
            {(i === 0 || i === points.length - 1) && (
              <text
                x={p.x}
                y={p.y - 15}
                textAnchor={i === 0 ? "start" : "end"}
                fill="var(--color-text-secondary)"
                fontSize="14"
                fontWeight="bold"
                fontFamily="var(--font-family-mono)"
              >
                {p.value}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
