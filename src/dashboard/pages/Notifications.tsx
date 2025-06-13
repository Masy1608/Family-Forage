import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Calendar, Trash2, BookMarked as MarkAsRead, Filter } from 'lucide-react';

type NotificationType = 'info' | 'success' | 'warning' | 'update';
type NotificationFilter = 'all' | 'unread' | 'read';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<NotificationFilter>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'update',
      title: 'Progression du forage',
      message: 'Le forage a atteint 35m de profondeur. Nappe phréatique détectée.',
      date: '2025-01-15',
      time: '14:30',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Installation terminée',
      message: 'Les panneaux solaires ont été installés avec succès. Tests en cours.',
      date: '2025-01-14',
      time: '16:45',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Nouveau document disponible',
      message: 'Le rapport géophysique complet est maintenant disponible en téléchargement.',
      date: '2025-01-13',
      time: '09:15',
      read: false
    },
    {
      id: 4,
      type: 'warning',
      title: 'Météo défavorable',
      message: 'Les travaux sont suspendus temporairement en raison des conditions météorologiques.',
      date: '2025-01-12',
      time: '08:00',
      read: true
    },
    {
      id: 5,
      type: 'update',
      title: 'Début des travaux',
      message: 'L\'équipe de forage est arrivée sur site. Début des opérations prévu demain.',
      date: '2025-01-10',
      time: '17:20',
      read: true
    },
    {
      id: 6,
      type: 'info',
      title: 'Devis approuvé',
      message: 'Votre devis pour l\'installation solaire a été approuvé. Planification en cours.',
      date: '2025-01-08',
      time: '11:30',
      read: true
    },
    {
      id: 7,
      type: 'success',
      title: 'Étude géophysique terminée',
      message: 'L\'étude géophysique est terminée. Point de forage optimal identifié.',
      date: '2025-01-05',
      time: '15:45',
      read: true
    }
  ]);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-[#20C997]" />;
      case 'warning':
        return <AlertCircle size={20} className="text-amber-500" />;
      case 'info':
        return <Info size={20} className="text-[#0D6EFD]" />;
      case 'update':
        return <Bell size={20} className="text-purple-500" />;
      default:
        return <Info size={20} className="text-gray-500" />;
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'border-l-[#20C997] bg-green-50';
      case 'warning':
        return 'border-l-amber-500 bg-amber-50';
      case 'info':
        return 'border-l-[#0D6EFD] bg-blue-50';
      case 'update':
        return 'border-l-purple-500 bg-purple-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread':
        return !notif.read;
      case 'read':
        return notif.read;
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Notifications
          </h1>
          <p className="text-gray-600">
            Restez informé de l'avancement de votre projet
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button
            onClick={markAllAsRead}
            className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <CheckCircle size={18} className="mr-2" />
            Tout marquer comme lu
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-800">{notifications.length}</p>
            </div>
            <Bell size={24} className="text-[#0D6EFD]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Non lues</p>
              <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
            </div>
            <AlertCircle size={24} className="text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mises à jour</p>
              <p className="text-2xl font-bold text-gray-800">
                {notifications.filter(n => n.type === 'update').length}
              </p>
            </div>
            <Info size={24} className="text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Succès</p>
              <p className="text-2xl font-bold text-gray-800">
                {notifications.filter(n => n.type === 'success').length}
              </p>
            </div>
            <CheckCircle size={24} className="text-[#20C997]" />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Filter size={20} className="text-gray-600" />
            <span className="font-medium text-gray-800">Filtrer:</span>
            <div className="flex space-x-2">
              {[
                { id: 'all', label: 'Toutes' },
                { id: 'unread', label: 'Non lues' },
                { id: 'read', label: 'Lues' }
              ].map((filterOption) => (
                <button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id as NotificationFilter)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filter === filterOption.id
                      ? 'bg-[#0D6EFD] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>
          
          <span className="text-sm text-gray-500">
            {filteredNotifications.length} notification(s)
          </span>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-200 text-center">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Aucune notification
            </h3>
            <p className="text-gray-600">
              {filter === 'unread' ? 'Toutes vos notifications ont été lues.' : 'Vous n\'avez aucune notification pour le moment.'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm border-l-4 ${getNotificationColor(notification.type)} ${
                !notification.read ? 'border-r-4 border-r-[#0D6EFD]' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-[#0D6EFD] rounded-full"></span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {notification.date} à {notification.time}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-[#0D6EFD] hover:bg-blue-50 rounded-md transition-colors"
                        title="Marquer comme lu"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;