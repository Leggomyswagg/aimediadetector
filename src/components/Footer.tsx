import React from 'react';
import { useDetection } from '@/contexts/DetectionContext';
import { Shield, Github, Twitter, Linkedin, Mail, ExternalLink, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const { setActiveView } = useDetection();

  const footerLinks = {
    Product: [
      { label: 'Dashboard', action: () => setActiveView('dashboard') },
      { label: 'Detection History', action: () => setActiveView('history') },
      { label: 'Analytics', action: () => setActiveView('stats') },
      { label: 'Widget Integration', action: () => setActiveView('widget') },
      { label: 'API Documentation', action: () => {} },
    ],
    'Detection': [
      { label: 'Image Detection', action: () => {} },
      { label: 'Video Analysis', action: () => {} },
      { label: 'Audio Verification', action: () => {} },
      { label: 'Deepfake Scanner', action: () => {} },
      { label: 'Batch Processing', action: () => {} },
    ],
    'Resources': [
      { label: 'Documentation', action: () => {} },
      { label: 'API Reference', action: () => {} },
      { label: 'Blog', action: () => {} },
      { label: 'Research Papers', action: () => {} },
      { label: 'Community Forum', action: () => {} },
    ],
    'Company': [
      { label: 'About Us', action: () => {} },
      { label: 'Careers', action: () => {} },
      { label: 'Press Kit', action: () => {} },
      { label: 'Contact', action: () => {} },
      { label: 'Privacy Policy', action: () => {} },
    ],
  };

  return (
    <footer className="bg-gray-950 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-7 h-7 text-cyan-400" />
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Lucid
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Protecting the world from AI-generated misinformation with real-time detection technology.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: '#' },
                { icon: Github, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Mail, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={link.action}
                      className="text-sm text-gray-500 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Lucid. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <button className="hover:text-gray-400 transition-colors">Terms of Service</button>
            <button className="hover:text-gray-400 transition-colors">Privacy Policy</button>
            <button className="hover:text-gray-400 transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
