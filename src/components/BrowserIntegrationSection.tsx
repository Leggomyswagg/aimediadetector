import React, { useState } from 'react';
import { Chrome, Globe, Shield, Bell, Pin, CheckCircle2, ArrowRight, Puzzle, Download } from 'lucide-react';

const browsers = [
  { id: 'chrome', label: 'Chrome', color: 'from-yellow-400 to-green-500' },
  { id: 'firefox', label: 'Firefox', color: 'from-orange-400 to-pink-500' },
  { id: 'edge', label: 'Edge', color: 'from-blue-400 to-cyan-500' },
  { id: 'safari', label: 'Safari', color: 'from-blue-300 to-blue-600' },
];

const steps = [
  {
    icon: Download,
    title: 'Install the Extension',
    desc: 'Click "Add to Browser" below and confirm the install in the popup. Takes under 10 seconds.',
  },
  {
    icon: Pin,
    title: 'Pin It to Your Toolbar',
    desc: 'Click the puzzle-piece icon in your browser toolbar, find AI Detect, and click the pin icon.',
  },
  {
    icon: Globe,
    title: 'Browse Normally',
    desc: 'Visit any site. The extension silently scans images, videos, and audio in the background.',
  },
  {
    icon: Bell,
    title: 'Get Instant Alerts',
    desc: 'A badge appears on the shield icon whenever AI-generated media is found on the current page.',
  },
];

const BrowserIntegrationSection: React.FC = () => {
  const [activeBrowser, setActiveBrowser] = useState('chrome');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
          <Puzzle className="w-4 h-4 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">Browser Extension</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Add Protection in 4 Steps
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          No technical knowledge required — install the browser extension and you're automatically protected everywhere you go.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left — steps */}
        <div className="space-y-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-2xl bg-gray-900/60 border border-gray-700/50 hover:border-cyan-500/30 transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                <step.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Step {i + 1}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right — browser selector + CTA */}
        <div className="p-8 rounded-3xl bg-gray-900/80 border border-gray-700/50">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5">Choose your browser</h3>

          {/* Browser tabs */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            {browsers.map(b => (
              <button
                key={b.id}
                onClick={() => setActiveBrowser(b.id)}
                className={`flex flex-col items-center gap-2 py-4 rounded-xl border transition-all ${
                  activeBrowser === b.id
                    ? 'bg-gray-800 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                    : 'bg-gray-800/40 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${b.color} flex items-center justify-center`}>
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <span className={`text-xs font-medium ${activeBrowser === b.id ? 'text-white' : 'text-gray-500'}`}>
                  {b.label}
                </span>
              </button>
            ))}
          </div>

          {/* Install CTA */}
          <button className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all hover:scale-[1.02] mb-4">
            <Shield className="w-5 h-5" />
            Add to {browsers.find(b => b.id === activeBrowser)?.label}
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-600">or use without installing</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Bookmarklet option */}
          <div className="p-4 rounded-xl bg-gray-800/60 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Puzzle className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-white">Bookmarklet</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">No install needed</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">Drag the button below to your bookmarks bar. Click it on any page to scan instantly.</p>
            <a
              href="javascript:void((function(){var s=document.createElement('script');s.src='https://cdn.aidetect.io/bookmarklet.js';document.head.appendChild(s);})())"
              draggable
              onClick={e => e.preventDefault()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium hover:bg-purple-500/20 transition-colors cursor-grab active:cursor-grabbing"
            >
              <Shield className="w-3.5 h-3.5" />
              AI Detect ↗
            </a>
          </div>

          {/* Reassurances */}
          <div className="mt-6 space-y-2">
            {[
              'No account required to install',
              'Works on all websites automatically',
              'No data leaves your browser without consent',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowserIntegrationSection;
