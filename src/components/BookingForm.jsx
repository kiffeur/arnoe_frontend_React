import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { cameroonCities } from '../data/cities';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { fr } from 'date-fns/locale';

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
  const { t, i18n } = useTranslation();

  const handleDateChange = (date, name) => {
    handleInputChange({
      target: {
        name,
        value: date ? date.toISOString().split('T')[0] : ''
      }
    });
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
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="mobile"
              name="paymentMethod"
              value="mobile"
              checked={paymentMethod === 'mobile'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="mobile" className="ml-2 text-gray-700">
              {t('bookingForm.mobileMoney')}
            </label>
          </div>

          {paymentMethod === 'mobile' && (
            <div className="ml-6 space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="orange"
                  name="operator"
                  value="orange"
                  checked={mobileOperator === 'orange'}
                  onChange={(e) => setMobileOperator(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="orange" className="ml-2 text-gray-700">Orange Money</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="mtn"
                  name="operator"
                  value="mtn"
                  checked={mobileOperator === 'mtn'}
                  onChange={(e) => setMobileOperator(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="mtn" className="ml-2 text-gray-700">MTN Mobile Money</label>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <input
              type="radio"
              id="bank"
              name="paymentMethod"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="bank" className="ml-2 text-gray-700">
              {t('bookingForm.bankTransfer')}
            </label>
          </div>
        </div>
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
