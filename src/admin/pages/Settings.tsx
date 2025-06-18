import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database,
  Mail,
  Smartphone,
  Globe,
  Save,
  Eye,
  EyeOff,
  Key
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'FAMILY FORAGE',
    siteDescription: 'Solutions hydrauliques durables à Madagascar',
    contactEmail: 'contact@familyforage.mg',
    contactPhone: '+261 XX XXX XX XX',
    address: 'Lot XXX, Antananarivo, Madagascar',
    timezone: 'Indian/Antananarivo'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newUserRegistration: true,
    projectUpdates: true,
    mediaUploads: true,
    quoteRequests: true,
    systemAlerts: true,
    weeklyReports: true,
    monthlyReports: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    requireStrongPasswords: true,
    allowMultipleSessions: false
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: 'noreply@familyforage.mg',
    smtpPassword: '',
    fromName: 'FAMILY FORAGE',
    fromEmail: 'noreply@familyforage.mg'
  });

  const tabs = [
    { id: 'general', label: 'Général', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'backup', label: 'Sauvegarde', icon: Database }
  ];

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving general settings:', generalSettings);
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving notification settings:', notificationSettings);
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving security settings:', securitySettings);
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving email settings:', emailSettings);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          Paramètres système
        </h1>
        <p className="text-gray-600">
          Configurez les paramètres globaux de l'application
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#0D6EFD] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} className="mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Paramètres généraux</h2>
              
              <form onSubmit={handleSaveGeneral} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du site
                    </label>
                    <input
                      type="text"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuseau horaire
                    </label>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    >
                      <option value="Indian/Antananarivo">Madagascar (UTC+3)</option>
                      <option value="Europe/Paris">Paris (UTC+1)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description du site
                  </label>
                  <textarea
                    rows={3}
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de contact
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        value={generalSettings.contactEmail}
                        onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone de contact
                    </label>
                    <div className="relative">
                      <Smartphone size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="tel"
                        value={generalSettings.contactPhone}
                        onChange={(e) => setGeneralSettings({...generalSettings, contactPhone: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={generalSettings.address}
                    onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center transition-colors"
                  >
                    <Save size={18} className="mr-2" />
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Paramètres de notification</h2>
              
              <form onSubmit={handleSaveNotifications} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">Canaux de notification</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          emailNotifications: e.target.checked
                        })}
                        className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                      />
                      <span className="ml-3 text-gray-700">Notifications par email</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.smsNotifications}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          smsNotifications: e.target.checked
                        })}
                        className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                      />
                      <span className="ml-3 text-gray-700">Notifications par SMS</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          pushNotifications: e.target.checked
                        })}
                        className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                      />
                      <span className="ml-3 text-gray-700">Notifications push</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">Types de notifications</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.newUserRegistration}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          newUserRegistration: e.target.checked
                        })}
                        className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                      />
                      <span className="ml-3 text-gray-700">Nouveaux utilisateurs</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.projectUpdates}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          projectUpdates: e.target.checked
                        })}
                        className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                      />
                      <span className="ml-3 text-gray-700">Mises à jour projets</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.mediaUploads}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          mediaUploads: e.target.checked
                        })}
                        className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                      />
                      <span className="ml-3 text-gray-700">Uploads de médias</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.quoteRequests}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          quoteRequests: e.target.checked
                        })}
                        className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                      />
                      <span className="ml-3 text-gray-700">Demandes de devis</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.systemAlerts}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          systemAlerts: e.target.checked
                        })}
                        className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                      />
                      <span className="ml-3 text-gray-700">Alertes système</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyReports}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          weeklyReports: e.target.checked
                        })}
                        className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                      />
                      <span className="ml-3 text-gray-700">Rapports hebdomadaires</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center transition-colors"
                  >
                    <Save size={18} className="mr-2" />
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Paramètres de sécurité</h2>
              
              <form onSubmit={handleSaveSecurity} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">Authentification</h3>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: e.target.checked
                      })}
                      className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                    />
                    <span className="ml-3 text-gray-700">Authentification à deux facteurs</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={securitySettings.requireStrongPasswords}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        requireStrongPasswords: e.target.checked
                      })}
                      className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                    />
                    <span className="ml-3 text-gray-700">Exiger des mots de passe forts</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={securitySettings.allowMultipleSessions}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        allowMultipleSessions: e.target.checked
                      })}
                      className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                    />
                    <span className="ml-3 text-gray-700">Autoriser plusieurs sessions</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeout de session (minutes)
                    </label>
                    <input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: parseInt(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiration mot de passe (jours)
                    </label>
                    <input
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        passwordExpiry: parseInt(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tentatives de connexion max
                    </label>
                    <input
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        maxLoginAttempts: parseInt(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center transition-colors"
                  >
                    <Save size={18} className="mr-2" />
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Configuration email</h2>
              
              <form onSubmit={handleSaveEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serveur SMTP
                    </label>
                    <input
                      type="text"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Port SMTP
                    </label>
                    <input
                      type="number"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPort: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom d'utilisateur SMTP
                    </label>
                    <input
                      type="email"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe SMTP
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={emailSettings.smtpPassword}
                        onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'expéditeur
                    </label>
                    <input
                      type="text"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de l'expéditeur
                    </label>
                    <input
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Tester la configuration
                  </button>
                  
                  <button
                    type="submit"
                    className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center transition-colors"
                  >
                    <Save size={18} className="mr-2" />
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Backup Settings */}
          {activeTab === 'backup' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Sauvegarde et restauration</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-800 mb-2">Sauvegarde automatique</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Les sauvegardes automatiques sont effectuées quotidiennement à 2h00.
                  </p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="auto-backup"
                      className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                      defaultChecked
                    />
                    <label htmlFor="auto-backup" className="ml-2 text-sm text-blue-700">
                      Activer la sauvegarde automatique
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-800">Actions de sauvegarde</h3>
                    
                    <button className="w-full bg-[#0D6EFD] hover:bg-blue-600 text-white px-4 py-3 rounded-md flex items-center justify-center transition-colors">
                      <Database size={18} className="mr-2" />
                      Créer une sauvegarde maintenant
                    </button>
                    
                    <button className="w-full bg-[#20C997] hover:bg-green-600 text-white px-4 py-3 rounded-md flex items-center justify-center transition-colors">
                      <Database size={18} className="mr-2" />
                      Télécharger la dernière sauvegarde
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-800">Restauration</h3>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Database size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Glissez-déposez un fichier de sauvegarde
                      </p>
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700">
                        Sélectionner fichier
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Historique des sauvegardes</h3>
                  <div className="border border-gray-300 rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Taille</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Type</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm">15/01/2025 02:00</td>
                          <td className="px-4 py-2 text-sm">45.2 MB</td>
                          <td className="px-4 py-2 text-sm">Automatique</td>
                          <td className="px-4 py-2 text-sm">
                            <button className="text-[#0D6EFD] hover:text-blue-600 mr-2">
                              Télécharger
                            </button>
                            <button className="text-[#20C997] hover:text-green-600">
                              Restaurer
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">14/01/2025 02:00</td>
                          <td className="px-4 py-2 text-sm">44.8 MB</td>
                          <td className="px-4 py-2 text-sm">Automatique</td>
                          <td className="px-4 py-2 text-sm">
                            <button className="text-[#0D6EFD] hover:text-blue-600 mr-2">
                              Télécharger
                            </button>
                            <button className="text-[#20C997] hover:text-green-600">
                              Restaurer
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;