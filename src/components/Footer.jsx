import { FaFacebookF, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { FaPhoneVolume } from 'react-icons/fa6';

const Footer = () => {
  const handleWhatsAppClick = (phone) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <footer className="bg-gradient-to-b from-[#132676] to-[#0a1545] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="space-y-6">
            <img 
              src="/img/Logo-arnoe.png"
              alt="Arnoe" 
              className="h-32 md:h-40 mb-4"
            />
            <p className="text-white/80">
              Votre partenaire de confiance pour vos déplacements au Cameroun. 
              Service de voiture avec chauffeur professionnel disponible 24/7.
            </p>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="text-xl font-bold mb-6">Liens Rapides</h3>
            <ul className="space-y-4">
              <li><a href="#about" className="hover:text-[#FF4D30] transition-colors">À Propos</a></li>
              <li><a href="#services" className="hover:text-[#FF4D30] transition-colors">Services</a></li>
              <li><a href="#fleet" className="hover:text-[#FF4D30] transition-colors">Notre Flotte</a></li>
              <li><a href="#contact" className="hover:text-[#FF4D30] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Régions Desservies */}
          <div>
            <h3 className="text-xl font-bold mb-6">Régions Desservies</h3>
            <ul className="space-y-4">
              <li>Littoral</li>
              <li>Centre</li>
              <li>Sud-Ouest</li>
              <li>Nord-Ouest</li>
              <li>SUD</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <FaPhoneVolume className="text-[#FF4D30]" />
                <div>
                  <p>+237 699597698</p>
                  <p>+237 699543001</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <FaWhatsapp className="text-[#FF4D30]" />
                <div>
                  <p className="cursor-pointer hover:text-[#FF4D30]" onClick={() => handleWhatsAppClick('237699597698')}>+237 699597698</p>
                  <p className="cursor-pointer hover:text-[#FF4D30]" onClick={() => handleWhatsAppClick('237699543001')}>+237 699543001</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <HiMail className="text-[#FF4D30]" />
                <span>jfeuku@arnoe.org</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/ArnoeTravel" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#FF4D30] transition-transform hover:scale-110"
                >
                  <FaFacebookF className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.youtube.com/@ARNOETRAVELAGENCY" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#FF4D30] transition-transform hover:scale-110"
                >
                  <FaYoutube className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.tiktok.com/@ata.sarl" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#FF4D30] transition-transform hover:scale-110"
                >
                  <FaTiktok className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/60">
            {new Date().getFullYear()} Arnoe. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
