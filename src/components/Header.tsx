import React, { useState, useEffect } from 'react';
import { Menu, X, Droplet, MessageCircle } from 'lucide-react';
import { Link } from './common/Link';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Droplet size={32} className="text-[#0D6EFD] mr-2" />
          <span className={`font-bold text-xl ${ isScrolled ? 'text-gray-800' : 'text-white'} `}>FAMILY FORAGE</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center space-x-6 `}>
          <Link href="#home"><span className={`${ isScrolled ? 'text-gray-800' : 'text-white'}`}>Accueil</span></Link>
          <Link href="#about"><span className={`${ isScrolled ? 'text-gray-800' : 'text-white'}`}>À propos</span></Link>
          <Link href="#services"><span className={`${ isScrolled ? 'text-gray-800' : 'text-white'}`}>Services</span></Link>
          <Link href="#gallery"><span className={`${ isScrolled ? 'text-gray-800' : 'text-white'}`}>Galerie</span></Link>
          <Link href="#contact"><span className={`${ isScrolled ? 'text-gray-800' : 'text-white'}`}>Contact</span></Link>
          
          <a 
            href="https://wa.me/+261XXXXXXXX" 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-4 flex items-center bg-[#20C997] hover:bg-[#1ba884] text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            <MessageCircle size={18} className="mr-2" />
            Contact Rapide
          </a>
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link href="#home" onClick={() => setIsOpen(false)}>Accueil</Link>
            <Link href="#about" onClick={() => setIsOpen(false)}>À propos</Link>
            <Link href="#services" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="#gallery" onClick={() => setIsOpen(false)}>Galerie</Link>
            <Link href="#contact" onClick={() => setIsOpen(false)}>Contact</Link>
            
            <a 
              href="https://wa.me/+261XXXXXXXX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#20C997] hover:bg-[#1ba884] text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              <MessageCircle size={18} className="mr-2" />
              Contact Rapide
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;