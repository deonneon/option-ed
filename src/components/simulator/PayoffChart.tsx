import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';

interface PayoffChartProps {
  data: { price: number; pnl: number }[];
  currentPrice: number;
  strike: number;
}

const PayoffChart: React.FC<PayoffChartProps> = ({ data, currentPrice, strike }) => {
  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.1} />
              <stop offset="50%" stopColor="#10b981" stopOpacity={0} />
              <stop offset="50%" stopColor="#f43f5e" stopOpacity={0} />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="price" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#a3a3a3', fontSize: 10, fontFamily: 'monospace' }}
            domain={['dataMin', 'dataMax']}
            type="number"
          />
          <YAxis 
            hide
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white border border-neutral-100 p-3 rounded-xl shadow-xl">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Stock: ${data.price.toFixed(2)}</div>
                    <div className={`text-sm font-mono font-bold ${data.pnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      P/L: {data.pnl >= 0 ? '+' : ''}{data.pnl.toFixed(0)}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine y={0} stroke="#e5e5e5" strokeWidth={1} />
          <ReferenceLine x={strike} stroke="#d4d4d4" strokeDasharray="3 3" label={{ position: 'top', value: 'TARGET', fill: '#a3a3a3', fontSize: 10, fontFamily: 'monospace' }} />
          <ReferenceLine x={currentPrice} stroke="#000" strokeWidth={1.5} label={{ position: 'bottom', value: 'CURRENT', fill: '#000', fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' }} />
          
          <Area
            type="monotone"
            dataKey="pnl"
            stroke="none"
            fill="url(#pnlGradient)"
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="pnl"
            stroke="#10b981" // Default, we might need a custom dot or line but Recharts Area stroke is a string
            strokeWidth={2}
            fill="transparent"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PayoffChart;
