import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCar, FaCalendar, FaChartLine, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { path: '/admin/dashboard', icon: FaChartLine, label: 'Tableau de bord' },
    { path: '/admin/cars', icon: FaCar, label: 'Voitures' },
    { path: '/admin/bookings', icon: FaCalendar, label: 'Réservations' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const adminName = localStorage.getItem('adminName') || 'Admin';

  return (
    <div className="bg-gradient-to-b from-blue-800 to-blue-900 h-screen w-64 fixed left-0 top-0 text-white shadow-xl">
      <div className="p-6 border-b border-blue-700">
        <div className="flex items-center space-x-3">
          <FaUserCircle className="w-10 h-10 text-blue-300" />
          <div>
            <h2 className="text-xl font-bold text-blue-100">Admin Panel</h2>
            <p className="text-sm text-blue-300">{adminName}</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative flex items-center px-6 py-3 text-blue-100 hover:bg-blue-700/50 transition-all duration-300 ${
              location.pathname === item.path ? 'bg-blue-700/70' : ''
            }`}
          >
            {location.pathname === item.path && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 w-1 h-full bg-blue-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <item.icon className={`w-5 h-5 mr-3 transition-transform duration-300 ${
              location.pathname === item.path ? 'scale-110 text-blue-300' : 'text-blue-400'
            }`} />
            <span className={`transition-colors duration-300 ${
              location.pathname === item.path ? 'text-blue-200 font-semibold' : ''
            }`}>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-0 w-full p-6 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-blue-200 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-all duration-300 group"
        >
          <FaSignOutAlt className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
