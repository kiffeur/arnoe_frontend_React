import React, { useEffect } from 'react';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMobileAlt,  
  FaCreditCard,  
  FaWallet,
  FaGlobeAmericas      
} from 'react-icons/fa';
import { cameroonCities } from '../data/cities';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { fr } from 'date-fns/locale';
import { FcSimCardChip } from 'react-icons/fc';

const BookingForm = ({ 
  car,
  bookingForm,
  handleInputChange,
  handleSubmit,
  termsAccepted,
  setTermsAccepted,
  paymentMethod,
  setPaymentMethod,
  mobileOperator,
  setMobileOperator,
  totalPrice,
  setTotalPrice, // Ajout de la fonction setTotalPrice
  setShowTerms,
  isSubmitting,
  selectedDestination, // Nouvelle prop pour la destination
  preSelectedDestination // Nouvelle prop pour la destination pré-sélectionnée
}) => {
  const { t, i18n } = useTranslation();

  // Extraire uniquement les noms des villes
  const cameroonCityNames = cameroonCities.map(city => city.name)
    .filter(city => !['Maroua', 'Ngaoundéré', 'Garoua'].includes(city));

  // Vérifier si la voiture est un 4x4
  const is4x4 = car?.is4x4 || false;

  console.log('Car details:', {
    is4x4: is4x4
  });

  // Villes autorisées en fonction du type de voiture et de la destination sélectionnée
  const allowedDestinations = is4x4 
    ? cameroonCityNames
    : ["Douala", "Kribi", "Edéa"];

  console.log('Allowed destinations:', allowedDestinations);

  // Récupérer la destination sélectionnée depuis localStorage
  useEffect(() => {
    const storedDestination = localStorage.getItem('selectedDestination');
    
    if (storedDestination && allowedDestinations.includes(storedDestination)) {
      handleInputChange({
        target: { 
          name: 'destination', 
          value: storedDestination 
        }
      });
    }
  }, []);

  // Utiliser la destination sélectionnée si elle est valide
  useEffect(() => {
    if (selectedDestination && allowedDestinations.includes(selectedDestination)) {
      handleInputChange({
        target: { 
          name: 'destination', 
          value: selectedDestination 
        }
      });
    }
  }, [selectedDestination, is4x4]);

  // Utiliser la destination pré-sélectionnée si elle existe
  useEffect(() => {
    if (preSelectedDestination) {
      handleInputChange({
        target: { 
          name: 'destination', 
          value: preSelectedDestination 
        }
      });
    }
  }, [preSelectedDestination]);

  // Si la destination actuelle n'est pas autorisée, réinitialiser la destination
  useEffect(() => {
    if (bookingForm.destination && !allowedDestinations.includes(bookingForm.destination)) {
      handleInputChange({
        target: {
          name: 'destination',
          value: ''
        }
      });
    }
  }, [car, bookingForm.destination]);

  // Function to get mobile money icon color
  const getMobileMoneyIconColor = () => {
    switch(mobileOperator) {
      case 'mtn':
        return 'text-yellow-500';
      case 'orange':
        return 'text-orange-500';
      default:
        return 'text-gray-400';
    }
  };

  const handleDateChange = (date, name) => {
    handleInputChange({
      target: {
        name,
        value: date ? date.toISOString().split('T')[0] : ''
      }
    });
  };

  // Calculer le prix total
  const calculateTotalPrice = () => {
    if (bookingForm.pickupDate && bookingForm.dropoffDate) {
      const days = Math.ceil((new Date(bookingForm.dropoffDate) - new Date(bookingForm.pickupDate)) / (1000 * 60 * 60 * 24) + 1);
      const total = car.pricePerDay * days;
      return total;
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {t('bookingForm.personalInfo')}
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t('bookingForm.firstName')}
            </label>
            <input
              type="text"
              name="firstName"
              value={bookingForm.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('bookingForm.firstNamePlaceholder')}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t('bookingForm.lastName')}
            </label>
            <input
              type="text"
              name="lastName"
              value={bookingForm.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('bookingForm.lastNamePlaceholder')}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            {t('bookingForm.email')}
          </label>
          <input
            type="email"
            name="email"
            value={bookingForm.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('bookingForm.emailPlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            {t('bookingForm.phone')}
          </label>
          <input
            type="tel"
            name="phone"
            value={bookingForm.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('bookingForm.phonePlaceholder')}
            required
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {t('bookingForm.bookingDetails')}
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t('bookingForm.departureCity')}
            </label>
            <input
              type="text"
              value="Douala"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t('bookingForm.returnCity')}
            </label>
            <input
              type="text"
              value="Douala"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700"
              disabled
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            {t('bookingForm.pickupLocation')}
          </label>
          <input
            type="text"
            name="pickupQuarter"
            value={bookingForm.pickupQuarter}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('bookingForm.pickupLocationPlaceholder')}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            {t('bookingForm.destination')}
          </label>
          <select
            name="destination"
            value={bookingForm.destination || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">{t('bookingForm.selectDestination')}</option>
            {allowedDestinations.map((destination, index) => (
              <option 
                key={index} 
                value={destination}
              >
                {destination}
              </option>
            ))}
          </select>
          {bookingForm.destination && 
            ['Bafoussam', 'Bamenda', 'Bertoua', 'Buea', 'Limbé', 'Ebolowa', 'Kumba', 'Foumban']
              .includes(bookingForm.destination) && (
            <p className="text-sm text-yellow-600 mt-2">
              {t('bookingForm.destination4x4Requirement')}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t('bookingForm.pickupDate')}
            </label>
            <DatePicker
              selected={bookingForm.pickupDate ? new Date(bookingForm.pickupDate) : null}
              onChange={(date) => handleDateChange(date, 'pickupDate')}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholderText={t('bookingForm.pickupDate')}
              dateFormat="dd/MM/yyyy"
              locale={i18n.language === 'fr' ? fr : undefined}
              minDate={new Date()}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t('bookingForm.dropoffDate')}
            </label>
            <DatePicker
              selected={bookingForm.dropoffDate ? new Date(bookingForm.dropoffDate) : null}
              onChange={(date) => handleDateChange(date, 'dropoffDate')}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholderText={t('bookingForm.dropoffDate')}
              dateFormat="dd/MM/yyyy"
              locale={i18n.language === 'fr' ? fr : undefined}
              minDate={bookingForm.pickupDate ? new Date(bookingForm.pickupDate) : new Date()}
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {t('bookingForm.paymentMethod')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mobile Money Option */}
          <label 
            htmlFor="mobile" 
            className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-all duration-300
              ${paymentMethod === 'mobile' 
                ? 'bg-yellow-50 border-yellow-500 text-yellow-700' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-yellow-300'}`}
          >
            <input
              type="radio"
              id="mobile"
              name="paymentMethod"
              value="mobile"
              checked={paymentMethod === 'mobile'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="hidden"
            />
            <FaMobileAlt className="text-4xl mb-3 text-yellow-600" />
            <span className="font-semibold text-sm">
              {t('bookingForm.mobileMoney')}
            </span>
          </label>

          {/* Credit Card Option */}
          <label 
            htmlFor="creditCard" 
            className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-all duration-300
              ${paymentMethod === 'creditCard' 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'}`}
          >
            <input
              type="radio"
              id="creditCard"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === 'creditCard'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="hidden"
            />
            <FaCreditCard className="text-4xl mb-3 text-blue-600" />
            <span className="font-semibold text-sm">
              {t('bookingForm.bankTransfer')}
            </span>
          </label>

          {/* Paiement international */}
          <label 
            htmlFor="international" 
            className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-all duration-300
              ${paymentMethod === 'international' 
                ? 'bg-green-50 border-green-500 text-green-700' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-green-300'}`}
          >
            <input
              type="radio"
              id="international"
              name="paymentMethod"
              value="international"
              checked={paymentMethod === 'international'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="hidden"
            />
            <FaGlobeAmericas className="text-4xl mb-3 text-green-600" />
            <span className="font-semibold text-sm text-center w-full">
              {t('bookingForm.internationalPayment')}
            </span>
          </label>
        </div>

        {/* Mobile Operator Selection for Mobile Money */}
        {paymentMethod === 'mobile' && (
          <div className="mt-4">
            <label className="block text-sm text-gray-600 mb-2">
              {t('bookingForm.mobileOperator')}
            </label>
            <div className="flex items-center space-x-4">
              <select
                value={mobileOperator}
                onChange={(e) => setMobileOperator(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">{t('bookingForm.selectOperator')}</option>
                <option value="mtn">MTN Mobile Money</option>
                <option value="orange">Orange Money</option>
              </select>
              
              {/* Dynamic Mobile Money Operator Icon */}
              {mobileOperator && (
                <div className="flex items-center space-x-2">
                  <FcSimCardChip className={`text-3xl ${getMobileMoneyIconColor()}`} />
                  {mobileOperator === 'mtn' && (
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      M
                    </div>
                  )}
                  {mobileOperator === 'orange' && (
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      O
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Options de paiement international */}
        {paymentMethod === 'international' && (
          <div className="mt-4 w-full">
            <label className="block text-sm text-gray-600 mb-2">
              {t('bookingForm.internationalPaymentMethod')}
            </label>
            <select
              value={mobileOperator}
              onChange={(e) => setMobileOperator(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{t('bookingForm.selectInternationalPayment')}</option>
              <option value="western_union">Western Union</option>
              <option value="taptap_send">TAPTAP Send</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="terms"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="h-4 w-4 text-blue-600"
        />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
          {t('bookingForm.acceptTerms')}
          <button
            type="button"
            onClick={() => setShowTerms(true)}
            className="text-blue-600 hover:underline ml-1"
          >
            {t('bookingForm.terms')}
          </button>
        </label>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">{t('bookingForm.total')}</span>
          <span className="text-2xl font-bold text-blue-600">
            {calculateTotalPrice()} FCFA
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {car.pricePerDay} FCFA × {bookingForm.pickupDate && bookingForm.dropoffDate 
            ? Math.ceil((new Date(bookingForm.dropoffDate) - new Date(bookingForm.pickupDate)) / (1000 * 60 * 60 * 24) + 1)
            : 0} jours
        </p>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isSubmitting || !termsAccepted || !paymentMethod || (paymentMethod === 'mobile' && !mobileOperator) || (paymentMethod === 'international' && !mobileOperator)}
        className={`w-full py-3 rounded-lg transition-colors ${
          isSubmitting || !termsAccepted || !paymentMethod || (paymentMethod === 'mobile' && !mobileOperator) || (paymentMethod === 'international' && !mobileOperator)
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('bookingForm.processing')}
          </div>
        ) : (
          t('bookingForm.confirmBooking')
        )}
      </button>
    </div>
  );
};

export default BookingForm;
