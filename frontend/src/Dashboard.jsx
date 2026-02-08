import { useEffect, useState } from "react";
import axios from "axios";
import StatusCard from "./components/StatusCard";
import FatigueChart from "./components/FatigueChart";
import TripSummary from "./components/TripSummary";
import AlertPopup from "./components/AlertPopup";
import FatigueGauge from "./components/FatigueGauge";
import RiskBar from "./components/RiskBar";

function Dashboard() {
  const [data, setData] = useState({});
  const [chartData, setChartData] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://127.0.0.1:8000/status")
        .then(res => {
          const d = res.data;
          setData(d);

          const time = new Date().toLocaleTimeString();

          setChartData(prev => [
            ...prev.slice(-20),
            { time, score: d.fatigue_score }
          ]);

          setHistory(prev => [...prev, { level: d.fatigue_level }]);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center">
      <div className="w-full max-w-5xl px-6 py-8">

        <AlertPopup level={data.fatigue_level} />

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Driver Monitoring System
        </h1>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard title="Status" value={data.status} />
          <StatusCard title="Fatigue Score" value={data.fatigue_score} />
          <StatusCard title="Fatigue Level" value={data.fatigue_level} />
        </div>

        {/* Gauge + Risk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FatigueGauge score={data.fatigue_score || 0} />
          <RiskBar level={data.fatigue_level} />
        </div>

        {/* Chart */}
        <div className="bg-slate-900 rounded-xl p-5 shadow-lg mb-8">
          <FatigueChart data={chartData} />
        </div>

        {/* Trip Summary */}
        <div className="bg-slate-900 rounded-xl p-5 shadow-lg">
          <TripSummary history={history} />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
