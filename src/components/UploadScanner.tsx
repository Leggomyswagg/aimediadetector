import React, { useState, useCallback, useRef } from 'react';
import { useDetection } from '@/contexts/DetectionContext';
import {
  X, Upload, Link2, Image, Video, Music, ScanLine, AlertTriangle,
  CheckCircle2, Loader2, FileUp, Globe
} from 'lucide-react';

const UploadScanner: React.FC = () => {
  const { showUploader, setShowUploader, scanMedia, isScanning } = useDetection();
  const [mode, setMode] = useState<'upload' | 'url'>('url');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'audio'>('image');
  const [platform, setPlatform] = useState('Direct Upload');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScan = async () => {
    if (!url && !title) {
      setError('Please provide a URL or title for the media');
      return;
    }
    setError('');
    setResult(null);
    try {
      const analysis = await scanMedia(url || 'direct-upload', mediaType, title || url, platform);
      setResult(analysis);
    } catch (err: any) {
      setError(err.message || 'Scan failed. Please try again.');
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setTitle(file.name);
      if (file.type.startsWith('image/')) setMediaType('image');
      else if (file.type.startsWith('video/')) setMediaType('video');
      else if (file.type.startsWith('audio/')) setMediaType('audio');
      setPlatform('Direct Upload');
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTitle(file.name);
      if (file.type.startsWith('image/')) setMediaType('image');
      else if (file.type.startsWith('video/')) setMediaType('video');
      else if (file.type.startsWith('audio/')) setMediaType('audio');
      setPlatform('Direct Upload');
    }
  };

  const getConfidenceColor = (conf: number) => {
    if (conf > 80) return 'text-red-400';
    if (conf > 50) return 'text-orange-400';
    if (conf > 25) return 'text-yellow-400';
    return 'text-green-400';
  };

  const resetForm = () => {
    setUrl('');
    setTitle('');
    setResult(null);
    setError('');
    setMediaType('image');
    setPlatform('Direct Upload');
  };

  if (!showUploader) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => { setShowUploader(false); resetForm(); }}>
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <ScanLine className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Quick Scan</h2>
              <p className="text-xs text-gray-400">Analyze any media for AI generation</p>
            </div>
          </div>
          <button onClick={() => { setShowUploader(false); resetForm(); }} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {!result ? (
            <>
              {/* Mode Toggle */}
              <div className="flex gap-2 p-1 bg-gray-800 rounded-lg">
                <button
                  onClick={() => setMode('url')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                    mode === 'url' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Link2 className="w-4 h-4" />
                  URL / Link
                </button>
                <button
                  onClick={() => setMode('upload')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                    mode === 'upload' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FileUp className="w-4 h-4" />
                  Upload File
                </button>
              </div>

              {mode === 'url' ? (
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Media URL</label>
                  <input
                    type="url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
              ) : (
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    dragOver ? 'border-cyan-500 bg-cyan-500/5' : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                  }`}
                >
                  <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">Drag & drop media file here or click to browse</p>
                  <p className="text-xs text-gray-600 mt-1">Supports images, videos, and audio files</p>
                  <input ref={fileInputRef} type="file" accept="image/*,video/*,audio/*" onChange={handleFileSelect} className="hidden" />
                </div>
              )}

              {/* Title */}
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Description / Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Describe the media content..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              {/* Media Type & Platform */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Media Type</label>
                  <div className="flex gap-2">
                    {[
                      { id: 'image' as const, icon: Image },
                      { id: 'video' as const, icon: Video },
                      { id: 'audio' as const, icon: Music },
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setMediaType(t.id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                          mediaType === t.id ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white'
                        }`}
                      >
                        <t.icon className="w-4 h-4" />
                        {t.id}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Source Platform</label>
                  <select
                    value={platform}
                    onChange={e => setPlatform(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500/50"
                  >
                    {['Direct Upload', 'Instagram', 'TikTok', 'Twitter', 'Facebook', 'YouTube', 'Reddit', 'Spotify', 'Other'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleScan}
                disabled={isScanning}
                className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-base hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Media...
                  </>
                ) : (
                  <>
                    <ScanLine className="w-5 h-5" />
                    Analyze Media
                  </>
                )}
              </button>
            </>
          ) : (
            /* Results */
            <div className="space-y-4">
              <div className={`p-5 rounded-xl text-center ${
                result.is_ai_generated ? 'bg-red-500/10 border border-red-500/20' : 'bg-green-500/10 border border-green-500/20'
              }`}>
                {result.is_ai_generated ? (
                  <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                ) : (
                  <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                )}
                <h3 className={`text-xl font-bold ${result.is_ai_generated ? 'text-red-400' : 'text-green-400'}`}>
                  {result.is_ai_generated ? 'AI-Generated Content Detected' : 'Content Appears Authentic'}
                </h3>
                <div className={`text-4xl font-extrabold mt-2 ${getConfidenceColor(result.ai_confidence)}`}>
                  {result.ai_confidence}%
                </div>
                <p className="text-sm text-gray-400 mt-1">AI Confidence Score</p>
              </div>

              {result.ai_model_detected && result.ai_model_detected !== 'N/A - Authentic' && (
                <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-xs text-gray-500">Likely AI Model</div>
                    <div className="text-sm text-white font-medium">{result.ai_model_detected}</div>
                  </div>
                </div>
              )}

              {result.analysis_summary && (
                <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                  <p className="text-sm text-gray-300">{result.analysis_summary}</p>
                </div>
              )}

              {result.artifacts && result.artifacts.length > 0 && (
                <div>
                  <h4 className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Artifacts Found</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.artifacts.map((a: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={resetForm}
                  className="flex-1 py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl font-medium text-sm hover:bg-cyan-500/20 transition-colors"
                >
                  Scan Another
                </button>
                <button
                  onClick={() => { setShowUploader(false); resetForm(); }}
                  className="flex-1 py-3 bg-gray-800 border border-gray-700 text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadScanner;
