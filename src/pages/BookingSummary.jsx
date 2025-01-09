import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaCar, FaCheck } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state || {};

  if (!bookingData) {
    navigate('/');
    return null;
  }

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const calculateDays = () => {
    const start = new Date(bookingData.pickupDate);
    const end = new Date(bookingData.dropoffDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
            >
              <FaCheck className="text-4xl text-green-500" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Réservation Confirmée !
            </h1>
            <p className="text-gray-600 text-lg">
              Merci d'avoir choisi nos services. Voici le résumé de votre réservation.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-64">
              <img
                src={bookingData.carImage}
                alt={bookingData.carName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-3xl font-bold mb-2">{bookingData.carName}</h2>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{bookingData.pricePerDay} FCFA</span>
                  <span className="ml-2">/ jour</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Détails de la Location</h3>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaCalendarAlt className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Période de Location</p>
                      <p className="font-medium">Du {formatDate(bookingData.pickupDate)}</p>
                      <p className="font-medium">Au {formatDate(bookingData.dropoffDate)}</p>
                      <p className="text-blue-600 text-sm mt-1">
                        {calculateDays()} jours de location
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaMapMarkerAlt className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Lieu de Prise en Charge</p>
                      <p className="font-medium">Douala</p>
                      <p className="text-gray-600 text-sm mt-1">Adresse de résidence</p>
                      <p className="font-medium">{bookingData.pickupQuarter}</p>
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Informations Client</h3>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaUser className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Nom Complet</p>
                      <p className="font-medium">{bookingData.firstName} {bookingData.lastName}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Email</p>
                      <p className="font-medium">{bookingData.email}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaPhone className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Téléphone</p>
                      <p className="font-medium">{bookingData.phone}</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 p-6 bg-blue-50 rounded-xl"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Prix Total</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {bookingData.totalPrice} FCFA
                    </p>
                    <p className="text-sm text-gray-500">
                      {calculateDays()} jours × {bookingData.pricePerDay} FCFA
                    </p>
                  </div>
                  <FaCar className="text-6xl text-blue-200" />
                </div>
              </motion.div>

              <div className="mt-8 text-center text-gray-600">
                <p className="mb-4">
                  Un email de confirmation a été envoyé à {bookingData.email}.<br/>
                  Notre équipe vous contactera prochainement pour finaliser votre réservation.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Retour à l'accueil
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingSummary;
