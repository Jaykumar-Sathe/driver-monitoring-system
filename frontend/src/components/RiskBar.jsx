import { ShieldCheck, ShieldAlert, ShieldOff } from "lucide-react";

const segments = [
  { key: "safe", label: "Safe", icon: ShieldCheck, activeColor: "bg-emerald-500", activeBorder: "border-emerald-500/50", activeText: "text-emerald-400", glow: "shadow-emerald-500/20" },
  { key: "warning", label: "Warning", icon: ShieldAlert, activeColor: "bg-yellow-500", activeBorder: "border-yellow-500/50", activeText: "text-yellow-400", glow: "shadow-yellow-500/20" },
  { key: "critical", label: "Critical", icon: ShieldOff, activeColor: "bg-rose-600", activeBorder: "border-rose-600/50", activeText: "text-rose-500", glow: "shadow-rose-500/20" },
];

function RiskBar({ level }) {
  const activeIndex = level === "CRITICAL" ? 2 : level === "WARNING" ? 1 : 0;

  return (
    <div className="bg-slate-900/50 border border-slate-800 backdrop-blur-sm rounded-2xl p-6 shadow-xl h-full flex flex-col justify-center">
      <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-5 text-center">Risk Level</h2>

      <div className="flex flex-col gap-3">
        {segments.map((seg, i) => {
          const isLit = i <= activeIndex;
          const Icon = seg.icon;
          const isCriticalPulse = isLit && i === 2 && level === "CRITICAL";

          return (
            <div
              key={seg.key}
              className={`
                flex items-center gap-4 rounded-xl border p-4 transition-all duration-500
                ${isLit
                  ? `${seg.activeBorder} ${seg.activeColor}/10 shadow-lg ${seg.glow}`
                  : "border-slate-800 bg-slate-950/40 opacity-40"
                }
                ${isCriticalPulse ? "animate-pulse" : ""}
              `}
            >
              <div className={`p-2 rounded-lg ${isLit ? `${seg.activeColor}/20` : "bg-slate-800"}`}>
                <Icon size={20} className={isLit ? seg.activeText : "text-slate-600"} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${isLit ? seg.activeText : "text-slate-600"}`}>{seg.label}</p>
              </div>
              {/* Indicator dot */}
              <div className={`w-3 h-3 rounded-full transition-all duration-500 ${isLit ? seg.activeColor : "bg-slate-800"}`} />
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Current: <span className={`font-bold ${
          activeIndex === 2 ? "text-rose-500" : activeIndex === 1 ? "text-yellow-400" : "text-emerald-400"
        }`}>{level || "SAFE"}</span>
      </p>
    </div>
  );
}

export default RiskBar;
