import { CheckCircle2, XCircle, Zap } from 'lucide-react';
import type { PredictionResult } from '@/types';

interface Props {
  result: PredictionResult | null;
}

export function ResultCard({ result }: Props) {
  if (!result) return null;

  const isHotdog = result.is_hotdog;

  return (
    <div className={`animate-[slide-up_0.4s_ease-out] ${isHotdog ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'bg-red-50 border-l-4 border-red-500'} rounded-lg p-6`}>
      <div className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2 flex items-center gap-2">
        <Zap className="w-3 h-3" />
        VERDICT RENDERED
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isHotdog ? (
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          ) : (
            <XCircle className="w-12 h-12 text-red-500" />
          )}
          <h2 className={`text-4xl font-bold tracking-tight ${isHotdog ? 'text-emerald-600' : 'text-red-600'}`}>
            {result.prediction.toUpperCase()}
          </h2>
        </div>

        <div className="text-right">
          <div className={`text-4xl font-bold ${isHotdog ? 'text-emerald-600' : 'text-red-600'}`}>
            {result.confidence_percentage.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Confidence Score</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Not Hotdog: {(result.probabilities.not_hotdog * 100).toFixed(1)}%</span>
          <span>Hotdog: {(result.probabilities.hotdog * 100).toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ${isHotdog ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${result.probabilities.hotdog * 100}%` }} />
        </div>
      </div>

      {result.processing_time_ms && (
        <div className="mt-3 text-xs text-gray-400">Processed in {result.processing_time_ms.toFixed(0)}ms</div>
      )}
    </div>
  );
}
