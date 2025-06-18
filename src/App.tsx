import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Map from './components/Map';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DashboardApp from './dashboard/App';
import AdminApp from './admin/App';
import AuthWrapper from './components/auth/AuthWrapper';

type AppView = 'main' | 'auth' | 'dashboard' | 'admin';

interface User {
  email: string;
  name: string;
  role: 'admin' | 'client' | 'media_contributor' | 'visitor';
}

function App() {
  const [currentView, setCurrentView] = useState<AppView>('main');
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Update page title
    document.title = "FAMILY FORAGE - Solutions hydrauliques durables à Madagascar";
    
    // Add meta description for SEO
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'FAMILY FORAGE - Spécialiste en forage de puits, pompe solaire eau, et solutions hydrauliques durables à Madagascar. Plus de 10 ans d\'expérience.';
    document.head.appendChild(metaDescription);
    
    // Add meta keywords for SEO
    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'forage de puits Madagascar, pompe solaire eau, solutions hydrauliques durables, études géophysiques, traitement eau Madagascar';
    document.head.appendChild(metaKeywords);
    
    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(metaKeywords);
    };
  }, []);

  // Check URL for dashboard access (simple demo)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('dashboard') === 'true' && user) {
      if (user.role === 'admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('dashboard');
      }
    }
    if (urlParams.get('admin') === 'true' && user?.role === 'admin') {
      setCurrentView('admin');
    }
  }, [user]);

  const handleShowAuth = () => {
    setCurrentView('auth');
    setAuthError(null);
  };

  const handleLogin = async (credentials: { email: string; password: string }) => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Demo credentials check
      if (credentials.email === 'demo@familyforage.mg' && credentials.password === 'demo123') {
        const userData = {
          email: credentials.email,
          name: 'Jean Rakoto',
          role: 'client' as const
        };
        setUser(userData);
        setCurrentView('dashboard');
      } else if (credentials.email === 'admin@familyforage.mg' && credentials.password === 'admin123') {
        const userData = {
          email: credentials.email,
          name: 'Administrateur FAMILY FORAGE',
          role: 'admin' as const
        };
        setUser(userData);
        setCurrentView('admin');
      } else {
        throw new Error('Email ou mot de passe incorrect');
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('main');
    // Clear URL parameters
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setAuthError(null);
  };

  // Render based on current view
  switch (currentView) {
    case 'auth':
      return (
        <AuthWrapper
          onLogin={handleLogin}
          onBack={handleBackToMain}
          isLoading={authLoading}
          error={authError ?? undefined}
        />
      );
    
    case 'admin':
      return user?.role === 'admin' ? <AdminApp onLogout={handleLogout} /> : null;
    
    case 'dashboard':
      return user ? <DashboardApp onLogout={handleLogout} /> : null;
    
    default:
      return (
        <div className="font-sans">
          <Header />
          <Hero />
          <About />
          <Services />
          <Gallery />
          <Map />
          <Testimonials />
          <Contact />
          <Footer />
          
          {/* Client Space Access Button */}
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={handleShowAuth}
              className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg transition-colors text-sm"
            >
              🔐 Espace Client
            </button>
          </div>
        </div>
      );
  }
}

export default App;