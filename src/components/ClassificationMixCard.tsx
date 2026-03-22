import { PieChart } from 'lucide-react';
import type { ClassificationMix } from '@/types';

interface Props {
  data: ClassificationMix | null;
}

export function ClassificationMixCard({ data }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="w-5 h-5 text-gray-400" />
        <h3 className="font-semibold text-gray-800 text-sm">GLOBAL CLASSIFICATION MIX</h3>
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${data?.hotdog_percentage || 60}%` }} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">HOTDOGS</div>
          <div className="text-2xl font-bold text-gray-800">{data?.hotdogs.toLocaleString() || '12,402'}</div>
          <div className="text-xs text-emerald-500 font-medium">{data?.hotdog_percentage.toFixed(1) || '60.2'}%</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">IMPOSTERS</div>
          <div className="text-2xl font-bold text-gray-800">{data?.imposters.toLocaleString() || '8,193'}</div>
          <div className="text-xs text-red-500 font-medium">{data?.imposter_percentage.toFixed(1) || '39.8'}%</div>
        </div>
      </div>
    </div>
  );
}
