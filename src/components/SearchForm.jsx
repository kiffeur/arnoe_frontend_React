import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { fr } from 'date-fns/locale';

const locations = [
  "Paris, France 🗼",
  "Lyon, France 🦁",
  "Marseille, France ⚓",
  "Bordeaux, France 🍷",
  "Nice, France 🏖"
];

const carTypes = [
  "Tous les types 🚗",
  "Berline 🚘",
  "SUV 🚙",
  "Limousine 🚖",
  "Cabriolet 🏎",
  "Pickup 🛻",
  "Compacte 🚐"
];

const SearchForm = () => {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [carType, setCarType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ location, pickupDate, returnDate, carType });
  };

  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-[#14162E] text-6xl font-bold mb-8">
        Search, Book<br />
        <span className="relative">
          & Rent Car
          <span className="absolute bottom-1 left-0 w-32 h-1 bg-[#FF4D30]"></span>
        </span>
        <br />
        Easily
      </h1>

      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 flex flex-wrap gap-6"
      >
        {/* Location Select */}
        <div className="flex-1 min-w-[240px] group">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📍</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-white text-gray-700 text-lg focus:outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 appearance-none transition-all hover:border-[#FF4D30]"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23999999\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1rem'
              }}
            >
              <option value="">Choisir une ville</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pickup Date */}
        <div className="flex-1 min-w-[240px] group">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📅</span>
            <DatePicker
              selected={pickupDate}
              onChange={(date) => setPickupDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Date de départ"
              locale={fr}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-700 text-lg focus:outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 transition-all hover:border-[#FF4D30]"
              minDate={new Date()}
            />
          </div>
        </div>

        {/* Return Date */}
        <div className="flex-1 min-w-[240px] group">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📅</span>
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Date de retour"
              locale={fr}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-700 text-lg focus:outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 transition-all hover:border-[#FF4D30]"
              minDate={pickupDate || new Date()}
            />
          </div>
        </div>

        {/* Car Type Select */}
        <div className="flex-1 min-w-[240px] group">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🚗</span>
            <select
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-white text-gray-700 text-lg focus:outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 appearance-none transition-all hover:border-[#FF4D30]"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23999999\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1rem'
              }}
            >
              <option value="">Type de véhicule</option>
              {carTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-4 bg-[#FF4D30] text-white rounded-xl text-lg font-semibold hover:bg-[#ff644a] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg active:transform-none flex items-center justify-center gap-2"
        >
          <span>Rechercher</span>
          <span className="text-xl">🔍</span>
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
