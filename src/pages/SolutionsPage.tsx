import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Network, Shield, Home, Lock, Cloud, Lightbulb, CheckCircle, AlertCircle, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const solutions = [
  {
    id: 'volets',
    title: 'Volets Roulants et Stores Connectés',
    heroImage: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=1920',
    description: [
      'Transformez vos volets en éléments intelligents de votre habitat. Nos solutions de volets connectés vous permettent de contrôler la luminosité et la température de votre maison en toute simplicité.',
      'Programmez vos volets selon vos habitudes de vie et profitez d\'une gestion automatisée qui s\'adapte aux conditions météorologiques et à vos besoins quotidiens.',
      'Économisez de l\'énergie grâce à une régulation thermique optimisée et bénéficiez d\'une sécurité renforcée avec des volets qui peuvent simuler une présence pendant vos absences.',
    ],
    features: [
      'Contrôle à distance via smartphone',
      'Programmation horaire personnalisable',
      'Capteurs météorologiques intégrés',
      'Fonction crépusculaire automatique',
      'Mode vacances avec simulation de présence',
      'Compatible avec les assistants vocaux',
    ],
    compatibility: ['Delta Dore', 'Somfy', 'Nice', 'Simu'],
    gallery: [
      'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    ],
    testimonial: {
      name: 'Laurent M.',
      location: 'Arras',
      text: 'Installation parfaite, le système fonctionne remarquablement bien. Un vrai confort au quotidien !',
      rating: 5,
    },
  },
  {
    id: 'portails',
    title: 'Portails et Accès Automatisés',
    heroImage: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=1920',
    description: [
      'Simplifiez votre quotidien avec nos solutions d\'automatisation de portails. Accédez à votre propriété en toute simplicité grâce à nos systèmes de contrôle d\'accès intelligents.',
      'Nos portails motorisés allient sécurité et confort, avec des technologies de pointe pour une utilisation fluide et silencieuse.',
      'Profitez de fonctionnalités avancées comme l\'ouverture à distance, la reconnaissance de plaques d\'immatriculation ou le contrôle via smartphone.',
    ],
    features: [
      'Motorisation silencieuse et puissante',
      'Ouverture à distance via smartphone',
      'Système anti-intrusion',
      'Détection d\'obstacles',
      'Batterie de secours intégrée',
      'Maintenance prédictive',
    ],
    compatibility: ['Nice', 'Came', 'BFT', 'FAAC'],
    gallery: [
      'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1597047084897-51e81819a499?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1626178793926-22b28830aa30?auto=format&fit=crop&q=80&w=800',
    ],
    testimonial: {
      name: 'Sophie D.',
      location: 'Beaurains',
      text: 'Excellent travail d\'installation. Le portail fonctionne parfaitement et le système est très intuitif.',
      rating: 5,
    },
  },
  {
    id: 'ecosystem',
    title: 'Écosystème Domotique Intégré',
    heroImage: 'https://images.unsplash.com/photo-1558002038-876f1d8557d4?auto=format&fit=crop&q=80&w=1920',
    description: [
      'Découvrez la puissance d\'un habitat véritablement connecté. Notre écosystème domotique intégré permet une communication harmonieuse entre tous vos équipements pour une expérience utilisateur fluide et intuitive.',
      'Grâce à notre approche centralisée, tous vos systèmes automatisés fonctionnent en parfaite synergie, vous offrant un contrôle total sur votre environnement domestique depuis une seule interface.',
      'Profitez d\'une maison qui s\'adapte intelligemment à vos habitudes de vie, optimise votre consommation d\'énergie et renforce votre sécurité au quotidien.',
    ],
    features: [
      'Interface de contrôle unifiée',
      'Scénarios personnalisables',
      'Optimisation énergétique intelligente',
      'Compatibilité multi-protocoles',
      'Mises à jour automatiques',
      'Support technique dédié',
    ],
    compatibility: ['KNX', 'Zigbee', 'Z-Wave', 'Matter'],
    gallery: [
      'https://images.unsplash.com/photo-1558002038-876f1d8557d4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=800',
    ],
    testimonial: {
      name: 'Pierre L.',
      location: 'Saint-Laurent-Blangy',
      text: 'L\'intégration complète de nos systèmes a transformé notre quotidien. Tout fonctionne parfaitement ensemble !',
      rating: 5,
    },
  },
  // ... autres solutions similaires
];

const comparisonData = {
  headers: ['Critères', 'Installation Professionnelle', 'Installation DIY'],
  rows: [
    {
      criteria: 'Garantie',
      pro: 'Garantie complète pièces et main d\'œuvre',
      diy: 'Garantie limitée aux composants',
    },
    {
      criteria: 'Installation',
      pro: 'Installation experte et certifiée',
      diy: 'Risques d\'erreurs et de dysfonctionnements',
    },
    {
      criteria: 'Intégration',
      pro: 'Système parfaitement intégré et optimisé',
      diy: 'Compatibilité limitée entre les systèmes',
    },
    {
      criteria: 'Support',
      pro: 'Support technique dédié et réactif',
      diy: 'Support limité ou inexistant',
    },
  ],
};

const faqs = [
  {
    question: 'Combien de temps dure une installation complète ?',
    answer: 'La durée d\'installation varie selon le projet. En moyenne, une installation standard prend 1 à 2 jours. Nous établissons un planning précis lors du devis.',
  },
  {
    question: 'Les systèmes sont-ils compatibles avec les assistants vocaux ?',
    answer: 'Oui, nos solutions sont compatibles avec les principaux assistants vocaux (Google Assistant, Amazon Alexa, Apple HomeKit) selon les équipements choisis.',
  },
  {
    question: 'Que faire en cas de panne de courant ?',
    answer: 'Nos systèmes sont équipés de batteries de secours permettant un fonctionnement autonome. De plus, un déverrouillage manuel est toujours prévu.',
  },
  // ... autres FAQs
];

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState('volets');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [introRef, introInView] = useInView({ triggerOnce: true });
  const [tabsRef, tabsInView] = useInView({ triggerOnce: true });

  const activeSolution = solutions.find((s) => s.id === activeTab);

  return (
    <div className="pt-20">
      {/* Introduction Section */}
      <section
        ref={introRef}
        className="py-16 px-4 bg-white"
      >
        <div className={`container mx-auto transform transition-all duration-1000 ${
          introInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#003366] font-montserrat">
            Solutions Domotiques Intégrées
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-12 font-open-sans">
            Découvrez nos solutions d'automatisation sur mesure pour transformer votre habitat
            en un espace intelligent, confortable et sécurisé.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-[#f5f5f5] rounded-lg">
              <Network className="w-12 h-12 text-[#ff6600] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#003366] mb-2 font-montserrat">
                Écosystème Connecté
              </h3>
              <p className="text-gray-600 font-open-sans">
                Tous vos équipements communiquent entre eux pour une expérience fluide
              </p>
            </div>
            <div className="text-center p-6 bg-[#f5f5f5] rounded-lg">
              <Shield className="w-12 h-12 text-[#ff6600] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#003366] mb-2 font-montserrat">
                Sécurité Renforcée
              </h3>
              <p className="text-gray-600 font-open-sans">
                Protection optimale de votre habitat et de vos proches
              </p>
            </div>
            <div className="text-center p-6 bg-[#f5f5f5] rounded-lg">
              <Cloud className="w-12 h-12 text-[#ff6600] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#003366] mb-2 font-montserrat">
                Contrôle Centralisé
              </h3>
              <p className="text-gray-600 font-open-sans">
                Pilotez tous vos équipements depuis une seule interface
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Tabs Section */}
      <section ref={tabsRef} className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {solutions.map((solution) => (
              <button
                key={solution.id}
                onClick={() => setActiveTab(solution.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-colors font-open-sans ${
                  activeTab === solution.id
                    ? 'bg-[#003366] text-white'
                    : 'bg-white text-[#003366] hover:bg-[#ff6600] hover:text-white'
                }`}
              >
                {solution.title}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          {activeSolution && (
            <div className={`transform transition-all duration-500 ${
              tabsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {/* Hero Image */}
              <div
                className="h-[50vh] bg-cover bg-center rounded-xl mb-12"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 51, 102, 0.7)), url(${activeSolution.heroImage})`,
                }}
              >
                <div className="h-full flex items-center justify-center">
                  <h2 className="text-4xl font-bold text-white text-center px-4 font-montserrat">
                    {activeSolution.title}
                  </h2>
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                  {activeSolution.description.map((paragraph, index) => (
                    <p key={index} className="text-gray-600 font-open-sans">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Features */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-[#003366] mb-6 font-montserrat">
                    Caractéristiques
                  </h3>
                  <ul className="space-y-4">
                    {activeSolution.features.map((feature, index) => (
                      <li key={index} className="flex items-center font-open-sans">
                        <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Gallery */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[#003366] mb-6 font-montserrat">
                  Galerie
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activeSolution.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${activeSolution.title} - Image ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
                <div className="flex mb-4">
                  {[...Array(activeSolution.testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#ff6600] fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic font-open-sans">
                  "{activeSolution.testimonial.text}"
                </p>
                <p className="font-bold text-[#003366] font-montserrat">
                  {activeSolution.testimonial.name}
                </p>
                <p className="text-gray-500 font-open-sans">
                  {activeSolution.testimonial.location}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Ecosystem Integration Benefits */}
      {activeTab === 'ecosystem' && (
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h3 className="text-2xl font-bold text-center mb-12 text-[#003366] font-montserrat">
              Les Avantages de l'Intégration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-[#f5f5f5] p-6 rounded-lg">
                <div className="flex items-center justify-center mb-4">
                  <Network className="w-12 h-12 text-[#ff6600]" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-[#003366] text-center font-montserrat">
                  Contrôle Centralisé
                </h4>
                <p className="text-gray-600 text-center font-open-sans">
                  Pilotez tous vos équipements depuis une seule application intuitive
                </p>
              </div>
              <div className="bg-[#f5f5f5] p-6 rounded-lg">
                <div className="flex items-center justify-center mb-4">
                  <Cloud className="w-12 h-12 text-[#ff6600]" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-[#003366] text-center font-montserrat">
                  Automatisation Intelligente
                </h4>
                <p className="text-gray-600 text-center font-open-sans">
                  Créez des scénarios personnalisés qui s'adaptent à votre vie
                </p>
              </div>
              <div className="bg-[#f5f5f5] p-6 rounded-lg">
                <div className="flex items-center justify-center mb-4">
                  <Lightbulb className="w-12 h-12 text-[#ff6600]" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-[#003366] text-center font-montserrat">
                  Économies d'Énergie
                </h4>
                <p className="text-gray-600 text-center font-open-sans">
                  Optimisez votre consommation grâce à la gestion intelligente
                </p>
              </div>
              <div className="bg-[#f5f5f5] p-6 rounded-lg">
                <div className="flex items-center justify-center mb-4">
                  <Lock className="w-12 h-12 text-[#ff6600]" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-[#003366] text-center font-montserrat">
                  Évolutivité
                </h4>
                <p className="text-gray-600 text-center font-open-sans">
                  Ajoutez facilement de nouveaux équipements à votre système
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Installation Process */}
      {activeTab === 'ecosystem' && (
        <section className="py-16 px-4 bg-[#f5f5f5]">
          <div className="container mx-auto">
            <h3 className="text-2xl font-bold text-center mb-12 text-[#003366] font-montserrat">
              Processus d'Installation
            </h3>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-[15px] md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-[#ff6600]"></div>
                
                {/* Timeline Items */}
                <div className="space-y-12">
                  <div className="relative flex items-center md:justify-between">
                    <div className="flex md:w-1/2 md:justify-end">
                      <div className="bg-white p-6 rounded-lg shadow-lg md:mr-8">
                        <h4 className="text-xl font-bold mb-2 text-[#003366] font-montserrat">
                          1. Consultation
                        </h4>
                        <p className="text-gray-600 font-open-sans">
                          Analyse de vos besoins et de votre habitat
                        </p>
                        <p className="text-sm text-gray-500 mt-2 font-open-sans">
                          Durée : 1-2 heures
                        </p>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-[#ff6600] rounded-full border-4 border-white"></div>
                  </div>
                  
                  <div className="relative flex items-center md:justify-between">
                    <div className="flex md:w-1/2 md:justify-start md:ml-auto">
                      <div className="bg-white p-6 rounded-lg shadow-lg md:ml-8">
                        <h4 className="text-xl font-bold mb-2 text-[#003366] font-montserrat">
                          2. Planification
                        </h4>
                        <p className="text-gray-600 font-open-sans">
                          Conception détaillée de votre solution
                        </p>
                        <p className="text-sm text-gray-500 mt-2 font-open-sans">
                          Durée : 2-3 jours
                        </p>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-[#ff6600] rounded-full border-4 border-white"></div>
                  </div>
                  
                  <div className="relative flex items-center md:justify-between">
                    <div className="flex md:w-1/2 md:justify-end">
                      <div className="bg-white p-6 rounded-lg shadow-lg md:mr-8">
                        <h4 className="text-xl font-bold mb-2 text-[#003366] font-montserrat">
                          3. Installation
                        </h4>
                        <p className="text-gray-600 font-open-sans">
                          Mise en place et configuration des équipements
                        </p>
                        <p className="text-sm text-gray-500 mt-2 font-open-sans">
                          Durée : 1-3 jours
                        </p>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-[#ff6600] rounded-full border-4 border-white"></div>
                  </div>
                  
                  <div className="relative flex items-center md:justify-between">
                    <div className="flex md:w-1/2 md:justify-start md:ml-auto">
                      <div className="bg-white p-6 rounded-lg shadow-lg md:ml-8">
                        <h4 className="text-xl font-bold mb-2 text-[#003366] font-montserrat">
                          4. Formation
                        </h4>
                        <p className="text-gray-600 font-open-sans">
                          Prise en main et personnalisation
                        </p>
                        <p className="text-sm text-gray-500 mt-2 font-open-sans">
                          Durée : 2-3 heures
                        </p>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-[#ff6600] rounded-full border-4 border-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Use Case Scenario */}
      {activeTab === 'ecosystem' && (
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h3 className="text-2xl font-bold text-center mb-12 text-[#003366] font-montserrat">
              Une Journée avec Votre Maison Connectée
            </h3>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-[#f5f5f5] p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                  7h00 - Le Réveil
                </h4>
                <p className="text-gray-600 font-open-sans">
                  Les volets s'ouvrent progressivement, la température s'ajuste, et votre café se prépare automatiquement.
                </p>
              </div>
              
              <div className="bg-[#f5f5f5] p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                  8h30 - Départ au Travail
                </h4>
                <p className="text-gray-600 font-open-sans">
                  Le système active le mode absence : alarme activée, chauffage réduit, et vérification de la fermeture des accès.
                </p>
              </div>
              
              <div className="bg-[#f5f5f5] p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                  17h30 - Retour à la Maison
                </h4>
                <p className="text-gray-600 font-open-sans">
                  La maison détecte votre approche : le portail s'ouvre, le garage se déverrouille, et l'ambiance parfaite vous accueille.
                </p>
              </div>
              
              <div className="bg-[#f5f5f5] p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                  22h00 - Mode Nuit
                </h4>
                <p className="text-gray-600 font-open-sans">
                  Activation automatique du mode nuit : vérification des accès, réduction du chauffage, et extinction progressive des lumières.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
            Pourquoi Choisir l'Installation Professionnelle
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {comparisonData.headers.map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-4 text-left text-[#003366] font-montserrat"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-4 font-semibold font-montserrat">
                      {row.criteria}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span className="font-open-sans">{row.pro}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                        <span className="font-open-sans">{row.diy}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
            Questions Fréquentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                >
                  <span className="font-semibold text-[#003366] font-montserrat">
                    {faq.question}
                  </span>
                  <span
                    className={`transform transition-transform ${
                      faqOpen === index ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`px-6 py-4 font-open-sans text-gray-600 transition-all duration-300 ${
                    faqOpen === index ? 'block' : 'hidden'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-[#003366]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white font-montserrat">
            Prêt à Automatiser Votre Habitat ?
          </h2>
          <p className="text-xl mb-8 text-white font-open-sans">
            Nos experts sont là pour vous conseiller et créer la solution adaptée à vos besoins
          </p>
          <button className="bg-[#ff6600] text-white px-8 py-4 rounded-md text-lg hover:bg-[#e65c00] transition-colors font-open-sans shadow-lg">
            Demander une consultation gratuite
          </button>
        </div>
      </section>
    </div>
  );
}