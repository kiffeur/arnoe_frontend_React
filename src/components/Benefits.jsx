import { useState } from 'react';
import { MapPinIcon, CalendarDaysIcon, UserGroupIcon, ShieldCheckIcon, CurrencyEuroIcon, ClockIcon } from '@heroicons/react/24/outline';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      icon: ShieldCheckIcon, 
      title: "Sécurité Garantie",
      description: "Tous nos véhicules sont régulièrement entretenus et assurés pour votre tranquillité d'esprit."
    },
    {
      id: 2,
      icon: CurrencyEuroIcon, 
      title: "Meilleurs Prix",
      description: "Nous vous garantissons les tarifs les plus compétitifs du marché, sans compromis sur la qualité."
    },
    {
      id: 3,
      icon: ClockIcon, 
      title: "24/7 Support",
      description: "Notre équipe est disponible à tout moment pour répondre à vos questions et besoins."
    }
  ];

  return (
    <section className="bg-[#14162E] py-12 md:py-20 relative">
      <div className="container mx-auto px-4" data-aos="fade-up" data-aos-duration="1000">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#283285] mb-4">
            Pourquoi nous choisir
          </h2>
          <p className="text-[#596198] text-lg">
            Découvrez les avantages qui font notre différence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={index * 100}
            >
              <div className="w-16 h-16 bg-[#283285]/10 rounded-full flex items-center justify-center mb-6">
                <benefit.icon className="w-8 h-8 text-[#283285]" />
              </div>
              <h3 className="text-xl font-bold text-[#283285] mb-4">{benefit.title}</h3>
              <p className="text-[#596198]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
