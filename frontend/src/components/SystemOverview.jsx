import { motion } from 'framer-motion';
import { Camera, Eye, Shield } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'OpenCV Face Tracking',
    description: 'Analyzes 68 facial landmarks at 30fps to map facial geometry and head orientation.',
    color: 'sky',
  },
  {
    icon: Eye,
    title: 'EAR Analysis',
    description: 'Calculates the Eye Aspect Ratio (EAR). If the eyes remain closed longer than the safety threshold, an alert is triggered.',
    color: 'emerald',
  },
  {
    icon: Shield,
    title: 'Threshold Logic',
    description: 'Dynamic risk assessment categorizes behavior into Safe, Warning, or Critical states.',
    color: 'rose',
  },
];

const colorMap = {
  sky: { bg: 'bg-sky-500/10', text: 'text-sky-500', glow: 'hover:shadow-sky-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', glow: 'hover:shadow-emerald-500/20' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-500', glow: 'hover:shadow-rose-500/20' },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const SystemOverview = () => {
  return (
    <div>
      <motion.h2
        className="text-lg font-bold text-white mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        How it Works
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((feat) => {
          const Icon = feat.icon;
          const colors = colorMap[feat.color];
          return (
            <motion.div
              key={feat.title}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className={`bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 flex flex-col items-center text-center shadow-lg hover:shadow-xl ${colors.glow} transition-shadow duration-300 cursor-default`}
            >
              <div className={`p-3 rounded-xl ${colors.bg} ${colors.text} mb-3`}>
                <Icon size={22} />
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mb-1">{feat.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SystemOverview;