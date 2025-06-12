import React from 'react';
import { Droplet, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Droplet size={28} className="text-[#20C997] mr-2" />
              <span className="font-bold text-xl">FAMILY FORAGE</span>
            </div>
            <p className="text-gray-400 mb-4">
              Des solutions hydrauliques durables pour améliorer l'accès à l'eau 
              et à l'énergie à Madagascar, tout en respectant les ressources naturelles.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#0D6EFD] transition-colors"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#0D6EFD] transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-[#20C997] transition-colors">Accueil</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-[#20C997] transition-colors">À propos</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#20C997] transition-colors">Services</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-[#20C997] transition-colors">Galerie</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-[#20C997] transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-[#20C997] transition-colors">Forage de puits</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#20C997] transition-colors">Fourniture & traitement de l'eau</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#20C997] transition-colors">Études géophysiques</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#20C997] transition-colors">Énergie solaire</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact</h4>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin size={20} className="text-[#20C997] mr-3 flex-shrink-0" />
                <span className="text-gray-400">Lot XXX, Antananarivo, Madagascar</span>
              </li>
              <li className="flex">
                <Phone size={20} className="text-[#20C997] mr-3 flex-shrink-0" />
                <span className="text-gray-400">+261 XX XXX XX XX</span>
              </li>
              <li className="flex">
                <Mail size={20} className="text-[#20C997] mr-3 flex-shrink-0" />
                <span className="text-gray-400">contact@familyforage.mg</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-700 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            © {currentYear} FAMILY FORAGE. Tous droits réservés.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#20C997] transition-colors">Mentions légales</a>
            <span>|</span>
            <a href="#" className="hover:text-[#20C997] transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;