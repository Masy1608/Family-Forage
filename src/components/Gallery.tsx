import React, { useState } from 'react';
import { AnimatedSection } from './common/AnimatedSection';
import villageoisImg from '../assets/image/villageois.jpg';

type GalleryCategory = 'all' | 'forage' | 'solaire' | 'temoignages';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: GalleryCategory[];
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/2245376/pexels-photo-2245376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Projet de forage en zone rurale",
      category: ['forage']
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Installation de panneaux solaires",
      category: ['solaire']
    },
    {
      id: 3,
      src: villageoisImg,
      alt: "Équipe de FAMILY FORAGE avec des villageois",
      category: ['temoignages']
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/416726/pexels-photo-416726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Projet de forage mécanique",
      category: ['forage']
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Installation de panneaux solaires pour pompe à eau",
      category: ['solaire']
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/4944301/pexels-photo-4944301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Communauté locale utilisant un point d'eau",
      category: ['temoignages']
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category.includes(selectedCategory));

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'forage', label: 'Forage' },
    { id: 'solaire', label: 'Solaire' },
    { id: 'temoignages', label: 'Témoignages' },
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            📸 Nos projets en images
          </h2>
        </AnimatedSection>
        
        <AnimatedSection delay={0.2}>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Explorez nos interventions à travers Madagascar : forages, pompes solaires, études hydrogéologiques.
          </p>
        </AnimatedSection>
        
        <AnimatedSection delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#0D6EFD] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(category.id as GalleryCategory)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <AnimatedSection key={item.id} delay={0.4}>
              <div 
                className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative">
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-30 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-md">
                        Voir plus
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                    <p className="text-sm">{item.alt}</p>
                  </div>
                  {/* Watermark */}
                  <div className="absolute top-3 right-3 text-white text-opacity-80 font-light text-sm rotate-[-15deg]">
                    FAMILY FORAGE
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="w-full h-auto max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute top-4 right-4">
              <button 
                className="bg-white rounded-full p-2"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
              <p>{selectedImage.alt}</p>
              <p className="text-sm text-gray-300 mt-1">© FAMILY FORAGE</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;