import { FaFacebookF, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { FaPhoneVolume } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = (phone) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <footer className="bg-[#1c1c72] text-white pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div>
            <img
              src="/img/Logo-arnoe.png"
              alt="Arnoe"
              className="h-32 md:h-40 mb-4"
            />
            <p className="text-white/80">
              {t('footer.description')}
            </p>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="text-xl font-bold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-4">
              <li><a href="#about" className="hover:text-[#FF4D30] transition-colors">{t('footer.about')}</a></li>
              <li><a href="#services" className="hover:text-[#FF4D30] transition-colors">{t('footer.services')}</a></li>
              <li><a href="#fleet" className="hover:text-[#FF4D30] transition-colors">{t('footer.fleet')}</a></li>
              <li><a href="#contact" className="hover:text-[#FF4D30] transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>

          {/* Régions */}
          <div>
            <h3 className="text-xl font-bold mb-6">{t('footer.servedRegions')}</h3>
            <ul className="space-y-4">
              <li>{t('footer.regions.littoral')}</li>
              <li>{t('footer.regions.centre')}</li>
              <li>{t('footer.regions.ouest')}</li>
              <li>{t('footer.regions.sud')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">{t('footer.contactUs')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <FaPhoneVolume className="text-[#FF4D30] mt-1" />
                <div>
                  <p className="hover:text-[#FF4D30] transition-colors">+237 699597698</p>
                  <p className="hover:text-[#FF4D30] transition-colors">+237 699543001</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <FaWhatsapp className="text-[#FF4D30] mt-1" />
                <div>
                  <p 
                    className="cursor-pointer hover:text-[#FF4D30] transition-colors"
                    onClick={() => handleWhatsAppClick('237699597698')}
                  >
                    +237 699597698
                  </p>
                  <p 
                    className="cursor-pointer hover:text-[#FF4D30] transition-colors"
                    onClick={() => handleWhatsAppClick('237699543001')}
                  >
                    +237 699543001
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <HiMail className="text-[#FF4D30]" />
                <a
                  href="mailto:jfeuku@arnoe.org"
                  className="hover:text-[#FF4D30] transition-colors"
                >
                  jfeuku@arnoe.org
                </a>
              </li>
            </ul>

            {/* Réseaux Sociaux */}
            <div className="mt-6">
              <h4 className="font-semibold mb-4">{t('footer.followUs')}</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/ArnoeTravel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#FF4D30] hover:bg-[#fa3815] p-2 rounded-full transition-colors"
                >
                  <FaFacebookF />
                </a>
                <a 
                  href="https://www.youtube.com/@ARNOETRAVELAGENCY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#FF4D30] hover:bg-[#fa3815] p-2 rounded-full transition-colors"
                >
                  <FaYoutube />
                </a>
                <a 
                  href="https://www.tiktok.com/@ata.sarl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#FF4D30] hover:bg-[#fa3815] p-2 rounded-full transition-colors"
                >
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-12 pt-8 pb-8 text-center">
          <p className="text-white/60">
            {currentYear} Arnoe. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
