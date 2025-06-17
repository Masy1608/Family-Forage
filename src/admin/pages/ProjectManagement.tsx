import React, { useState } from 'react';
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  User,
  MapPin,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  client: string;
  clientId: string;
  location: string;
  type: 'forage' | 'solaire' | 'geophysique' | 'maintenance';
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  progress: number;
  startDate: string;
  estimatedEndDate: string;
  actualEndDate?: string;
  budget: number;
  description: string;
  manager: string;
  team: string[];
}

const ProjectManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'planning' | 'in_progress' | 'completed' | 'on_hold'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'forage' | 'solaire' | 'geophysique' | 'maintenance'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Forage et installation solaire - Antsirabe',
      client: 'Jean Rakoto',
      clientId: '1',
      location: 'Antsirabe, Vakinankaratra',
      type: 'forage',
      status: 'in_progress',
      progress: 75,
      startDate: '2024-12-01',
      estimatedEndDate: '2025-01-30',
      budget: 2500000,
      description: 'Forage de puits avec installation de pompe solaire pour irrigation',
      manager: 'Ing. Ratsimba Michel',
      team: ['Technicien A', 'Technicien B', 'Géophysicien']
    },
    {
      id: '2',
      name: 'Installation pompe solaire - Itasy',
      client: 'Marie Ratsimba',
      clientId: '2',
      location: 'Miarinarivo, Itasy',
      type: 'solaire',
      status: 'in_progress',
      progress: 45,
      startDate: '2025-01-05',
      estimatedEndDate: '2025-02-15',
      budget: 1800000,
      description: 'Installation système de pompage solaire sur puits existant',
      manager: 'Ing. Andriamahefa Paul',
      team: ['Électricien', 'Technicien solaire']
    },
    {
      id: '3',
      name: 'Étude géophysique - Toamasina',
      client: 'Paul Andry',
      clientId: '3',
      location: 'Toamasina, Atsinanana',
      type: 'geophysique',
      status: 'completed',
      progress: 100,
      startDate: '2024-11-15',
      estimatedEndDate: '2024-12-15',
      actualEndDate: '2024-12-10',
      budget: 800000,
      description: 'Étude géophysique pour localisation optimale de forage',
      manager: 'Dr. Rakotomanga',
      team: ['Géophysicien senior', 'Assistant terrain']
    },
    {
      id: '4',
      name: 'Maintenance système - Vakinankaratra',
      client: 'Sophie Hery',
      clientId: '4',
      location: 'Antsirabe, Vakinankaratra',
      type: 'maintenance',
      status: 'planning',
      progress: 0,
      startDate: '2025-02-01',
      estimatedEndDate: '2025-02-05',
      budget: 350000,
      description: 'Maintenance préventive annuelle du système de pompage',
      manager: 'Technicien Chef',
      team: ['Technicien maintenance']
    }
  ];

  const typeLabels = {
    forage: 'Forage',
    solaire: 'Solaire',
    geophysique: 'Géophysique',
    maintenance: 'Maintenance'
  };

  const typeColors = {
    forage: 'bg-[#0D6EFD] bg-opacity-10 text-[#0D6EFD]',
    solaire: 'bg-amber-100 text-amber-800',
    geophysique: 'bg-purple-100 text-purple-800',
    maintenance: 'bg-[#20C997] bg-opacity-10 text-[#20C997]'
  };

  const statusLabels = {
    planning: 'Planification',
    in_progress: 'En cours',
    completed: 'Terminé',
    on_hold: 'En pause'
  };

  const statusColors = {
    planning: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-[#0D6EFD] bg-opacity-10 text-[#0D6EFD]',
    completed: 'bg-[#20C997] bg-opacity-10 text-[#20C997]',
    on_hold: 'bg-amber-100 text-amber-800'
  };

  const statusIcons = {
    planning: <Calendar size={16} className="text-gray-600" />,
    in_progress: <Clock size={16} className="text-[#0D6EFD]" />,
    completed: <CheckCircle size={16} className="text-[#20C997]" />,
    on_hold: <AlertCircle size={16} className="text-amber-600" />
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesType = typeFilter === 'all' || project.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' Ar';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-[#20C997]';
    if (progress >= 50) return 'bg-[#0D6EFD]';
    if (progress >= 25) return 'bg-amber-500';
    return 'bg-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Gestion des projets
          </h1>
          <p className="text-gray-600">
            Suivez et gérez tous les projets clients
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 bg-[#0D6EFD] hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Nouveau projet
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total projets</p>
              <p className="text-2xl font-bold text-gray-800">{projects.length}</p>
            </div>
            <FolderOpen size={24} className="text-[#0D6EFD]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En cours</p>
              <p className="text-2xl font-bold text-[#0D6EFD]">
                {projects.filter(p => p.status === 'in_progress').length}
              </p>
            </div>
            <Clock size={24} className="text-[#0D6EFD]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Terminés</p>
              <p className="text-2xl font-bold text-[#20C997]">
                {projects.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <CheckCircle size={24} className="text-[#20C997]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Budget total</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(projects.reduce((total, p) => total + p.budget, 0))}
              </p>
            </div>
            <TrendingUp size={24} className="text-purple-500" />
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
                placeholder="Rechercher par nom, client ou localisation..."
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
                <option value="planning">Planification</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminé</option>
                <option value="on_hold">En pause</option>
              </select>
            </div>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
            >
              <option value="all">Tous les types</option>
              <option value="forage">Forage</option>
              <option value="solaire">Solaire</option>
              <option value="geophysique">Géophysique</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {project.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeColors[project.type]}`}>
                    {typeLabels[project.type]}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                    {statusIcons[project.status]}
                    <span className="ml-1">{statusLabels[project.status]}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    setShowProjectDetails(true);
                  }}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  <Eye size={16} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <User size={16} className="mr-2" />
                <span>Client: {project.client}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={16} className="mr-2" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-2" />
                <span>{formatDate(project.startDate)} - {formatDate(project.estimatedEndDate)}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progression</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(project.progress)}`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Budget:</span> {formatCurrency(project.budget)}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Manager:</span> {project.manager}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Nouveau projet</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du projet
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    placeholder="Nom du projet"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]">
                    <option value="">Sélectionner un client</option>
                    <option value="1">Jean Rakoto</option>
                    <option value="2">Marie Ratsimba</option>
                    <option value="3">Paul Andry</option>
                    <option value="4">Sophie Hery</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de projet
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]">
                    <option value="forage">Forage</option>
                    <option value="solaire">Solaire</option>
                    <option value="geophysique">Géophysique</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    placeholder="Ville, région"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de début
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de fin estimée
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget (Ar)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chef de projet
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    placeholder="Nom du chef de projet"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  placeholder="Description détaillée du projet"
                ></textarea>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#0D6EFD] text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Créer le projet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {showProjectDetails && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Détails du projet</h3>
              <button
                onClick={() => setShowProjectDetails(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Informations générales</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Nom:</span> {selectedProject.name}</p>
                  <p><span className="font-medium">Client:</span> {selectedProject.client}</p>
                  <p><span className="font-medium">Localisation:</span> {selectedProject.location}</p>
                  <p><span className="font-medium">Type:</span> {typeLabels[selectedProject.type]}</p>
                  <p><span className="font-medium">Statut:</span> {statusLabels[selectedProject.status]}</p>
                  <p><span className="font-medium">Budget:</span> {formatCurrency(selectedProject.budget)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Planning</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Début:</span> {formatDate(selectedProject.startDate)}</p>
                  <p><span className="font-medium">Fin estimée:</span> {formatDate(selectedProject.estimatedEndDate)}</p>
                  {selectedProject.actualEndDate && (
                    <p><span className="font-medium">Fin réelle:</span> {formatDate(selectedProject.actualEndDate)}</p>
                  )}
                  <p><span className="font-medium">Progression:</span> {selectedProject.progress}%</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-800 mb-3">Description</h4>
              <p className="text-gray-600">{selectedProject.description}</p>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-800 mb-3">Équipe</h4>
              <div className="space-y-2">
                <p><span className="font-medium">Chef de projet:</span> {selectedProject.manager}</p>
                <div>
                  <span className="font-medium">Équipe:</span>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    {selectedProject.team.map((member, index) => (
                      <li key={index} className="text-gray-600">{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;