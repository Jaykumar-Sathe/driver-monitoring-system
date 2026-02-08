import { useEffect, useState } from "react";

function FatigueGauge({ score }) {
  const clampedScore = Math.min(100, Math.max(0, score || 0));

  // Animated counter
  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    let start = displayScore;
    const end = clampedScore;
    if (start === end) return;
    const step = end > start ? 1 : -1;
    const timer = setInterval(() => {
      start += step;
      setDisplayScore(start);
      if (start === end) clearInterval(timer);
    }, 12);
    return () => clearInterval(timer);
  }, [clampedScore]);

  // Arc geometry — top-half semi-circle drawn from 180° to 360°
  const cx = 100, cy = 90, r = 75, strokeW = 10;
  const startAngle = Math.PI;  // 180°
  const endAngle = 2 * Math.PI; // 360°

  // Helper to convert angle to SVG coordinates
  const polarToXY = (angle) => ({
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  });

  // Full background arc path (180° → 360°)
  const bgStart = polarToXY(startAngle);
  const bgEnd = polarToXY(endAngle);
  const bgArc = `M ${bgStart.x} ${bgStart.y} A ${r} ${r} 0 1 1 ${bgEnd.x} ${bgEnd.y}`;

  // Progress arc path (180° → 180° + progress)
  const progressAngle = startAngle + (clampedScore / 100) * Math.PI;
  const pEnd = polarToXY(progressAngle);
  const largeArc = clampedScore > 50 ? 1 : 0;
  const progressArc = clampedScore > 0
    ? `M ${bgStart.x} ${bgStart.y} A ${r} ${r} 0 ${largeArc} 1 ${pEnd.x} ${pEnd.y}`
    : "";

  // Status label
  let statusLabel = "Normal";
  let statusColor = "text-emerald-400";
  if (clampedScore > 80) { statusLabel = "Critical"; statusColor = "text-rose-500"; }
  else if (clampedScore > 50) { statusLabel = "Warning"; statusColor = "text-yellow-400"; }

  return (
    <div className="bg-slate-900/50 border border-slate-800 backdrop-blur-sm rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
      <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Fatigue Gauge</h2>

      <div className="w-full max-w-[260px] relative">
        <svg viewBox="0 0 200 110" className="w-full h-auto">
          <defs>
            {/* Gradient: green → yellow → red */}
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
            {/* Glow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background track */}
          <path
            d={bgArc}
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeW}
            strokeLinecap="round"
          />

          {/* Progress arc */}
          {progressArc && (
            <path
              d={progressArc}
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth={strokeW}
              strokeLinecap="round"
              filter="url(#glow)"
              className="transition-all duration-700 ease-out"
            />
          )}

          {/* Min / Max labels */}
          <text x="18" y="105" fill="#475569" fontSize="10" textAnchor="middle">0</text>
          <text x="182" y="105" fill="#475569" fontSize="10" textAnchor="middle">100</text>

          {/* Center score */}
          <text x={cx} y={cy + 2} fill="white" fontSize="32" fontWeight="bold" textAnchor="middle" dominantBaseline="auto">
            {displayScore}%
          </text>
        </svg>
      </div>

      <span className={`text-xs font-semibold uppercase tracking-wider ${statusColor} -mt-1`}>
        {statusLabel}
      </span>
      <div className="mt-1 text-[10px] text-slate-600">Threshold Monitor</div>
    </div>
  );
}

export default FatigueGauge;
