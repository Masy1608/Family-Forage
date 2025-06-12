import React from 'react';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AnimatedSection } from './common/AnimatedSection';

// Fix Leaflet marker icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Location {
  id: number;
  name: string;
  lat: number; // Latitude for real map coordinates
  lng: number; // Longitude for real map coordinates
  projects: number;
}

const Map: React.FC = () => {
  const locations: Location[] = [
    { id: 1, name: 'Analamanga', lat: -18.8792, lng: 47.5079, projects: 26 }, // Antananarivo
    { id: 2, name: 'Itasy', lat: -19.0167, lng: 46.6833, projects: 14 }, // Miarinarivo
    { id: 3, name: 'Atsinanana', lat: -18.8167, lng: 49.0833, projects: 18 }, // Toamasina
    { id: 4, name: 'Vakinankaratra', lat: -19.8333, lng: 47.0167, projects: 22 }, // Antsirabe
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
            {/* Leaflet Map */}
            <MapContainer
              center={[-19.5, 47.5]} // Center on Madagascar
              zoom={6} // Adjust zoom to show all of Madagascar
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {locations.map((location) => (
                <Marker key={location.id} position={[location.lat, location.lng]}>
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-semibold text-gray-800">{location.name}</h4>
                      <p className="text-sm text-gray-600">
                        {location.projects} projets réalisés
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Legend */}
            <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 p-4 rounded-md shadow-md z-10">
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