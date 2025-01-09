import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGasPump, FaCar, FaUsers, FaStar, FaMountain } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';
import { getAllCars } from '../services/api';
import { useTranslation } from 'react-i18next';

const RentalCar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const availableCars = await getAllCars();
        setCars(availableCars.filter(car => car.isAvailable).slice(0, 3));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <p className="text-lg text-gray-600">{t('rentalCar.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            {t('rentalCar.title')}
          </h2>
          <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            {t('rentalCar.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cars.map((car) => (
            <RentalCarComponent 
              key={car.id} 
              car={car} 
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/search" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t('rentalCar.viewAll')}
              <MdArrowForward className="text-xl" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const RentalCarComponent = ({ car }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigation = (e) => {
    e.stopPropagation();
    navigate(`/car/${car.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={handleNavigation}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative">
        <img
          src={car.imageUrl}
          alt={car.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          {car.type}
        </div>
      </div>

      <div className="p-6">
        {/* Ratings */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 w-4 h-4" />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {t('rentalCar.reviews', { count: 2 })}
          </span>
        </div>

        {/* Car Name */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{car.name}</h3>

        {/* Price */}
        <div className="text-blue-600 font-bold text-lg mb-4">
          {car.pricePerDay} FCFA
          <span className="text-sm font-normal text-gray-600">{t('rentalCar.pricePerDay')}</span>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <FaUsers className="mr-2" />
            <span>{car.seats} {t('rentalCar.features.seats')}</span>
          </div>
          <div className="flex items-center">
            <FaCar className="mr-2" />
            <span>
              {car.transmission === 'automatic' 
                ? t('rentalCar.features.automatic')
                : t('rentalCar.features.manual')}
            </span>
          </div>
          <div className="flex items-center">
            <FaGasPump className="mr-2" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center">
            <FaMountain className="mr-2" />
            <span>
              {car.is4x4 
                ? t('rentalCar.features.mountain')
                : t('rentalCar.features.2x4')}
            </span>
          </div>
        </div>

        {/* Réserver Button */}
        <motion.button
          onClick={handleNavigation}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white text-blue-600 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center font-semibold"
        >
          {t('rentalCar.bookNow')} <MdArrowForward className="ml-2 text-xl" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RentalCar;
