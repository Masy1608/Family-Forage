import React from 'react';
import { 
  Users, 
  FolderOpen, 
  Camera, 
  FileText,
  TrendingUp,
  Activity,
  DollarSign,
  Eye
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { 
      title: 'Utilisateurs actifs', 
      value: '156', 
      change: '+12%', 
      icon: Users, 
      color: 'text-[#0D6EFD]',
      bgColor: 'bg-blue-50'
    },
    { 
      title: 'Projets en cours', 
      value: '23', 
      change: '+5%', 
      icon: FolderOpen, 
      color: 'text-[#20C997]',
      bgColor: 'bg-green-50'
    },
    { 
      title: 'Médias uploadés', 
      value: '1,247', 
      change: '+18%', 
      icon: Camera, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      title: 'Devis générés', 
      value: '89', 
      change: '+8%', 
      icon: FileText, 
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
  ];

  const recentActivities = [
    { id: 1, user: 'Jean Rakoto', action: 'a créé un nouveau projet', time: '5 min', type: 'project' },
    { id: 2, user: 'Marie Ratsimba', action: 'a uploadé 5 photos', time: '12 min', type: 'media' },
    { id: 3, user: 'Paul Andry', action: 'a demandé un devis', time: '1h', type: 'quote' },
    { id: 4, user: 'Admin', action: 'a validé un document', time: '2h', type: 'document' },
    { id: 5, user: 'Sophie Hery', action: 's\'est inscrite', time: '3h', type: 'user' },
  ];

  const projectsOverview = [
    { name: 'Forage Antsirabe', client: 'Jean Rakoto', progress: 75, status: 'En cours' },
    { name: 'Pompe solaire Itasy', client: 'Marie Ratsimba', progress: 45, status: 'En cours' },
    { name: 'Étude géophysique Toamasina', client: 'Paul Andry', progress: 90, status: 'Presque terminé' },
    { name: 'Installation Vakinankaratra', client: 'Sophie Hery', progress: 20, status: 'Démarré' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project': return <FolderOpen size={16} className="text-[#0D6EFD]" />;
      case 'media': return <Camera size={16} className="text-purple-600" />;
      case 'quote': return <FileText size={16} className="text-amber-600" />;
      case 'document': return <FileText size={16} className="text-[#20C997]" />;
      case 'user': return <Users size={16} className="text-gray-600" />;
      default: return <Activity size={16} className="text-gray-600" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-[#20C997]';
    if (progress >= 50) return 'bg-[#0D6EFD]';
    if (progress >= 25) return 'bg-amber-500';
    return 'bg-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#0D6EFD] to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          Tableau de bord administrateur
        </h1>
        <p className="text-blue-100">
          Gérez efficacement votre plateforme FAMILY FORAGE
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-[#20C997] font-medium">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Activity size={20} className="mr-2 text-[#0D6EFD]" />
              Activités récentes
            </h2>
            <button className="text-sm text-[#0D6EFD] hover:text-blue-600">
              Voir tout
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                {getActivityIcon(activity.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Overview */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <FolderOpen size={20} className="mr-2 text-[#20C997]" />
              Projets en cours
            </h2>
            <button className="text-sm text-[#0D6EFD] hover:text-blue-600">
              Gérer
            </button>
          </div>
          
          <div className="space-y-4">
            {projectsOverview.map((project, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-800">{project.name}</h3>
                    <p className="text-sm text-gray-600">Client: {project.client}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {project.status}
                  </span>
                </div>
                
                <div className="mt-3">
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-[#0D6EFD] text-white rounded-lg hover:bg-blue-600 transition-colors text-center">
            <Users size={24} className="mx-auto mb-2" />
            <span className="text-sm font-medium">Ajouter utilisateur</span>
          </button>
          
          <button className="p-4 bg-[#20C997] text-white rounded-lg hover:bg-green-600 transition-colors text-center">
            <FolderOpen size={24} className="mx-auto mb-2" />
            <span className="text-sm font-medium">Nouveau projet</span>
          </button>
          
          <button className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-center">
            <Camera size={24} className="mx-auto mb-2" />
            <span className="text-sm font-medium">Gérer médias</span>
          </button>
          
          <button className="p-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-center">
            <FileText size={24} className="mx-auto mb-2" />
            <span className="text-sm font-medium">Créer devis</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
          <TrendingUp size={32} className="mx-auto text-[#0D6EFD] mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Croissance mensuelle</h3>
          <p className="text-3xl font-bold text-[#20C997]">+24%</p>
          <p className="text-sm text-gray-600">Nouveaux utilisateurs</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
          <DollarSign size={32} className="mx-auto text-[#20C997] mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Revenus ce mois</h3>
          <p className="text-3xl font-bold text-[#0D6EFD]">45M Ar</p>
          <p className="text-sm text-gray-600">Devis acceptés</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
          <Eye size={32} className="mx-auto text-purple-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Visites du site</h3>
          <p className="text-3xl font-bold text-purple-600">2,847</p>
          <p className="text-sm text-gray-600">Cette semaine</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;