import { NavItem } from '../types';
import { Menu, X, Home, Phone, Mail, Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const navigation: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos Solutions', href: '/solutions' },
  { label: 'Pergolas', href: '/pergolas' },
  { label: 'Nos Services', href: '/services' },
  { label: 'Nos Réalisations', href: '/portfolio' },
  { label: 'Ressources', href: '/ressources' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];


const topBarInfo = [
  { icon: Phone, text: '03 20 00 00 00', href: 'tel:+33320000000' },
  { icon: Mail, text: 'contact@arras-automatismes.fr', href: 'mailto:contact@arras-automatismes.fr' },
  { icon: Clock, text: 'Lun-Ven: 8h30-18h00' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed w-full bg-white z-50">
      {/* Top Bar */}
      <div className="bg-[#003366] text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              {topBarInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center text-sm">
                    <Icon className="w-4 h-4 mr-2" />
                    {item.href ? (
                      <a href={item.href} className="hover:text-[#ff6600] transition-colors">
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm hover:text-[#ff6600] transition-colors">
                Espace Client
              </a>
              <a href="#" className="text-sm hover:text-[#ff6600] transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <Home className="w-10 h-10 text-[#003366]" />
              <span className="text-xl font-bold text-[#003366] font-montserrat">
                Arras Automatismes
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center text-gray-600 hover:text-[#ff6600] transition-colors font-open-sans"
                >
                  {item.label}
                  {(item.label === 'Nos Solutions' || item.label === 'Nos Services') && (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </a>
                {activeDropdown === item.label && (item.label === 'Nos Solutions' || item.label === 'Nos Services') && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-2">
                    {item.label === 'Nos Solutions' ? (
                      <>
                        <a href="/solutions#volets" className="block px-4 py-2 hover:bg-gray-100">
                          Volets Roulants Connectés
                        </a>
                        <a href="/solutions#portails" className="block px-4 py-2 hover:bg-gray-100">
                          Portails Automatiques
                        </a>
                        <a href="/solutions#garage" className="block px-4 py-2 hover:bg-gray-100">
                          Portes de Garage
                        </a>
                        <a href="/solutions#ecosystem" className="block px-4 py-2 hover:bg-gray-100">
                          Écosystème Domotique
                        </a>
                      </>
                    ) : (
                      <>
                        <a href="/services#conseil" className="block px-4 py-2 hover:bg-gray-100">
                          Conseil et Étude
                        </a>
                        <a href="/services#installation" className="block px-4 py-2 hover:bg-gray-100">
                          Installation
                        </a>
                        <a href="/services#maintenance" className="block px-4 py-2 hover:bg-gray-100">
                          Maintenance et SAV
                        </a>
                        <a href="/services#formation" className="block px-4 py-2 hover:bg-gray-100">
                          Formation
                        </a>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
            <button className="bg-[#ff6600] text-white px-6 py-3 rounded-lg hover:bg-[#e65c00] transition-all duration-300 transform hover:scale-105 font-open-sans shadow-lg">
              Devis Gratuit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#003366]" />
            ) : (
              <Menu className="w-6 h-6 text-[#003366] hover:text-[#ff6600] transition-colors" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {navigation.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className="block py-3 px-4 text-gray-600 hover:text-[#ff6600] transition-colors font-open-sans border-b border-gray-100"
                >
                  {item.label}
                </a>
              </div>
            ))}
            <button className="w-full mt-4 bg-[#ff6600] text-white px-6 py-3 rounded-lg hover:bg-[#e65c00] transition-all duration-300 font-open-sans shadow-lg">
              Devis Gratuit
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}