import { History, Settings, User, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
  onLoginClick: () => void;
}

export function Header({ onLoginClick }: Props) {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end gap-3">
        <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-lg">
          <History className="w-5 h-5" />
        </button>
        <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Settings className="w-5 h-5" />
        </button>
        <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-lg relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {isAuthenticated ? (
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.username}</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-semibold">
              {user?.username.charAt(0).toUpperCase()}
            </div>
          </div>
        ) : (
          <button onClick={onLoginClick} className="flex items-center gap-2 ml-2 pl-4 border-l border-gray-200 text-gray-600 hover:text-red-500">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium hidden sm:block">Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}
