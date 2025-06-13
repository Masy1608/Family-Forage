import React from 'react';
import { 
  Calendar, 
  FileText, 
  TrendingUp, 
  Download,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const projectProgress = 75; // Mock progress percentage
  
  const recentDocuments = [
    { id: 1, name: 'Rapport géophysique - Site Antsirabe', date: '2025-01-10', type: 'PDF' },
    { id: 2, name: 'Devis installation solaire', date: '2025-01-08', type: 'PDF' },
    { id: 3, name: 'Photos progression forage', date: '2025-01-05', type: 'Images' },
  ];

  const projectTimeline = [
    { phase: 'Étude géophysique', status: 'completed', date: '2024-12-15' },
    { phase: 'Forage du puits', status: 'completed', date: '2025-01-05' },
    { phase: 'Installation pompe', status: 'in-progress', date: '2025-01-15' },
    { phase: 'Tests & livraison', status: 'pending', date: '2025-01-25' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="text-[#20C997]" />;
      case 'in-progress':
        return <Clock size={20} className="text-[#0D6EFD]" />;
      case 'pending':
        return <AlertCircle size={20} className="text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'in-progress':
        return 'En cours';
      case 'pending':
        return 'En attente';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#0D6EFD] to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          Bienvenue, Jean Rakoto ! 👋
        </h1>
        <p className="text-blue-100">
          Suivez l'avancement de votre projet de forage et accédez à tous vos documents.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Projet en cours</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
            <TrendingUp size={24} className="text-[#0D6EFD]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <FileText size={24} className="text-[#20C997]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Progression</p>
              <p className="text-2xl font-bold text-gray-800">{projectProgress}%</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-[#0D6EFD] border-t-transparent animate-spin-slow"></div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Prochaine étape</p>
              <p className="text-sm font-medium text-gray-800">15 Jan 2025</p>
            </div>
            <Calendar size={24} className="text-amber-500" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Progress */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-[#0D6EFD]" />
            Suivi du projet
          </h2>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progression globale</span>
              <span>{projectProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-[#0D6EFD] to-[#20C997] h-3 rounded-full transition-all duration-500"
                style={{ width: `${projectProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {projectTimeline.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                {getStatusIcon(item.status)}
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.phase}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.status === 'completed' ? 'bg-green-100 text-green-800' :
                  item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {getStatusText(item.status)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Documents */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText size={20} className="mr-2 text-[#20C997]" />
            Documents récents
          </h2>
          
          <div className="space-y-3">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{doc.name}</p>
                  <p className="text-xs text-gray-500">{doc.date} • {doc.type}</p>
                </div>
                <button className="p-2 text-[#0D6EFD] hover:bg-blue-50 rounded-md transition-colors">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-2 text-[#0D6EFD] border border-[#0D6EFD] rounded-md hover:bg-blue-50 transition-colors">
            Voir tous les documents
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-[#0D6EFD] text-white rounded-lg hover:bg-blue-600 transition-colors">
            <FileText size={20} className="mx-auto mb-2" />
            <span className="text-sm">Demander un devis</span>
          </button>
          
          <button className="p-4 bg-[#20C997] text-white rounded-lg hover:bg-green-600 transition-colors">
            <TrendingUp size={20} className="mx-auto mb-2" />
            <span className="text-sm">Voir le suivi</span>
          </button>
          
          <button className="p-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
            <Download size={20} className="mx-auto mb-2" />
            <span className="text-sm">Télécharger plans</span>
          </button>
          
          <button className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            <Calendar size={20} className="mx-auto mb-2" />
            <span className="text-sm">Planifier visite</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;