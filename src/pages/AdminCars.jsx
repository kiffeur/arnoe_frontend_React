import React, { useState, useEffect } from 'react';
import { FaCar, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getAllCars } from '../services/api';

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const carsData = await getAllCars();
      setCars(carsData);
    } catch (error) {
      console.error('Erreur lors du chargement des voitures:', error);
    }
  };

  const filteredCars = cars.filter(car => {
    if (filter === 'available') return car.isAvailable;
    if (filter === 'unavailable') return !car.isAvailable;
    return true;
  });

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Voitures</h1>
          
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les voitures</option>
              <option value="available">Disponibles</option>
              <option value="unavailable">Non disponibles</option>
            </select>

            <Link
              to="/admin/cars/add"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Ajouter une voiture
            </Link>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Voitures</p>
                <h3 className="text-3xl font-bold text-gray-800">{cars.length}</h3>
              </div>
              <FaCar className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Voitures Disponibles</p>
                <h3 className="text-3xl font-bold text-green-600">
                  {cars.filter(car => car.isAvailable).length}
                </h3>
              </div>
              <FaCar className="w-12 h-12 text-green-200" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${
                  car.isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {car.isAvailable ? (
                    <div className="flex items-center">
                      <FaCheck className="w-4 h-4 mr-1" />
                      <span>Disponible</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <FaTimes className="w-4 h-4 mr-1" />
                      <span>Indisponible</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{car.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-gray-600">
                    <FaCar className="inline-block mr-2" />
                    {car.type}
                  </div>
                  <div className="text-blue-600 font-bold">
                    {car.pricePerDay} FCFA/jour
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>Places: {car.seats}</div>
                  <div>Portes: {car.doors}</div>
                  <div>Transmission: {car.transmission}</div>
                  <div>Carburant: {car.fuelType}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCars;
