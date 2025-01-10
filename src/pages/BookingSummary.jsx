import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaCar, FaCheck } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookingSummary = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state || {};

  if (!bookingData) {
    navigate('/');
    return null;
  }

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(i18n.language, options);
  };

  const calculateDays = () => {
    const start = new Date(bookingData.pickupDate);
    const end = new Date(bookingData.dropoffDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  // Calculer le prix total en multipliant le prix par jour par le nombre de jours
  const pricePerDay = Number(bookingData.pricePerDay || 0);
  const days = calculateDays();
  const totalPrice = pricePerDay * days;

  // Log pour le débogage
  console.log('Price Per Day:', pricePerDay);
  console.log('Number of Days:', days);
  console.log('Total Price:', totalPrice);

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
              {t('bookingSummary.title')}
            </h1>
            <p className="text-gray-600 text-lg">
              {t('bookingSummary.bookingConfirmationMessage', 'Merci d\'avoir choisi nos services. Voici le résumé de votre réservation.')}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Booking Details */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
                  <FaCar className="inline-block mr-3 text-blue-500" />
                  {t('bookingSummary.bookingDetails')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaCar className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.car')}:</span>
                    <span className="ml-2">{bookingData.carName}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.pickupDate')}:</span>
                    <span className="ml-2">{formatDate(bookingData.pickupDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.returnDate')}:</span>
                    <span className="ml-2">{formatDate(bookingData.dropoffDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.departureLocation')}:</span>
                    <span className="ml-2">Douala, {bookingData.pickupQuarter}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.duration')}:</span>
                    <span className="ml-2">{calculateDays()} {t('bookingSummary.days')}</span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
                  <FaUser className="inline-block mr-3 text-blue-500" />
                  {t('bookingSummary.customerInfo')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaUser className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.name')}:</span>
                    <span className="ml-2">{`${bookingData.firstName} ${bookingData.lastName}`}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.email')}:</span>
                    <span className="ml-2">{bookingData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.phone')}:</span>
                    <span className="ml-2">{bookingData.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="mt-8 border-t pt-6">
              <h2 className="text-2xl font-semibold mb-6">
                {t('bookingSummary.paymentDetails')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>{t('bookingSummary.dailyRate')}:</span>
                    <span>{bookingData.pricePerDay} FCFA</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{t('bookingSummary.totalDays')}:</span>
                    <span>{calculateDays()}</span>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between font-bold text-xl">
                    <span>{t('bookingSummary.total')}:</span>
                    <span>{totalPrice} FCFA</span>
                  </div>
                  <div className="mt-4">
                    <span className="font-medium">{t('bookingSummary.paymentMethod')}:</span>
                    <span className="ml-2">{bookingData.paymentMethod}</span>
                  </div>
                  {bookingData.paymentMethod === 'Mobile Money' && (
                    <div>
                      <span className="font-medium">{t('bookingSummary.mobileMoneyNumber')}:</span>
                      <span className="ml-2">{bookingData.mobileOperator}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center space-x-4">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                {t('bookingSummary.downloadPdf')}
              </button>
              <button 
                onClick={() => navigate('/')} 
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                {t('bookingSummary.backToHome')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingSummary;
