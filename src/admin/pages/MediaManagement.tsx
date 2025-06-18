import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Trash2,
  CheckCircle,
  Clock,
  X,
  AlertTriangle,
  User
} from 'lucide-react';

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  type: 'image' | 'video';
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  project?: string;
  watermarked: boolean;
  compressed: boolean;
  url: string;
  thumbnailUrl?: string;
}

const MediaManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [mediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      filename: 'forage_antsirabe_001.jpg',
      originalName: 'IMG_20250115_143022.jpg',
      type: 'image',
      size: 245000,
      uploadedBy: 'Marie Ratsimba',
      uploadedAt: '2025-01-15T14:30:00Z',
      status: 'approved',
      project: 'Forage Antsirabe',
      watermarked: true,
      compressed: true,
      url: 'https://images.pexels.com/photos/2245376/pexels-photo-2245376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '2',
      filename: 'installation_solaire_002.mp4',
      originalName: 'VID_20250114_092015.mp4',
      type: 'video',
      size: 1200000,
      uploadedBy: 'Paul Andry',
      uploadedAt: '2025-01-14T09:20:00Z',
      status: 'pending',
      project: 'Pompe solaire Itasy',
      watermarked: false,
      compressed: true,
      url: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      thumbnailUrl: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    },
    {
      id: '3',
      filename: 'test_pompage_003.jpg',
      originalName: 'test_debit.jpg',
      type: 'image',
      size: 180000,
      uploadedBy: 'Jean Rakoto',
      uploadedAt: '2025-01-13T16:45:00Z',
      status: 'rejected',
      project: 'Forage Antsirabe',
      watermarked: false,
      compressed: true,
      url: 'https://images.pexels.com/photos/4944301/pexels-photo-4944301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '4',
      filename: 'formation_utilisateurs_004.jpg',
      originalName: 'formation_communaute.jpg',
      type: 'image',
      size: 320000,
      uploadedBy: 'Sophie Hery',
      uploadedAt: '2025-01-12T11:15:00Z',
      status: 'approved',
      project: 'Étude géophysique Toamasina',
      watermarked: true,
      compressed: true,
      url: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ]);

  const statusColors = {
    pending: 'bg-amber-100 text-amber-800',
    approved: 'bg-[#20C997] bg-opacity-10 text-[#20C997]',
    rejected: 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    pending: <Clock size={16} className="text-amber-600" />,
    approved: <CheckCircle size={16} className="text-[#20C997]" />,
    rejected: <X size={16} className="text-red-600" />
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const handleApprove = (id: string) => {
    console.log('Approving media:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejecting media:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Deleting media:', id);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Gestion des médias
          </h1>
          <p className="text-gray-600">
            Gérez les uploads, validations et organisation des médias
          </p>
        </div>
        
        <button
          onClick={() => setShowUploadModal(true)}
          className="mt-4 sm:mt-0 bg-[#0D6EFD] hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
        >
          <Upload size={20} className="mr-2" />
          Upload média
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total médias</p>
              <p className="text-2xl font-bold text-gray-800">{mediaItems.length}</p>
            </div>
            <Camera size={24} className="text-[#0D6EFD]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-amber-600">
                {mediaItems.filter(m => m.status === 'pending').length}
              </p>
            </div>
            <Clock size={24} className="text-amber-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approuvés</p>
              <p className="text-2xl font-bold text-[#20C997]">
                {mediaItems.filter(m => m.status === 'approved').length}
              </p>
            </div>
            <CheckCircle size={24} className="text-[#20C997]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Espace utilisé</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatFileSize(mediaItems.reduce((total, item) => total + item.size, 0))}
              </p>
            </div>
            <Upload size={24} className="text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom de fichier ou contributeur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="approved">Approuvé</option>
                <option value="rejected">Rejeté</option>
              </select>
            </div>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
            >
              <option value="all">Tous les types</option>
              <option value="image">Images</option>
              <option value="video">Vidéos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMedia.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative aspect-video">
              <img
                src={item.thumbnailUrl || item.url}
                alt={item.originalName}
                className="w-full h-full object-cover"
              />
              
              {/* Status badge */}
              <div className="absolute top-2 left-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                  {statusIcons[item.status]}
                  <span className="ml-1 capitalize">{item.status}</span>
                </span>
              </div>
              
              {/* Type badge */}
              <div className="absolute top-2 right-2">
                <span className="bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                  {item.type === 'video' ? 'Vidéo' : 'Image'}
                </span>
              </div>
              
              {/* Watermark indicator */}
              {!item.watermarked && (
                <div className="absolute bottom-2 left-2">
                  <AlertTriangle size={16} className="text-amber-500" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-1 truncate">
                {item.originalName}
              </h3>
              <p className="text-sm text-gray-600 mb-2 truncate">
                {item.filename}
              </p>
              
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <User size={12} className="mr-1" />
                <span className="truncate">{item.uploadedBy}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                <span>{formatFileSize(item.size)}</span>
                <span>{formatDate(item.uploadedAt)}</span>
              </div>
              
              {item.project && (
                <p className="text-xs text-[#0D6EFD] mb-3 truncate">
                  {item.project}
                </p>
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  <button
                    onClick={() => {
                      setSelectedMedia(item);
                      setShowPreview(true);
                    }}
                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Eye size={14} />
                  </button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
                    <Download size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                {item.status === 'pending' && (
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-2 py-1 bg-[#20C997] text-white text-xs rounded hover:bg-green-600"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                    >
                      ✗
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Upload média</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">
                Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
              </p>
              <p className="text-sm text-gray-500 mb-4">
                JPG, PNG, MP4 - Max 500Ko après compression
              </p>
              <button className="bg-[#0D6EFD] text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Sélectionner fichiers
              </button>
            </div>
            
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Projet associé
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]">
                  <option value="">Sélectionner un projet</option>
                  <option value="forage-antsirabe">Forage Antsirabe</option>
                  <option value="pompe-solaire-itasy">Pompe solaire Itasy</option>
                  <option value="etude-toamasina">Étude géophysique Toamasina</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="auto-watermark"
                  className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                  defaultChecked
                />
                <label htmlFor="auto-watermark" className="ml-2 text-sm text-gray-700">
                  Ajouter automatiquement le watermark
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="auto-compress"
                  className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                  defaultChecked
                />
                <label htmlFor="auto-compress" className="ml-2 text-sm text-gray-700">
                  Compresser automatiquement
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.originalName}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {selectedMedia.originalName}
                    </h3>
                    <p className="text-gray-600">{selectedMedia.filename}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedMedia.status]}`}>
                    {statusIcons[selectedMedia.status]}
                    <span className="ml-1 capitalize">{selectedMedia.status}</span>
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">Uploadé par:</span> {selectedMedia.uploadedBy}</p>
                    <p><span className="font-medium">Date:</span> {formatDate(selectedMedia.uploadedAt)}</p>
                    <p><span className="font-medium">Taille:</span> {formatFileSize(selectedMedia.size)}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Projet:</span> {selectedMedia.project || 'Non assigné'}</p>
                    <p><span className="font-medium">Watermark:</span> {selectedMedia.watermarked ? 'Oui' : 'Non'}</p>
                    <p><span className="font-medium">Compressé:</span> {selectedMedia.compressed ? 'Oui' : 'Non'}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="flex space-x-2">
                    <button className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors">
                      <Download size={16} className="mr-2" />
                      Télécharger
                    </button>
                  </div>
                  
                  {selectedMedia.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(selectedMedia.id)}
                        className="bg-[#20C997] hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        Approuver
                      </button>
                      <button
                        onClick={() => handleReject(selectedMedia.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        Rejeter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManagement;