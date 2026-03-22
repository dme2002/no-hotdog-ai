import { Scan, Images, BarChart3, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { ViewType } from '@/types';

interface Props {
  currentView: ViewType;
  onViewChange: (v: ViewType) => void;
}

export function Sidebar({ currentView, onViewChange }: Props) {
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { id: 'scanner' as ViewType, label: 'SCANNER', icon: Scan },
    { id: 'gallery' as ViewType, label: 'GALLERY', icon: Images },
    { id: 'stats' as ViewType, label: 'LAB STATS', icon: BarChart3 },
    { id: 'settings' as ViewType, label: 'SETTINGS', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white h-screen flex flex-col border-r border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-bold text-xl">HOTDOG</span>
          <span className="text-gray-400 font-light text-xl">AI</span>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="text-xs font-semibold text-red-500 tracking-wider">PRECISION BISTRO</div>
        <div className="text-xs text-gray-400 mt-1">V2.0.4 - ACTIVE</div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-all ${
                currentView === item.id ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-gray-100">
        <div className="text-xs font-semibold text-gray-500 mb-2">AI CONFIDENCE</div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 rounded-full" style={{ width: '94.8%' }} />
        </div>
        <div className="text-sm font-semibold text-gray-700 mt-2">94.8% ACCURACY</div>
      </div>

      <div className="p-4 border-t border-gray-100">
        {isAuthenticated && user ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <User className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.username}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Guest User</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
