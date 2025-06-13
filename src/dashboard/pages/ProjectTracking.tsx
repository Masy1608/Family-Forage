import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Calendar,
  MapPin,
  User,
  FileText
} from 'lucide-react';

const ProjectTracking: React.FC = () => {
  const projectInfo = {
    name: "Forage et installation solaire - Antsirabe",
    location: "Antsirabe, Vakinankaratra",
    startDate: "2024-12-01",
    estimatedEnd: "2025-01-30",
    projectManager: "Ing. Ratsimba Michel",
    type: "Forage + Pompe solaire"
  };

  const projectSteps = [
    {
      id: 1,
      title: "Étude préliminaire",
      description: "Analyse du site et étude de faisabilité",
      status: "completed",
      startDate: "2024-12-01",
      endDate: "2024-12-10",
      details: [
        "Visite du site effectuée",
        "Analyse géologique terminée",
        "Rapport d'étude validé"
      ]
    },
    {
      id: 2,
      title: "Étude géophysique",
      description: "Localisation précise des ressources en eau",
      status: "completed",
      startDate: "2024-12-11",
      endDate: "2024-12-20",
      details: [
        "Mesures résistives effectuées",
        "Cartographie du sous-sol",
        "Point de forage déterminé"
      ]
    },
    {
      id: 3,
      title: "Forage du puits",
      description: "Réalisation du forage jusqu'à la nappe phréatique",
      status: "completed",
      startDate: "2024-12-21",
      endDate: "2025-01-10",
      details: [
        "Forage à 45m de profondeur",
        "Débit testé : 2.5 m³/h",
        "Tubage et crépinage installés"
      ]
    },
    {
      id: 4,
      title: "Installation pompe solaire",
      description: "Mise en place du système de pompage solaire",
      status: "in-progress",
      startDate: "2025-01-11",
      endDate: "2025-01-20",
      details: [
        "Panneaux solaires installés (80%)",
        "Pompe immergée en cours d'installation",
        "Câblage électrique en cours"
      ]
    },
    {
      id: 5,
      title: "Tests et mise en service",
      description: "Vérification du système et formation",
      status: "pending",
      startDate: "2025-01-21",
      endDate: "2025-01-25",
      details: [
        "Tests de performance à effectuer",
        "Formation utilisateur prévue",
        "Documentation finale"
      ]
    },
    {
      id: 6,
      title: "Livraison finale",
      description: "Réception définitive du projet",
      status: "pending",
      startDate: "2025-01-26",
      endDate: "2025-01-30",
      details: [
        "Procès-verbal de réception",
        "Garantie activée",
        "Manuel d'utilisation remis"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={24} className="text-[#20C997]" />;
      case 'in-progress':
        return <Clock size={24} className="text-[#0D6EFD]" />;
      case 'pending':
        return <AlertCircle size={24} className="text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
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
      {/* Page Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
          Suivi de projet
        </h1>
        
        {/* Project Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <FileText size={20} className="text-[#0D6EFD]" />
            <div>
              <p className="text-sm text-gray-600">Projet</p>
              <p className="font-medium text-gray-800">{projectInfo.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MapPin size={20} className="text-[#20C997]" />
            <div>
              <p className="text-sm text-gray-600">Localisation</p>
              <p className="font-medium text-gray-800">{projectInfo.location}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <User size={20} className="text-amber-500" />
            <div>
              <p className="text-sm text-gray-600">Chef de projet</p>
              <p className="font-medium text-gray-800">{projectInfo.projectManager}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar size={20} className="text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Début</p>
              <p className="font-medium text-gray-800">{projectInfo.startDate}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar size={20} className="text-red-500" />
            <div>
              <p className="text-sm text-gray-600">Fin prévue</p>
              <p className="font-medium text-gray-800">{projectInfo.estimatedEnd}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <CheckCircle size={20} className="text-[#0D6EFD]" />
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-medium text-gray-800">{projectInfo.type}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Étapes du projet</h2>
        
        <div className="space-y-6">
          {projectSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Timeline line */}
              {index < projectSteps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
              )}
              
              <div className="flex space-x-4">
                {/* Status icon */}
                <div className="flex-shrink-0">
                  {getStatusIcon(step.status)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {step.title}
                    </h3>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(step.status)}`}>
                      {getStatusText(step.status)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-500 mb-3">
                    <span>Début: {step.startDate}</span>
                    <span>Fin: {step.endDate}</span>
                  </div>
                  
                  {/* Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Détails:</h4>
                    <ul className="space-y-1">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            step.status === 'completed' ? 'bg-[#20C997]' :
                            step.status === 'in-progress' ? 'bg-[#0D6EFD]' :
                            'bg-gray-400'
                          }`}></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
          <div className="text-3xl font-bold text-[#20C997] mb-2">3</div>
          <div className="text-sm text-gray-600">Étapes terminées</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
          <div className="text-3xl font-bold text-[#0D6EFD] mb-2">1</div>
          <div className="text-sm text-gray-600">Étape en cours</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
          <div className="text-3xl font-bold text-gray-400 mb-2">2</div>
          <div className="text-sm text-gray-600">Étapes restantes</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTracking;