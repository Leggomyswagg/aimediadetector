import React from 'react';
import { useDetection } from '@/contexts/DetectionContext';
import { CheckCircle2, XCircle, Zap, Shield, Crown, ArrowRight, Sparkles } from 'lucide-react';

const tiers = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    tagline: 'For personal use',
    icon: Shield,
    iconColor: 'text-gray-400',
    gradient: 'from-gray-700 to-gray-600',
    borderClass: 'border-gray-700/50',
    ctaClass: 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600',
    features: [
      { text: '50 scans per day', included: true },
      { text: 'Image & video detection', included: true },
      { text: 'Basic confidence scores', included: true },
      { text: 'Detection history (7 days)', included: true },
      { text: 'Browser extension', included: true },
      { text: 'Analytics dashboard', included: false },
      { text: 'API access', included: false },
      { text: 'Website embed widget', included: false },
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: 'per month',
    tagline: 'For power users',
    icon: Zap,
    iconColor: 'text-cyan-400',
    gradient: 'from-cyan-500 to-blue-600',
    borderClass: 'border-cyan-500/40',
    ctaClass: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25',
    features: [
      { text: 'Unlimited scans', included: true },
      { text: 'Image, video & audio detection', included: true },
      { text: 'Full confidence + model ID', included: true },
      { text: 'Detection history (1 year)', included: true },
      { text: 'Browser extension', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'API access (10k calls/mo)', included: true },
      { text: 'Website embed widget', included: false },
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    tagline: 'For businesses & publishers',
    icon: Crown,
    iconColor: 'text-yellow-400',
    gradient: 'from-yellow-500 to-orange-500',
    borderClass: 'border-yellow-500/30',
    ctaClass: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg hover:shadow-yellow-500/25',
    features: [
      { text: 'Unlimited scans', included: true },
      { text: 'Image, video & audio detection', included: true },
      { text: 'Full confidence + model ID', included: true },
      { text: 'Unlimited detection history', included: true },
      { text: 'Browser extension', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'API access (unlimited)', included: true },
      { text: 'Website embed widget', included: true, highlight: true },
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const PricingSection: React.FC = () => {
  const { setActiveView } = useDetection();

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 text-sm font-medium">Simple Pricing</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Choose Your Protection Level
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Start free and upgrade when you need more power. The website embed widget is available exclusively on the Enterprise plan.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {tiers.map(tier => (
          <div
            key={tier.id}
            className={`relative flex flex-col rounded-2xl border ${tier.borderClass} ${
              tier.highlighted
                ? 'bg-gray-900 shadow-2xl shadow-cyan-500/10 scale-[1.02]'
                : 'bg-gray-900/60'
            } overflow-hidden transition-transform`}
          >
            {tier.highlighted && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
            )}
            {tier.highlighted && (
              <div className="absolute top-4 right-4">
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-7 flex-1">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.gradient} bg-opacity-20 flex items-center justify-center`}>
                  <tier.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                  <p className="text-xs text-gray-500">{tier.tagline}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-7">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-gray-500 text-sm mb-1.5">/{tier.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${feature.highlight ? 'text-yellow-400' : 'text-green-400'}`} />
                    ) : (
                      <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-700" />
                    )}
                    <span className={`text-sm ${
                      !feature.included ? 'text-gray-600 line-through' : feature.highlight ? 'text-yellow-300 font-semibold' : 'text-gray-300'
                    }`}>
                      {feature.text}
                    </span>
                    {feature.highlight && (
                      <Crown className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="p-7 pt-0">
              <button
                onClick={() => tier.id === 'enterprise' && setActiveView('widget')}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base transition-all ${tier.ctaClass}`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-600 mt-8">
        All plans include a 14-day free trial. No credit card required to start.
      </p>
    </section>
  );
};

export default PricingSection;
