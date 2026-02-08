function TripSummary({ history }) {
  if (!history.length) return <p>No trip data yet.</p>;

  const total = history.length;
  const critical = history.filter(x => x.level === "CRITICAL").length;
  const warning = history.filter(x => x.level === "WARNING").length;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Trip Summary</h2>
      <p>Total Records: {total}</p>
      <p>Warnings: {warning}</p>
      <p>Critical Alerts: {critical}</p>
    </div>
  );
}

export default TripSummary;
