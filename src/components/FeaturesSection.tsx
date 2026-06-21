import React from 'react';
import {
  Shield, Eye, Zap, Globe, Smartphone, Bell, ScanLine, Lock,
  Layers, BarChart3, Code2, Clock, Fingerprint, Radio, Cpu, Database
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Eye,
      title: 'Real-Time Detection',
      desc: 'Instantly analyze images, videos, and audio for AI generation signatures as you browse.',
      color: 'from-cyan-500 to-blue-500',
      iconColor: 'text-cyan-400',
    },
    {
      icon: Shield,
      title: 'Background Protection',
      desc: 'Silently monitors media across all your social apps without interrupting your experience.',
      color: 'from-blue-500 to-purple-500',
      iconColor: 'text-blue-400',
    },
    {
      icon: Zap,
      title: 'Instant Notifications',
      desc: 'Get immediate alerts when AI-generated content is detected with confidence scores.',
      color: 'from-yellow-500 to-orange-500',
      iconColor: 'text-yellow-400',
    },
    {
      icon: Globe,
      title: 'Multi-Platform Support',
      desc: 'Works across Instagram, TikTok, Twitter, Facebook, YouTube, Reddit, and more.',
      color: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-400',
    },
    {
      icon: Fingerprint,
      title: 'AI Model Identification',
      desc: 'Identifies which AI model generated the content — Midjourney, DALL-E, Sora, and 20+ more.',
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-400',
    },
    {
      icon: Code2,
      title: 'Website Widget',
      desc: 'Embed our detection widget on any website with a simple code snippet for visitor protection.',
      color: 'from-pink-500 to-red-500',
      iconColor: 'text-pink-400',
    },
    {
      icon: Database,
      title: 'Detection History',
      desc: 'Complete archive of all scanned media with filtering, search, and recall capabilities.',
      color: 'from-orange-500 to-red-500',
      iconColor: 'text-orange-400',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      desc: 'Track detection trends, media distribution, and AI model prevalence over time.',
      color: 'from-teal-500 to-cyan-500',
      iconColor: 'text-teal-400',
    },
    {
      icon: Cpu,
      title: 'Deep Analysis',
      desc: 'Examines artifacts, metadata, spectral data, and temporal consistency for thorough detection.',
      color: 'from-indigo-500 to-blue-500',
      iconColor: 'text-indigo-400',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 text-sm font-medium">Powerful Features</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Everything You Need to Stay Protected
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Lucid gives you real-time clarity on every piece of media — across all your devices and platforms.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => (
          <div
            key={i}
            className="group p-6 rounded-2xl bg-gray-900/60 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-1"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-6">Detects AI content across all major platforms</p>
        <div className="flex flex-wrap justify-center gap-4">
          {['Instagram', 'TikTok', 'Twitter/X', 'Facebook', 'YouTube', 'Reddit', 'Spotify', 'LinkedIn', 'Pinterest', 'Snapchat'].map(platform => (
            <div key={platform} className="px-5 py-2.5 rounded-xl bg-gray-900/60 border border-gray-700/30 text-gray-400 text-sm font-medium hover:text-white hover:border-cyan-500/30 transition-all cursor-default">
              {platform}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
