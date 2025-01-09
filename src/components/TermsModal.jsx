import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const TermsModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 mt-16"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden relative my-4"
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
            <h2 className="text-2xl font-bold text-gray-800">{t('termsModal.title')}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(80vh-160px)]">
            <div className="prose prose-blue max-w-none space-y-6">
              <p className="text-gray-600">
                {t('termsModal.introduction')}
              </p>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">{t('termsModal.rental.title')}</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  {t('termsModal.rental.points', { returnObjects: true }).map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">{t('termsModal.contractExtension.title')}</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  {t('termsModal.contractExtension.points', { returnObjects: true }).map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">{t('termsModal.cancellationConditions.title')}</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  {t('termsModal.cancellationConditions.points', { returnObjects: true }).map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">{t('termsModal.duringRental.title')}</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  {t('termsModal.duringRental.points', { returnObjects: true }).map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">{t('termsModal.endOfRental.title')}</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  {t('termsModal.endOfRental.points', { returnObjects: true }).map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 sticky bottom-0 bg-white">
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('termsModal.acceptButton')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TermsModal;
