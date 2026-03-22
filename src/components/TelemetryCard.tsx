import { Activity } from 'lucide-react';
import type { TelemetryData } from '@/types';

interface Props {
  data: TelemetryData | null;
}

export function TelemetryCard({ data }: Props) {
  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-red-500" />
        <h3 className="font-semibold text-gray-800">Live Telemetry</h3>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">LATENT NOISE</span>
          <span className="text-sm font-mono font-semibold text-gray-700">{data ? data.latent_noise.toFixed(4) : '-'} RMS</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">PROCESSING</span>
          <span className="text-sm font-mono font-semibold text-gray-700">{data ? data.processing_time_ms.toFixed(0) : '-'}ms</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">MODEL VERSION</span>
          <span className="text-sm font-mono font-semibold text-gray-700">{data?.model_version || 'HD-2024.X'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">TOTAL REQUESTS</span>
          <span className="text-sm font-mono font-semibold text-gray-700">{data?.total_requests.toLocaleString() || '0'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">UPTIME</span>
          <span className="text-sm font-mono font-semibold text-gray-700">{data ? formatUptime(data.uptime_seconds) : '-'}</span>
        </div>
      </div>
    </div>
  );
}
