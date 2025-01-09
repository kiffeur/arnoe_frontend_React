import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGasPump, FaCar, FaUsers, FaStar, FaSnowflake, FaCamera, FaTablet, FaMountain, FaFilter, FaAirFreshener } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';
import { getAllCars } from '../services/api';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SearchResults = () => {
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
    hasAC: false,
    hasRearCamera: false,
    hasTouchScreen: false,
    is4x4: false,
    priceRange: [0, 1000000]
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const allCars = await getAllCars();
        console.log('Voitures reçues:', allCars); // Log des voitures reçues
        setCars(allCars);
        
        // Si on vient de CarTypes, appliquer le filtre immédiatement
        if (searchParams.carType && searchParams.fromCarTypes) {
          console.log('Filtre appliqué:', searchParams.carType); // Log du filtre
          setFilters(prev => ({
            ...prev,
            carType: searchParams.carType
          }));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Une erreur est survenue lors du chargement des voitures');
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchParams]);

  // Mettre à jour les filtres quand les paramètres de recherche changent
  useEffect(() => {
    if (searchParams.carType && searchParams.fromCarTypes) {
      console.log('Filtre appliqué:', searchParams.carType); // Log du filtre
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
    console.log('Changing filter:', name, value); // Debug
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const filteredCars = cars.filter(car => {
    console.log('Filtrage de la voiture:', car);
    console.log('Filtres actuels:', filters);
    
    // Filtre par type de voiture
    if (filters.carType) {
      const carTypeValue = car.carType ? car.carType.toLowerCase() : '';
      const filterTypeValue = filters.carType.toLowerCase();
      console.log('Type de la voiture (lower):', carTypeValue);
      console.log('Type recherché (lower):', filterTypeValue);
      
      if (!carTypeValue.includes(filterTypeValue) && !filterTypeValue.includes(carTypeValue)) {
        return false;
      }
    }

    // Filtre par nombre de sièges
    if (filters.seats && parseInt(car.seats) !== parseInt(filters.seats)) {
      return false;
    }

    // Filtre par transmission
    if (filters.transmission && car.transmission.toLowerCase() !== filters.transmission.toLowerCase()) {
      return false;
    }

    // Filtre par type de carburant
    if (filters.fuelType && car.fuelType.toLowerCase() !== filters.fuelType.toLowerCase()) {
      return false;
    }

    // Filtres des options
    if (filters.hasAC && !car.hasAC) return false;
    if (filters.hasRearCamera && !car.hasRearCamera) return false;
    if (filters.hasTouchScreen && !car.hasTouchScreen) return false;
    if (filters.is4x4 && !car.is4x4) return false;

    // Filtre par prix
    if (car.pricePerDay < filters.priceRange[0] || car.pricePerDay > filters.priceRange[1]) {
      return false;
    }

    return true;
  });

  console.log('Voitures filtrées:', filteredCars); // Log des voitures filtrées

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
            {isMobileFilterOpen ? 'Masquer les filtres' : 'Afficher les filtres'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0" data-aos="fade-right" data-aos-delay="100">
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <FaFilter className="text-blue-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-800">Filtres</h2>
              </div>

              {/* Type de voiture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de voiture</label>
                <select 
                  name="carType"
                  value={filters.carType}
                  onChange={handleFilterChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Tous les types</option>
                  <option value="Berline">Berline</option>
                  <option value="SUV 5 places">SUV 5 places</option>
                  <option value="SUV 7 places">SUV 7 places</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              {/* Nombre de sièges */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de sièges</label>
                <select 
                  name="seats"
                  value={filters.seats}
                  onChange={handleFilterChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Tous</option>
                  <option value="2">2 places</option>
                  <option value="4">4 places</option>
                  <option value="5">5 places</option>
                  <option value="7">7 places</option>
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                <select 
                  name="transmission"
                  value={filters.transmission}
                  onChange={handleFilterChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Toutes</option>
                  <option value="Manuelle">Manuelle</option>
                  <option value="Automatique">Automatique</option>
                </select>
              </div>

              {/* Type de carburant */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carburant</label>
                <select 
                  name="fuelType"
                  value={filters.fuelType}
                  onChange={handleFilterChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Tous</option>
                  <option value="Essence">Essence</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>

              {/* Options supplémentaires */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasAC"
                    checked={filters.hasAC}
                    onChange={handleFilterChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-600">Climatisation</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasRearCamera"
                    checked={filters.hasRearCamera}
                    onChange={handleFilterChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-600">Caméra de recul</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasTouchScreen"
                    checked={filters.hasTouchScreen}
                    onChange={handleFilterChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-600">Écran tactile</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is4x4"
                    checked={filters.is4x4}
                    onChange={handleFilterChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-600">4x4</label>
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
                    <h2 className="text-xl font-bold text-gray-800">Filtres</h2>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type de voiture</label>
                      <select 
                        name="carType"
                        value={filters.carType}
                        onChange={handleFilterChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Tous les types</option>
                        <option value="Berline">Berline</option>
                        <option value="SUV 5 places">SUV 5 places</option>
                        <option value="SUV 7 places">SUV 7 places</option>
                        <option value="Pickup">Pickup</option>
                      </select>
                    </div>

                    {/* Nombre de sièges */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de sièges</label>
                      <select 
                        name="seats"
                        value={filters.seats}
                        onChange={handleFilterChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Tous</option>
                        <option value="2">2 places</option>
                        <option value="4">4 places</option>
                        <option value="5">5 places</option>
                        <option value="7">7 places</option>
                      </select>
                    </div>

                    {/* Transmission */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                      <select 
                        name="transmission"
                        value={filters.transmission}
                        onChange={handleFilterChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Toutes</option>
                        <option value="Manuelle">Manuelle</option>
                        <option value="Automatique">Automatique</option>
                      </select>
                    </div>

                    {/* Type de carburant */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Carburant</label>
                      <select 
                        name="fuelType"
                        value={filters.fuelType}
                        onChange={handleFilterChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Tous</option>
                        <option value="Essence">Essence</option>
                        <option value="Diesel">Diesel</option>
                      </select>
                    </div>

                    {/* Options supplémentaires */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="hasAC"
                          checked={filters.hasAC}
                          onChange={handleFilterChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-600">Climatisation</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="hasRearCamera"
                          checked={filters.hasRearCamera}
                          onChange={handleFilterChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-600">Caméra de recul</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="hasTouchScreen"
                          checked={filters.hasTouchScreen}
                          onChange={handleFilterChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-600">Écran tactile</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="is4x4"
                          checked={filters.is4x4}
                          onChange={handleFilterChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-600">4x4</label>
                      </div>
                    </div>

                    {/* Bouton Appliquer */}
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      Appliquer les filtres
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
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
                      {car.pricePerDay} FCFA<span className="text-sm font-normal text-gray-600"> / Jour</span>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <FaUsers className="mr-2" />
                        <span>{car.seats} Places</span>
                      </div>
                      <div className="flex items-center">
                        <FaCar className="mr-2" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center">
                        <FaGasPump className="mr-2" />
                        <span>{car.fuelType}</span>
                      </div>
                      <div className="flex items-center">
                        <FaMountain className="mr-2" />
                        <span>{car.is4x4 ? '4x4' : '2x4'}</span>
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
                      Réserver <MdArrowForward className="ml-2 text-xl" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
