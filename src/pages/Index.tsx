import React from 'react';
import AppLayout from '@/components/AppLayout';
import { AuthProvider } from '@/contexts/AuthContext';
import { DetectionProvider } from '@/contexts/DetectionContext';

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <DetectionProvider>
        <AppLayout />
      </DetectionProvider>
    </AuthProvider>
  );
};

export default Index;
