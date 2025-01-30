import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCarSide,
  FaCarAlt,
  FaGem,
  FaTruck,
  FaCircle,
  FaTruckPickup
} from 'react-icons/fa';
import AOS from 'aos';
import { useTranslation } from 'react-i18next';

const CarTypes = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const carTypes = [
    { 
      id: 1, 
      name: t('carTypes.berline.name'), 
      icon: FaCarAlt,
      description: t('carTypes.berline.description'),
      filterType: 'berline',
      gradient: 'from-blue-500 via-blue-600 to-indigo-700',
      shadowColor: 'shadow-blue-500/30'
    },
    { 
      id: 2, 
      name: t('carTypes.suv.name'), 
      icon: FaCarSide,
      description: t('carTypes.suv.description'),
      filterType: 'suv',
      gradient: 'from-purple-500 via-purple-600 to-purple-800',
      shadowColor: 'shadow-purple-500/30'
    },
    { 
      id: 3, 
      name: t('carTypes.pickup.name'), 
      icon: FaTruckPickup,
      description: t('carTypes.pickup.description'),
      filterType: 'pickup',
      gradient: 'from-red-500 via-red-600 to-red-800',
      shadowColor: 'shadow-red-500/30'
    },
    { 
      id: 4, 
      name: 'Premium', 
      icon: FaGem,
      description: t('carTypes.premium.description'),
      filterType: 'premium',
      gradient: 'from-emerald-400 via-emerald-600 to-emerald-800',
      shadowColor: 'shadow-emerald-500/30'
    }
  ];

  const handleCarTypeClick = (filterType) => {
    // Mapper les types de CarTypes aux types de SearchResults
    const carTypeMap = {
      'berline': 'Berline',
      'suv': 'SUV 5 places', // ou 'SUV 7 places' selon votre besoin
      'pickup': 'Pickup',
      'premium': 'Premium'
    };

    const mappedCarType = carTypeMap[filterType] || filterType;
    
    console.log('Type de voiture sélectionné:', {
      original: filterType,
      mapped: mappedCarType
    });

    navigate('/search', { 
      state: { 
        carType: mappedCarType,
        fromCarTypes: true
      } 
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#FF4D30] text-sm font-bold mb-4 tracking-wider uppercase">
              {t('carTypes.title')}
            </p>
            <h2 className="text-5xl font-bold text-[#132676] mb-6">
              {t('carTypes.subtitle')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FF4D30] to-[#ff2c00] mx-auto rounded-full"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {carTypes.map((car) => (
            <motion.div
              key={car.id}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCarTypeClick(car.filterType)}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={car.id * 100}
            >
              <div 
                className={`bg-gradient-to-br ${car.gradient} rounded-2xl p-8 shadow-lg transform transition-all duration-500 ${car.shadowColor} hover:shadow-2xl cursor-pointer overflow-hidden`}
              >
                <div className="relative z-10">
                  {/* Cercles décoratifs */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
                  
                  <div className="flex flex-col items-center relative">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="mb-6 p-4 bg-white/10 rounded-full backdrop-blur-sm"
                    >
                      <car.icon className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="text-white text-xl font-bold mb-3">{car.name}</h3>
                    <p className="text-white/90 text-sm text-center">{car.description}</p>
                    
                    {/* Bouton fantôme */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="mt-4 px-4 py-2 border border-white/30 rounded-full text-white/90 text-sm backdrop-blur-sm
                               opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      {t('carTypes.discover')}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarTypes;
