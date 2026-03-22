import { Lightbulb } from 'lucide-react';

export function ProTipCard() {
  return (
    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5" />
        <h3 className="font-semibold">Pro Tip</h3>
      </div>
      <p className="text-sm text-red-100 leading-relaxed">
        For optimal accuracy, ensure the subject is centered and well-lit. Avoid heavily mustard-distorted surfaces for the fastest recognition.
      </p>
    </div>
  );
}
