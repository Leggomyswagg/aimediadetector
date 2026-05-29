import React from 'react';
import { Detection, useDetection } from '@/contexts/DetectionContext';
import {
  Image, Video, Music, AlertTriangle, CheckCircle2, Clock,
  ExternalLink, ChevronRight, Globe
} from 'lucide-react';

interface DetectionCardProps {
  detection: Detection;
  compact?: boolean;
}

const DetectionCard: React.FC<DetectionCardProps> = ({ detection, compact = false }) => {
  const { setSelectedDetection } = useDetection();

  const getMediaIcon = () => {
    switch (detection.media_type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      default: return <Image className="w-4 h-4" />;
    }
  };

  const getConfidenceColor = (conf: number) => {
    if (conf > 80) return { text: 'text-red-400', bg: 'bg-red-500', border: 'border-red-500/30', bgLight: 'bg-red-500/10' };
    if (conf > 50) return { text: 'text-orange-400', bg: 'bg-orange-500', border: 'border-orange-500/30', bgLight: 'bg-orange-500/10' };
    if (conf > 25) return { text: 'text-yellow-400', bg: 'bg-yellow-500', border: 'border-yellow-500/30', bgLight: 'bg-yellow-500/10' };
    return { text: 'text-green-400', bg: 'bg-green-500', border: 'border-green-500/30', bgLight: 'bg-green-500/10' };
  };

  const colors = getConfidenceColor(detection.ai_confidence);
  const timeAgo = getTimeAgo(detection.scanned_at);

  const platformColors: Record<string, string> = {
    'Instagram': 'from-purple-500 to-pink-500',
    'TikTok': 'from-gray-800 to-gray-600',
    'Twitter': 'from-blue-400 to-blue-600',
    'Facebook': 'from-blue-600 to-blue-800',
    'YouTube': 'from-red-500 to-red-700',
    'Reddit': 'from-orange-500 to-orange-700',
    'Spotify': 'from-green-500 to-green-700',
    'SoundCloud': 'from-orange-400 to-orange-600',
    'Pinterest': 'from-red-400 to-red-600',
    'LinkedIn': 'from-blue-500 to-blue-700',
  };

  if (compact) {
    return (
      <button
        onClick={() => setSelectedDetection(detection)}
        className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/30 hover:bg-gray-800 transition-all duration-200 text-left group"
      >
        <div className={`w-10 h-10 rounded-lg ${colors.bgLight} flex items-center justify-center flex-shrink-0`}>
          {detection.is_ai_generated ? (
            <AlertTriangle className={`w-5 h-5 ${colors.text}`} />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-white font-medium truncate">{detection.title}</div>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            {getMediaIcon()}
            <span>{detection.source_platform}</span>
            <span>{timeAgo}</span>
          </div>
        </div>
        <div className={`text-lg font-bold ${colors.text}`}>
          {detection.ai_confidence}%
        </div>
        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition-colors" />
      </button>
    );
  }

  return (
    <div
      onClick={() => setSelectedDetection(detection)}
      className="group cursor-pointer bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/30 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 hover:scale-[1.01]"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        {detection.thumbnail_url ? (
          <img
            src={detection.thumbnail_url}
            alt={detection.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            {getMediaIcon()}
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-2 py-1 rounded-md text-xs font-semibold bg-gradient-to-r ${
            platformColors[detection.source_platform] || 'from-gray-500 to-gray-700'
          } text-white`}>
            {detection.source_platform}
          </span>
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-900/80 text-gray-300 backdrop-blur-sm flex items-center gap-1">
            {getMediaIcon()}
            {detection.media_type}
          </span>
        </div>

        {/* Confidence badge */}
        <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg ${colors.bgLight} border ${colors.border} backdrop-blur-sm`}>
          <span className={`text-lg font-bold ${colors.text}`}>{detection.ai_confidence}%</span>
        </div>

        {/* Status */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className={`flex items-center gap-1.5 text-xs font-semibold ${
            detection.is_ai_generated ? colors.text : 'text-green-400'
          }`}>
            {detection.is_ai_generated ? (
              <><AlertTriangle className="w-3.5 h-3.5" /> AI Generated</>
            ) : (
              <><CheckCircle2 className="w-3.5 h-3.5" /> Authentic</>
            )}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timeAgo}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {detection.title}
        </h3>
        
        {detection.ai_model_detected && detection.ai_model_detected !== 'N/A - Authentic' && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-500">Model:</span>
            <span className="text-xs text-cyan-400 font-medium">{detection.ai_model_detected}</span>
          </div>
        )}

        {/* Confidence bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">AI Confidence</span>
            <span className={`font-semibold ${colors.text}`}>{detection.ai_confidence}%</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${colors.bg} rounded-full transition-all duration-700`}
              style={{ width: `${detection.ai_confidence}%` }}
            />
          </div>
        </div>

        {/* Artifacts preview */}
        {detection.detection_details?.artifacts && detection.detection_details.artifacts.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {detection.detection_details.artifacts.slice(0, 3).map((artifact, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md bg-gray-800 text-gray-400 text-[10px]">
                {artifact}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default DetectionCard;
