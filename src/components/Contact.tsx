import React, { useState } from 'react';
import { Send, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { AnimatedSection } from './common/AnimatedSection';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError(null);
      
      try {
        const result = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message
          },
          import.meta.env.VITE_EMAILJS_USER_ID
        );
        
        console.log('Email sent successfully:', result.text);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } catch (error) {
        console.error('Email sending failed:', error);
        setSubmitError('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const contactInfo = [
    {
      icon: <MapPin size={24} className="text-[#0D6EFD]" />,
      title: 'Adresse',
      details: 'Lot XXX, Antananarivo, Madagascar'
    },
    {
      icon: <Phone size={24} className="text-[#0D6EFD]" />,
      title: 'Téléphone',
      details: '+261 XX XXX XX XX'
    },
    {
      icon: <Mail size={24} className="text-[#0D6EFD]" />,
      title: 'Email',
      details: 'contact@familyforage.mg'
    }
  ];
  
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            📞 Une question ? Un projet ?
          </h2>
        </AnimatedSection>
        
        <AnimatedSection delay={0.2}>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            N'hésitez pas à nous contacter pour toute demande d'information ou pour discuter de votre projet.
            Notre équipe vous répondra dans les plus brefs délais.
          </p>
        </AnimatedSection>
        
        <div className="flex flex-col lg:flex-row gap-10">
          <AnimatedSection delay={0.3} className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg h-full">
              <h3 className="text-2xl font-semibold mb-6">Contactez-nous</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{info.title}</h4>
                      <p className="text-gray-600">{info.details}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-3">Nos réseaux</h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-[#0D6EFD] text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-[#0D6EFD] text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.4} className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h3>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-800 rounded-md">
                  Votre message a été envoyé avec succès ! Nous vous contacterons dans les plus brefs délais.
                </div>
              )}
              
              {submitError && (
                <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-800 rounded-md">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Votre nom"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Votre email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Votre numéro de téléphone"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Votre message"
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#0D6EFD] hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors duration-300 disabled:bg-blue-400"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send size={18} className="mr-2" />
                        Envoyer ma demande
                      </span>
                    )}
                  </button>
                  
                  <a 
                    href="https://wa.me/+261XXXXXXXX" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#20C997] hover:bg-[#1ba884] text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors duration-300"
                  >
                    <MessageCircle size={18} className="mr-2" />
                    Discuter via WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;