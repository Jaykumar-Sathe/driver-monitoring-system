function FatigueGauge({ score }) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">
        Fatigue Gauge
      </h2>

      <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden">
        <div
          className="h-6 bg-green-500 transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="mt-3 text-center text-xl font-bold">
        {score}%
      </p>
    </div>
  );
}

export default FatigueGauge;
