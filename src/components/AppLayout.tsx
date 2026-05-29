import React from 'react';
import { useDetection } from '@/contexts/DetectionContext';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import DashboardSection from './DashboardSection';
import HistorySection from './HistorySection';
import StatsSection from './StatsSection';
import WidgetSection from './WidgetSection';
import CTASection from './CTASection';
import BrowserIntegrationSection from './BrowserIntegrationSection';
import PricingSection from './PricingSection';
import Footer from './Footer';
import UploadScanner from './UploadScanner';
import SettingsPanel from './SettingsPanel';
import DetectionDetail from './DetectionDetail';
import FloatingWidget from './FloatingWidget';
import { Loader2 } from 'lucide-react';

const AppLayout: React.FC = () => {
  const { activeView, loading } = useDetection();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Loading AI Detect...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardSection />;
      case 'history':
        return <HistorySection />;
      case 'stats':
        return <StatsSection />;
      case 'widget':
        return <WidgetSection />;
      case 'hero':
      default:
        return (
          <>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <BrowserIntegrationSection />
            <PricingSection />
            <CTASection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="pt-16">
        {renderContent()}
      </main>
      <Footer />

      {/* Modals & Overlays */}
      <UploadScanner />
      <SettingsPanel />
      <DetectionDetail />
      <FloatingWidget />
    </div>
  );
};

export default AppLayout;
