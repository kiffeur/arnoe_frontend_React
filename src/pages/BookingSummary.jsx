import React, { useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaCar, FaCheck, FaCreditCard, FaWallet } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import LogoImage from '/img/Logo-arnoe.png';  // Assurez-vous d'avoir un logo

const BookingSummary = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state || {};

  // Conversion explicite en chaînes
  const safeValue = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return String(value);
  };

  if (!bookingData) {
    navigate('/');
    return null;
  }

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(i18n.language, options);
  };

  const calculateDays = () => {
    const start = new Date(bookingData.pickupDate);
    const end = new Date(bookingData.dropoffDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  // Calculer le prix total en multipliant le prix par jour par le nombre de jours
  const pricePerDay = Number(bookingData.pricePerDay || 0);
  const days = calculateDays();
  const totalPrice = pricePerDay * days;

  useEffect(() => {
    console.log('FULL BookingSummary Component State:');
    console.log('Location State:', location.state);
    console.log('Booking Data:', JSON.stringify(bookingData, null, 2));
    console.log('Car Data:', JSON.stringify(bookingData?.car, null, 2));
    console.log('Price Per Day:', pricePerDay);
    console.log('Total Price:', totalPrice);
    console.log('Days:', days);

    // Ajout de logs détaillés pour le calcul du prix
    if (bookingData) {
      const calculatedTotalPrice = Number(bookingData.pricePerDay) * calculateDays();
      console.log('Calculated Total Price:', calculatedTotalPrice);
      console.log('Stored Total Price:', bookingData.totalPrice);
    }
  }, [bookingData]);

  // Fonction de formatage des prix
  const formatPrice = (price) => {
    // Convertir en nombre et formater avec séparateur de milliers
    const numPrice = Number(price);
    return isNaN(numPrice) ? 'N/A' : numPrice.toLocaleString('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const generatePDF = () => {
    console.log('Generate PDF Called');
    console.log('Booking Data Full Object:', bookingData);
    
    // Vérification détaillée des données
    if (!bookingData) {
      console.error('ERREUR: bookingData est undefined');
      alert('Aucune donnée de réservation trouvée. Veuillez réessayer.');
      return;
    }

    // Calculs financiers précis
    const pricePerDayNumeric = Number(bookingData.pricePerDay);
    const totalPriceNumeric = Number(bookingData.totalPrice);
    const days = calculateDays();

    // Création du PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Couleurs
    const COLORS = {
      PRIMARY: [0, 51, 102],      // Bleu foncé professionnel
      SECONDARY: [100, 100, 100], // Gris
      TEXT: [0, 0, 0]             // Noir
    };

    // Configuration de base
    pdf.setFont('helvetica', 'normal');

    // Fond dégradé
    pdf.setFillColor(240, 240, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Ajout du logo
    pdf.addImage(LogoImage, 'PNG', pageWidth/2 - 20, 10, 40, 20);

    // Titre élégant
    pdf.setFontSize(20);
    pdf.setTextColor(...COLORS.PRIMARY);
    pdf.text('FACTURE DE LOCATION', pageWidth/2, 45, { align: 'center' });

    // Informations de l'entreprise
    pdf.setFontSize(10);
    pdf.setTextColor(...COLORS.SECONDARY);
    pdf.text('ARNOE LOCATION', 20, 65);
    pdf.text('Contact: +237 699597698', 20, 70);
    pdf.text('Email: jfeuku@arnoe.org', 20, 75);
    pdf.text('Siège: Douala, Cameroun', 20, 80);

    // Ligne de séparation
    pdf.setDrawColor(200);
    pdf.line(20, 85, pageWidth - 20, 85);

    // Section Client
    pdf.setFontSize(14);
    pdf.setTextColor(...COLORS.PRIMARY);
    pdf.text('Informations Client', 20, 100);
    
    pdf.setFontSize(12);
    pdf.setTextColor(...COLORS.TEXT);
    pdf.text(`Nom: ${safeValue(bookingData.firstName)} ${safeValue(bookingData.lastName)}`, 20, 110);
    pdf.text(`Téléphone: ${safeValue(bookingData.phone)}`, 20, 117);
    pdf.text(`Email: ${safeValue(bookingData.email)}`, 20, 124);

    // Section Réservation
    pdf.setFontSize(14);
    pdf.setTextColor(...COLORS.PRIMARY);
    pdf.text('Détails de la Réservation', 20, 140);
    
    pdf.setFontSize(12);
    pdf.setTextColor(...COLORS.TEXT);
    pdf.text(`Référence: ${safeValue(bookingData.bookingReference)}`, 20, 150);
    pdf.text(`Véhicule: ${safeValue(bookingData.carName)}`, 20, 157);
    pdf.text(`Date de Début: ${formatDate(bookingData.pickupDate)}`, 20, 164);
    pdf.text(`Date de Fin: ${formatDate(bookingData.dropoffDate)}`, 20, 171);
    pdf.text(`Durée: ${days} jours`, 20, 178);
    pdf.text(`Lieu: ${safeValue(bookingData.pickupQuarter)}, ${safeValue(bookingData.pickupCity)}`, 20, 185);
    pdf.text(`Destination: ${safeValue(bookingData.destination)}`, 20, 192);

    // Section Financière avec mise en valeur
    pdf.setFontSize(14);
    pdf.setTextColor(...COLORS.PRIMARY);
    pdf.text('Détails Financiers', 20, 200);
    
    pdf.setFontSize(12);
    pdf.setTextColor(...COLORS.TEXT);
    pdf.text(`Prix par Jour: ${formatPrice(pricePerDayNumeric)} FCFA`, 20, 210);
    pdf.text(`Nombre de Jours: ${days}`, 20, 217);
    
    // Mise en valeur du prix total
    pdf.setFontSize(16);
    pdf.setTextColor(...COLORS.PRIMARY);
    pdf.text(`TOTAL: ${formatPrice(totalPriceNumeric)} FCFA`, 20, 230, { maxWidth: pageWidth - 40 });
    
    pdf.setFontSize(12);
    pdf.setTextColor(...COLORS.TEXT);
    pdf.text(`Méthode de Paiement: ${
      safeValue(bookingData.paymentMethod) === 'creditCard' 
        ? 'Virement bancaire' 
        : safeValue(bookingData.paymentMethod)
    }`, 20, 240);
    pdf.text(`Mode de Paiement: ${safeValue(bookingData.paymentMode)}`, 20, 247);

    // Pied de page
    pdf.setFontSize(10);
    pdf.setTextColor(...COLORS.SECONDARY);
    pdf.text('Merci pour votre confiance', pageWidth/2, pageHeight - 30, { align: 'center' });
    pdf.text('Conditions de location disponibles sur www.cars.arnoe.org', pageWidth/2, pageHeight - 25, { align: 'center' });

    // Sauvegarde
    pdf.save(`Facture_Reservation_${safeValue(bookingData.bookingReference)}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
            >
              <FaCheck className="text-4xl text-green-500" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              {t('bookingSummary.title')}
            </h1>
            <p className="text-gray-600 text-lg">
              {t('bookingSummary.bookingConfirmationMessage', 'Merci d\'avoir choisi nos services. Voici le résumé de votre réservation.')}
            </p>
          </div>

          <div id="booking-summary-content" className="bg-white shadow-lg rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Booking Details */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
                  <FaCar className="inline-block mr-3 text-blue-500" />
                  {t('bookingSummary.bookingDetails')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaCar className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.car')}:</span>
                    <span className="ml-2">{bookingData.carName}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.pickupDate')}:</span>
                    <span className="ml-2">{formatDate(bookingData.pickupDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.returnDate')}:</span>
                    <span className="ml-2">{formatDate(bookingData.dropoffDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.departureLocation')}:</span>
                    <span className="ml-2">Douala, {bookingData.pickupQuarter}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.destination')}:</span>
                    <span className="ml-2">{bookingData.destination}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.duration')}:</span>
                    <span className="ml-2">{calculateDays()} {t('bookingSummary.days')}</span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
                  <FaUser className="inline-block mr-3 text-blue-500" />
                  {t('bookingSummary.customerInfo')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaUser className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.name')}:</span>
                    <span className="ml-2">{`${bookingData.firstName} ${bookingData.lastName}`}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.email')}:</span>
                    <span className="ml-2">{bookingData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="mr-3 text-gray-500" />
                    <span className="font-medium">{t('bookingSummary.phone')}:</span>
                    <span className="ml-2">{bookingData.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="mt-8 border-t pt-6">
              <h2 className="text-2xl font-semibold mb-6">
                {t('bookingSummary.paymentDetails')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>{t('bookingSummary.dailyRate')}:</span>
                    <span>{formatPrice(bookingData.pricePerDay)} FCFA</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{t('bookingSummary.totalDays')}:</span>
                    <span>{calculateDays()}</span>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between font-bold text-xl">
                    <span>{t('bookingSummary.total')}:</span>
                    <span>{formatPrice(totalPrice)} FCFA</span>
                  </div>
                  <div className="mt-4">
                    <span className="font-medium">{t('bookingSummary.paymentMethod')}:</span>
                    <span className="ml-2">
                      {bookingData.paymentMethod === 'creditCard' 
                        ? 'Virement bancaire' 
                        : bookingData.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              {/* Bouton de téléchargement de facture masqué */}
              {false && (
                <button 
                  onClick={generatePDF} 
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  {t('bookingSummary.downloadPdf')}
                </button>
              )}
              <button 
                onClick={() => navigate('/')} 
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                {t('bookingSummary.backToHome')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingSummary;
