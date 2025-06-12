import React from 'react';
import { Droplet, Zap, Search, FilterX } from 'lucide-react';
import { AnimatedSection } from './common/AnimatedSection';

interface ServiceCardProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
  details: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, color, title, description, details }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <div 
      className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white ${color}`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <p className="text-gray-700 font-medium">👉 {details}</p>
  </div>
);

const Services: React.FC = () => {
  const services = [
    {
      icon: <Droplet size={28} />,
      color: 'bg-[#0D6EFD]',
      title: 'Forage de puits',
      description: 'Forages manuels ou mécaniques, adaptés aux zones rurales et urbaines.',
      details: 'Études préalables, travaux, tests de débit.'
    },
    {
      icon: <FilterX size={28} />,
      color: 'bg-[#20C997]',
      title: 'Fourniture & traitement de l\'eau',
      description: 'Installation de systèmes de purification, de stockage et de distribution d\'eau.',
      details: 'Pompes, filtres UV, réseaux de canalisation.'
    },
    {
      icon: <Search size={28} />,
      color: 'bg-amber-500',
      title: 'Études géophysiques',
      description: 'Analyse du sous-sol pour localiser les ressources en eau.',
      details: 'Méthodes résistives et sismiques, rapports détaillés.'
    },
    {
      icon: <Zap size={28} />,
      color: 'bg-orange-500',
      title: 'Énergie solaire',
      description: 'Panneaux solaires pour pompes et sites isolés.',
      details: 'Installation, maintenance, optimisation.'
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            🚰 Des solutions sur mesure, clés en main
          </h2>
        </AnimatedSection>
        
        <AnimatedSection delay={0.2}>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Notre expertise technique nous permet d'offrir des services complets 
            et adaptés aux besoins spécifiques de chaque client.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={0.2 + index * 0.1}>
              <ServiceCard {...service} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;