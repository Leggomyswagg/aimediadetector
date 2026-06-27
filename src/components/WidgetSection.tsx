import React, { useState } from 'react';
import { useDetection } from '@/contexts/DetectionContext';
import {
  Code2, Copy, Check, Settings, Eye, Palette, Layout,
  Monitor, Smartphone, Globe, Shield, ChevronDown, Lock, Crown, ArrowRight
} from 'lucide-react';

const WidgetSection: React.FC = () => {
  const { settings } = useDetection();
  const [copied, setCopied] = useState(false);
  const [widgetSize, setWidgetSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [widgetPosition, setWidgetPosition] = useState('bottom-right');
  const [widgetTheme, setWidgetTheme] = useState('dark');
  const [showAlerts, setShowAlerts] = useState(true);
  const [autoScan, setAutoScan] = useState(true);

  const embedCode = `<!-- AI Detect Media Shield Widget -->
<script src="https://cdn.aidetect.io/widget/v3.js"></script>
<script>
  AIDetect.init({
    apiKey: 'your-api-key-here',
    position: '${widgetPosition}',
    theme: '${widgetTheme}',
    size: '${widgetSize}',
    showAlerts: ${showAlerts},
    autoScan: ${autoScan},
    scanTypes: ['image', 'video', 'audio'],
    sensitivity: '${settings?.sensitivity_level || 'high'}',
    onDetection: function(result) {
      console.log('AI Detection:', result);
    }
  });
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const positions = [
    { id: 'bottom-right', label: 'Bottom Right' },
    { id: 'bottom-left', label: 'Bottom Left' },
    { id: 'top-right', label: 'Top Right' },
    { id: 'top-left', label: 'Top Left' },
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Code2 className="w-7 h-7 text-cyan-400" />
            Embeddable Widget
          </h2>
          <p className="text-gray-400 text-sm mt-1">Add AI detection to any website with a single code snippet</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Configuration */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-gray-900/80 border border-gray-700/50">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-cyan-400" />
              Widget Configuration
            </h3>

            {/* Size */}
            <div className="mb-5">
              <label className="text-xs text-gray-400 mb-2 block">Widget Size</label>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => setWidgetSize(size)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${
                      widgetSize === size
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Position */}
            <div className="mb-5">
              <label className="text-xs text-gray-400 mb-2 block">Position</label>
              <div className="grid grid-cols-2 gap-2">
                {positions.map(pos => (
                  <button
                    key={pos.id}
                    onClick={() => setWidgetPosition(pos.id)}
                    className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                      widgetPosition === pos.id
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="mb-5">
              <label className="text-xs text-gray-400 mb-2 block">Theme</label>
              <div className="flex gap-2">
                {['dark', 'light', 'auto'].map(theme => (
                  <button
                    key={theme}
                    onClick={() => setWidgetTheme(theme)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${
                      widgetTheme === theme
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Show Alert Popups</span>
                </div>
                <button
                  onClick={() => setShowAlerts(!showAlerts)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${showAlerts ? 'bg-cyan-500' : 'bg-gray-700'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${showAlerts ? 'translate-x-5.5 left-[1px]' : 'left-[2px]'}`}
                    style={{ transform: showAlerts ? 'translateX(21px)' : 'translateX(0)' }}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Auto-Scan Media</span>
                </div>
                <button
                  onClick={() => setAutoScan(!autoScan)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${autoScan ? 'bg-cyan-500' : 'bg-gray-700'}`}
                >
                  <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform"
                    style={{ transform: autoScan ? 'translateX(21px)' : 'translateX(0)', left: '2px' }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Embed Code — Enterprise gated */}
          <div className="rounded-xl bg-gray-900/80 border border-yellow-500/30 overflow-hidden">
            {/* Header always visible */}
            <div className="flex items-center justify-between p-6 pb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                Embed Code
              </h3>
              <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-medium">
                <Crown className="w-3 h-3" />
                Enterprise
              </span>
            </div>

            {/* Blurred code + lock overlay */}
            <div className="relative px-6 pb-6">
              <pre className="p-4 rounded-lg bg-gray-950 border border-gray-800 overflow-x-auto text-xs text-gray-300 font-mono leading-relaxed select-none blur-sm pointer-events-none">
                {embedCode}
              </pre>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/70 backdrop-blur-[1px] rounded-lg mx-6">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-3">
                  <Lock className="w-6 h-6 text-yellow-400" />
                </div>
                <p className="text-sm font-bold text-white mb-1">Enterprise Plan Required</p>
                <p className="text-xs text-gray-400 text-center mb-4 max-w-[200px]">
                  Unlock the embed code and deploy to unlimited websites
                </p>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-yellow-500/25 transition-all">
                  <Crown className="w-4 h-4" />
                  Upgrade to Enterprise
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Widget Preview */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-gray-900/80 border border-gray-700/50">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-cyan-400" />
              Live Preview
            </h3>

            {/* Browser mockup */}
            <div className="rounded-xl border border-gray-700 overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 border-b border-gray-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-900 rounded-md">
                    <Globe className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-400">yourwebsite.com</span>
                  </div>
                </div>
              </div>

              {/* Page content */}
              <div className="relative bg-gray-950 h-80 p-6">
                {/* Fake page content */}
                <div className="space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800/60 rounded w-full" />
                  <div className="h-3 bg-gray-800/60 rounded w-5/6" />
                  <div className="h-24 bg-gray-800/40 rounded-lg mt-4" />
                  <div className="h-3 bg-gray-800/60 rounded w-4/5" />
                  <div className="h-3 bg-gray-800/60 rounded w-full" />
                </div>

                {/* Widget preview */}
                <div className={`absolute ${
                  widgetPosition.includes('bottom') ? 'bottom-4' : 'top-4'
                } ${
                  widgetPosition.includes('right') ? 'right-4' : 'left-4'
                }`}>
                  <div className={`${
                    widgetTheme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-700'
                  } border rounded-xl shadow-2xl overflow-hidden ${
                    widgetSize === 'small' ? 'w-48' : widgetSize === 'large' ? 'w-72' : 'w-60'
                  }`}>
                    <div className={`flex items-center gap-2 px-3 py-2 ${
                      widgetTheme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-800 border-gray-700'
                    } border-b`}>
                      <Shield className={`w-4 h-4 ${widgetTheme === 'light' ? 'text-cyan-600' : 'text-cyan-400'}`} />
                      <span className={`text-xs font-semibold ${widgetTheme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                        AI Detect
                      </span>
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    {showAlerts && (
                      <div className="p-3 space-y-2">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] text-red-400 font-bold">!</span>
                          </div>
                          <div>
                            <div className={`text-[10px] font-medium ${widgetTheme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                              AI Image Detected
                            </div>
                            <div className="text-[9px] text-red-400">97% confidence</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-400" />
                          </div>
                          <div>
                            <div className={`text-[10px] font-medium ${widgetTheme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                              Photo Verified
                            </div>
                            <div className="text-[9px] text-green-400">Authentic</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Guide */}
          <div className="p-6 rounded-xl bg-gray-900/80 border border-gray-700/50">
            <h3 className="text-sm font-semibold text-white mb-4">Quick Integration Guide</h3>
            <div className="space-y-3">
              {[
                { step: '1', title: 'Copy the embed code', desc: 'Click the copy button above to get your widget code' },
                { step: '2', title: 'Add to your website', desc: 'Paste the code before the closing </body> tag' },
                { step: '3', title: 'Configure settings', desc: 'Customize position, theme, and sensitivity' },
                { step: '4', title: 'Start detecting', desc: 'The widget will automatically scan media on your pages' },
              ].map(item => (
                <div key={item.step} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-cyan-400 font-bold">{item.step}</span>
                  </div>
                  <div>
                    <div className="text-sm text-white font-medium">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WidgetSection;
