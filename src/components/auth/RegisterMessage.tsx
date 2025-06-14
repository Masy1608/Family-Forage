import React from 'react';
import { ArrowLeft, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';

interface RegisterMessageProps {
  onBack: () => void;
  onBackToLogin: () => void;
}

const RegisterMessage: React.FC<RegisterMessageProps> = ({ onBack, onBackToLogin }) => {
  const contactMethods = [
    {
      icon: <Phone size={24} className="text-[#0D6EFD]" />,
      title: 'Téléphone',
      value: '+261 XX XXX XX XX',
      description: 'Appelez-nous directement'
    },
    {
      icon: <Mail size={24} className="text-[#20C997]" />,
      title: 'Email',
      value: 'contact@familyforage.mg',
      description: 'Envoyez-nous un email'
    },
    {
      icon: <MessageCircle size={24} className="text-[#25D366]" />,
      title: 'WhatsApp',
      value: 'Contact rapide',
      description: 'Discutez avec nous',
      action: () => window.open('https://wa.me/+261XXXXXXXX', '_blank')
    }
  ];

  const steps = [
    'Contactez notre équipe via l\'un des moyens ci-dessous',
    'Présentez votre projet et vos besoins',
    'Nous créerons votre compte personnalisé',
    'Recevez vos identifiants de connexion par email'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="absolute top-4 left-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-[#20C997] rounded-full flex items-center justify-center">
              <CheckCircle size={32} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Demande d'accès à l'espace client
          </h1>
          <p className="text-lg text-gray-600">
            Pour accéder à votre espace client personnalisé, vous devez d'abord être client de FAMILY FORAGE
          </p>
        </div>

        {/* Steps */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Comment procéder :</h2>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#0D6EFD] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Contactez-nous :</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className={`p-4 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow ${
                  method.action ? 'cursor-pointer hover:border-[#0D6EFD]' : ''
                }`}
                onClick={method.action}
              >
                <div className="flex justify-center mb-3">
                  {method.icon}
                </div>
                <h3 className="font-medium text-gray-800 mb-1">{method.title}</h3>
                <p className="text-sm font-medium text-gray-900 mb-1">{method.value}</p>
                <p className="text-xs text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-medium text-blue-800 mb-2">Pourquoi cette étape ?</h3>
          <p className="text-blue-700 text-sm">
            L'espace client est réservé à nos clients actuels et contient des informations sensibles 
            sur vos projets. Nous créons chaque compte manuellement après validation de votre statut client 
            pour garantir la sécurité et la confidentialité de vos données.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onBackToLogin}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-md font-medium transition-colors"
          >
            Retour à la connexion
          </button>
          
          <a
            href="mailto:contact@familyforage.mg?subject=Demande d'accès espace client"
            className="flex-1 bg-[#0D6EFD] hover:bg-blue-600 text-white py-3 px-6 rounded-md font-medium text-center transition-colors"
          >
            Envoyer un email
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterMessage;