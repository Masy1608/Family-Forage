import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Plus,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

const QuotesDocuments: React.FC = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents = [
    {
      id: 1,
      name: "Devis forage puits - Antsirabe",
      type: "quote",
      date: "2024-12-01",
      status: "accepted",
      amount: "2,500,000 Ar",
      category: "Devis"
    },
    {
      id: 2,
      name: "Rapport géophysique complet",
      type: "report",
      date: "2024-12-15",
      status: "completed",
      category: "Rapports techniques"
    },
    {
      id: 3,
      name: "Plans installation pompe solaire",
      type: "plan",
      date: "2025-01-05",
      status: "completed",
      category: "Plans techniques"
    },
    {
      id: 4,
      name: "Certificat de conformité forage",
      type: "certificate",
      date: "2025-01-10",
      status: "completed",
      category: "Certificats"
    },
    {
      id: 5,
      name: "Devis maintenance annuelle",
      type: "quote",
      date: "2025-01-12",
      status: "pending",
      amount: "350,000 Ar",
      category: "Devis"
    },
    {
      id: 6,
      name: "Manuel d'utilisation pompe",
      type: "manual",
      date: "2025-01-15",
      status: "completed",
      category: "Documentation"
    }
  ];

  const categories = [
    { id: 'all', label: 'Tous les documents' },
    { id: 'Devis', label: 'Devis' },
    { id: 'Rapports techniques', label: 'Rapports techniques' },
    { id: 'Plans techniques', label: 'Plans techniques' },
    { id: 'Certificats', label: 'Certificats' },
    { id: 'Documentation', label: 'Documentation' }
  ];

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
      case 'completed':
        return <CheckCircle size={16} className="text-[#20C997]" />;
      case 'pending':
        return <Clock size={16} className="text-amber-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Accepté';
      case 'completed':
        return 'Disponible';
      case 'pending':
        return 'En attente';
      default:
        return '';
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'quote':
        return <DollarSign size={20} className="text-[#0D6EFD]" />;
      case 'report':
        return <FileText size={20} className="text-[#20C997]" />;
      case 'plan':
        return <FileText size={20} className="text-purple-500" />;
      case 'certificate':
        return <CheckCircle size={20} className="text-amber-500" />;
      case 'manual':
        return <FileText size={20} className="text-gray-600" />;
      default:
        return <FileText size={20} className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Devis & Documents
          </h1>
          <p className="text-gray-600">
            Accédez à tous vos devis, rapports et documents techniques
          </p>
        </div>
        
        <button
          onClick={() => setShowQuoteModal(true)}
          className="mt-4 sm:mt-0 bg-[#0D6EFD] hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Demander un devis
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
            <FileText size={24} className="text-[#0D6EFD]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Devis acceptés</p>
              <p className="text-2xl font-bold text-gray-800">
                {documents.filter(d => d.status === 'accepted').length}
              </p>
            </div>
            <CheckCircle size={24} className="text-[#20C997]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-gray-800">
                {documents.filter(d => d.status === 'pending').length}
              </p>
            </div>
            <Clock size={24} className="text-amber-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Téléchargements</p>
              <p className="text-2xl font-bold text-gray-800">24</p>
            </div>
            <Download size={24} className="text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#0D6EFD] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            {selectedCategory === 'all' ? 'Tous les documents' : selectedCategory}
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getDocumentIcon(doc.type)}
                  <div>
                    <h3 className="font-medium text-gray-800">{doc.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {doc.date}
                      </span>
                      <span className="text-sm text-gray-500">{doc.category}</span>
                      {doc.amount && (
                        <span className="text-sm font-medium text-[#0D6EFD]">
                          {doc.amount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(doc.status)}
                    <span className="text-sm text-gray-600">
                      {getStatusText(doc.status)}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-[#0D6EFD] hover:bg-blue-50 rounded-md transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Request Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Demander un devis</h3>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de service
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]">
                  <option>Forage de puits</option>
                  <option>Installation pompe solaire</option>
                  <option>Étude géophysique</option>
                  <option>Maintenance</option>
                  <option>Autre</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description du projet
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  placeholder="Décrivez votre projet en détail..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localisation
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  placeholder="Ville, région..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#0D6EFD] text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Envoyer la demande
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotesDocuments;