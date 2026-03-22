import { useState } from 'react';
import { Settings, Shield, Bell, Eye, Database, Info } from 'lucide-react';

export function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoScan, setAutoScan] = useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-500">Configure your classification preferences and system options.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Database className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Model Information</h3>
              <p className="text-sm text-gray-500">AI model configuration and details</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Model Type', value: 'MobileNetV2 Transfer Learning' },
              { label: 'Input Size', value: '224 x 224 px' },
              { label: 'Classes', value: 'Hotdog, Not Hotdog' },
              { label: 'Confidence Threshold', value: '50%' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</div>
                <div className="text-sm font-medium text-gray-800">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Settings className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Preferences</h3>
              <p className="text-sm text-gray-500">Customize your experience</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: Bell, label: 'Notifications', desc: 'Receive scan completion alerts', state: notifications, setState: setNotifications },
              { icon: Eye, label: 'Auto Scan', desc: 'Automatically scan on image drop', state: autoScan, setState: setAutoScan },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-800">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.desc}</div>
                  </div>
                </div>
                <button
                  onClick={() => item.setState(!item.state)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${item.state ? 'bg-red-500' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.state ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Shield className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Security</h3>
              <p className="text-sm text-gray-500">Privacy and data protection</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: Database, label: 'Data Retention', desc: 'Images are stored for 24 hours' },
              { icon: Shield, label: 'Rate Limiting', desc: '100 requests per minute' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-800">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.desc}</div>
                  </div>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded">Active</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Info className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">About</h3>
              <p className="text-sm text-gray-500">Application information</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Version</div>
              <div className="text-sm font-medium text-gray-800">2.0.4</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Build</div>
              <div className="text-sm font-medium text-gray-800">2024.03.22</div>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-400">Not Hotdog AI - Precision Bistro Technology</div>
        </div>
      </div>
    </div>
  );
}
