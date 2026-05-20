import React, { useMemo } from 'react';
import { useDetection } from '@/contexts/DetectionContext';
import DetectionCard from './DetectionCard';
import {
  Search, Filter, Image, Video, Music, ScanLine, AlertTriangle,
  CheckCircle2, TrendingUp, Eye, Grid3X3, List, Layers
} from 'lucide-react';

const DashboardSection: React.FC = () => {
  const {
    detections, filterType, setFilterType, searchQuery, setSearchQuery,
    isScanning, stats, setShowUploader
  } = useDetection();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const filteredDetections = useMemo(() => {
    let filtered = [...detections];
    if (filterType !== 'all') {
      if (filterType === 'ai') filtered = filtered.filter(d => d.is_ai_generated);
      else if (filterType === 'authentic') filtered = filtered.filter(d => !d.is_ai_generated);
      else filtered = filtered.filter(d => d.media_type === filterType);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.source_platform.toLowerCase().includes(q) ||
        d.ai_model_detected?.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [detections, filterType, searchQuery]);

  const todayStats = stats[0];
  const aiCount = detections.filter(d => d.is_ai_generated).length;
  const authCount = detections.filter(d => !d.is_ai_generated).length;

  const filters = [
    { id: 'all', label: 'All', icon: Layers, count: detections.length },
    { id: 'ai', label: 'AI Detected', icon: AlertTriangle, count: aiCount },
    { id: 'authentic', label: 'Authentic', icon: CheckCircle2, count: authCount },
    { id: 'image', label: 'Images', icon: Image, count: detections.filter(d => d.media_type === 'image').length },
    { id: 'video', label: 'Videos', icon: Video, count: detections.filter(d => d.media_type === 'video').length },
    { id: 'audio', label: 'Audio', icon: Music, count: detections.filter(d => d.media_type === 'audio').length },
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <ScanLine className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{todayStats?.total_scans || 0}</div>
              <div className="text-xs text-gray-500">Today's Scans</div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{todayStats?.ai_detected || 0}</div>
              <div className="text-xs text-gray-500">AI Detected</div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{authCount}</div>
              <div className="text-xs text-gray-500">Verified Authentic</div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                {isScanning && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                {isScanning ? 'Active' : 'Idle'}
              </div>
              <div className="text-xs text-gray-500">Scanner Status</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search detections by title, platform, or AI model..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-3 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-3 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filterType === f.id
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-white hover:bg-gray-800'
            }`}
          >
            <f.icon className="w-4 h-4" />
            {f.label}
            <span className={`px-1.5 py-0.5 rounded-md text-xs ${
              filterType === f.id ? 'bg-cyan-500/30 text-cyan-300' : 'bg-gray-700 text-gray-500'
            }`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Detection Grid/List */}
      {filteredDetections.length === 0 ? (
        <div className="text-center py-20">
          <ScanLine className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No detections found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters or scan new media</p>
          <button
            onClick={() => setShowUploader(true)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Scan Media Now
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDetections.map(d => (
            <DetectionCard key={d.id} detection={d} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredDetections.map(d => (
            <DetectionCard key={d.id} detection={d} compact />
          ))}
        </div>
      )}
    </section>
  );
};

export default DashboardSection;
