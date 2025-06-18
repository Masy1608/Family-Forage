import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import ProjectManagement from './pages/ProjectManagement';
import MediaManagement from './pages/MediaManagement';
import QuoteManagement from './pages/QuoteManagement';
import DocumentManagement from './pages/DocumentManagement';
import Settings from './pages/Settings';
import { useAuthStore } from './store/authStore';

export type AdminPageType = 'dashboard' | 'users' | 'projects' | 'media' | 'quotes' | 'documents' | 'settings';

interface AdminAppProps {
  onLogout?: () => void;
}

function AdminApp({ onLogout }: AdminAppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthStore();

  // Vérifier si l'utilisateur est admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Accès refusé</h1>
          <p className="text-gray-600">Vous n'avez pas les permissions pour accéder à cette section.</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          onLogout={onLogout}
        />
        
        <div className="flex">
          <Sidebar 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          
          <main className="flex-1 lg:ml-64 pt-16">
            <div className="p-4 lg:p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/projects" element={<ProjectManagement />} />
                <Route path="/media" element={<MediaManagement />} />
                <Route path="/quotes" element={<QuoteManagement />} />
                <Route path="/documents" element={<DocumentManagement />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default AdminApp;