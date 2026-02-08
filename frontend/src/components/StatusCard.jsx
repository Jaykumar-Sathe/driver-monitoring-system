function StatusCard({ title, value }) {

  let color = "bg-slate-800";

  if (title === "Fatigue Level") {
    if (value === "SAFE") color = "bg-green-600";
    if (value === "WARNING") color = "bg-yellow-500";
    if (value === "CRITICAL") color = "bg-red-600";
  }

  return (
    <div className={`${color} rounded-xl p-6 text-center shadow-lg`}>
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-2xl font-semibold mt-2">
        {value ?? "..."}
      </h2>
    </div>
  );
}

export default StatusCard;
