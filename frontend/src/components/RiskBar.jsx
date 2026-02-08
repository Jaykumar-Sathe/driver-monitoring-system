function RiskBar({ level }) {

  let color = "bg-green-500";
  if (level === "WARNING") color = "bg-yellow-500";
  if (level === "CRITICAL") color = "bg-red-600";

  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">
        Risk Level
      </h2>

      <div className="w-full bg-slate-700 rounded-full h-6">
        <div className={`${color} h-6 rounded-full transition-all duration-500`} style={{ width: "100%" }} />
      </div>

      <p className="mt-3 text-center font-semibold">
        {level || "SAFE"}
      </p>
    </div>
  );
}

export default RiskBar;
