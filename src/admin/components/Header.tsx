import React, { useState } from 'react';
import { Menu, Bell, User, LogOut, Droplet, Settings, Moon, Sun, Search, MessageCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, sidebarOpen, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuthStore();

  const notifications = [
    { id: 1, title: 'Nouveau projet créé', message: 'Projet forage Antsirabe', time: '5 min', unread: true, type: 'project' },
    { id: 2, title: 'Document uploadé', message: 'Rapport géophysique', time: '1h', unread: true, type: 'document' },
    { id: 3, title: 'Utilisateur inscrit', message: 'Jean Rakoto', time: '2h', unread: false, type: 'user' },
    { id: 4, title: 'Devis approuvé', message: 'Devis #DEV-2025-001', time: '3h', unread: true, type: 'quote' },
    { id: 5, title: 'Maintenance programmée', message: 'Système de sauvegarde', time: '1j', unread: false, type: 'system' },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setShowUserMenu(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Recherche:', searchTerm);
      // Implémenter la logique de recherche
      setShowSearch(false);
      setSearchTerm('');
    }
  };

  const markAsRead = (notificationId: number) => {
    console.log('Marquer comme lu:', notificationId);
    // Implémenter la logique pour marquer comme lu
  };

  const markAllAsRead = () => {
    console.log('Marquer tout comme lu');
    // Implémenter la logique pour marquer tout comme lu
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'project':
        return '📁';
      case 'document':
        return '📄';
      case 'user':
        return '👤';
      case 'quote':
        return '💰';
      case 'system':
        return '⚙️';
      default:
        return '📢';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Logo and Menu */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center ml-2 lg:ml-0">
            <Droplet size={28} className="text-[#0D6EFD] mr-2" />
            <div>
              <span className="font-bold text-lg text-gray-800">FAMILY FORAGE</span>
              <span className="hidden sm:block text-xs text-gray-500">Administration</span>
            </div>
          </div>
        </div>

        {/* Center - Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher projets, clients, documents..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
              />
            </div>
          </form>
        </div>

        {/* Right side - Actions and User */}
        <div className="flex items-center space-x-3">
          {/* Mobile Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Search size={20} />
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            title={darkMode ? 'Mode clair' : 'Mode sombre'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Quick Contact */}
          <a
            href="https://wa.me/+261XXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            title="Contact WhatsApp"
          >
            <MessageCircle size={20} />
          </a>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
              title="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-[#0D6EFD] hover:text-blue-600"
                    >
                      Tout marquer comme lu
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                        notification.unread 
                          ? 'bg-blue-50 border-l-[#0D6EFD]' 
                          : 'border-l-transparent'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            notification.unread ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-[#0D6EFD] rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button className="text-sm text-[#0D6EFD] hover:text-blue-600 w-full text-center">
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <div className="flex items-center space-x-2 pl-3 border-l border-gray-200">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 bg-[#0D6EFD] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <User size={16} className="text-white" />
              </button>
            </div>

            {/* User dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    // Naviguer vers les paramètres
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings size={16} className="mr-2" />
                  Paramètres
                </button>
                
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    // Ouvrir modal de profil
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={16} className="mr-2" />
                  Mon profil
                </button>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} className="mr-2" />
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                autoFocus
              />
            </div>
          </form>
        </div>
      )}

      {/* Overlays to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;