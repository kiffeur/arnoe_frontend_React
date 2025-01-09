import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCars } from '../../services/api';
import { FaPlus, FaCar, FaList } from 'react-icons/fa';

const Dashboard = () => {
  const [availableCars, setAvailableCars] = useState([]);
  const [showCarsList, setShowCarsList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const cars = await getAllCars();
      const available = cars.filter(car => car.isAvailable);
      setAvailableCars(available);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors du chargement des voitures");
      setLoading(false);
    }
  };

  const handleShowCars = () => {
    if (!showCarsList) {
      fetchCars();
    }
    setShowCarsList(!showCarsList);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Carte pour ajouter une voiture */}
          <Link to="/admin/add-car" className="transform hover:scale-105 transition-transform duration-200">
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <FaPlus className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Ajouter une voiture</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Ajouter une nouvelle voiture à la flotte
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Carte pour voir les voitures disponibles */}
          <div 
            className="transform hover:scale-105 transition-transform duration-200 cursor-pointer"
            onClick={handleShowCars}
          >
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <FaCar className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Voitures disponibles
                      {!loading && !showCarsList && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {availableCars.length}
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {loading ? 'Chargement...' : 'Voir les voitures disponibles'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carte pour la liste des réservations */}
          <div className="transform hover:scale-105 transition-transform duration-200">
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <FaList className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Réservations</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Gérer les réservations en cours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des voitures disponibles */}
        {showCarsList && (
          <div className="mt-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Liste des voitures disponibles</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {loading ? (
                  <div className="p-4 text-center text-gray-500">Chargement...</div>
                ) : error ? (
                  <div className="p-4 text-center text-red-500">{error}</div>
                ) : availableCars.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">Aucune voiture disponible</div>
                ) : (
                  availableCars.map((car) => (
                    <div key={car._id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 h-16 w-16">
                          <img 
                            className="h-16 w-16 rounded-lg object-cover" 
                            src={car.mainPhoto} 
                            alt={car.name} 
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900">{car.name}</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {car.seats} sièges • {car.transmission} • {car.fuelType}
                          </p>
                        </div>
                        <div className="text-green-600 font-semibold">
                          {car.dailyPrice}€/jour
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
