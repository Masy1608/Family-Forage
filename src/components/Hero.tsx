import React from 'react';
import { FileText, MessageCircle } from 'lucide-react';
import heroBg from '../assets/image/hero-bg.jpg';

const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16 pb-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Des solutions durables pour un accès fiable à l'eau
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
          Depuis plus de 10 ans, FAMILY FORAGE accompagne les communautés et les entreprises de Madagascar 
          avec des services de forage, d'énergie solaire et d'études hydrauliques adaptés aux réalités locales.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-8 py-3 rounded-md font-medium flex items-center justify-center transition-colors duration-300">
            <FileText size={20} className="mr-2" />
            Demander un devis
          </button>
          <a 
            href="https://wa.me/+261XXXXXXXX" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#20C997] hover:bg-[#1ba884] text-white px-8 py-3 rounded-md font-medium flex items-center justify-center transition-colors duration-300"
          >
            <MessageCircle size={20} className="mr-2" />
            Contact rapide
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;