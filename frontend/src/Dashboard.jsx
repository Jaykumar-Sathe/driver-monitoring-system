import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ChevronDown, Shield } from "lucide-react";
import StatusCard from "./components/StatusCard";
import FatigueChart from "./components/FatigueChart";
import TripSummary from "./components/TripSummary";
import AlertPopup from "./components/AlertPopup";
import FatigueGauge from "./components/FatigueGauge";
import RiskBar from "./components/RiskBar";
import SystemOverview from "./components/SystemOverview";

// Hero stagger animation variants
const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Monitor section scroll-triggered variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

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

  const scrollToMonitor = () => {
    document.getElementById('monitor-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white scroll-smooth">
      <AlertPopup level={data.fatigue_level} />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
        {/* Aurora / animated gradient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div
            variants={heroItem}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Shield className="w-10 h-10 text-emerald-500 animate-pulse" />
            <span className="text-emerald-500 text-sm font-medium uppercase tracking-widest">
              Real-Time Safety
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={heroItem}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
          >
            Driver Monitoring System
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroItem}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            AI-powered fatigue detection using computer vision and facial landmark analysis to keep drivers safe on the road.
          </motion.p>

          {/* System Overview embedded in Hero */}
          <motion.div variants={heroItem} className="max-w-3xl mx-auto">
            <SystemOverview />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToMonitor}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-wider">Live Monitor</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.button>
      </section>

      {/* Monitor Section */}
      <section id="monitor-section" className="min-h-screen py-16 px-6">
        <div className="max-w-6xl mx-auto border border-slate-800/50 rounded-3xl p-8 bg-slate-900/20 backdrop-blur-sm shadow-2xl">

          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-2">Live Dashboard</h2>
            <p className="text-slate-500">Real-time driver fatigue metrics</p>
          </motion.div>

          {/* Status Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <StatusCard title="Status" value={data.status} />
            <StatusCard title="Fatigue Score" value={data.fatigue_score} />
            <StatusCard title="Fatigue Level" value={data.fatigue_level} />
          </motion.div>

          {/* Gauge + Risk */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-stretch"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <FatigueGauge score={data.fatigue_score || 0} />
            <RiskBar level={data.fatigue_level} />
          </motion.div>

          {/* Chart */}
          <motion.div
            className="bg-slate-900/50 border border-slate-800 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <FatigueChart data={chartData} />
          </motion.div>

          {/* Trip Summary */}
          <motion.div
            className="bg-slate-900/50 border border-slate-800 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <TripSummary history={history} />
          </motion.div>

        </div>
      </section>
    </div>
  );
}

export default Dashboard;
