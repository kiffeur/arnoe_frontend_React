import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaImage, FaImages, FaMoneyBill, FaCalendar, FaArrowLeft } from 'react-icons/fa';
import { addCar } from '../../services/api';
import Toast from '../../components/Toast';

const AddCar = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');
  const [showAddAnother, setShowAddAnother] = useState(false);

  const initialFormState = {
    name: '',
    year: currentYear,
    pricePerDay: '',
    imageUrl: '',
    images: [],
    description: '',
    seats: '',
    hasAC: false,
    hasRearCamera: false,
    hasTouchScreen: false,
    is4x4: false,
    carType: 'SUV 5 places',
    fuelType: 'Essence',
    transmission: 'Automatique',
    isAvailable: true
  };

  const [formData, setFormData] = useState(initialFormState);

  const resetForm = () => {
    setFormData(initialFormState);
    setShowAddAnother(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const carData = {
        ...formData,
        year: parseInt(formData.year),
        pricePerDay: parseFloat(formData.pricePerDay),
        seats: parseInt(formData.seats),
        images: formData.images.split(',').map(url => url.trim()).filter(url => url !== '')
      };

      await addCar(carData);
      setShowToast(true);
      setShowAddAnother(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      setError(error.message);
      setShowAddAnother(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4 md:p-8">
      <Toast
        message={error || "Voiture ajoutée avec succès !"}
        type={error ? "error" : "success"}
        isVisible={showToast || !!error}
        onClose={() => {
          setShowToast(false);
          setError('');
        }}
      />

      <div className="flex justify-between items-center mb-6">
        {!showAddAnother && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaArrowLeft />
            <span>Retour au tableau de bord</span>
          </motion.button>
        )}

        {showAddAnother && (
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetForm}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors"
            >
              Ajouter une autre voiture
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/admin/dashboard')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
            >
              Retour au tableau de bord
            </motion.button>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-2">
            Ajouter une nouvelle voiture
          </h2>
          <p className="text-gray-600">Remplissez les informations du véhicule</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nom de la voiture */}
            <div className="relative">
              <FaCar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom de la voiture"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Année */}
            <div className="relative">
              <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                required
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Prix par jour */}
            <div className="relative">
              <FaMoneyBill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                placeholder="Prix par jour"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Image principale */}
            <div className="relative">
              <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Lien de l'image principale"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Images secondaires */}
            <div className="relative">
              <FaImages className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="images"
                value={formData.images}
                onChange={handleChange}
                placeholder="Liens des images secondaires (séparés par des virgules)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Nombre de sièges */}
            <div className="relative">
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                placeholder="Nombre de sièges"
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description de la voiture"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 min-h-[120px]"
              required
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasAC"
                checked={formData.hasAC}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span>Climatiseur</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasRearCamera"
                checked={formData.hasRearCamera}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span>Caméra arrière</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasTouchScreen"
                checked={formData.hasTouchScreen}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span>Écran tactile</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is4x4"
                checked={formData.is4x4}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span>4x4</span>
            </label>
          </div>

          {/* Type de voiture, carburant et transmission */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <select
              name="carType"
              value={formData.carType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
              required
            >
              <option value="SUV 5 places">SUV 5 places</option>
              <option value="SUV 7 places">SUV 7 places</option>
              <option value="Berline">Berline</option>
              <option value="Pickup">Pickup</option>
            </select>

            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
              required
            >
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybride">Hybride</option>
              <option value="Électrique">Électrique</option>
            </select>

            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
              required
            >
              <option value="Automatique">Automatique</option>
              <option value="Manuel">Manuel</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Ajouter la voiture
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCar;
