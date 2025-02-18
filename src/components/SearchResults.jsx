import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGasPump, FaCar, FaUsers, FaStar, FaSnowflake, FaCamera, FaTablet, FaMountain, FaFilter, FaAirFreshener } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';
import { getAllCars } from '../services/api';
import AOS from 'aos';
import 'aos/dist/aos.css';

const cameroonCityNames = [
  'Douala',
  'Yaoundé',
  'Bafoussam',
  'Bamenda',
  'Bertoua',
  'Buea',
  'Kribi',
  'Limbé',
  'Ebolowa',
  'Edéa',
  'Kumba',
  'Foumban'
];

const SearchResults = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state || {};
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    seats: '',
    carType: searchParams.carType || '',
    transmission: '',
    fuelType: '',
    destination: localStorage.getItem('searchDestination') || searchParams.destination || '',
    hasAC: false,
    hasRearCamera: false,
    hasTouchScreen: false,
    is4x4: false,
    priceRange: [0, 1000000]
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Destinations nécessitant un 4x4
  const require4x4Destinations = [
    'Bafoussam', 
    'Bamenda', 
    'Bertoua', 
    'Buea', 
    'Limbé', 
    'Ebolowa', 
    'Kumba', 
    'Foumban'
    
  ];

  const flexDestinations = [
    'Douala', 
    'Kribi', 
    'Edéa',
    'Yaoundé'
  ];

  const handleDestinationChange = (destination) => {
    setFilters(prevFilters => ({
      ...prevFilters, 
      destination,
      // Réinitialiser is4x4 uniquement si la destination nécessite un 4x4
      is4x4: require4x4Destinations.includes(destination) ? true : false
    }));
    // Stocker la destination sélectionnée dans localStorage
    localStorage.setItem('selectedDestination', destination);
    localStorage.setItem('searchDestination', destination);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const allCars = await getAllCars();
        setCars(allCars);
        
        // Si on vient de CarTypes, appliquer le filtre immédiatement
        if (searchParams.carType && searchParams.fromCarTypes) {
          setFilters(prev => ({
            ...prev,
            carType: searchParams.carType
          }));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError(t('searchResults.error'));
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchParams, t]);

  // Mettre à jour les filtres quand les paramètres de recherche changent
  useEffect(() => {
    if (searchParams.carType && searchParams.fromCarTypes) {
      setFilters(prev => ({
        ...prev,
        carType: searchParams.carType
      }));
      
      // Faire défiler jusqu'à la section des résultats
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Filtrage des voitures
  const filteredCars = cars.filter((car) => {
    // Filtre par type de voiture
    const matchCarType = !filters.carType || car.carType === filters.carType;
    console.log('Car Type Filter:', {
      filterCarType: filters.carType,
      carCarType: car.carType,
      matchCarType
    });
    
    // Filtre par nombre de sièges
    const matchSeats = !filters.seats || car.seats.toString() === filters.seats;
    console.log('Seats Filter:', {
      filterSeats: filters.seats,
      carSeats: car.seats,
      matchSeats
    });
    
    // Filtre par destination
    const matchDestination = !filters.destination || 
      (flexDestinations.includes(filters.destination) || 
       (require4x4Destinations.includes(filters.destination) && car.is4x4));
    console.log('Destination Filter:', {
      filterDestination: filters.destination,
      carDestination: car.destination,
      matchDestination
    });
    
    // Filtre par 4x4
    const match4x4 = !filters.is4x4 || car.is4x4;
    console.log('4x4 Filter:', {
      filter4x4: filters.is4x4,
      car4x4: car.is4x4,
      match4x4
    });
    
    // Autres filtres
    const matchAC = !filters.hasAC || car.hasAC;
    console.log('AC Filter:', {
      filterAC: filters.hasAC,
      carAC: car.hasAC,
      matchAC
    });
    const matchRearCamera = !filters.hasRearCamera || car.hasRearCamera;
    console.log('Rear Camera Filter:', {
      filterRearCamera: filters.hasRearCamera,
      carRearCamera: car.hasRearCamera,
      matchRearCamera
    });
    const matchTouchScreen = !filters.hasTouchScreen || car.hasTouchScreen;
    console.log('Touch Screen Filter:', {
      filterTouchScreen: filters.hasTouchScreen,
      carTouchScreen: car.hasTouchScreen,
      matchTouchScreen
    });

    return matchCarType && 
           matchSeats && 
           matchDestination && 
           match4x4 && 
           matchAC && 
           matchRearCamera && 
           matchTouchScreen;
  });

  // Modification de la logique de désactivation des options de destination
  const isDestinationDisabled = () => {
    // Aucune destination ne doit être grisée
    return false;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-8 relative">
      <div className="container mx-auto px-4">
        {/* Bouton filtre mobile */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <FaFilter />
            {isMobileFilterOpen 
              ? t('searchResults.filters.mobile.hide') 
              : t('searchResults.filters.mobile.show')
            }
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0" data-aos="fade-right" data-aos-delay="100">
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <FaFilter className="text-blue-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-800">
                  {t('searchResults.filters.title')}
                </h2>
              </div>

              {/* Type de voiture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('searchResults.filters.carType.label')}
                </label>
                <select 
                  name="carType"
                  value={filters.carType}
                  onChange={handleFilterChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                >
                  <option value="">{t('searchResults.filters.carType.all')}</option>
                  <option value="Berline">{t('searchResults.filters.carType.options.berline')}</option>
                  <option value="SUV 5 places">{t('searchResults.filters.carType.options.suv5')}</option>
                  <option value="SUV 7 places">{t('searchResults.filters.carType.options.suv7')}</option>
                  <option value="Pickup">{t('searchResults.filters.carType.options.pickup')}</option>
                  <option value="Premium">{t('searchResults.filters.carType.options.premium')}</option>
                </select>
              </div>

              {/* Nombre de sièges */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('searchResults.filters.seats.label')}
                </label>
                <select 
                  name="seats"
                  value={filters.seats}
                  onChange={handleFilterChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                >
                  <option value="">{t('searchResults.filters.seats.all')}</option>
                  <option value="2">{t('searchResults.filters.seats.options.2')}</option>
                  <option value="4">{t('searchResults.filters.seats.options.4')}</option>
                  <option value="5">{t('searchResults.filters.seats.options.5')}</option>
                  <option value="7">{t('searchResults.filters.seats.options.7')}</option>
                </select>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('searchResults.filters.destination.label')}
                </label>
                <select
                  value={filters.destination || ''}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                >
                  <option value="">{t('searchResults.filters.destination.all')}</option>
                  {[...flexDestinations, ...require4x4Destinations].map((destination, index) => (
                    <option 
                      key={index} 
                      value={destination}
                    >
                      {destination}
                    </option>
                  ))}
                </select>
                {filters.destination && 
                  require4x4Destinations.includes(filters.destination) && (
                  <p className="text-sm text-yellow-600 mt-2">
                    {t('searchResults.filters.destination.requirement4x4')}
                  </p>
                )}
              </div>

              {/* Options supplémentaires */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('searchResults.filters.options.label')}
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasAC"
                    checked={filters.hasAC}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <label>{t('searchResults.filters.options.ac')}</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasRearCamera"
                    checked={filters.hasRearCamera}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <label>{t('searchResults.filters.options.rearCamera')}</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasTouchScreen"
                    checked={filters.hasTouchScreen}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <label>{t('searchResults.filters.options.touchScreen')}</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is4x4"
                    checked={filters.is4x4}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <label>{t('searchResults.filters.options.fourByFour')}</label>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Mobile Overlay */}
          {isMobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
              <div className="absolute inset-x-0 top-0 h-screen bg-white overflow-y-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      {t('searchResults.filters.title')}
                    </h2>
                    <button 
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-6">
                    {/* Type de voiture */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('searchResults.filters.carType.label')}
                      </label>
                      <select 
                        name="carType"
                        value={filters.carType}
                        onChange={handleFilterChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">{t('searchResults.filters.carType.all')}</option>
                        <option value="Berline">{t('searchResults.filters.carType.options.berline')}</option>
                        <option value="SUV 5 places">{t('searchResults.filters.carType.options.suv5')}</option>
                        <option value="SUV 7 places">{t('searchResults.filters.carType.options.suv7')}</option>
                        <option value="Pickup">{t('searchResults.filters.carType.options.pickup')}</option>
                      </select>
                    </div>

                    {/* Nombre de sièges */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('searchResults.filters.seats.label')}
                      </label>
                      <select 
                        name="seats"
                        value={filters.seats}
                        onChange={handleFilterChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">{t('searchResults.filters.seats.all')}</option>
                        <option value="2">{t('searchResults.filters.seats.options.2')}</option>
                        <option value="4">{t('searchResults.filters.seats.options.4')}</option>
                        <option value="5">{t('searchResults.filters.seats.options.5')}</option>
                        <option value="7">{t('searchResults.filters.seats.options.7')}</option>
                      </select>
                    </div>

                    {/* Destination */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('searchResults.filters.destination.label')}
                      </label>
                      <select 
                        name="destination"
                        value={filters.destination || ''}
                        onChange={(e) => handleDestinationChange(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">{t('searchResults.filters.destination.all')}</option>
                        {[...flexDestinations, ...require4x4Destinations].map((destination, index) => (
                          <option 
                            key={index} 
                            value={destination}
                          >
                            {destination}
                          </option>
                        ))}
                      </select>
                      {filters.destination && 
                        require4x4Destinations.includes(filters.destination) && (
                        <p className="text-sm text-yellow-600 mt-2">
                          {t('searchResults.filters.destination.requirement4x4')}
                        </p>
                      )}
                    </div>

                    {/* Options supplémentaires */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('searchResults.filters.options.label')}
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="hasAC"
                          checked={filters.hasAC}
                          onChange={handleFilterChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-600">{t('searchResults.filters.options.ac')}</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="hasRearCamera"
                          checked={filters.hasRearCamera}
                          onChange={handleFilterChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-600">{t('searchResults.filters.options.rearCamera')}</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="hasTouchScreen"
                          checked={filters.hasTouchScreen}
                          onChange={handleFilterChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-600">{t('searchResults.filters.options.touchScreen')}</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="is4x4"
                          checked={filters.is4x4}
                          onChange={handleFilterChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-600">{t('searchResults.filters.options.fourByFour')}</label>
                      </div>
                    </div>

                    {/* Bouton Appliquer */}
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      {t('searchResults.filters.apply')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {filteredCars.length === 0 ? (
              <div className="text-center text-gray-600 text-xl py-12">
                {t('searchResults.noResults')}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <motion.div
                    key={car.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl"
                    onClick={() => navigate(`/car/${car.id}`)}
                  >
                    <div className="relative">
                      <img
                        src={car.imageUrl}
                        alt={car.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        {car.carType}
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                      {/* Car Name */}
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{car.name}</h3>

                      {/* Price */}
                      <div className="text-blue-600 font-bold text-lg mb-4">
                        {car.pricePerDay} FCFA<span className="text-sm font-normal text-gray-600">{t('searchResults.carCard.pricePerDay')}</span>
                      </div>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <FaUsers className="mr-2" />
                          <span>{car.seats} {t('searchResults.carCard.seats')}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMountain className="mr-2" />
                          <span>{car.is4x4 ? t('searchResults.carCard.driveType.fourByFour') : t('searchResults.carCard.driveType.twoByFour')}</span>
                        </div>
                      </div>

                      {/* Réserver Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-white text-blue-600 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center font-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/car/${car.id}`);
                        }}
                      >
                        {t('searchResults.carCard.bookButton')} <MdArrowForward className="ml-2 text-xl" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
