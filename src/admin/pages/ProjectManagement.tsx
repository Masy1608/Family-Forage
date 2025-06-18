import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  DollarSign,
  User,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Save
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  client: string;
  clientId: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  endDate?: string;
  estimatedEndDate: string;
  budget: number;
  spentAmount: number;
  description: string;
  location: string;
  projectManager: string;
  type: 'forage' | 'solaire' | 'etude_geophysique' | 'maintenance' | 'autre';
  progress: number;
  phases: ProjectPhase[];
  documents: ProjectDocument[];
  team: TeamMember[];
}

interface ProjectPhase {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed';
  startDate: string;
  endDate?: string;
  estimatedDuration: number;
  description: string;
}

interface ProjectDocument {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

const ProjectManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Forage et installation solaire - Antsirabe',
      client: 'Jean Rakoto',
      clientId: '1',
      status: 'in_progress',
      priority: 'high',
      startDate: '2024-12-01',
      estimatedEndDate: '2025-01-30',
      budget: 2500000,
      spentAmount: 1875000,
      description: 'Projet de forage de puits avec installation de pompe solaire',
      location: 'Antsirabe, Vakinankaratra',
      projectManager: 'Ing. Ratsimba Michel',
      type: 'forage',
      progress: 75,
      phases: [
        { id: '1', name: 'Étude géophysique', status: 'completed', startDate: '2024-12-01', endDate: '2024-12-10', estimatedDuration: 10, description: 'Analyse du sous-sol' },
        { id: '2', name: 'Forage', status: 'completed', startDate: '2024-12-11', endDate: '2025-01-05', estimatedDuration: 25, description: 'Réalisation du forage' },
        { id: '3', name: 'Installation solaire', status: 'in_progress', startDate: '2025-01-06', estimatedDuration: 15, description: 'Installation des panneaux solaires' },
        { id: '4', name: 'Tests et livraison', status: 'pending', startDate: '2025-01-21', estimatedDuration: 10, description: 'Tests finaux et formation' }
      ],
      documents: [
        { id: '1', name: 'Rapport géophysique', type: 'PDF', uploadDate: '2024-12-15', size: 2500000 },
        { id: '2', name: 'Plans installation', type: 'PDF', uploadDate: '2025-01-05', size: 1800000 }
      ],
      team: [
        { id: '1', name: 'Ing. Ratsimba Michel', role: 'Chef de projet', email: 'michel@familyforage.mg' },
        { id: '2', name: 'Rakoto Paul', role: 'Technicien forage', email: 'paul@familyforage.mg' }
      ]
    },
    {
      id: '2',
      name: 'Étude géophysique - Toamasina',
      client: 'Paul Andry',
      clientId: '3',
      status: 'planning',
      priority: 'medium',
      startDate: '2025-02-01',
      estimatedEndDate: '2025-02-20',
      budget: 800000,
      spentAmount: 0,
      description: 'Étude géophysique pour localisation de forage',
      location: 'Toamasina, Atsinanana',
      projectManager: 'Dr. Rakotomanga',
      type: 'etude_geophysique',
      progress: 0,
      phases: [
        { id: '1', name: 'Préparation', status: 'pending', startDate: '2025-02-01', estimatedDuration: 5, description: 'Préparation équipement' },
        { id: '2', name: 'Mesures terrain', status: 'pending', startDate: '2025-02-06', estimatedDuration: 10, description: 'Mesures géophysiques' },
        { id: '3', name: 'Analyse et rapport', status: 'pending', startDate: '2025-02-16', estimatedDuration: 5, description: 'Analyse des données' }
      ],
      documents: [],
      team: [
        { id: '1', name: 'Dr. Rakotomanga', role: 'Géophysicien', email: 'rakotomanga@familyforage.mg' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Project['status']>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | Project['type']>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: '',
    client: '',
    status: 'planning',
    priority: 'medium',
    startDate: '',
    estimatedEndDate: '',
    budget: 0,
    description: '',
    location: '',
    projectManager: '',
    type: 'forage',
    progress: 0
  });

  const statusLabels = {
    planning: 'Planification',
    in_progress: 'En cours',
    completed: 'Terminé',
    on_hold: 'En pause',
    cancelled: 'Annulé'
  };

  const statusColors = {
    planning: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-[#0D6EFD] bg-opacity-10 text-[#0D6EFD]',
    completed: 'bg-[#20C997] bg-opacity-10 text-[#20C997]',
    on_hold: 'bg-amber-100 text-amber-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  const typeLabels = {
    forage: 'Forage',
    solaire: 'Solaire',
    etude_geophysique: 'Étude géophysique',
    maintenance: 'Maintenance',
    autre: 'Autre'
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesType = typeFilter === 'all' || project.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.name && newProject.client) {
      const project: Project = {
        id: Date.now().toString(),
        name: newProject.name!,
        client: newProject.client!,
        clientId: Date.now().toString(),
        status: newProject.status as Project['status'],
        priority: newProject.priority as Project['priority'],
        startDate: newProject.startDate || new Date().toISOString().split('T')[0],
        estimatedEndDate: newProject.estimatedEndDate || '',
        budget: newProject.budget || 0,
        spentAmount: 0,
        description: newProject.description || '',
        location: newProject.location || '',
        projectManager: newProject.projectManager || '',
        type: newProject.type as Project['type'],
        progress: 0,
        phases: [],
        documents: [],
        team: []
      };
      setProjects([...projects, project]);
      resetForm();
      setShowAddModal(false);
    }
  };

  const handleEditProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProject && newProject.name && newProject.client) {
      const updatedProjects = projects.map(p => 
        p.id === selectedProject.id 
          ? { ...p, ...newProject }
          : p
      );
      setProjects(updatedProjects);
      resetForm();
      setShowEditModal(false);
      setSelectedProject(null);
    }
  };

  const handleDeleteProject = () => {
    if (selectedProject) {
      setProjects(projects.filter(p => p.id !== selectedProject.id));
      setShowDeleteModal(false);
      setSelectedProject(null);
    }
  };

  const resetForm = () => {
    setNewProject({
      name: '',
      client: '',
      status: 'planning',
      priority: 'medium',
      startDate: '',
      estimatedEndDate: '',
      budget: 0,
      description: '',
      location: '',
      projectManager: '',
      type: 'forage',
      progress: 0
    });
  };

  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    setNewProject({
      name: project.name,
      client: project.client,
      status: project.status,
      priority: project.priority,
      startDate: project.startDate,
      estimatedEndDate: project.estimatedEndDate,
      budget: project.budget,
      description: project.description,
      location: project.location,
      projectManager: project.projectManager,
      type: project.type,
      progress: project.progress
    });
    setShowEditModal(true);
  };

  const openViewModal = (project: Project) => {
    setSelectedProject(project);
    setShowViewModal(true);
  };

  const openDeleteModal = (project: Project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' Ar';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
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
            Gérez et suivez tous vos projets clients
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
            <DollarSign size={24} className="text-[#0D6EFD]" />
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
            <DollarSign size={24} className="text-purple-500" />
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
                <option value="cancelled">Annulé</option>
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
              <option value="etude_geophysique">Étude géophysique</option>
              <option value="maintenance">Maintenance</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progression
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-500">{typeLabels[project.type]}</div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPin size={12} className="mr-1" />
                        {project.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User size={16} className="mr-2 text-gray-400" />
                      <span className="text-sm text-gray-900">{project.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[project.status]}`}>
                        {statusLabels[project.status]}
                      </span>
                      <div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[project.priority]}`}>
                          {project.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#0D6EFD] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{project.progress}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(project.budget)}</div>
                    <div className="text-xs text-gray-500">
                      Dépensé: {formatCurrency(project.spentAmount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        Début: {formatDate(project.startDate)}
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock size={12} className="mr-1" />
                        Fin prévue: {formatDate(project.estimatedEndDate)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openViewModal(project)}
                        className="text-[#0D6EFD] hover:text-blue-600"
                        title="Voir détails"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openEditModal(project)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Modifier"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(project)}
                        className="text-red-600 hover:text-red-800"
                        title="Supprimer"
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
            
            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du projet
                  </label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client
                  </label>
                  <select
                    value={newProject.client}
                    onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    required
                  >
                    <option value="">Sélectionner un client</option>
                    <option value="Jean Rakoto">Jean Rakoto</option>
                    <option value="Marie Ratsimba">Marie Ratsimba</option>
                    <option value="Paul Andry">Paul Andry</option>
                    <option value="Sophie Hery">Sophie Hery</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de projet
                  </label>
                  <select
                    value={newProject.type}
                    onChange={(e) => setNewProject({ ...newProject, type: e.target.value as Project['type'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  >
                    <option value="forage">Forage</option>
                    <option value="solaire">Solaire</option>
                    <option value="etude_geophysique">Étude géophysique</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priorité
                  </label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as Project['priority'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localisation
                </label>
                <input
                  type="text"
                  value={newProject.location}
                  onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  placeholder="Ville, région"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de fin prévue
                  </label>
                  <input
                    type="date"
                    value={newProject.estimatedEndDate}
                    onChange={(e) => setNewProject({ ...newProject, estimatedEndDate: e.target.value })}
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
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chef de projet
                  </label>
                  <input
                    type="text"
                    value={newProject.projectManager}
                    onChange={(e) => setNewProject({ ...newProject, projectManager: e.target.value })}
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
                  rows={3}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
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

      {/* Edit Project Modal */}
      {showEditModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Modifier le projet</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditProject} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du projet
                  </label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value as Project['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  >
                    <option value="planning">Planification</option>
                    <option value="in_progress">En cours</option>
                    <option value="completed">Terminé</option>
                    <option value="on_hold">En pause</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Progression (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProject.progress}
                    onChange={(e) => setNewProject({ ...newProject, progress: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priorité
                  </label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as Project['priority'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (Ar)
                </label>
                <input
                  type="number"
                  value={newProject.budget}
                  onChange={(e) => setNewProject({ ...newProject, budget: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                ></textarea>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#0D6EFD] text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <Save size={16} className="mr-2" />
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Project Modal */}
      {showViewModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Détails du projet</h3>
              <button
                onClick={() => setShowViewModal(false)}
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
                  <p><span className="font-medium">Type:</span> {typeLabels[selectedProject.type]}</p>
                  <p><span className="font-medium">Localisation:</span> {selectedProject.location}</p>
                  <p><span className="font-medium">Chef de projet:</span> {selectedProject.projectManager}</p>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Statut:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedProject.status]}`}>
                      {statusLabels[selectedProject.status]}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Priorité:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[selectedProject.priority]}`}>
                      {selectedProject.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Dates et budget</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Début:</span> {formatDate(selectedProject.startDate)}</p>
                  <p><span className="font-medium">Fin prévue:</span> {formatDate(selectedProject.estimatedEndDate)}</p>
                  <p><span className="font-medium">Budget:</span> {formatCurrency(selectedProject.budget)}</p>
                  <p><span className="font-medium">Dépensé:</span> {formatCurrency(selectedProject.spentAmount)}</p>
                  <div>
                    <span className="font-medium">Progression:</span> {selectedProject.progress}%
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-[#0D6EFD] h-2 rounded-full"
                        style={{ width: `${selectedProject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-800 mb-3">Description</h4>
              <p className="text-gray-600">{selectedProject.description}</p>
            </div>

            {selectedProject.phases.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-3">Phases du projet</h4>
                <div className="space-y-3">
                  {selectedProject.phases.map((phase) => (
                    <div key={phase.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-800">{phase.name}</h5>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                          phase.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {phase.status === 'completed' ? 'Terminé' :
                           phase.status === 'in_progress' ? 'En cours' : 'En attente'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{phase.description}</p>
                      <div className="text-xs text-gray-500">
                        <span>Début: {formatDate(phase.startDate)}</span>
                        {phase.endDate && <span className="ml-4">Fin: {formatDate(phase.endDate)}</span>}
                        <span className="ml-4">Durée estimée: {phase.estimatedDuration} jours</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedProject.team.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-3">Équipe</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProject.team.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User size={16} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{member.name}</p>
                        <p className="text-xs text-gray-600">{member.role}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-red-600">Confirmer la suppression</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <AlertCircle size={48} className="text-red-500 mr-4" />
                <div>
                  <p className="text-gray-800 font-medium">
                    Êtes-vous sûr de vouloir supprimer ce projet ?
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    "{selectedProject.name}"
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Cette action est irréversible. Toutes les données associées au projet seront définitivement supprimées.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteProject}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;