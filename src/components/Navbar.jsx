import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCar, FaBed, FaPlane } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (to) => {
    if (to === '#') {
      setShowModal(true);
      return;
    }
    navigate(to);
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Location de Voitures', to: '/', icon: FaCar },
    { name: 'Logement', to: '/accommodation', icon: FaBed },
    { name: "Achat de Billet d'Avion", to: '#', icon: FaPlane },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/img/Logo-arnoe.png"
                alt="Arnoe" 
                className="h-28 md:h-36"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => handleNavClick(link.to)}
                  className={`flex items-center space-x-2 font-medium transition-all duration-300 group ${
                    isActive(link.to)
                      ? 'text-[#283285] font-bold' 
                      : 'text-[#596198] hover:text-[#232b6c]'
                  }`}
                >
                  <link.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                    isActive(link.to) ? 'text-[#FF4D30]' : 'text-current'
                  }`} />
                  <span>{link.name}</span>
                  {isActive(link.to) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Navigation Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XMarkIcon className="w-8 h-8 text-[#283285]" />
              ) : (
                <Bars3Icon className="w-8 h-8 text-[#283285]" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden bg-white shadow-lg rounded-lg mt-2 py-4 px-4"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => handleNavClick(link.to)}
                    className={`flex items-center space-x-2 py-2 transition-colors ${
                      isActive(link.to)
                        ? 'text-[#283285] font-bold' 
                        : 'text-[#596198] hover:text-[#232b6c]'
                    }`}
                  >
                    <link.icon className={`w-5 h-5 ${
                      isActive(link.to) ? 'text-[#FF4D30]' : 'text-current'
                    }`} />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Modal pour le message "Bientôt disponible" */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="bg-white rounded-lg p-8 max-w-sm mx-4"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-[#283285] mb-4">Bientôt disponible</h3>
              <p className="text-gray-600 mb-6">Cette fonctionnalité sera disponible prochainement.</p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-[#FF4D30] text-white py-2 rounded-lg hover:bg-[#ff2c00] transition-colors"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
