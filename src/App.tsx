import React, { useEffect, useState } from 'react';
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

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

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
    if (urlParams.get('dashboard') === 'true') {
      setShowDashboard(true);
    }
  }, []);

  if (showDashboard) {
    return <DashboardApp />;
  }

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
      
      {/* Demo Dashboard Access Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowDashboard(true)}
          className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg transition-colors text-sm"
        >
          🔐 Espace Client (Demo)
        </button>
      </div>
    </div>
  );
}

export default App;