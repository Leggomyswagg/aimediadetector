import React from 'react';
import { useDetection } from '@/contexts/DetectionContext';
import { Shield, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const CTASection: React.FC = () => {
  const { setShowUploader, setActiveView } = useDetection();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-600/10 border border-cyan-500/20 p-8 sm:p-12 lg:p-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

        <div className="relative text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Start Protecting Yourself Today</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Don't Let AI-Generated Media
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Deceive You
            </span>
          </h2>

          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of users who trust Lucid to verify the authenticity of media they encounter online.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={() => setShowUploader(true)}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
            >
              <Shield className="w-5 h-5" />
              Start Free Scan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveView('widget')}
              className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              Get Widget Code
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {['No credit card required', 'Free tier available', 'Instant results', 'Privacy-first'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
