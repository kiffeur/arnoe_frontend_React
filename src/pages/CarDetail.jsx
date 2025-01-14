import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGasPump, FaCar, FaUsers, FaStar, FaSnowflake, FaCamera, FaTablet, FaMountain, FaMapMarkerAlt, FaCalendarAlt, FaPhoneAlt, FaEnvelope, FaCog } from 'react-icons/fa';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';
import TermsModal from '../components/TermsModal';
import { getCarById, getAllCars } from '../services/api';
import { createBooking } from '../services/bookingService';
import { translateWithCache } from '../services/translationService';
import { cameroonCities } from '../data/cities';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { toast } from 'react-toastify';
import { translateDescription } from '../utils/descriptionTranslations';

const CarDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [translatedDescription, setTranslatedDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [similarCars, setSimilarCars] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [mobileOperator, setMobileOperator] = useState('');
  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pickupDate: '',
    dropoffDate: '',
    pickupQuarter: '',
    pickupCity: 'Douala',
    dropoffCity: 'Douala',
    destination: ''
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const carData = await getCarById(id);
        if (!carData) {
          toast.error(t('carDetail.errors.loadingError'));
          return;
        }
        setCar(carData);
        
        // Fetch similar cars
        const allCars = await getAllCars();
        const similar = allCars
          .filter(c => c.category === carData.category && c.id !== parseInt(id))
          .slice(0, 3);
        setSimilarCars(similar);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading car:', error);
        toast.error(t('carDetail.errors.loadingError'));
      }
    };
    fetchData();
  }, [id, t]);

  useEffect(() => {
    if (car?.description) {
      const translated = translateDescription(car.description, i18n.language);
      console.log('Original Description:', car.description);
      console.log('Current Language:', i18n.language);
      console.log('Translated Description:', translated);
      setTranslatedDescription(translated);
    }
  }, [car?.description, i18n.language]);

  useEffect(() => {
    // Convertir les dates du localStorage en objets Date si nécessaire
    const pickupDateFromStorage = localStorage.getItem('searchPickupDate');
    const dropoffDateFromStorage = localStorage.getItem('searchDropoffDate');
    const destinationFromStorage = localStorage.getItem('searchDestination');

    console.log('Pickup Date from Storage:', pickupDateFromStorage);
    console.log('Dropoff Date from Storage:', dropoffDateFromStorage);
    console.log('Destination from Storage:', destinationFromStorage);

    setBookingForm(prev => ({
      ...prev,
      ...(pickupDateFromStorage && { pickupDate: pickupDateFromStorage }),
      ...(dropoffDateFromStorage && { dropoffDate: dropoffDateFromStorage }),
      ...(destinationFromStorage && { destination: destinationFromStorage })
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'pickupDate' || name === 'dropoffDate') {
      calculateTotalPrice(name === 'pickupDate' ? value : bookingForm.pickupDate, 
                         name === 'dropoffDate' ? value : bookingForm.dropoffDate);
    }
  };

  const calculateTotalPrice = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      const total = Number(car.pricePerDay) * diffDays;
      
      console.log('Price Calculation Debug:', {
        startDate,
        endDate,
        pricePerDay: car.pricePerDay,
        diffDays,
        total
      });

      setTotalPrice(total);
      return total;
    }
    setTotalPrice(0);
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Calcul explicite du prix total avant soumission
    const calculatedTotalPrice = calculateTotalPrice(
      bookingForm.pickupDate, 
      bookingForm.dropoffDate
    );

    try {
      // Call booking API
      const response = await createBooking({
        ...bookingForm,
        paymentMethod: paymentMethod === 'mobile' 
          ? `mobile_${mobileOperator}` 
          : paymentMethod === 'creditCard'
          ? 'credit_card'
          : paymentMethod === 'international' 
          ? mobileOperator === 'western_union' ? 'western_union' : 'taptap_send'
          : 'bank_transfer',
        carId: parseInt(car.id),
        startDate: new Date(bookingForm.pickupDate).toISOString(),
        endDate: new Date(bookingForm.dropoffDate).toISOString(),
        userId: 1,
        address: bookingForm.pickupQuarter,
        totalPrice: calculatedTotalPrice
      });

      console.log('Booking Details:', {
        paymentMethod: paymentMethod === 'mobile' 
          ? `mobile_${mobileOperator}` 
          : paymentMethod === 'creditCard'
          ? 'credit_card'
          : paymentMethod === 'international' 
          ? mobileOperator === 'western_union' ? 'western_union' : 'taptap_send'
          : 'bank_transfer',
        carId: parseInt(car.id),
        startDate: new Date(bookingForm.pickupDate).toISOString(),
        endDate: new Date(bookingForm.dropoffDate).toISOString(),
        userId: 1,
        address: bookingForm.pickupQuarter,
        totalPrice: calculatedTotalPrice
      });

      // Redirect to booking summary page
      navigate('/booking-summary', { 
        state: { 
          bookingData: {
            ...bookingForm,
            carId: car.id,
            carName: car.name,
            carImage: car.imageUrl,
            totalPrice: calculatedTotalPrice,
            pricePerDay: car.pricePerDay,
            paymentMethod,
            paymentDetails: paymentMethod === 'mobile' ? 
              `Mobile Money (${mobileOperator === 'orange' ? 'Orange Money' : 'MTN Mobile Money'})` : 
              paymentMethod === 'creditCard' ? 'Carte de crédit' : 
              paymentMethod === 'international' ? 
                mobileOperator === 'western_union' ? 'Western Union' : 'Taptap Send' : 
                t('carDetail.bankTransfer'),
            bookingReference: response.id || 'REF-' + Date.now()
          } 
        } 
      });

      toast.success(t('carDetail.success.booking'));
    } catch (error) {
      setIsSubmitting(false);
      console.error('Booking submission error:', error);
      
      // Message d'erreur personnalisé
      const errorMessage = error.message || 'Une erreur est survenue lors de la réservation';
      
      // Affichage du toast avec message détaillé
      toast.warn(`${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        style: {
          backgroundColor: '#D35400',  // Un orange plus foncé (type Pumpkin)
          color: 'white'
        },
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Log détaillé de l'erreur
      console.log('Détails complets de l\'erreur :', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const carFeatures = [
    { icon: FaUsers, value: `${car?.seats} ${t('carDetail.features.seats')}` },
    { icon: FaCar, value: car?.transmission },
    { icon: FaGasPump, value: car?.fuelType },
    { icon: FaMountain, value: car?.is4x4 ? '4x4' : '2x4' },
    { icon: FaSnowflake, value: car?.hasAC ? t('carDetail.features.yes') : t('carDetail.features.no') },
    { icon: FaCamera, value: car?.hasRearCamera ? t('carDetail.features.yes') : t('carDetail.features.no') },
    { icon: FaTablet, value: car?.hasTouchScreen ? t('carDetail.features.yes') : t('carDetail.features.no') }
  ];

  const images = [
    {
      original: car?.imageUrl,
      thumbnail: car?.imageUrl,
    },
    ...(car?.images ? car.images.map(image => ({
      original: image,
      thumbnail: image,
    })) : [])
  ];

  const handleTermsClose = () => {
    setShowTerms(false);
    setTermsAccepted(true);
  };

  const handleSimilarCarClick = (similarCarId) => {
    setLoading(true);
    navigate(`/car/${similarCarId}`);
  };

  if (loading || !car) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Spacer for navbar */}
      <div className="h-20"></div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative">
          {/* Hero Section with gradient */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-8 flex flex-col sm:flex-row justify-between items-center">
            <div>
              <div className="flex items-center gap-2 text-white mb-2">
                <FaStar className="text-yellow-400" />
                <span className="text-sm">4.8</span>
                <span className="text-sm text-white/80">(288)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{car.name}</h1>
            </div>
            <div className="mt-4 sm:mt-0 text-center sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {car.pricePerDay} <span className="text-lg font-normal">{t('carDetail.perDay')}</span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            {/* Left column */}
            <div className="bg-white p-6 shadow-lg">
              {/* Image gallery */}
              <ImageGallery items={images} showFullscreenButton={true} showPlayButton={false} />

              {/* Description */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">{t('carDetail.aboutVehicle')}</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {car.category ? 
                    t(`carDetail.descriptions.${car.category.toLowerCase()}`) : 
                    translatedDescription || car.description
                  }
                </p>

                {/* Features */}
                <div className="grid grid-cols-4 gap-4">
                  {carFeatures.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <feature.icon className="text-blue-600 text-xl mb-2" />
                      <span className="text-sm">{feature.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Booking form */}
            <div>
              <div className="bg-white shadow-lg overflow-hidden">
                <div className="p-6">
                  <BookingForm 
                    car={car} 
                    bookingForm={bookingForm} 
                    handleInputChange={handleInputChange} 
                    handleSubmit={handleSubmit} 
                    termsAccepted={termsAccepted} 
                    setTermsAccepted={setTermsAccepted} 
                    paymentMethod={paymentMethod} 
                    setPaymentMethod={setPaymentMethod} 
                    mobileOperator={mobileOperator} 
                    setMobileOperator={setMobileOperator} 
                    totalPrice={totalPrice}
                    setShowTerms={setShowTerms}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Cars Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{t('carDetail.similarCars')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarCars
            .filter(similarCar => similarCar.id !== parseInt(id))
            .map(similarCar => (
            <div 
              key={similarCar.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
              onClick={() => handleSimilarCarClick(similarCar.id)}
            >
              <div className="relative">
                <img 
                  src={similarCar.imageUrl} 
                  alt={similarCar.name} 
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-4">
                {/* Ratings */}
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">2 {t('carDetail.reviews')}</span>
                </div>
                
                {/* Car Name */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{similarCar.name}</h3>
                
                {/* Price */}
                <div className="text-blue-600 font-bold text-lg mb-4">
                  {similarCar.pricePerDay} FCFA<span className="text-sm font-normal text-gray-600">{t('carDetail.perDay')}</span>
                </div>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <FaUsers className="mr-2" />
                    <span>{similarCar.seats} {t('carDetail.features.seats')}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCog className="mr-2" />
                    <span>{similarCar.transmission}</span>
                  </div>
                  <div className="flex items-center">
                    <FaGasPump className="mr-2" />
                    <span>{similarCar.fuelType}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCar className="mr-2" />
                    <span>{similarCar.doors} {t('carDetail.doors')}</span>
                  </div>
                </div>
                
                {/* Book Now Button */}
                <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  {t('carDetail.bookNow')} <MdArrowForward className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terms of use modal */}
      <TermsModal 
        isOpen={showTerms} 
        onClose={handleTermsClose}
      />
      <Navbar />
      <Footer />
    </div>
  );
};

export default CarDetail;
