import React from 'react';
import { MapPin } from 'lucide-react';
import { AnimatedSection } from './common/AnimatedSection';

interface Location {
  id: number;
  name: string;
  x: number;
  y: number;
  projects: number;
}

const Map: React.FC = () => {
  const locations: Location[] = [
    { id: 1, name: 'Analamanga', x: 48, y: 35, projects: 26 },
    { id: 2, name: 'Itasy', x: 42, y: 38, projects: 14 },
    { id: 3, name: 'Atsinanana', x: 67, y: 42, projects: 18 },
    { id: 4, name: 'Vakinankaratra', x: 45, y: 45, projects: 22 }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            🗺️ Zones d'intervention
          </h2>
        </AnimatedSection>
        
        <AnimatedSection delay={0.2}>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Nous intervenons dans tout Madagascar, avec une forte présence dans : 
            Analamanga, Itasy, Atsinanana, Vakinankaratra.
          </p>
        </AnimatedSection>
        
        <AnimatedSection delay={0.4}>
          <div className="relative rounded-lg overflow-hidden shadow-lg h-[500px] md:h-[600px] w-full bg-blue-50">
            {/* Madagascar map background */}
            <div className="absolute inset-0 bg-cover bg-center" style={{
              backgroundImage: 'url("https://images.pexels.com/photos/3951880/pexels-photo-3951880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
              opacity: 0.3
            }}></div>
            
            {/* Map overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[80%] h-[80%]">
                {/* Location pins */}
                {locations.map((location) => (
                  <div 
                    key={location.id}
                    className="absolute group"
                    style={{ left: `${location.x}%`, top: `${location.y}%` }}
                  >
                    <div className="relative">
                      <MapPin 
                        size={32} 
                        className="text-[#0D6EFD] animate-bounce cursor-pointer" 
                      />
                      
                      {/* Tooltip */}
                      <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-48 bg-white rounded-md shadow-md p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                        <h4 className="font-semibold text-gray-800">{location.name}</h4>
                        <p className="text-sm text-gray-600">
                          {location.projects} projets réalisés
                        </p>
                        <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 p-4 rounded-md shadow-md">
              <h4 className="font-semibold text-gray-800 mb-2">Légende</h4>
              <div className="flex items-center">
                <MapPin size={16} className="text-[#0D6EFD] mr-2" />
                <span className="text-sm text-gray-700">Projets réalisés</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Map;