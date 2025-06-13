import React, { useState } from 'react';
import { Camera, Play, Download, Eye, X, Filter } from 'lucide-react';

type MediaCategory = 'all' | 'forage' | 'solaire' | 'temoignages' | 'videos';

interface MediaItem {
  id: number;
  src: string;
  thumbnail?: string;
  title: string;
  date: string;
  category: MediaCategory[];
  type: 'image' | 'video';
  description: string;
}

const MediaGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const mediaItems: MediaItem[] = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/2245376/pexels-photo-2245376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Début du forage - Site Antsirabe",
      date: "2024-12-21",
      category: ['forage'],
      type: 'image',
      description: "Installation de l'équipement de forage sur le site d'Antsirabe"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Installation panneaux solaires",
      date: "2025-01-12",
      category: ['solaire'],
      type: 'image',
      description: "Montage des panneaux solaires pour le système de pompage"
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Formation des utilisateurs",
      date: "2025-01-15",
      category: ['temoignages'],
      type: 'image',
      description: "Session de formation avec la communauté locale"
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/416726/pexels-photo-416726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Forage en cours - 25m",
      date: "2024-12-28",
      category: ['forage'],
      type: 'image',
      description: "Progression du forage à 25 mètres de profondeur"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Système solaire complet",
      date: "2025-01-18",
      category: ['solaire'],
      type: 'image',
      description: "Vue d'ensemble de l'installation solaire terminée"
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/4944301/pexels-photo-4944301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Premier test de pompage",
      date: "2025-01-10",
      category: ['temoignages'],
      type: 'image',
      description: "Test du débit d'eau avec la communauté"
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/2245376/pexels-photo-2245376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      thumbnail: "https://images.pexels.com/photos/2245376/pexels-photo-2245376.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      title: "Vidéo: Processus de forage complet",
      date: "2025-01-05",
      category: ['videos', 'forage'],
      type: 'video',
      description: "Timelapse du processus de forage de A à Z"
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      thumbnail: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      title: "Vidéo: Installation système solaire",
      date: "2025-01-14",
      category: ['videos', 'solaire'],
      type: 'video',
      description: "Étapes d'installation du système de pompage solaire"
    }
  ];

  const categories = [
    { id: 'all', label: 'Tous', count: mediaItems.length },
    { id: 'forage', label: 'Forage', count: mediaItems.filter(item => item.category.includes('forage')).length },
    { id: 'solaire', label: 'Solaire', count: mediaItems.filter(item => item.category.includes('solaire')).length },
    { id: 'temoignages', label: 'Témoignages', count: mediaItems.filter(item => item.category.includes('temoignages')).length },
    { id: 'videos', label: 'Vidéos', count: mediaItems.filter(item => item.category.includes('videos')).length },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category.includes(selectedCategory));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Galerie technique
          </h1>
          <p className="text-gray-600">
            Photos et vidéos de l'avancement de votre projet
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
            <Download size={18} className="mr-2" />
            Tout télécharger
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <Camera size={24} className="mx-auto text-[#0D6EFD] mb-2" />
          <div className="text-2xl font-bold text-gray-800">
            {mediaItems.filter(item => item.type === 'image').length}
          </div>
          <div className="text-sm text-gray-600">Photos</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <Play size={24} className="mx-auto text-[#20C997] mb-2" />
          <div className="text-2xl font-bold text-gray-800">
            {mediaItems.filter(item => item.type === 'video').length}
          </div>
          <div className="text-sm text-gray-600">Vidéos</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <Eye size={24} className="mx-auto text-amber-500 mb-2" />
          <div className="text-2xl font-bold text-gray-800">156</div>
          <div className="text-sm text-gray-600">Vues</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
          <Download size={24} className="mx-auto text-purple-500 mb-2" />
          <div className="text-2xl font-bold text-gray-800">42</div>
          <div className="text-sm text-gray-600">Téléchargements</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <Filter size={20} className="mr-2 text-gray-600" />
          <h3 className="font-medium text-gray-800">Filtrer par catégorie</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as MediaCategory)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                selectedCategory === category.id
                  ? 'bg-[#0D6EFD] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
              <span className="ml-2 bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedMedia(item)}
          >
            <div className="relative aspect-video">
              <img
                src={item.thumbnail || item.src}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              
              {/* Video overlay */}
              {item.type === 'video' && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <Play size={20} className="text-gray-800 ml-1" />
                  </div>
                </div>
              )}
              
              {/* Category badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.category.includes('forage') ? 'bg-[#0D6EFD] text-white' :
                  item.category.includes('solaire') ? 'bg-[#20C997] text-white' :
                  item.category.includes('temoignages') ? 'bg-amber-500 text-white' :
                  'bg-purple-500 text-white'
                }`}>
                  {item.type === 'video' ? 'Vidéo' : 'Photo'}
                </span>
              </div>
              
              {/* Actions overlay */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <button className="p-1.5 bg-white bg-opacity-90 rounded-md hover:bg-white transition-colors">
                    <Eye size={14} className="text-gray-700" />
                  </button>
                  <button className="p-1.5 bg-white bg-opacity-90 rounded-md hover:bg-white transition-colors">
                    <Download size={14} className="text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {item.description}
              </p>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Media Lightbox */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close button */}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            
            {/* Media content */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative">
                {selectedMedia.type === 'video' ? (
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Play size={48} className="mx-auto mb-4" />
                      <p>Vidéo: {selectedMedia.title}</p>
                      <p className="text-sm text-gray-300 mt-2">
                        Cliquez pour lire la vidéo
                      </p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {selectedMedia.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedMedia.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {selectedMedia.date}
                  </span>
                  <button className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors">
                    <Download size={16} className="mr-2" />
                    Télécharger
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;