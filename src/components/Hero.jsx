import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  MapPinIcon,
  CalendarDaysIcon,
  TruckIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { fr } from 'date-fns/locale';

const locations = [
  "Douala",
  "Yaoundé",
  "Bafoussam",
  "Bamenda",
  "Garoua",
  "Maroua",
  "Ngaoundéré",
  "Bertoua",
  "Buea",
  "Kribi",
  "Limbé",
  "Ebolowa",
  "Edéa",
  "Kumba",
  "Foumban"
];

const carTypes = [
  "Berline",
  "SUV 5 places",
  "SUV 7 places",
  "Pickup",
  "Premium"
];

const Hero = () => {
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [carType, setCarType] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirection vers la page de recherche avec les paramètres
    navigate('/search', { 
      state: { 
        pickupLocation,
        dropoffLocation,
        pickupDate,
        dropoffDate,
        carType
      }
    });
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: 'url("/img/hero/hero-bg.jpg")' }}
      ></div>
      <div className="container mx-auto px-4 pt-32 pb-20 relative">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 z-10" data-aos="fade-right" data-aos-duration="1000">
            <div className="text-center lg:text-left">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#132676] leading-tight mb-6"
                data-aos="fade-right" 
                data-aos-duration="1000" 
                data-aos-delay="100"
              >
                Voyagez en Toute Sérénité avec nos Chauffeurs Professionnels
              </h1>
              <p 
                className="text-[#596198] text-lg mb-8 max-w-2xl"
                data-aos="fade-right" 
                data-aos-duration="1000" 
                data-aos-delay="200"
              >
                Découvrez le Cameroun en toute sécurité avec notre service de location voiture avec chauffeur. 
                Des conducteurs expérimentés, des véhicules confortables et un service disponible 24/7 
                pour tous vos déplacements.
              </p>
            </div>
            <form className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto" onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Ville de départ */}
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#303a9c]" />
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-[#303a9c]"
                  >
                    <option value="">Ville de départ</option>
                    {locations.map((loc, index) => (
                      <option key={index} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Ville d'arrivée */}
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#303a9c]" />
                  <select
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-[#303a9c]"
                  >
                    <option value="">Ville d'arrivée</option>
                    {locations.map((loc, index) => (
                      <option key={index} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Date de prise en charge */}
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#303a9c]" />
                  <DatePicker
                    selected={pickupDate}
                    onChange={(date) => setPickupDate(date)}
                    className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-[#303a9c]"
                    placeholderText="Date de départ"
                    locale={fr}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                  />
                </div>

                {/* Date de retour */}
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#303a9c]" />
                  <DatePicker
                    selected={dropoffDate}
                    onChange={(date) => setDropoffDate(date)}
                    className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-[#303a9c]"
                    placeholderText="Date de retour"
                    locale={fr}
                    dateFormat="dd/MM/yyyy"
                    minDate={pickupDate || new Date()}
                  />
                </div>
              </div>

              {/* Type de voiture */}
              <div className="mt-4 relative">
                <TruckIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#303a9c]" />
                <select
                  value={carType}
                  onChange={(e) => {
                    setCarType(e.target.value);
                    // Redirection immédiate si un type est sélectionné
                    if (e.target.value) {
                      navigate('/search', { 
                        state: { 
                          pickupLocation,
                          dropoffLocation,
                          pickupDate,
                          dropoffDate,
                          carType: e.target.value
                        }
                      });
                    }
                  }}
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-[#303a9c]"
                >
                  <option value="">Type de voiture</option>
                  {carTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Bouton de recherche */}
              <div className="mt-4">
                <button type="submit" className="w-full bg-[#303a9c] hover:bg-[#232b6c] text-white py-3 rounded-lg transition-colors">
                  Rechercher
                </button>
              </div>
            </form>
          </div>
          <div className="w-full lg:w-1/2 relative" data-aos="fade-left" data-aos-duration="1000">
            <img 
              src="/img/hero/car.png" 
              alt="Luxury Car" 
              className="w-full h-auto object-contain z-10 relative"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
