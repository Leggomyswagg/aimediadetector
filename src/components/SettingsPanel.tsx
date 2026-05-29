import React, { useState } from 'react';
import { useDetection } from '@/contexts/DetectionContext';
import {
  X, Settings, Shield, Bell, Eye, Sliders, Plus, Trash2,
  Monitor, Smartphone, Volume2, Image, Video, Music, Save, Loader2
} from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const { showSettings, setShowSettings, settings, updateSettings } = useDetection();
  const [saving, setSaving] = useState(false);
  const [newSource, setNewSource] = useState('');
  const [localSettings, setLocalSettings] = useState(settings);

  React.useEffect(() => {
    if (settings) setLocalSettings(settings);
  }, [settings]);

  if (!showSettings || !localSettings) return null;

  const handleSave = async () => {
    setSaving(true);
    await updateSettings({
      sensitivity_level: localSettings.sensitivity_level,
      notifications_enabled: localSettings.notifications_enabled,
      background_scanning: localSettings.background_scanning,
      scan_images: localSettings.scan_images,
      scan_videos: localSettings.scan_videos,
      scan_audio: localSettings.scan_audio,
      trusted_sources: localSettings.trusted_sources,
      widget_position: localSettings.widget_position,
      widget_theme: localSettings.widget_theme,
    });
    setSaving(false);
    setShowSettings(false);
  };

  const addTrustedSource = () => {
    if (newSource && !localSettings.trusted_sources.includes(newSource)) {
      setLocalSettings({
        ...localSettings,
        trusted_sources: [...localSettings.trusted_sources, newSource]
      });
      setNewSource('');
    }
  };

  const removeTrustedSource = (source: string) => {
    setLocalSettings({
      ...localSettings,
      trusted_sources: localSettings.trusted_sources.filter(s => s !== source)
    });
  };

  const sensitivityLevels = [
    { id: 'low' as const, label: 'Low', desc: 'Only flag high-confidence AI content (>90%)', color: 'text-green-400' },
    { id: 'medium' as const, label: 'Medium', desc: 'Flag likely AI content (>60%)', color: 'text-yellow-400' },
    { id: 'high' as const, label: 'High', desc: 'Flag possible AI content (>30%)', color: 'text-orange-400' },
    { id: 'ultra' as const, label: 'Ultra', desc: 'Flag any suspicious content (>10%)', color: 'text-red-400' },
  ];

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${value ? 'bg-cyan-500' : 'bg-gray-700'}`}
    >
      <div
        className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform"
        style={{ transform: value ? 'translateX(21px)' : 'translateX(0)', left: '2px' }}
      />
    </button>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowSettings(false)}>
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Settings</h2>
              <p className="text-xs text-gray-400">Configure detection preferences</p>
            </div>
          </div>
          <button onClick={() => setShowSettings(false)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Sensitivity */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Detection Sensitivity
            </h3>
            <div className="space-y-2">
              {sensitivityLevels.map(level => (
                <button
                  key={level.id}
                  onClick={() => setLocalSettings({ ...localSettings, sensitivity_level: level.id })}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    localSettings.sensitivity_level === level.id
                      ? 'bg-cyan-500/10 border border-cyan-500/30'
                      : 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800'
                  }`}
                >
                  <div className="text-left">
                    <div className={`text-sm font-medium ${localSettings.sensitivity_level === level.id ? 'text-cyan-400' : 'text-white'}`}>
                      {level.label}
                    </div>
                    <div className="text-xs text-gray-500">{level.desc}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    localSettings.sensitivity_level === level.id ? 'border-cyan-400 bg-cyan-400' : 'border-gray-600'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Scanning Toggles */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              Scanning Options
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-800/50 border border-gray-700/50">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-sm text-white">Background Scanning</div>
                    <div className="text-xs text-gray-500">Scan media while browsing</div>
                  </div>
                </div>
                <Toggle value={localSettings.background_scanning} onChange={v => setLocalSettings({ ...localSettings, background_scanning: v })} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-800/50 border border-gray-700/50">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-sm text-white">Notifications</div>
                    <div className="text-xs text-gray-500">Alert on AI detection</div>
                  </div>
                </div>
                <Toggle value={localSettings.notifications_enabled} onChange={v => setLocalSettings({ ...localSettings, notifications_enabled: v })} />
              </div>
            </div>
          </div>

          {/* Media Types */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Media Types to Scan</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'scan_images' as const, label: 'Images', icon: Image, color: 'text-blue-400' },
                { key: 'scan_videos' as const, label: 'Videos', icon: Video, color: 'text-purple-400' },
                { key: 'scan_audio' as const, label: 'Audio', icon: Music, color: 'text-green-400' },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setLocalSettings({ ...localSettings, [item.key]: !localSettings[item.key] })}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                    localSettings[item.key]
                      ? 'bg-cyan-500/10 border border-cyan-500/30'
                      : 'bg-gray-800/50 border border-gray-700/50 opacity-50'
                  }`}
                >
                  <item.icon className={`w-6 h-6 ${localSettings[item.key] ? item.color : 'text-gray-600'}`} />
                  <span className={`text-xs font-medium ${localSettings[item.key] ? 'text-white' : 'text-gray-500'}`}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trusted Sources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Trusted Sources (Skip Scanning)</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSource}
                onChange={e => setNewSource(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTrustedSource()}
                placeholder="e.g., reuters.com"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
              />
              <button
                onClick={addTrustedSource}
                className="px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {localSettings.trusted_sources.map(source => (
                <span key={source} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-300">
                  {source}
                  <button onClick={() => removeTrustedSource(source)} className="text-gray-500 hover:text-red-400 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
