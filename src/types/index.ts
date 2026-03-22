export interface PredictionResult {
  prediction: 'Hotdog' | 'Not Hotdog';
  confidence: number;
  confidence_percentage: number;
  is_hotdog: boolean;
  probabilities: { not_hotdog: number; hotdog: number };
  processing_time_ms?: number;
}

export interface TelemetryData {
  latent_noise: number;
  processing_time_ms: number;
  model_version: string;
  uptime_seconds: number;
  total_requests: number;
}

export interface ClassificationMix {
  hotdogs: number;
  imposters: number;
  hotdog_percentage: number;
  imposter_percentage: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export type ViewType = 'scanner' | 'gallery' | 'stats' | 'settings';
