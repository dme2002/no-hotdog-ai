import { useState, useCallback } from 'react';
import { Upload, Camera, Image as ImageIcon, X } from 'lucide-react';

interface Props {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  isLoading?: boolean;
}

export function DropZone({ onFileSelect, selectedFile, onClear, isLoading }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onFileSelect(files[0]);
      setPreviewUrl(URL.createObjectURL(files[0]));
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
      setPreviewUrl(URL.createObjectURL(files[0]));
    }
  }, [onFileSelect]);

  const handleClear = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    onClear();
  }, [previewUrl, onClear]);

  return (
    <div className="relative">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[280px] relative ${
          isDragging ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={isLoading}
        />

        {selectedFile && previewUrl ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
            <button
              onClick={handleClear}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-20"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
            <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-lg">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <p className="mt-4 text-sm text-gray-600 font-medium">{selectedFile.name}</p>
            <p className="text-xs text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
                <Camera className="w-10 h-10 text-red-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">+</span>
              </div>
            </div>

            <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg transition-all flex items-center gap-2 mb-4 pointer-events-none">
              <Upload className="w-4 h-4" />
              INITIATE SCAN
            </button>

            <h3 className="text-lg font-semibold text-gray-700 mb-1">Drop your image here</h3>
            <p className="text-sm text-gray-400">PNG, JPG or WEBP (MAX 10MB)</p>

            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-gray-400">
                <ImageIcon className="w-4 h-4" />
                <span className="text-xs">Images Only</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-30">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Processing...</p>
          <p className="text-sm text-gray-400">Analyzing image with AI</p>
        </div>
      )}
    </div>
  );
}
