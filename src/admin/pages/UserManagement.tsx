import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Mail, 
  Phone,
  CheckCircle,
  XCircle,
  Eye,
  X,
  Save,
  Send,
  Shield,
  UserPlus,
  Download,
  Upload
} from 'lucide-react';
import { UserRole } from '../store/authStore';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLogin: string;
  createdAt: string;
  projects?: number;
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  address?: string;
  company?: string;
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    phone: '',
    role: 'visitor',
    status: 'active',
    address: '',
    company: ''
  });

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Jean Rakoto',
      email: 'jean.rakoto@email.com',
      phone: '+261 34 12 345 67',
      role: 'client',
      isEmailVerified: true,
      isPhoneVerified: true,
      lastLogin: '2025-01-15T10:30:00Z',
      createdAt: '2024-12-01T00:00:00Z',
      projects: 3,
      status: 'active',
      address: 'Lot II M 15 Ankatso, Antananarivo',
      company: 'Entreprise Rakoto SARL'
    },
    {
      id: '2',
      name: 'Marie Ratsimba',
      email: 'marie.ratsimba@email.com',
      phone: '+261 33 98 765 43',
      role: 'media_contributor',
      isEmailVerified: true,
      isPhoneVerified: false,
      lastLogin: '2025-01-14T15:45:00Z',
      createdAt: '2024-11-15T00:00:00Z',
      status: 'active',
      address: 'Antsirabe, Vakinankaratra'
    },
    {
      id: '3',
      name: 'Paul Andry',
      email: 'paul.andry@email.com',
      phone: '+261 32 11 222 33',
      role: 'client',
      isEmailVerified: false,
      isPhoneVerified: true,
      lastLogin: '2025-01-13T09:15:00Z',
      createdAt: '2024-10-20T00:00:00Z',
      projects: 1,
      status: 'inactive',
      address: 'Toamasina, Atsinanana',
      company: 'SARL Andry'
    },
    {
      id: '4',
      name: 'Sophie Hery',
      email: 'sophie.hery@email.com',
      phone: '+261 34 55 666 77',
      role: 'visitor',
      isEmailVerified: true,
      isPhoneVerified: true,
      lastLogin: '2025-01-12T14:20:00Z',
      createdAt: '2025-01-01T00:00:00Z',
      status: 'active',
      address: 'Fianarantsoa, Haute Matsiatra'
    }
  ]);

  const roleLabels = {
    admin: 'Administrateur',
    client: 'Client',
    media_contributor: 'Contributeur Média',
    visitor: 'Visiteur'
  };

  const roleColors = {
    admin: 'bg-red-100 text-red-800',
    client: 'bg-[#0D6EFD] bg-opacity-10 text-[#0D6EFD]',
    media_contributor: 'bg-purple-100 text-purple-800',
    visitor: 'bg-gray-100 text-gray-800'
  };

  const statusColors = {
    active: 'bg-[#20C997] bg-opacity-10 text-[#20C997]',
    inactive: 'bg-amber-100 text-amber-800',
    suspended: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    active: 'Actif',
    inactive: 'Inactif',
    suspended: 'Suspendu'
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.phone) {
      const user: User = {
        id: Date.now().toString(),
        name: newUser.name!,
        email: newUser.email!,
        phone: newUser.phone!,
        role: newUser.role as UserRole,
        isEmailVerified: false,
        isPhoneVerified: false,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        status: newUser.status as User['status'],
        address: newUser.address,
        company: newUser.company,
        projects: newUser.role === 'client' ? 0 : undefined
      };
      setUsers([...users, user]);
      resetForm();
      setShowAddModal(false);
    }
  };

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && newUser.name && newUser.email && newUser.phone) {
      const updatedUsers = users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, ...newUser }
          : u
      );
      setUsers(updatedUsers);
      resetForm();
      setShowEditModal(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  const handleSuspendUser = (userId: string) => {
    const updatedUsers = users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' as User['status'] }
        : u
    );
    setUsers(updatedUsers);
  };

  const handleVerifyEmail = (userId: string) => {
    const updatedUsers = users.map(u => 
      u.id === userId 
        ? { ...u, isEmailVerified: !u.isEmailVerified }
        : u
    );
    setUsers(updatedUsers);
  };

  const handleVerifyPhone = (userId: string) => {
    const updatedUsers = users.map(u => 
      u.id === userId 
        ? { ...u, isPhoneVerified: !u.isPhoneVerified }
        : u
    );
    setUsers(updatedUsers);
  };

  const resetForm = () => {
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'visitor',
      status: 'active',
      address: '',
      company: ''
    });
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      address: user.address,
      company: user.company
    });
    setShowEditModal(true);
  };

  const openViewModal = (user: User) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSendInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Envoi invitation à:', newUser.email);
    // Implémenter l'envoi d'invitation
    setShowInviteModal(false);
    resetForm();
  };

  const handleExportUsers = () => {
    console.log('Export des utilisateurs');
    // Implémenter l'export CSV/Excel
  };

  const handleImportUsers = () => {
    console.log('Import des utilisateurs');
    // Implémenter l'import CSV/Excel
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Gestion des utilisateurs
          </h1>
          <p className="text-gray-600">
            Gérez les comptes utilisateurs et leurs permissions
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setShowInviteModal(true)}
            className="bg-[#20C997] hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <Send size={18} className="mr-2" />
            Inviter
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total utilisateurs</p>
              <p className="text-2xl font-bold text-gray-800">{users.length}</p>
            </div>
            <Users size={24} className="text-[#0D6EFD]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Clients</p>
              <p className="text-2xl font-bold text-gray-800">
                {users.filter(u => u.role === 'client').length}
              </p>
            </div>
            <Users size={24} className="text-[#20C997]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Actifs</p>
              <p className="text-2xl font-bold text-gray-800">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <CheckCircle size={24} className="text-[#20C997]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Email vérifiés</p>
              <p className="text-2xl font-bold text-gray-800">
                {users.filter(u => u.isEmailVerified).length}
              </p>
            </div>
            <Mail size={24} className="text-purple-600" />
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
                placeholder="Rechercher par nom, email ou téléphone..."
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
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
              >
                <option value="all">Tous les rôles</option>
                <option value="admin">Administrateur</option>
                <option value="client">Client</option>
                <option value="media_contributor">Contributeur Média</option>
                <option value="visitor">Visiteur</option>
              </select>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="suspended">Suspendu</option>
            </select>

            <div className="flex space-x-2">
              <button
                onClick={handleExportUsers}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                title="Exporter"
              >
                <Download size={18} />
              </button>
              <button
                onClick={handleImportUsers}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                title="Importer"
              >
                <Upload size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vérifications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière connexion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#0D6EFD] rounded-full flex items-center justify-center text-white font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleColors[user.role]}`}>
                      {roleLabels[user.role]}
                    </span>
                    {user.role === 'client' && user.projects !== undefined && (
                      <div className="text-xs text-gray-500 mt-1">
                        {user.projects} projet(s)
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleVerifyEmail(user.id)}
                        className="flex items-center"
                        title={user.isEmailVerified ? 'Email vérifié' : 'Email non vérifié'}
                      >
                        {user.isEmailVerified ? (
                          <CheckCircle size={16} className="text-[#20C997]" />
                        ) : (
                          <XCircle size={16} className="text-red-500" />
                        )}
                        <Mail size={14} className="ml-1 text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleVerifyPhone(user.id)}
                        className="flex items-center"
                        title={user.isPhoneVerified ? 'Téléphone vérifié' : 'Téléphone non vérifié'}
                      >
                        {user.isPhoneVerified ? (
                          <CheckCircle size={16} className="text-[#20C997]" />
                        ) : (
                          <XCircle size={16} className="text-red-500" />
                        )}
                        <Phone size={14} className="ml-1 text-gray-400" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[user.status]}`}>
                      {statusLabels[user.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(user.lastLogin)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openViewModal(user)}
                        className="text-[#0D6EFD] hover:text-blue-600"
                        title="Voir détails"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Modifier"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleSuspendUser(user.id)}
                        className={`${user.status === 'suspended' ? 'text-[#20C997] hover:text-green-600' : 'text-amber-600 hover:text-amber-800'}`}
                        title={user.status === 'suspended' ? 'Réactiver' : 'Suspendre'}
                      >
                        <Shield size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(user)}
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

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Ajouter un utilisateur</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    placeholder="Nom et prénom"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    placeholder="+261 XX XXX XX XX"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rôle
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  >
                    <option value="visitor">Visiteur</option>
                    <option value="client">Client</option>
                    <option value="media_contributor">Contributeur Média</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={newUser.address}
                  onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  placeholder="Adresse complète"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entreprise (optionnel)
                </label>
                <input
                  type="text"
                  value={newUser.company}
                  onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  placeholder="Nom de l'entreprise"
                />
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
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Modifier l'utilisateur</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rôle
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  >
                    <option value="visitor">Visiteur</option>
                    <option value="client">Client</option>
                    <option value="media_contributor">Contributeur Média</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({ ...newUser, status: e.target.value as User['status'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                  <option value="suspended">Suspendu</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={newUser.address}
                  onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entreprise
                </label>
                <input
                  type="text"
                  value={newUser.company}
                  onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                />
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

      {/* View User Modal */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Détails de l'utilisateur</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Informations personnelles</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Nom:</span> {selectedUser.name}</p>
                  <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
                  <p><span className="font-medium">Téléphone:</span> {selectedUser.phone}</p>
                  <p><span className="font-medium">Rôle:</span> {roleLabels[selectedUser.role]}</p>
                  {selectedUser.address && (
                    <p><span className="font-medium">Adresse:</span> {selectedUser.address}</p>
                  )}
                  {selectedUser.company && (
                    <p><span className="font-medium">Entreprise:</span> {selectedUser.company}</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Statut du compte</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Email vérifié:</span>
                    {selectedUser.isEmailVerified ? (
                      <CheckCircle size={16} className="text-[#20C997]" />
                    ) : (
                      <XCircle size={16} className="text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Téléphone vérifié:</span>
                    {selectedUser.isPhoneVerified ? (
                      <CheckCircle size={16} className="text-[#20C997]" />
                    ) : (
                      <XCircle size={16} className="text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Statut:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedUser.status]}`}>
                      {statusLabels[selectedUser.status]}
                    </span>
                  </div>
                  <p><span className="font-medium">Inscrit le:</span> {formatDate(selectedUser.createdAt)}</p>
                  <p><span className="font-medium">Dernière connexion:</span> {formatDateTime(selectedUser.lastLogin)}</p>
                </div>
              </div>
            </div>
            
            {selectedUser.role === 'client' && selectedUser.projects !== undefined && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-3">Projets du client</h4>
                <p className="text-gray-600">
                  Ce client a {selectedUser.projects} projet(s) en cours ou terminé(s).
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedUser);
                }}
                className="px-4 py-2 bg-[#0D6EFD] text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
              >
                <Edit size={16} className="mr-2" />
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && selectedUser && (
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
              <p className="text-gray-800 mb-2">
                Êtes-vous sûr de vouloir supprimer cet utilisateur ?
              </p>
              <p className="text-sm text-gray-600 font-medium">
                {selectedUser.name} ({selectedUser.email})
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Cette action est irréversible et supprimera toutes les données associées.
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
                onClick={handleDeleteUser}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Inviter un utilisateur</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSendInvitation} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  placeholder="email@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rôle
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                >
                  <option value="visitor">Visiteur</option>
                  <option value="client">Client</option>
                  <option value="media_contributor">Contributeur Média</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-sm text-blue-800">
                  Un email d'invitation sera envoyé à cette adresse avec les instructions pour créer un compte.
                </p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#20C997] text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <Send size={16} className="mr-2" />
                  Envoyer invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;