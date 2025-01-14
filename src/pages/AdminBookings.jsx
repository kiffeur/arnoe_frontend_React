import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { FaCheck, FaTimes, FaClock, FaEye, FaCalendarAlt, FaCar, FaUser, FaEnvelope, FaPhone, FaMoneyBillWave } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import { getAllBookings, updateBookingStatus, cancelBooking, validateBooking } from '../services/bookingService';
import { format, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des réservations:', error);
      if (error.message.includes('401')) {
        navigate('/admin/login');
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [navigate]);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      await fetchBookings();
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      toast.success('La réservation a été annulée avec succès');
      await fetchBookings();
    } catch (error) {
      toast.error('Erreur lors de l\'annulation de la réservation');
      console.error(error);
    }
  };

  const handleValidateBooking = async (bookingId) => {
    try {
      await validateBooking(bookingId);
      toast.success('La réservation a été validée avec succès');
      await fetchBookings();
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(null);
      }
    } catch (error) {
      toast.error('Erreur lors de la validation de la réservation');
      console.error(error);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'cancelled': return 'bg-rose-100 text-rose-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FaCheck className="w-4 h-4" />;
      case 'pending': return <FaClock className="w-4 h-4" />;
      case 'cancelled': return <FaTimes className="w-4 h-4" />;
      case 'completed': return <FaCheck className="w-4 h-4" />;
      default: return null;
    }
  };

  const formatPaymentMethod = (method) => {
    switch(method) {
      case 'mobile_mtn': return 'Mobile Money MTN';
      case 'mobile_orange': return 'Mobile Money Orange';
      case 'credit_card': return 'Carte de Crédit';
      case 'western_union': return 'Western Union';
      case 'taptap_send': return 'TAPTAP Send';
      case 'bank_transfer': return 'Virement Bancaire';
      default: return method || 'Non spécifié';
    }
  };

  const BookingModal = ({ booking, onClose }) => {
    const numberOfDays = differenceInDays(new Date(booking.endDate), new Date(booking.startDate));
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Détails de la Réservation
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Statut</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                  {getStatusIcon(booking.status)}
                  <span className="ml-2">{booking.status}</span>
                </div>
              </div>

              {/* Client Info */}
              <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                <div className="flex items-center space-x-2 text-blue-500 font-medium mb-2">
                  <FaUser className="w-5 h-5" />
                  <span>Informations Client</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-600">Nom:</div>
                    <div className="font-medium">{booking.firstName} {booking.lastName}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="w-4 h-4 text-gray-400" />
                    <div className="text-gray-600">{booking.email}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaPhone className="w-4 h-4 text-gray-400" />
                    <div className="text-gray-600">{booking.phone}</div>
                  </div>
                </div>
              </div>

              {/* Car Info */}
              {booking.car && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 text-blue-500 font-medium mb-4">
                    <FaCar className="w-5 h-5" />
                    <span>Informations Véhicule</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    {booking.car.imageUrl && (
                      <img
                        src={booking.car.imageUrl}
                        alt={booking.car.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium text-gray-800">{booking.car.name}</h4>
                      <div className="flex items-center text-gray-600">
                        <FaMoneyBillWave className="w-4 h-4 mr-2 text-green-500" />
                        {booking.car.pricePerDay} FCFA/jour
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Prix et Durée */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 text-blue-500 font-medium mb-4">
                  <FaMoneyBillWave className="w-5 h-5" />
                  <span>Informations de Paiement</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-600">Durée:</div>
                    <div className="font-medium text-gray-800">
                      {numberOfDays} jour{numberOfDays > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-600">Prix Total:</div>
                    <div className="font-medium text-emerald-600">
                      {booking.totalPrice?.toLocaleString('fr-FR')} FCFA
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 col-span-2">
                    <div className="text-gray-600">Mode de paiement:</div>
                    <div className="font-medium text-gray-800">
                      {booking.paymentMethod ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {formatPaymentMethod(booking.paymentMethod)}
                        </span>
                      ) : (
                        <span className="text-gray-500 italic">Non spécifié</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                <div className="flex items-center space-x-2 text-blue-500 font-medium mb-2">
                  <FaCalendarAlt className="w-5 h-5" />
                  <span>Dates de Réservation</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-600 mb-1">Date de début:</div>
                    <div className="font-medium">
                      {format(new Date(booking.startDate), 'PPP')}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Date de fin:</div>
                    <div className="font-medium">
                      {format(new Date(booking.endDate), 'PPP')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {booking.status === 'pending' && (
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleValidateBooking(booking.id)}
                    className="flex-1 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FaCheck className="w-4 h-4" />
                    <span>Confirmer</span>
                  </button>
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="flex-1 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FaTimes className="w-4 h-4" />
                    <span>Annuler</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Toaster />
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Réservations
            </span>
          </h1>
          
          <div className="flex space-x-4 mb-6 bg-gray-100 p-2 rounded-xl shadow-inner">
            <button 
              onClick={() => setFilter('all')} 
              className={`flex-1 px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                filter === 'all' 
                  ? 'bg-[#FF4D30] text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center justify-center space-x-3">
                <FaCar className="w-6 h-6" />
                <span className="font-medium">Toutes</span>
              </span>
            </button>
            <button 
              onClick={() => setFilter('pending')} 
              className={`flex-1 px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                filter === 'pending' 
                  ? 'bg-amber-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center justify-center space-x-3">
                <FaClock className="w-6 h-6" />
                <span className="font-medium">En attente</span>
              </span>
            </button>
            <button 
              onClick={() => setFilter('active')} 
              className={`flex-1 px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                filter === 'active' 
                  ? 'bg-emerald-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center justify-center space-x-3">
                <FaCheck className="w-6 h-6" />
                <span className="font-medium">Actives</span>
              </span>
            </button>
            <button 
              onClick={() => setFilter('cancelled')} 
              className={`flex-1 px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                filter === 'cancelled' 
                  ? 'bg-rose-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center justify-center space-x-3">
                <FaTimes className="w-6 h-6" />
                <span className="font-medium">Annulées</span>
              </span>
            </button>
            <button 
              onClick={() => setFilter('completed')} 
              className={`flex-1 px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                filter === 'completed' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center justify-center space-x-3">
                <FaCalendarAlt className="w-6 h-6" />
                <span className="font-medium">Terminées</span>
              </span>
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Client</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Voiture</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Statut</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Dates</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                            <FaUser className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {booking.firstName} {booking.lastName}
                            </div>
                            <div className="text-gray-500">{booking.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {booking.car ? (
                          <div className="flex items-center">
                            {booking.car.imageUrl ? (
                              <img
                                src={booking.car.imageUrl}
                                alt={booking.car.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <FaCar className="h-5 w-5 text-gray-500" />
                              </div>
                            )}
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{booking.car.name}</div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500 italic">Non disponible</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-2">{booking.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          <div className="font-medium">
                            <span className="text-blue-600 mr-1">📅</span>
                            {format(new Date(booking.startDate), 'dd MMMM yyyy')} 
                            <span className="mx-1 text-gray-400">→</span> 
                            {format(new Date(booking.endDate), 'dd MMMM yyyy')}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <span className="mr-1">⏱️</span>
                            {differenceInDays(new Date(booking.endDate), new Date(booking.startDate))} jour(s)
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <FaEye className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedBooking && (
            <BookingModal
              booking={selectedBooking}
              onClose={() => setSelectedBooking(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminBookings;
