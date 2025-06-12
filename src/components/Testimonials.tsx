import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { AnimatedSection } from './common/AnimatedSection';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  location: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "Grâce à FAMILY FORAGE, notre village a enfin accès à une eau propre et régulière. Leur équipe a été à l'écoute de nos besoins et a trouvé des solutions adaptées à notre contexte local.",
      author: "Association villageoise",
      location: "Vatomandry",
      rating: 5
    },
    {
      id: 2,
      text: "Leur équipe est sérieuse, rapide et à l'écoute. Résultat professionnel. Nous avons particulièrement apprécié leur approche participative qui implique les communautés locales.",
      author: "ONG partenaire",
      location: "Antsirabe",
      rating: 5
    },
    {
      id: 3,
      text: "Un service fiable et professionnel. Les panneaux solaires installés par FAMILY FORAGE pour notre système de pompage fonctionnent parfaitement depuis plus de 3 ans.",
      author: "Entreprise agricole",
      location: "Itasy",
      rating: 4
    }
  ];
  
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ❤️ Ils nous font confiance
          </h2>
        </AnimatedSection>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-white rounded-lg shadow-lg p-8 md:p-10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#20C997] rounded-bl-lg rounded-tr-lg flex items-center justify-center">
              <div className="text-white text-4xl transform -rotate-12">❤️</div>
            </div>
            
            {/* Quote symbol */}
            <div className="text-[#0D6EFD] text-6xl opacity-20 absolute top-6 left-6">"</div>
            
            <div className="relative z-10">
              <p className="text-xl text-gray-700 mb-6 pt-6">
                {testimonials[currentTestimonial].text}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <p className="font-semibold text-gray-800">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-gray-500">
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
                
                <div className="flex mt-2 sm:mt-0">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={i < testimonials[currentTestimonial].rating ? "text-yellow-400" : "text-gray-300"} 
                      fill={i < testimonials[currentTestimonial].rating ? "#FACC15" : "none"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-5 md:-translate-x-10 bg-white rounded-full p-2 shadow-md focus:outline-none text-gray-700 hover:text-[#0D6EFD] transition-colors"
            onClick={prevTestimonial}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-5 md:translate-x-10 bg-white rounded-full p-2 shadow-md focus:outline-none text-gray-700 hover:text-[#0D6EFD] transition-colors"
            onClick={nextTestimonial}
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentTestimonial === index ? 'bg-[#0D6EFD]' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;