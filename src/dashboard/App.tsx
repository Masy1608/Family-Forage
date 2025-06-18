import  { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProjectTracking from './pages/ProjectTracking';
import QuotesDocuments from './pages/QuotesDocuments';
import MediaGallery from './pages/MediaGallery';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

export type PageType = 'dashboard' | 'tracking' | 'quotes' | 'gallery' | 'notifications' | 'settings';

interface DashboardAppProps {
  onLogout?: () => void;
}

function DashboardApp({ onLogout }: DashboardAppProps) {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tracking':
        return <ProjectTracking />;
      case 'quotes':
        return <QuotesDocuments />;
      case 'gallery':
        return <MediaGallery />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
        onLogout={onLogout}
      />
      
      <div className="flex">
        <Sidebar 
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-64 pt-16">
          <div className="p-4 lg:p-6">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardApp;