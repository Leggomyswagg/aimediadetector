import React, { useState, useEffect } from 'react';
import { useDetection } from '@/contexts/DetectionContext';
import { Shield, ScanLine, Eye, Zap, ArrowRight, Play, CheckCircle2, AlertTriangle, Radio } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { setActiveView, setShowUploader, detections, stats } = useDetection();
  const [scanProgress, setScanProgress] = useState(0);
  const [activeDemo, setActiveDemo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => (prev >= 100 ? 0 : prev + 2));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const demoItems = [
    { label: 'Midjourney v6 Image', confidence: 97, type: 'AI Generated' },
    { label: 'Canon EOS R5 Photo', confidence: 3, type: 'Authentic' },
    { label: 'Sora Video Clip', confidence: 94, type: 'AI Generated' },
  ];

  const totalScans = stats.reduce((sum, s) => sum + s.total_scans, 0);
  const totalDetected = stats.reduce((sum, s) => sum + s.ai_detected, 0);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(0,217,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transition-all duration-100"
          style={{ top: `${scanProgress}%` }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium">Real-time Detection Active</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="text-white">Know What's Real.</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Instantly.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
              Lucid spots deepfakes, AI-generated images, synthetic voices, and manipulated videos the moment you encounter them — silently running in the background while you browse.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowUploader(true)}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
              >
                <ScanLine className="w-5 h-5" />
                Scan Media Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setActiveView('dashboard')}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                View Dashboard
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{totalScans.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">Scans This Week</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">{totalDetected.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">AI Detected</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="text-2xl sm:text-3xl font-bold text-green-400">99.2%</div>
                <div className="text-xs text-gray-500 mt-1">Accuracy</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6 shadow-2xl shadow-cyan-500/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Live Detection Feed</div>
                    <div className="text-cyan-400 text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Scanning active
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 font-mono">v3.2.1</div>
              </div>

              <div className="space-y-3">
                {demoItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`relative overflow-hidden rounded-xl border transition-all duration-500 ${
                      activeDemo === idx
                        ? 'border-cyan-500/40 bg-cyan-500/5 scale-[1.02]'
                        : 'border-gray-700/50 bg-gray-800/50'
                    }`}
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          item.confidence > 50 ? 'bg-red-500/20' : 'bg-green-500/20'
                        }`}>
                          {item.confidence > 50 ? (
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{item.label}</div>
                          <div className={`text-xs ${item.confidence > 50 ? 'text-red-400' : 'text-green-400'}`}>
                            {item.type}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          item.confidence > 80 ? 'text-red-400' : item.confidence > 40 ? 'text-orange-400' : 'text-green-400'
                        }`}>
                          {item.confidence}%
                        </div>
                        <div className="text-xs text-gray-500">confidence</div>
                      </div>
                    </div>
                    <div className="h-1 bg-gray-800">
                      <div
                        className={`h-full transition-all duration-1000 ${
                          item.confidence > 80 ? 'bg-red-500' : item.confidence > 40 ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: activeDemo === idx ? `${item.confidence}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <div className="relative">
                  <ScanLine className="w-5 h-5 text-cyan-400 animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-100"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-mono">{scanProgress}%</span>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-semibold animate-bounce">
              Shield Active
            </div>
            <div className="absolute -bottom-3 -left-3 px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold">
              20+ AI Models
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {[
            { icon: Shield, text: 'Background Protection' },
            { icon: Eye, text: 'Real-time Detection' },
            { icon: Zap, text: 'Instant Alerts' },
            { icon: ScanLine, text: 'Multi-Platform' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm">
              <f.icon className="w-4 h-4 text-cyan-400" />
              {f.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
