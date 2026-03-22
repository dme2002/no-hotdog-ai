import { useState, useEffect, useCallback } from 'react';
import { Camera } from 'lucide-react';
import { DropZone } from '@/components/DropZone';
import { ResultCard } from '@/components/ResultCard';
import { TelemetryCard } from '@/components/TelemetryCard';
import { ClassificationMixCard } from '@/components/ClassificationMixCard';
import { ProTipCard } from '@/components/ProTipCard';
import { predictApi } from '@/services/api';
import type { PredictionResult, TelemetryData, ClassificationMix } from '@/types';

export function ScannerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [classificationMix, setClassificationMix] = useState<ClassificationMix | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tel, mix] = await Promise.all([
          predictApi.getTelemetry(),
          predictApi.getClassificationMix(),
        ]);
        setTelemetry(tel);
        setClassificationMix(mix);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setError(null);
  }, []);

  const handleClear = useCallback(() => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
  }, []);

  const handleScan = useCallback(async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setError(null);

    try {
      const prediction = await predictApi.classifyImage(selectedFile);
      setResult(prediction);
      const mix = await predictApi.getClassificationMix();
      setClassificationMix(mix);
    } catch (err) {
      setError('Scan failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Object Classification Terminal</h1>
        <p className="text-gray-500">Deploy the neural network against your culinary subject. Precision results guaranteed within 400ms.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DropZone onFileSelect={handleFileSelect} selectedFile={selectedFile} onClear={handleClear} isLoading={isLoading} />

          {selectedFile && !result && !isLoading && (
            <button onClick={handleScan} className="w-full bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2">
              <Camera className="w-5 h-5" />
              ANALYZE IMAGE
            </button>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {result && <ResultCard result={result} />}
        </div>

        <div className="space-y-6">
          <TelemetryCard data={telemetry} />
          <ClassificationMixCard data={classificationMix} />
          <ProTipCard />
        </div>
      </div>
    </div>
  );
}
