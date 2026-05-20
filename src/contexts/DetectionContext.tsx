import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface Detection {
  id: string;
  media_type: 'image' | 'video' | 'audio';
  source_platform: string;
  media_url?: string;
  thumbnail_url?: string;
  title: string;
  ai_confidence: number;
  ai_model_detected: string;
  detection_details: {
    artifacts?: string[];
    metadata_flags?: string[];
    analysis_summary?: string;
    risk_level?: string;
  };
  is_ai_generated: boolean;
  scanned_at: string;
  user_id?: string;
}

export interface DailyStat {
  date: string;
  total_scans: number;
  ai_detected: number;
  images_scanned: number;
  videos_scanned: number;
  audio_scanned: number;
}

export interface UserSettings {
  id: string;
  sensitivity_level: 'low' | 'medium' | 'high' | 'ultra';
  notifications_enabled: boolean;
  background_scanning: boolean;
  scan_images: boolean;
  scan_videos: boolean;
  scan_audio: boolean;
  trusted_sources: string[];
  widget_position: string;
  widget_theme: string;
  user_id?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'danger' | 'safe';
  timestamp: Date;
}

interface DetectionContextType {
  detections: Detection[];
  stats: DailyStat[];
  settings: UserSettings | null;
  isScanning: boolean;
  activeView: string;
  setActiveView: (view: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  scanMedia: (url: string, type: string, title: string, platform: string) => Promise<any>;
  updateSettings: (updates: Partial<UserSettings>) => Promise<void>;
  notifications: Notification[];
  dismissNotification: (id: string) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  showUploader: boolean;
  setShowUploader: (show: boolean) => void;
  selectedDetection: Detection | null;
  setSelectedDetection: (d: Detection | null) => void;
  loading: boolean;
}

const DetectionContext = createContext<DetectionContextType>({} as DetectionContextType);

export const useDetection = () => useContext(DetectionContext);

export const DetectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [detections, setDetections] = useState<Detection[]>([]);
  const [stats, setStats] = useState<DailyStat[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeView, setActiveView] = useState('hero');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Detections: user sees own + unowned (seed data)
      const detectionsQuery = supabase.from('detections').select('*').order('scanned_at', { ascending: false });
      const statsQuery = supabase.from('detection_stats').select('*').order('date', { ascending: false }).limit(7);
      const settingsQuery = user
        ? supabase.from('user_settings').select('*').eq('user_id', user.id).limit(1).maybeSingle()
        : supabase.from('user_settings').select('*').is('user_id', null).limit(1).maybeSingle();

      const [detectionsRes, statsRes, settingsRes] = await Promise.all([detectionsQuery, statsQuery, settingsQuery]);

      if (detectionsRes.data) setDetections(detectionsRes.data);
      if (statsRes.data) setStats(statsRes.data);
      if (settingsRes.data) setSettings(settingsRes.data);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
    setLoading(false);
  };

  const scanMedia = useCallback(async (url: string, type: string, title: string, platform: string) => {
    setIsScanning(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-media', {
        body: { mediaUrl: url, mediaType: type, title, sourcePlatform: platform }
      });
      if (error) throw error;
      const analysis = data.analysis;

      const insertData: any = {
        media_type: type,
        source_platform: platform,
        media_url: url,
        thumbnail_url: url,
        title,
        ai_confidence: analysis.ai_confidence,
        ai_model_detected: analysis.ai_model_detected,
        is_ai_generated: analysis.is_ai_generated,
        detection_details: {
          artifacts: analysis.artifacts,
          metadata_flags: analysis.metadata_flags,
          analysis_summary: analysis.analysis_summary,
          risk_level: analysis.risk_level
        }
      };
      if (user) insertData.user_id = user.id;

      const { data: newDetection } = await supabase.from('detections').insert(insertData).select().single();

      if (newDetection) {
        setDetections(prev => [newDetection, ...prev]);
        const notif: Notification = {
          id: crypto.randomUUID(),
          title: analysis.is_ai_generated ? 'AI Content Detected!' : 'Content Appears Authentic',
          message: `${title} - ${analysis.ai_confidence}% AI confidence`,
          type: analysis.ai_confidence > 80 ? 'danger' : analysis.ai_confidence > 40 ? 'warning' : 'safe',
          timestamp: new Date()
        };
        setNotifications(prev => [notif, ...prev]);
      }
      setIsScanning(false);
      return analysis;
    } catch (err) {
      console.error('Scan failed:', err);
      setIsScanning(false);
      throw err;
    }
  }, [user]);

  const updateSettings = useCallback(async (updates: Partial<UserSettings>) => {
    if (!settings) return;
    const { data } = await supabase
      .from('user_settings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', settings.id)
      .select()
      .single();
    if (data) setSettings(data);
  }, [settings]);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <DetectionContext.Provider value={{
      detections, stats, settings, isScanning, activeView, setActiveView,
      filterType, setFilterType, searchQuery, setSearchQuery,
      scanMedia, updateSettings, notifications, dismissNotification,
      showSettings, setShowSettings, showUploader, setShowUploader,
      selectedDetection, setSelectedDetection, loading
    }}>
      {children}
    </DetectionContext.Provider>
  );
};
