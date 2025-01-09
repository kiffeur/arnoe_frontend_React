import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Accommodation = () => {
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleOptionClick = () => {
    setShowModal(true);
  };

  const cardVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Background avec overlay */}
      <div className="flex-grow relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/img/airbnb 1.jpeg)',
          }}
        />
        
        {/* Contenu principal */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-6"
          >
            Choose Your Stay
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto"
          >
            Experience comfort and luxury with our premium accommodation options
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Option Airbnb */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredCard('airbnb')}
              onHoverEnd={() => setHoveredCard(null)}
              className="cursor-pointer perspective"
              onClick={handleOptionClick}
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-300">
                <motion.div 
                  className="h-64 bg-cover bg-center relative overflow-hidden"
                  variants={imageVariants}
                >
                  <img 
                    src="/img/airbnb 1.jpeg"
                    alt="Airbnb"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Airbnb</h2>
                  <p className="text-gray-600 text-lg mb-6">
                    Discover unique stays and experiences in local neighborhoods.
                  </p>
                  <motion.button 
                    variants={buttonVariants}
                    whileHover="hover"
                    className="w-full bg-gradient-to-r from-[#FF385C] to-[#E31C5F] text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    Browse Airbnb
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Option Hotel */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredCard('hotel')}
              onHoverEnd={() => setHoveredCard(null)}
              className="cursor-pointer perspective"
              onClick={handleOptionClick}
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-[0_20px_50px_rgba(15,_82,_186,_0.7)] transition-all duration-300">
                <motion.div 
                  className="h-64 bg-cover bg-center relative overflow-hidden"
                  variants={imageVariants}
                >
                  <img 
                    src="/img/hotel.jpg"
                    alt="Hotel"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Hotels</h2>
                  <p className="text-gray-600 text-lg mb-6">
                    Experience luxury and comfort in our partner hotels.
                  </p>
                  <motion.button 
                    variants={buttonVariants}
                    whileHover="hover"
                    className="w-full bg-gradient-to-r from-[#0F52BA] to-[#0A3D8F] text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    Find Hotels
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal de maintenance */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </motion.div>
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-gray-900 mb-4"
                >
                  Service Under Maintenance
                </motion.h3>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 mb-8 text-lg"
                >
                  We're working hard to improve this service. Please check back later!
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="bg-gradient-to-r from-[#FF4D30] to-[#dc3a1e] text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Got it!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Accommodation;
