import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaCalendar, FaCheck, FaTimes, FaClock, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import { getAllCars } from '../services/api';
import { getAllBookings } from '../services/bookingService';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`bg-gradient-to-br ${color} rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-full bg-white/10`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalCars: 0,
    availableCars: 0,
    totalBookings: 0,
    pendingBookings: 0
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const [carsData, bookingsData] = await Promise.all([
        getAllCars(),
        getAllBookings()
      ]);
      
      setCars(carsData);
      setBookings(bookingsData);
      
      setStats({
        totalCars: carsData.length,
        availableCars: carsData.filter(car => car.isAvailable).length,
        totalBookings: bookingsData.length,
        pendingBookings: bookingsData.filter(booking => booking.status === 'pending').length
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      if (error.message.includes('401')) {
        navigate('/admin/login');
      }
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-emerald-600';
      case 'pending': return 'text-amber-600';
      case 'cancelled': return 'text-rose-600';
      case 'completed': return 'text-blue-600';
      default: return 'text-gray-600';
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

  return (
    <div className="flex bg-gray-50 min-h-screen">
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
              Tableau de bord
            </span>
          </h1>
          <p className="text-gray-500">
            {new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Voitures Totales"
            value={stats.totalCars}
            icon={FaCar}
            color="from-blue-500 to-blue-600"
            delay={0.1}
          />
          <StatCard
            title="Voitures Disponibles"
            value={stats.availableCars}
            icon={FaCar}
            color="from-emerald-500 to-emerald-600"
            delay={0.2}
          />
          <StatCard
            title="Réservations Totales"
            value={stats.totalBookings}
            icon={FaCalendar}
            color="from-violet-500 to-violet-600"
            delay={0.3}
          />
          <StatCard
            title="Réservations en Attente"
            value={stats.pendingBookings}
            icon={FaClock}
            color="from-amber-500 to-amber-600"
            delay={0.4}
          />
        </div>
        
        {/* Activités Récentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Activités Récentes</h2>
            <Link 
              to="/admin/bookings"
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors group"
            >
              Voir tout
              <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-3 font-semibold text-gray-600">Client</th>
                  <th className="pb-3 font-semibold text-gray-600">Voiture</th>
                  <th className="pb-3 font-semibold text-gray-600">Date</th>
                  <th className="pb-3 font-semibold text-gray-600">Statut</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((booking, index) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3">
                      <div className="font-medium text-gray-800">
                        {booking.firstName} {booking.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{booking.email}</div>
                    </td>
                    <td className="py-3">
                      {booking.car ? (
                        <div className="flex items-center">
                          {booking.car.imageUrl && (
                            <img
                              src={booking.car.imageUrl}
                              alt={booking.car.name}
                              className="w-10 h-10 rounded-lg object-cover mr-3"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-800">{booking.car.name}</div>
                            <div className="text-sm text-gray-500">{booking.car.pricePerDay} FCFA/jour</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-500 italic">Voiture non disponible</span>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="text-gray-800">
                        {new Date(booking.startDate).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                        booking.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        booking.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1">{booking.status}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
