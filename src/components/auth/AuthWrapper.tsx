import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterMessage from './RegisterMessage';

interface AuthWrapperProps {
  onLogin: (credentials: { email: string; password: string }) => void;
  onBack: () => void;
  isLoading?: boolean;
  error?: string;
}

type AuthView = 'login' | 'register';

const AuthWrapper: React.FC<AuthWrapperProps> = ({ onLogin, onBack, isLoading, error }) => {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const handleShowRegister = () => {
    setCurrentView('register');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  const handleBack = () => {
    if (currentView === 'register') {
      setCurrentView('login');
    } else {
      onBack();
    }
  };

  switch (currentView) {
    case 'login':
      return (
        <LoginForm
          onLogin={onLogin}
          onBack={onBack}
          onShowRegister={handleShowRegister}
          isLoading={isLoading}
          error={error}
        />
      );
    case 'register':
      return (
        <RegisterMessage
          onBack={handleBack}
          onBackToLogin={handleBackToLogin}
        />
      );
    default:
      return null;
  }
};

export default AuthWrapper;