import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Send,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  X,
  DollarSign,
  Calendar,
  User
} from 'lucide-react';

interface Quote {
  id: string;
  number: string;
  client: string;
  clientId: string;
  title: string;
  description: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
  sentAt?: string;
  validUntil: string;
  items: QuoteItem[];
  notes?: string;
}

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const QuoteManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showQuoteDetails, setShowQuoteDetails] = useState(false);

  const [quotes] = useState<Quote[]>([
    {
      id: '1',
      number: 'DEV-2025-001',
      client: 'Jean Rakoto',
      clientId: '1',
      title: 'Forage et installation solaire - Antsirabe',
      description: 'Forage de puits avec installation de pompe solaire',
      amount: 2500000,
      status: 'accepted',
      createdAt: '2024-12-01T00:00:00Z',
      sentAt: '2024-12-02T00:00:00Z',
      validUntil: '2025-01-01T00:00:00Z',
      items: [
        { id: '1', description: 'Forage puits 50m', quantity: 1, unitPrice: 1500000, total: 1500000 },
        { id: '2', description: 'Installation pompe solaire', quantity: 1, unitPrice: 800000, total: 800000 },
        { id: '3', description: 'Matériaux et accessoires', quantity: 1, unitPrice: 200000, total: 200000 }
      ],
      notes: 'Devis incluant garantie 2 ans'
    },
    {
      id: '2',
      number: 'DEV-2025-002',
      client: 'Marie Ratsimba',
      clientId: '2',
      title: 'Installation pompe solaire - Itasy',
      description: 'Installation système de pompage solaire',
      amount: 1800000,
      status: 'sent',
      createdAt: '2025-01-05T00:00:00Z',
      sentAt: '2025-01-06T00:00:00Z',
      validUntil: '2025-02-05T00:00:00Z',
      items: [
        { id: '1', description: 'Pompe solaire immergée', quantity: 1, unitPrice: 1200000, total: 1200000 },
        { id: '2', description: 'Panneaux solaires 500W', quantity: 4, unitPrice: 150000, total: 600000 }
      ]
    },
    {
      id: '3',
      number: 'DEV-2025-003',
      client: 'Paul Andry',
      clientId: '3',
      title: 'Étude géophysique - Toamasina',
      description: 'Étude géophysique pour localisation de forage',
      amount: 800000,
      status: 'draft',
      createdAt: '2025-01-10T00:00:00Z',
      validUntil: '2025-02-10T00:00:00Z',
      items: [
        { id: '1', description: 'Étude géophysique complète', quantity: 1, unitPrice: 600000, total: 600000 },
        { id: '2', description: 'Rapport détaillé', quantity: 1, unitPrice: 200000, total: 200000 }
      ]
    },
    {
      id: '4',
      number: 'DEV-2025-004',
      client: 'Sophie Hery',
      clientId: '4',
      title: 'Maintenance système - Vakinankaratra',
      description: 'Maintenance préventive annuelle',
      amount: 350000,
      status: 'rejected',
      createdAt: '2024-12-20T00:00:00Z',
      sentAt: '2024-12-21T00:00:00Z',
      validUntil: '2025-01-20T00:00:00Z',
      items: [
        { id: '1', description: 'Maintenance préventive', quantity: 1, unitPrice: 250000, total: 250000 },
        { id: '2', description: 'Pièces de rechange', quantity: 1, unitPrice: 100000, total: 100000 }
      ]
    }
  ]);

  const statusLabels = {
    draft: 'Brouillon',
    sent: 'Envoyé',
    accepted: 'Accepté',
    rejected: 'Rejeté',
    expired: 'Expiré'
  };

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-[#0D6EFD] bg-opacity-10 text-[#0D6EFD]',
    accepted: 'bg-[#20C997] bg-opacity-10 text-[#20C997]',
    rejected: 'bg-red-100 text-red-800',
    expired: 'bg-amber-100 text-amber-800'
  };

  const statusIcons = {
    draft: <Edit size={16} className="text-gray-600" />,
    sent: <Send size={16} className="text-[#0D6EFD]" />,
    accepted: <CheckCircle size={16} className="text-[#20C997]" />,
    rejected: <X size={16} className="text-red-600" />,
    expired: <Clock size={16} className="text-amber-600" />
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' Ar';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleSendQuote = (id: string) => {
    console.log('Sending quote:', id);
  };

  const handleDownloadPDF = (id: string) => {
    console.log('Downloading PDF for quote:', id);
  };

  const handleDeleteQuote = (id: string) => {
    console.log('Deleting quote:', id);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Gestion des devis
          </h1>
          <p className="text-gray-600">
            Créez, gérez et suivez vos devis clients
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 bg-[#0D6EFD] hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Nouveau devis
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total devis</p>
              <p className="text-2xl font-bold text-gray-800">{quotes.length}</p>
            </div>
            <FileText size={24} className="text-[#0D6EFD]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Acceptés</p>
              <p className="text-2xl font-bold text-[#20C997]">
                {quotes.filter(q => q.status === 'accepted').length}
              </p>
            </div>
            <CheckCircle size={24} className="text-[#20C997]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-[#0D6EFD]">
                {quotes.filter(q => q.status === 'sent').length}
              </p>
            </div>
            <Clock size={24} className="text-[#0D6EFD]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Montant total</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(quotes.filter(q => q.status === 'accepted').reduce((total, q) => total + q.amount, 0))}
              </p>
            </div>
            <DollarSign size={24} className="text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par numéro, client ou titre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
            >
              <option value="all">Tous les statuts</option>
              <option value="draft">Brouillon</option>
              <option value="sent">Envoyé</option>
              <option value="accepted">Accepté</option>
              <option value="rejected">Rejeté</option>
              <option value="expired">Expiré</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Devis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
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
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{quote.number}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{quote.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User size={16} className="mr-2 text-gray-400" />
                      <span className="text-sm text-gray-900">{quote.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(quote.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[quote.status]}`}>
                      {statusIcons[quote.status]}
                      <span className="ml-1">{statusLabels[quote.status]}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        Créé: {formatDate(quote.createdAt)}
                      </div>
                      {quote.sentAt && (
                        <div className="flex items-center mt-1">
                          <Send size={14} className="mr-1" />
                          Envoyé: {formatDate(quote.sentAt)}
                        </div>
                      )}
                      <div className="flex items-center mt-1">
                        <Clock size={14} className="mr-1" />
                        Expire: {formatDate(quote.validUntil)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedQuote(quote);
                          setShowQuoteDetails(true);
                        }}
                        className="text-[#0D6EFD] hover:text-blue-600"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(quote.id)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <Download size={16} />
                      </button>
                      {quote.status === 'draft' && (
                        <button
                          onClick={() => handleSendQuote(quote.id)}
                          className="text-[#20C997] hover:text-green-600"
                        >
                          <Send size={16} />
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteQuote(quote.id)}
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

      {/* Add Quote Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Nouveau devis</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de validité
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du devis
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  placeholder="Titre du devis"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  placeholder="Description du projet"
                ></textarea>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                
                  <h4 className="text-lg font-medium">Articles du devis</h4>
                  <button
                    type="button"
                    className="bg-[#20C997] text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
                  >
                    + Ajouter article
                  </button>
                </div>
                
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Qté</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Prix unitaire</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Description de l'article"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="1"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="0"
                          />
                        </td>
                        <td className="px-4 py-2 text-sm">0 Ar</td>
                        <td className="px-4 py-2">
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 text-right">
                  <div className="text-lg font-semibold">
                    Total: 0 Ar
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (optionnel)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  placeholder="Notes additionnelles"
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
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Sauvegarder brouillon
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0D6EFD] text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Créer et envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quote Details Modal */}
      {showQuoteDetails && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Détails du devis</h3>
              <button
                onClick={() => setShowQuoteDetails(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Informations générales</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Numéro:</span> {selectedQuote.number}</p>
                  <p><span className="font-medium">Client:</span> {selectedQuote.client}</p>
                  <p><span className="font-medium">Titre:</span> {selectedQuote.title}</p>
                  <p><span className="font-medium">Montant:</span> {formatCurrency(selectedQuote.amount)}</p>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Statut:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedQuote.status]}`}>
                      {statusIcons[selectedQuote.status]}
                      <span className="ml-1">{statusLabels[selectedQuote.status]}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Dates</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Créé le:</span> {formatDate(selectedQuote.createdAt)}</p>
                  {selectedQuote.sentAt && (
                    <p><span className="font-medium">Envoyé le:</span> {formatDate(selectedQuote.sentAt)}</p>
                  )}
                  <p><span className="font-medium">Valide jusqu'au:</span> {formatDate(selectedQuote.validUntil)}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Description</h4>
              <p className="text-gray-600">{selectedQuote.description}</p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Articles</h4>
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantité</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Prix unitaire</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedQuote.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 text-sm">{item.description}</td>
                        <td className="px-4 py-2 text-sm">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm">{formatCurrency(item.unitPrice)}</td>
                        <td className="px-4 py-2 text-sm font-medium">{formatCurrency(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-right">Total:</td>
                      <td className="px-4 py-2 text-sm font-bold">{formatCurrency(selectedQuote.amount)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            {selectedQuote.notes && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Notes</h4>
                <p className="text-gray-600">{selectedQuote.notes}</p>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownloadPDF(selectedQuote.id)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  Télécharger PDF
                </button>
              </div>
              
              {selectedQuote.status === 'draft' && (
                <button
                  onClick={() => handleSendQuote(selectedQuote.id)}
                  className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  <Send size={16} className="mr-2" />
                  Envoyer au client
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteManagement;