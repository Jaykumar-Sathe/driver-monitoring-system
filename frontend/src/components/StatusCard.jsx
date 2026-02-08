import { Activity, AlertTriangle, CheckCircle, Zap } from "lucide-react";

function StatusCard({ title, value }) {
  let colorClass = "border-slate-800 text-white";
  let Icon = Activity;

  if (title === "Fatigue Level") {
    Icon = Zap;
    if (value === "SAFE") { colorClass = "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"; Icon = CheckCircle; }
    if (value === "WARNING") { colorClass = "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"; Icon = AlertTriangle; }
    if (value === "CRITICAL") { colorClass = "border-rose-600/50 text-rose-500 bg-rose-600/10 animate-pulse"; Icon = AlertTriangle; }
  } else if (title === "Status") {
    Icon = Activity;
    if (value === "Active") colorClass = "border-blue-500/50 text-blue-400 bg-blue-500/10";
  }

  return (
    <div className={`rounded-2xl p-6 border backdrop-blur-sm shadow-lg flex items-center gap-4 ${colorClass} transition-all duration-300`}>
      <div className="p-3 rounded-full bg-slate-950/30">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider opacity-70 font-medium">{title}</p>
        <h2 className="text-2xl font-bold mt-1 tracking-tight">
          {value ?? "--"}
        </h2>
      </div>
    </div>
  );
}

export default StatusCard;
