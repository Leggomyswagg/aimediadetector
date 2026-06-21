import React, { useState, useEffect } from 'react';
import { useDetection } from '@/contexts/DetectionContext';
import {
  Shield, X, ChevronUp, ChevronDown, AlertTriangle, CheckCircle2,
  ScanLine, Eye, Minimize2, Maximize2
} from 'lucide-react';

const FloatingWidget: React.FC = () => {
  const { detections, isScanning, settings, notifications, dismissNotification } = useDetection();
  const [expanded, setExpanded] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [pulseAlert, setPulseAlert] = useState(false);

  const recentDetections = detections.slice(0, 3);
  const aiDetected = detections.filter(d => d.is_ai_generated).length;

  useEffect(() => {
    if (notifications.length > 0) {
      setPulseAlert(true);
      const timer = setTimeout(() => setPulseAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications.length]);

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 flex items-center justify-center hover:scale-110 transition-all group"
      >
        <Shield className="w-6 h-6" />
        {isScanning && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping" />
        )}
        {pulseAlert && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-72 sm:w-80">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700/50">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold text-white">Lucid</span>
            <span className={`w-2 h-2 rounded-full ${isScanning ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1 rounded text-gray-400 hover:text-white transition-colors"
            >
              {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMinimized(true)}
              className="p-1 rounded text-gray-400 hover:text-white transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-4 py-2.5 flex items-center justify-between border-b border-gray-800/50">
          <div className="flex items-center gap-2">
            <ScanLine className={`w-4 h-4 ${isScanning ? 'text-cyan-400 animate-pulse' : 'text-gray-500'}`} />
            <span className="text-xs text-gray-400">
              {isScanning ? 'Scanning active...' : 'Monitoring'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-red-400 font-medium">{aiDetected} AI</span>
            <span className="text-green-400 font-medium">{detections.length - aiDetected} OK</span>
          </div>
        </div>

        {expanded && (
          <div className="max-h-48 overflow-y-auto">
            {recentDetections.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-xs">No recent detections</div>
            ) : (
              recentDetections.map(d => (
                <div key={d.id} className="px-4 py-2.5 border-b border-gray-800/30 hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center gap-2">
                    {d.is_ai_generated ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                    )}
                    <span className="text-xs text-white font-medium truncate">{d.title}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 ml-5.5">
                    <span className="text-[10px] text-gray-500">{d.source_platform} · {d.media_type}</span>
                    <span className={`text-[10px] font-bold ${
                      d.ai_confidence > 80 ? 'text-red-400' : d.ai_confidence > 40 ? 'text-orange-400' : 'text-green-400'
                    }`}>
                      {d.ai_confidence}%
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {isScanning && (
          <div className="h-0.5 bg-gray-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingWidget;
