import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { cameroonCities } from '../data/cities';

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
  setShowTerms,
  isSubmitting
}) => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Informations personnelles
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Prénom
            </label>
            <input
              type="text"
              name="firstName"
              value={bookingForm.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Votre prénom"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nom
            </label>
            <input
              type="text"
              name="lastName"
              value={bookingForm.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Votre nom"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={bookingForm.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="votre@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            name="phone"
            value={bookingForm.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+237 6XX XX XX XX"
            required
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Détails de la réservation
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Ville de départ
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
              Ville de retour
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
            Adresse de résidence à Douala
          </label>
          <input
            type="text"
            name="pickupQuarter"
            value={bookingForm.pickupQuarter}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Votre adresse complète"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Date de début
            </label>
            <input
              type="date"
              name="pickupDate"
              value={bookingForm.pickupDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Date de fin
            </label>
            <input
              type="date"
              name="dropoffDate"
              value={bookingForm.dropoffDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min={bookingForm.pickupDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Mode de paiement
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            type="button"
            onClick={() => {
              setPaymentMethod('bank');
              setMobileOperator('');
            }}
            className={`px-4 py-3 rounded-lg border-2 transition-colors ${
              paymentMethod === 'bank'
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-200 hover:border-blue-600'
            }`}
          >
            Virement Bancaire
          </button>
          
          <button
            type="button"
            onClick={() => setPaymentMethod('mobile')}
            className={`px-4 py-3 rounded-lg border-2 transition-colors ${
              paymentMethod === 'mobile'
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-200 hover:border-blue-600'
            }`}
          >
            Mobile Money
          </button>
        </div>

        {paymentMethod === 'mobile' && (
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setMobileOperator('orange')}
              className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                mobileOperator === 'orange'
                  ? 'border-orange-600 bg-orange-50 text-orange-600'
                  : 'border-gray-200 hover:border-orange-600'
              }`}
            >
              Orange Money
            </button>
            
            <button
              type="button"
              onClick={() => setMobileOperator('mtn')}
              className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                mobileOperator === 'mtn'
                  ? 'border-yellow-600 bg-yellow-50 text-yellow-600'
                  : 'border-gray-200 hover:border-yellow-600'
              }`}
            >
              MTN Mobile Money
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="terms"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          J'accepte les{' '}
          <button
            type="button"
            onClick={() => setShowTerms(true)}
            className="text-blue-600 hover:underline"
          >
            conditions d'utilisation
          </button>
        </label>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Prix total :</span>
          <span className="text-2xl font-bold text-blue-600">{totalPrice} FCFA</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {car.pricePerDay} FCFA × {Math.ceil((new Date(bookingForm.dropoffDate) - new Date(bookingForm.pickupDate)) / (1000 * 60 * 60 * 24) + 1)} jours
        </p>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isSubmitting || !termsAccepted || !paymentMethod || (paymentMethod === 'mobile' && !mobileOperator)}
        className={`w-full py-3 rounded-lg transition-colors ${
          isSubmitting || !termsAccepted || !paymentMethod || (paymentMethod === 'mobile' && !mobileOperator)
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
            Traitement en cours...
          </div>
        ) : (
          'Confirmer la réservation'
        )}
      </button>
    </div>
  );
};

export default BookingForm;
