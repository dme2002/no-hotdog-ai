import { useState } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ScannerPage } from '@/pages/ScannerPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { StatsPage } from '@/pages/StatsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import type { ViewType } from '@/types';

type AppView = ViewType | 'login' | 'register';

function AppContent() {
  const [currentView, setCurrentView] = useState<AppView>('scanner');

  if (currentView === 'login') {
    return <LoginPage onRegisterClick={() => setCurrentView('register')} onClose={() => setCurrentView('scanner')} />;
  }

  if (currentView === 'register') {
    return <RegisterPage onLoginClick={() => setCurrentView('login')} onClose={() => setCurrentView('scanner')} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar currentView={currentView as ViewType} onViewChange={(v) => setCurrentView(v)} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header onLoginClick={() => setCurrentView('login')} />
        <main className="flex-1 overflow-y-auto">
          {currentView === 'scanner' && <ScannerPage />}
          {currentView === 'gallery' && <GalleryPage />}
          {currentView === 'stats' && <StatsPage />}
          {currentView === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
