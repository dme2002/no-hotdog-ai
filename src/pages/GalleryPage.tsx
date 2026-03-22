import { useState, useEffect } from 'react';
import { Images, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { predictApi } from '@/services/api';
import type { PredictionHistoryItem } from '@/types';

export function GalleryPage() {
  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'hotdog' | 'not-hotdog'>('all');

  useEffect(() => {
    predictApi.getHistory().then(setHistory).catch(console.error);
  }, []);

  const filteredHistory = history.filter((item) => {
    if (filter === 'hotdog') return item.is_hotdog;
    if (filter === 'not-hotdog') return !item.is_hotdog;
    return true;
  });

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Classification Gallery</h1>
          <p className="text-gray-500">Browse your classification history and previous results.</p>
        </div>

        <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
          {['all', 'hotdog', 'not-hotdog'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === f ? (f === 'hotdog' ? 'bg-emerald-500 text-white' : f === 'not-hotdog' ? 'bg-red-500 text-white' : 'bg-gray-800 text-white') : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f === 'all' ? 'All' : f === 'hotdog' ? 'Hotdogs' : 'Not Hotdogs'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Total Scans</div>
          <div className="text-3xl font-bold text-gray-800">{history.length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Hotdogs</div>
          <div className="text-3xl font-bold text-emerald-600">{history.filter((h) => h.is_hotdog).length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Not Hotdogs</div>
          <div className="text-3xl font-bold text-red-500">{history.filter((h) => !h.is_hotdog).length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Accuracy Rate</div>
          <div className="text-3xl font-bold text-gray-800">
            {history.length > 0 ? `${((history.filter((h) => h.confidence > 0.8).length / history.length) * 100).toFixed(1)}%` : '0%'}
          </div>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="text-center py-16">
          <Images className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No images yet</h3>
          <p className="text-gray-400">Start scanning images to build your gallery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHistory.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                {item.is_hotdog ? <CheckCircle2 className="w-12 h-12 text-emerald-400" /> : <XCircle className="w-12 h-12 text-red-400" />}
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-lg font-bold ${item.is_hotdog ? 'text-emerald-600' : 'text-red-600'}`}>{item.prediction}</span>
                <span className="text-sm font-mono text-gray-500">{(item.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                {formatDate(item.timestamp)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
