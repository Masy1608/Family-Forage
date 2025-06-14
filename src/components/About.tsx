import React from 'react';
import { AnimatedSection } from './common/AnimatedSection';
import missionImg from '../assets/image/mission.jpg';

const About: React.FC = () => {
  const highlights = [
    { icon: '🔧', text: '+10 ans d\'expérience' },
    { icon: '🧪', text: 'Équipe multidisciplinaire' },
    { icon: '♻️', text: 'Engagement environnemental' },
    { icon: '📜', text: 'Certifications techniques' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            🌿 Notre mission : allier technologie et durabilité
          </h2>
        </AnimatedSection>
        
        <div className="flex flex-col md:flex-row items-center gap-10">
          <AnimatedSection delay={0.2} className="md:w-1/2">
            <div className="relative">
              <img 
                src={missionImg}
                alt="Équipe de FAMILY FORAGE travaillant sur un projet" 
                className="rounded-lg shadow-lg w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-5 -right-5 bg-[#0D6EFD] text-white py-2 px-4 rounded-md shadow-md">
                <span className="font-bold">FAMILY FORAGE</span>
              </div>
            </div>
          </AnimatedSection>
          
          <div className="md:w-1/2">
            <AnimatedSection delay={0.4}>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                FAMILY FORAGE est une entreprise malgache spécialisée dans les solutions hydrauliques durables : 
                forage de puits, installations solaires, purification d'eau et études géophysiques.
                <br /><br />
                Nous mettons en œuvre des technologies modernes pour améliorer l'accès à l'eau et à l'énergie, 
                tout en respectant les ressources naturelles.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.6}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <span className="text-gray-800 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;