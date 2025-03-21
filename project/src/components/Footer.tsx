import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Clock, Shield, Award, Users } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#', color: 'hover:text-[#1877f2]' },
  { icon: Twitter, href: '#', color: 'hover:text-[#1da1f2]' },
  { icon: Linkedin, href: '#', color: 'hover:text-[#0a66c2]' },
  { icon: Instagram, href: '#', color: 'hover:text-[#e4405f]' },
];

const certifications = [
  { icon: Shield, text: 'Certification KNX' },
  { icon: Award, text: 'Expert Somfy' },
  { icon: Users, text: 'Membre FFIE' },
];

export default function Footer() {
  return (
    <footer className="bg-[#003366] text-white">
      {/* Stats Section */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#ff6600] mb-2">15+</div>
              <div className="text-sm">Années d'expérience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#ff6600] mb-2">1000+</div>
              <div className="text-sm">Projets réalisés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#ff6600] mb-2">98%</div>
              <div className="text-sm">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#ff6600] mb-2">24/7</div>
              <div className="text-sm">Support technique</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">Contact</h3>
            <div className="space-y-4 font-open-sans">
              <p className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                18 rue Raoul Briquet, Beaurains
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a href="tel:+33320000000" className="hover:text-[#ff6600]">
                  03 20 00 00 00
                </a>
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a
                  href="mailto:contact@arras-automatismes.fr"
                  className="hover:text-[#ff6600]"
                >
                  contact@arras-automatismes.fr
                </a>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">Liens Rapides</h3>
            <ul className="space-y-2 font-open-sans">
              <li>
                <a href="/" className="hover:text-[#ff6600]">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/solutions" className="hover:text-[#ff6600]">
                  Nos Solutions
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-[#ff6600]">
                  Nos Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#ff6600]">
                  Contact
                </a>
              </li>
              <li>
                <a href="/devis" className="hover:text-[#ff6600]">
                  Devis Gratuit
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <div key={index} className="flex items-center">
                    <Icon className="w-5 h-5 text-[#ff6600] mr-3" />
                    <span className="font-open-sans">{cert.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">
              Horaires d'ouverture
            </h3>
            <div className="space-y-2 font-open-sans">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-[#ff6600] mr-3" />
                <span>Lundi - Vendredi</span>
              </div>
              <div className="pl-8">8h30 - 18h00</div>
              <div className="flex items-center mt-4">
                <Clock className="w-5 h-5 text-[#ff6600] mr-3" />
                <span>Samedi</span>
              </div>
              <div className="pl-8">Sur rendez-vous</div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-open-sans mb-4 md:mb-0">
              © {new Date().getFullYear()} Arras Automatismes. Tous droits réservés.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`${social.color} transition-colors`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}