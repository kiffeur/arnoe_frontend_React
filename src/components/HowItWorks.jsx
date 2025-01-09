import { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const steps = [
    {
      id: 1,
      title: t('howItWorks.steps.search.title'),
      icon: (
        <svg className="w-16 h-16 text-[#283285]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      ),
      description: t('howItWorks.steps.search.description')
    },
    {
      id: 2,
      title: t('howItWorks.steps.select.title'),
      icon: (
        <svg className="w-16 h-16 text-[#283285]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: t('howItWorks.steps.select.description')
    },
    {
      id: 3,
      title: t('howItWorks.steps.book.title'),
      icon: (
        <svg className="w-16 h-16 text-[#283285]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 4v16m8-8H4" />
        </svg>
      ),
      description: t('howItWorks.steps.book.description')
    },
    {
      id: 4,
      title: t('howItWorks.steps.drive.title'),
      icon: (
        <svg className="w-16 h-16 text-[#283285]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      ),
      description: t('howItWorks.steps.drive.description')
    }
  ];

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-[#1c1c72] mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-[#4c5c9c] text-lg">
              {t('howItWorks.subtitle')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={index * 200}
            >
              <div className="w-16 h-16 bg-[#283285] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                {step.id}
              </div>
              <h3 className="text-xl font-bold text-[#1c1c72] mb-4">{step.title}</h3>
              <p className="text-[#4c5c9c] text-center">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-[#283285]"></div>
              )}
            </div>
          ))}
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-[#283285] hover:bg-[#232b6c] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors"
          >
            <ChevronUpIcon className="w-6 h-6" />
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
