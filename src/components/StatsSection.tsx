import React from 'react';
import { useDetection } from '@/contexts/DetectionContext';
import {
  TrendingUp, BarChart3, PieChart, Image, Video, Music,
  AlertTriangle, CheckCircle2, ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';

const StatsSection: React.FC = () => {
  const { stats, detections } = useDetection();

  const totalScans = stats.reduce((s, d) => s + d.total_scans, 0);
  const totalDetected = stats.reduce((s, d) => s + d.ai_detected, 0);
  const detectionRate = totalScans > 0 ? Math.round((totalDetected / totalScans) * 100) : 0;

  // Media type distribution
  const imageCount = detections.filter(d => d.media_type === 'image').length;
  const videoCount = detections.filter(d => d.media_type === 'video').length;
  const audioCount = detections.filter(d => d.media_type === 'audio').length;
  const total = detections.length || 1;

  // AI model distribution
  const modelCounts: Record<string, number> = {};
  detections.filter(d => d.is_ai_generated).forEach(d => {
    const model = d.ai_model_detected?.split('/')[0]?.split(' ')[0] || 'Unknown';
    modelCounts[model] = (modelCounts[model] || 0) + 1;
  });
  const topModels = Object.entries(modelCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  // Platform distribution
  const platformCounts: Record<string, number> = {};
  detections.forEach(d => {
    platformCounts[d.source_platform] = (platformCounts[d.source_platform] || 0) + 1;
  });
  const topPlatforms = Object.entries(platformCounts).sort((a, b) => b[1] - a[1]);

  const maxDailyScan = Math.max(...stats.map(s => s.total_scans), 1);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-cyan-400" />
            Analytics Dashboard
          </h2>
          <p className="text-gray-400 text-sm mt-1">Detection trends and insights from the past 7 days</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-xl bg-gray-900/80 border border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span className="flex items-center gap-1 text-xs text-green-400">
              <ArrowUpRight className="w-3 h-3" /> +12%
            </span>
          </div>
          <div className="text-3xl font-bold text-white">{totalScans.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Total Scans (7d)</div>
        </div>
        <div className="p-5 rounded-xl bg-gray-900/80 border border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="flex items-center gap-1 text-xs text-red-400">
              <ArrowUpRight className="w-3 h-3" /> +8%
            </span>
          </div>
          <div className="text-3xl font-bold text-white">{totalDetected.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">AI Content Found</div>
        </div>
        <div className="p-5 rounded-xl bg-gray-900/80 border border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <PieChart className="w-5 h-5 text-orange-400" />
            <span className="flex items-center gap-1 text-xs text-orange-400">
              <ArrowUpRight className="w-3 h-3" /> +3%
            </span>
          </div>
          <div className="text-3xl font-bold text-white">{detectionRate}%</div>
          <div className="text-xs text-gray-500 mt-1">Detection Rate</div>
        </div>
        <div className="p-5 rounded-xl bg-gray-900/80 border border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="flex items-center gap-1 text-xs text-green-400">
              <ArrowDownRight className="w-3 h-3" /> -2%
            </span>
          </div>
          <div className="text-3xl font-bold text-white">99.2%</div>
          <div className="text-xs text-gray-500 mt-1">Accuracy Rate</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Daily Scan Chart */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-gray-900/80 border border-gray-700/50">
          <h3 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Daily Scan Activity
          </h3>
          <div className="flex items-end gap-3 h-48">
            {stats.slice().reverse().map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1" style={{ height: '160px' }}>
                  <div className="flex-1 flex flex-col justify-end">
                    <div
                      className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-md transition-all duration-500 relative group"
                      style={{ height: `${(day.total_scans / maxDailyScan) * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 rounded text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {day.total_scans} scans
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-end">
                    <div
                      className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-md transition-all duration-500"
                      style={{ height: `${(day.ai_detected / maxDailyScan) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-[10px] text-gray-500">
                  {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-cyan-500" />
              <span className="text-xs text-gray-400">Total Scans</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-red-500" />
              <span className="text-xs text-gray-400">AI Detected</span>
            </div>
          </div>
        </div>

        {/* Media Type Distribution */}
        <div className="p-6 rounded-xl bg-gray-900/80 border border-gray-700/50">
          <h3 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-purple-400" />
            Media Distribution
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Images', count: imageCount, icon: Image, color: 'bg-blue-500', textColor: 'text-blue-400' },
              { label: 'Videos', count: videoCount, icon: Video, color: 'bg-purple-500', textColor: 'text-purple-400' },
              { label: 'Audio', count: audioCount, icon: Music, color: 'bg-green-500', textColor: 'text-green-400' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <item.icon className={`w-4 h-4 ${item.textColor}`} />
                    <span className="text-sm text-gray-300">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{item.count}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-700`}
                    style={{ width: `${(item.count / total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Top AI Models */}
          <div className="mt-8">
            <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Top AI Models Detected</h4>
            <div className="space-y-2">
              {topModels.map(([model, count], i) => (
                <div key={model} className="flex items-center justify-between p-2 rounded-lg bg-gray-800/50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-400 font-bold">
                      {i + 1}
                    </span>
                    <span className="text-xs text-gray-300">{model}</span>
                  </div>
                  <span className="text-xs font-semibold text-cyan-400">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Platform breakdown */}
          <div className="mt-8">
            <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">By Platform</h4>
            <div className="space-y-2">
              {topPlatforms.map(([platform, count]) => (
                <div key={platform} className="flex items-center justify-between p-2 rounded-lg bg-gray-800/50">
                  <span className="text-xs text-gray-300">{platform}</span>
                  <span className="text-xs font-semibold text-white">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
