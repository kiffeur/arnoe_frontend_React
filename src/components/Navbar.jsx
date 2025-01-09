import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCar, FaBed, FaPlane } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { name: t('nav.cars'), to: '/', icon: FaCar },
    { name: t('nav.accommodation'), to: '/accommodation', icon: FaBed },
    { name: t('nav.flights'), to: '#', icon: FaPlane },
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
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.to)}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200
                    ${isActive(link.to) ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </button>
              ))}

              {/* Desktop Language Selector */}
              <div className="flex items-center space-x-2 ml-4 border-l pl-4">
                <button
                  onClick={() => changeLanguage('fr')}
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    i18n.language === 'fr' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    i18n.language === 'en' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('de')}
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    i18n.language === 'de' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  DE
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-primary focus:outline-none"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-20 bg-white shadow-lg md:hidden z-40"
          >
            <div className="px-4 py-2 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.to)}
                  className={`flex items-center space-x-2 w-full p-3 rounded-lg transition-colors duration-200
                    ${isActive(link.to) ? 'text-primary bg-primary/10' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </button>
              ))}

              {/* Mobile Language Selector */}
              <div className="flex items-center justify-center space-x-2 p-3 border-t">
                <button
                  onClick={() => changeLanguage('fr')}
                  className={`px-3 py-1 rounded ${
                    i18n.language === 'fr' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-3 py-1 rounded ${
                    i18n.language === 'en' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('de')}
                  className={`px-3 py-1 rounded ${
                    i18n.language === 'de' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  DE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
            >
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('nav.comingSoon')}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
                >
                  {t('nav.close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
