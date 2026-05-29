import React from 'react';
import {
  Upload, ScanLine, Shield, Bell, ArrowRight, CheckCircle2
} from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: Upload,
      step: '01',
      title: 'Media Captured',
      desc: 'Our system automatically detects media content as you browse social platforms, or you can upload files directly for instant analysis.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: ScanLine,
      step: '02',
      title: 'Deep Analysis',
      desc: 'Advanced AI models examine pixel patterns, metadata, spectral data, temporal consistency, and 50+ detection signals.',
      color: 'from-blue-500 to-purple-500',
    },
    {
      icon: Shield,
      step: '03',
      title: 'Verdict Generated',
      desc: 'A comprehensive confidence score is calculated, identifying the likely AI model used and specific artifacts found.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Bell,
      step: '04',
      title: 'Alert & Archive',
      desc: 'You receive an instant notification with the results, and the detection is saved to your history for future reference.',
      color: 'from-pink-500 to-red-500',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />

      <div className="text-center mb-14 relative">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          How It Works
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Four simple steps to protect yourself from AI-generated misinformation
        </p>
      </div>

      <div className="relative">
        {/* Connection line */}
        <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-px bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              {/* Step number */}
              <div className="relative inline-flex mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-9 h-9 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center">
                  <span className="text-xs font-bold text-cyan-400">{step.step}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust indicators */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: '99.2%', label: 'Detection Accuracy' },
          { value: '<100ms', label: 'Average Scan Time' },
          { value: '20+', label: 'AI Models Detected' },
          { value: '10M+', label: 'Media Scanned' },
        ].map((stat, i) => (
          <div key={i} className="text-center p-5 rounded-xl bg-gray-900/40 border border-gray-800/50">
            <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
