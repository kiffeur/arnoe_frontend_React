import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const TermsModal = ({ isOpen, onClose }) => {
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
            <h2 className="text-2xl font-bold text-gray-800">Conditions d'Utilisation</h2>
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
                Le présent texte s'inscrit dans la logique de fixer les règles d'une collaboration harmonieuse entre ARNOE TRAVEL AGENCY en abrégé ATA et ses Clients. Aussi ces conditions seront lues et approuvées avant de procéder au paiement.
              </p>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">A La location :</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Le client sera responsable du carburant. Il s'agit plus exactement de faire le plein du réservoir pour ses déplacements et de remettre le véhicule au terme de la location avec le même niveau de carburant initial.</li>
                  <li>Le client règlera les péages et autres frais connexes liés au voyage ou à sa location sur son itinéraire</li>
                  <li>ATA partagera le numéro du chauffeur en charge de la location 24h avant le début du contrat par mail ou autre moyen défini par le client à la réservation.</li>
                  <li>ATA mettra à la disposition du client un véhicule en parfait état de marche et assurant également une propreté intérieur et extérieur impeccable.</li>
                  <li>ATA s'assurera de la disponibilité du véhicule à la date et à l'heure convenue avec le client.</li>
                  <li>Le Client versera 10.000 fcfa (dix mille franc CFA) au chauffeur contre reçu pour assurer un service de nettoyage complet de la voiture à sa restitution.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">De la Prolongation du Contrat</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Toute prolongation de contrat devra se faire 48h avant l'échéance de la première location. Compte tenu des réservations en ligne, la voiture pourrait être réservé par un autre client pour le lendemain de la fin de votre contrat de Location. Ce temps nous permettra de gérer la reconnexion de cette autre réservation à un autre véhicule de la flotte disponible.</li>
                  <li>En cas de non-respect de cette clause, le chauffeur sera rappelé à la base de Douala et sera ainsi dans l'obligation de laisser le client sur place le jours du terme de ce contrat.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">Des conditions d'annulation ou de reprogrammation</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Les reliquats de paiements non réglé 48h avant la date de prise effet du contrat entraine une annulation du contrat avec remboursement partiel de 50% du montant déjà versé. Car comme vous l'avez constaté toute plage (période) de réservation rend la voiture indisponible pour tout autre réservation sur la même période.</li>
                  <li>Toute annulation une semaine avant la date prédéfinie entrainera un remboursement de 75% du montant versé initialement</li>
                  <li>Toute annulation 2 jours avant le jour de début de contrat entraine un remboursement de 50% du paiement déjà effectué.</li>
                  <li>Toute annulation le Jour J entraine un remboursement de 20% du montant déjà versé.</li>
                  <li>Pour les remboursements pour les paiements par Carte Bancaire, le service client ATA vous contactera pour les détails pour un transfert de restitution.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">Pendant la location du véhicule</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Un conseillé client ATA vous appellera pour s'enquérir de la qualité de la prestation chaque. Occasion sera ainsi donné aux clients de s'exprimer pour que nous puissions améliorer la prestation pendant qu'il bénéficie encore du service.</li>
                  <li>Le Client sera responsable de la prise en charge du chauffeur en termes d'accommodation (Logement s'ils sont hors de la ville de Douala). Il est à noter ici que la qualité de la nuit des chauffeurs a un rapport direct avec la qualité de sa concentration lors des déplacements.</li>
                  <li>En aucun cas le client ne devra détenir la clé ou même conduire une de nos voitures.</li>
                  <li>Le client doit s'assurer que le véhicule dorme dans un lieu sécuriser pendant la location (pour les locations hors de la ville de douala).</li>
                  <li>Nos voitures sont munies de traceurs. Rien à voir avec un souci de curiosité c'est juste pour votre sécurité.</li>
                  <li>ATA se chargera d'appeler les chauffeurs à intervalle aléatoire pour s'assurer que le voyage se passe bien. Ce sera des appels de routines d'une durée assez brève.</li>
                  <li>En cas de soucis technique pendant vos déplacements, ATA se chargera d'assurer un remplacement de la voiture dans une délai assez court.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">A la fin de la Location</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>La voiture devra être à notre base à 20h.</li>
                  <li>Merci de laisser vos suggestions, recommandations et avis.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 sticky bottom-0 bg-white">
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              J'ai lu et j'accepte les conditions
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TermsModal;
