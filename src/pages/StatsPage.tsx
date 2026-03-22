import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, Target, Zap, Activity } from 'lucide-react';
import { predictApi } from '@/services/api';
import type { StatsSummary, TelemetryData } from '@/types';

export function StatsPage() {
  const [stats, setStats] = useState<StatsSummary | null>(null);
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, t] = await Promise.all([predictApi.getStatsSummary(), predictApi.getTelemetry()]);
        setStats(s);
        setTelemetry(t);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (ts: string | null) => {
    if (!ts) return 'Never';
    return new Date(ts).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Laboratory Statistics</h1>
        <p className="text-gray-500">Real-time performance metrics and classification analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: BarChart3, label: 'Total', value: stats?.total_predictions || 0, color: 'blue', suffix: 'Predictions' },
          { icon: TrendingUp, label: 'Hotdogs', value: stats?.hotdog_count || 0, color: 'emerald', suffix: `${stats?.hotdog_percentage.toFixed(1) || 0}%` },
          { icon: Target, label: 'Imposters', value: stats?.not_hotdog_count || 0, color: 'red', suffix: `${stats?.not_hotdog_percentage.toFixed(1) || 0}%` },
          { icon: Zap, label: 'Confidence', value: `${((stats?.average_confidence || 0) * 100).toFixed(1)}%`, color: 'purple', suffix: 'Average' },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-${item.color}-50 rounded-lg`}>
                <item.icon className={`w-6 h-6 text-${item.color}-500`} />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</span>
            </div>
            <div className={`text-3xl font-bold text-${item.color === 'blue' ? 'gray-800' : item.color + '-600'}`}>{item.value}</div>
            <div className="text-sm text-gray-500 mt-1">{item.suffix}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 text-gray-400" />
            <h3 className="font-semibold text-gray-800">Processing Performance</h3>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Average Time</span>
              <span className="text-lg font-mono font-semibold text-gray-700">{(stats?.average_processing_time_ms || 0).toFixed(0)}ms</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(((stats?.average_processing_time_ms || 0) / 400) * 100, 100)}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0ms</span>
              <span>Target: 400ms</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-gray-400" />
            <h3 className="font-semibold text-gray-800">System Health</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-gray-700 font-medium">API Status</span>
              </div>
              <span className="text-emerald-600 font-semibold">Operational</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Model Version</div>
                <div className="text-lg font-mono font-semibold text-gray-700">{telemetry?.model_version || 'HD-2024.X'}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Uptime</div>
                <div className="text-lg font-mono font-semibold text-gray-700">{telemetry ? `${Math.floor(telemetry.uptime_seconds / 3600)}h ${Math.floor((telemetry.uptime_seconds % 3600) / 60)}m` : '-'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">Last Prediction</div>
            <div className="text-lg font-semibold text-gray-800">{formatDate(stats?.last_prediction_at || null)}</div>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <Clock className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
