import { useEffect, useMemo } from 'react';
import { 
  ShieldCheckIcon, 
  CurrencyEuroIcon, 
  ClockIcon, 
  UserGroupIcon, 
  StarIcon, 
  TruckIcon 
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const Benefits = () => {
  const { t } = useTranslation();

  const benefits = useMemo(() => [
    {
      id: 1,
      icon: ShieldCheckIcon,
      title: t('benefits.security.title'),
      description: t('benefits.security.description'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      icon: CurrencyEuroIcon,
      title: t('benefits.bestPrices.title'),
      description: t('benefits.bestPrices.description'),
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      icon: ClockIcon,
      title: t('benefits.support.title'),
      description: t('benefits.support.description'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ], [t]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="bg-[#14162E] py-12 md:py-20 relative">
      <div className="container mx-auto px-4" data-aos="fade-up" data-aos-duration="1000">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-[#283285] mb-4">
              {t('benefits.title')}
            </h2>
            <p className="text-[#596198] text-lg">
              {t('benefits.subtitle')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`w-14 h-14 ${benefit.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
