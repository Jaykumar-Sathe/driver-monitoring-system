function TripSummary({ history }) {
  if (!history.length) return <p className="text-slate-500 text-sm">No trip data recorded yet.</p>;

  const total = history.length;
  const critical = history.filter(x => x.level === "CRITICAL").length;
  const warning = history.filter(x => x.level === "WARNING").length;

  return (
    <div className="h-full">
      <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-4">Session Summary</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 text-center">
          <div className="text-2xl font-bold text-white">{total}</div>
          <div className="text-xs text-slate-500 mt-1">Total Scans</div>
        </div>
        
        <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20 text-center">
          <div className="text-2xl font-bold text-yellow-500">{warning}</div>
          <div className="text-xs text-yellow-500/70 mt-1">Warnings</div>
        </div>

        <div className="bg-rose-600/10 p-4 rounded-lg border border-rose-600/20 text-center">
          <div className="text-2xl font-bold text-rose-500">{critical}</div>
          <div className="text-xs text-rose-500/70 mt-1">Critical</div>
        </div>
      </div>
    </div>
  );
}

export default TripSummary;
