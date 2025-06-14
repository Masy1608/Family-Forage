import React, { useState } from 'react';
import { Menu, Bell, User, LogOut, Droplet } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, sidebarOpen, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const clientName = "Jean Rakoto"; // Mock client name

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setShowUserMenu(false);
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
            <span className="font-bold text-lg text-gray-800">FAMILY FORAGE</span>
            <span className="hidden sm:inline ml-2 text-sm text-gray-500">| Espace Client</span>
          </div>
        </div>

        {/* Right side - User info and actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User menu */}
          <div className="relative">
            <div className="flex items-center space-x-2 pl-3 border-l border-gray-200">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-800">{clientName}</p>
                <p className="text-xs text-gray-500">Client Premium</p>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-8 h-8 bg-[#0D6EFD] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <User size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* User dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{clientName}</p>
                  <p className="text-xs text-gray-500">demo@familyforage.mg</p>
                </div>
                
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

      {/* Overlay to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;