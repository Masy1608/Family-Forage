import React, { useState } from 'react';
import { 
  File, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Upload,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  X,
  FileText,
  Image,
  Video,
  Archive
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'report' | 'plan' | 'certificate' | 'manual' | 'contract' | 'other';
  format: 'pdf' | 'doc' | 'jpg' | 'png' | 'mp4' | 'zip';
  size: number;
  project?: string;
  client?: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'draft' | 'review' | 'approved' | 'archived';
  accessLevel: 'public' | 'client_only' | 'admin_only';
  description: string;
  version: string;
  url: string;
}

const DocumentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'report' | 'plan' | 'certificate' | 'manual' | 'contract' | 'other'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'review' | 'approved' | 'archived'>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showDocumentDetails, setShowDocumentDetails] = useState(false);

  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Rapport géophysique - Antsirabe',
      type: 'report',
      format: 'pdf',
      size: 2500000,
      project: 'Forage Antsirabe',
      client: 'Jean Rakoto',
      uploadedBy: 'Dr. Rakotomanga',
      uploadedAt: '2024-12-15T00:00:00Z',
      status: 'approved',
      accessLevel: 'client_only',
      description: 'Rapport complet de l\'étude géophysique du site d\'Antsirabe',
      version: '1.0',
      url: '#'
    },
    {
      id: '2',
      name: 'Plans installation pompe solaire',
      type: 'plan',
      format: 'pdf',
      size: 1800000,
      project: 'Pompe solaire Itasy',
      client: 'Marie Ratsimba',
      uploadedBy: 'Ing. Andriamahefa Paul',
      uploadedAt: '2025-01-05T00:00:00Z',
      status: 'approved',
      accessLevel: 'client_only',
      description: 'Plans techniques détaillés pour l\'installation de la pompe solaire',
      version: '2.1',
      url: '#'
    },
    {
      id: '3',
      name: 'Certificat de conformité forage',
      type: 'certificate',
      format: 'pdf',
      size: 500000,
      project: 'Forage Antsirabe',
      client: 'Jean Rakoto',
      uploadedBy: 'Admin',
      uploadedAt: '2025-01-10T00:00:00Z',
      status: 'approved',
      accessLevel: 'client_only',
      description: 'Certificat officiel de conformité du forage réalisé',
      version: '1.0',
      url: '#'
    },
    {
      id: '4',
      name: 'Manuel d\'utilisation pompe',
      type: 'manual',
      format: 'pdf',
      size: 1200000,
      project: 'Pompe solaire Itasy',
      client: 'Marie Ratsimba',
      uploadedBy: 'Technicien Chef',
      uploadedAt: '2025-01-15T00:00:00Z',
      status: 'review',
      accessLevel: 'client_only',
      description: 'Guide d\'utilisation et de maintenance de la pompe solaire',
      version: '1.0',
      url: '#'
    },
    {
      id: '5',
      name: 'Contrat de maintenance',
      type: 'contract',
      format: 'pdf',
      size: 800000,
      client: 'Sophie Hery',
      uploadedBy: 'Admin',
      uploadedAt: '2025-01-12T00:00:00Z',
      status: 'draft',
      accessLevel: 'admin_only',
      description: 'Contrat de maintenance préventive annuelle',
      version: '1.0',
      url: '#'
    },
    {
      id: '6',
      name: 'Photos progression travaux',
      type: 'other',
      format: 'zip',
      size: 15000000,
      project: 'Forage Antsirabe',
      client: 'Jean Rakoto',
      uploadedBy: 'Marie Ratsimba',
      uploadedAt: '2025-01-08T00:00:00Z',
      status: 'approved',
      accessLevel: 'client_only',
      description: 'Archive photos des différentes étapes du projet',
      version: '1.0',
      url: '#'
    }
  ]);

  const typeLabels = {
    report: 'Rapport',
    plan: 'Plan technique',
    certificate: 'Certificat',
    manual: 'Manuel',
    contract: 'Contrat',
    other: 'Autre'
  };

  const typeColors = {
    report: 'bg-[#0D6EFD] bg-opacity-10 text-[#0D6EFD]',
    plan: 'bg-purple-100 text-purple-800',
    certificate: 'bg-[#20C997] bg-opacity-10 text-[#20C997]',
    manual: 'bg-amber-100 text-amber-800',
    contract: 'bg-red-100 text-red-800',
    other: 'bg-gray-100 text-gray-800'
  };

  const statusLabels = {
    draft: 'Brouillon',
    review: 'En révision',
    approved: 'Approuvé',
    archived: 'Archivé'
  };

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    review: 'bg-amber-100 text-amber-800',
    approved: 'bg-[#20C997] bg-opacity-10 text-[#20C997]',
    archived: 'bg-gray-200 text-gray-600'
  };

  const accessLevelLabels = {
    public: 'Public',
    client_only: 'Client uniquement',
    admin_only: 'Admin uniquement'
  };

  const accessLevelColors = {
    public: 'bg-green-100 text-green-800',
    client_only: 'bg-blue-100 text-blue-800',
    admin_only: 'bg-red-100 text-red-800'
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (doc.client && doc.client.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getFileIcon = (format: string) => {
    switch (format) {
      case 'pdf':
      case 'doc':
        return <FileText size={20} className="text-red-600" />;
      case 'jpg':
      case 'png':
        return <Image size={20} className="text-blue-600" />;
      case 'mp4':
        return <Video size={20} className="text-purple-600" />;
      case 'zip':
        return <Archive size={20} className="text-gray-600" />;
      default:
        return <File size={20} className="text-gray-600" />;
    }
  };

  const handleDownload = (id: string) => {
    console.log('Downloading document:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Deleting document:', id);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Gestion des documents
          </h1>
          <p className="text-gray-600">
            Organisez et gérez tous vos documents techniques
          </p>
        </div>
        
        <button
          onClick={() => setShowUploadModal(true)}
          className="mt-4 sm:mt-0 bg-[#0D6EFD] hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
        >
          <Upload size={20} className="mr-2" />
          Upload document
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total documents</p>
              <p className="text-2xl font-bold text-gray-800">{documents.length}</p>
            </div>
            <File size={24} className="text-[#0D6EFD]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approuvés</p>
              <p className="text-2xl font-bold text-[#20C997]">
                {documents.filter(d => d.status === 'approved').length}
              </p>
            </div>
            <CheckCircle size={24} className="text-[#20C997]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En révision</p>
              <p className="text-2xl font-bold text-amber-600">
                {documents.filter(d => d.status === 'review').length}
              </p>
            </div>
            <Clock size={24} className="text-amber-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Espace utilisé</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatFileSize(documents.reduce((total, doc) => total + doc.size, 0))}
              </p>
            </div>
            <Archive size={24} className="text-purple-500" />
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
                placeholder="Rechercher par nom, description ou client..."
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
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
              >
                <option value="all">Tous les types</option>
                <option value="report">Rapport</option>
                <option value="plan">Plan technique</option>
                <option value="certificate">Certificat</option>
                <option value="manual">Manuel</option>
                <option value="contract">Contrat</option>
                <option value="other">Autre</option>
              </select>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
            >
              <option value="all">Tous les statuts</option>
              <option value="draft">Brouillon</option>
              <option value="review">En révision</option>
              <option value="approved">Approuvé</option>
              <option value="archived">Archivé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projet/Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accès
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Détails
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getFileIcon(doc.format)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        <div className="text-sm text-gray-500">v{doc.version} • {doc.format.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[doc.type]}`}>
                      {typeLabels[doc.type]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {doc.project && <div className="font-medium">{doc.project}</div>}
                      {doc.client && <div className="text-gray-500">{doc.client}</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[doc.status]}`}>
                      {statusLabels[doc.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${accessLevelColors[doc.accessLevel]}`}>
                      {accessLevelLabels[doc.accessLevel]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>{formatFileSize(doc.size)}</div>
                      <div>{formatDate(doc.uploadedAt)}</div>
                      <div>Par: {doc.uploadedBy}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedDocument(doc);
                          setShowDocumentDetails(true);
                        }}
                        className="text-[#0D6EFD] hover:text-blue-600"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDownload(doc.id)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <Download size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Upload document</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  Glissez-déposez votre fichier ici ou cliquez pour sélectionner
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  PDF, DOC, JPG, PNG, MP4, ZIP - Max 50MB
                </p>
                <button
                  type="button"
                  className="bg-[#0D6EFD] text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Sélectionner fichier
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de document
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]">
                    <option value="report">Rapport</option>
                    <option value="plan">Plan technique</option>
                    <option value="certificate">Certificat</option>
                    <option value="manual">Manuel</option>
                    <option value="contract">Contrat</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau d'accès
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]">
                    <option value="client_only">Client uniquement</option>
                    <option value="admin_only">Admin uniquement</option>
                    <option value="public">Public</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Projet associé (optionnel)
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]">
                    <option value="">Aucun projet</option>
                    <option value="forage-antsirabe">Forage Antsirabe</option>
                    <option value="pompe-solaire-itasy">Pompe solaire Itasy</option>
                    <option value="etude-toamasina">Étude géophysique Toamasina</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Version
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    placeholder="1.0"
                    defaultValue="1.0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  placeholder="Description du document"
                ></textarea>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#0D6EFD] text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Upload document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Details Modal */}
      {showDocumentDetails && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Détails du document</h3>
              <button
                onClick={() => setShowDocumentDetails(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                {getFileIcon(selectedDocument.format)}
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900">{selectedDocument.name}</h4>
                  <p className="text-sm text-gray-500">Version {selectedDocument.version} • {selectedDocument.format.toUpperCase()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Informations générales</h5>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Type:</span> {typeLabels[selectedDocument.type]}</p>
                    <p><span className="font-medium">Taille:</span> {formatFileSize(selectedDocument.size)}</p>
                    <p><span className="font-medium">Uploadé par:</span> {selectedDocument.uploadedBy}</p>
                    <p><span className="font-medium">Date:</span> {formatDate(selectedDocument.uploadedAt)}</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Statut et accès</h5>
                  <div className="space-y-2">
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedDocument.status]}`}>
                        {statusLabels[selectedDocument.status]}
                      </span>
                    </div>
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${accessLevelColors[selectedDocument.accessLevel]}`}>
                        {accessLevelLabels[selectedDocument.accessLevel]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {(selectedDocument.project || selectedDocument.client) && (
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Projet et client</h5>
                  <div className="text-sm">
                    {selectedDocument.project && <p><span className="font-medium">Projet:</span> {selectedDocument.project}</p>}
                    {selectedDocument.client && <p><span className="font-medium">Client:</span> {selectedDocument.client}</p>}
                  </div>
                </div>
              )}
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Description</h5>
                <p className="text-sm text-gray-600">{selectedDocument.description}</p>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownload(selectedDocument.id)}
                    className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
                  >
                    <Download size={16} className="mr-2" />
                    Télécharger
                  </button>
                </div>
                
                {selectedDocument.status === 'review' && (
                  <div className="flex space-x-2">
                    <button className="bg-[#20C997] hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors">
                      Approuver
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors">
                      Rejeter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;