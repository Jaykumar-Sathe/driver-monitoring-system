import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function FatigueChart({ data }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wider">
          Live Fatigue Trend
        </h2>
        <span className="text-xs text-emerald-500 animate-pulse">● Live Data</span>
      </div>

      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="time" 
            tick={{fill: '#64748b', fontSize: 10}} 
            axisLine={false} 
            tickLine={false}
          />
          <YAxis 
            domain={[0, 100]} 
            hide={true} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
            itemStyle={{ color: '#10b981' }}
          />
          <Area 
            type="monotone" 
            dataKey="score" 
            stroke="#10b981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorScore)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FatigueChart;
