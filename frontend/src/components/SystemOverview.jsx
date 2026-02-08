// components/SystemOverview.jsx
import React from 'react';
import { Camera, Eye, Shield } from 'lucide-react';

const SystemOverview = () => {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg">
      <h2 className="text-lg font-bold text-white mb-4">How it Works</h2>
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="p-2 h-fit bg-sky-500/10 rounded-lg text-sky-500">
            <Camera size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">OpenCV Face Tracking</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Analyzes 68 facial landmarks at 30fps to map facial geometry and head orientation.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="p-2 h-fit bg-emerald-500/10 rounded-lg text-emerald-500">
            <Eye size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">EAR Analysis</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Calculates the Eye Aspect Ratio (EAR). If the eyes remain closed longer than the safety threshold, an alert is triggered.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="p-2 h-fit bg-rose-500/10 rounded-lg text-rose-500">
            <Shield size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Threshold Logic</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Dynamic risk assessment categorizes behavior into Safe, Warning, or Critical states.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;