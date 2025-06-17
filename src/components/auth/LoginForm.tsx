import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, UserPlus } from 'lucide-react';

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string }) => void;
  onBack: () => void;
  onShowRegister: () => void;
  isLoading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onLogin, 
  onBack, 
  onShowRegister, 
  isLoading = false, 
  error 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{email?: string; password?: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const errors: {email?: string; password?: string} = {};
    
    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'L\'email n\'est pas valide';
    }
    
    if (!formData.password.trim()) {
      errors.password = 'Le mot de passe est requis';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="absolute top-4 left-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-[#0D6EFD] rounded-full flex items-center justify-center">
              <Lock size={24} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Connexion Espace Client
          </h1>
          <p className="text-gray-600">
            Accédez à votre tableau de bord personnalisé
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="votre@email.com"
                disabled={isLoading}
              />
            </div>
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] ${
                  formErrors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Votre mot de passe"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-[#0D6EFD] border-gray-300 rounded focus:ring-[#0D6EFD]"
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
            </label>
            
            <button
              type="button"
              className="text-sm text-[#0D6EFD] hover:text-blue-600 transition-colors"
              disabled={isLoading}
            >
              Mot de passe oublié ?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0D6EFD] hover:bg-blue-600 text-white py-3 rounded-md font-medium transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion en cours...
              </span>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Vous n'avez pas encore de compte ?</p>
          <button
            onClick={onShowRegister}
            className="inline-flex items-center text-[#0D6EFD] hover:text-blue-600 font-medium transition-colors"
            disabled={isLoading}
          >
            <UserPlus size={18} className="mr-2" />
            Demander l'accès
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium text-gray-800 mb-2">Comptes de démonstration :</h4>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-600 font-medium">Client:</p>
              <p className="text-xs text-gray-600">Email: demo@familyforage.mg</p>
              <p className="text-xs text-gray-600">Mot de passe: demo123</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-medium">Administrateur:</p>
              <p className="text-xs text-gray-600">Email: admin@familyforage.mg</p>
              <p className="text-xs text-gray-600">Mot de passe: admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;