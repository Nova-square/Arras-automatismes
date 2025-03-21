import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  ClipboardCheck,
  Wrench,
  Headphones,
  GraduationCap,
  CheckCircle,
  Clock,
  Shield,
  Award,
  AlertTriangle,
  Phone,
  Home,
  Lock,
  Cloud,
  Lightbulb,
  AlertCircle,
  Star
} from 'lucide-react';

const services = [
  {
    id: 'conseil',
    title: 'Conseil et Étude Personnalisée',
    icon: ClipboardCheck,
    description: [
      'Notre approche commence par une analyse approfondie de vos besoins et de votre habitat. Nous prenons le temps de comprendre vos habitudes de vie, vos préférences et vos contraintes.',
      'Nos experts élaborent ensuite une solution sur mesure, en tenant compte de vos objectifs en matière de confort, de sécurité et d\'économies d\'énergie.',
      'Chaque proposition est accompagnée d\'une simulation 3D et d\'une estimation détaillée des coûts et des économies potentielles.',
    ],
    includes: [
      'Visite technique complète',
      'Analyse des besoins détaillée',
      'Simulation 3D de votre projet',
      'Étude de faisabilité technique',
      'Devis détaillé et transparent',
    ],
    steps: [
      { title: 'Premier Contact', duration: '30 min' },
      { title: 'Visite Technique', duration: '1-2h' },
      { title: 'Analyse et Conception', duration: '2-3 jours' },
      { title: 'Présentation du Projet', duration: '1h' },
    ],
    testimonial: {
      name: 'Marie L.',
      location: 'Arras',
      text: 'L\'étude préalable a été très complète. Les conseils étaient parfaitement adaptés à nos besoins.',
      rating: 5,
    },
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'installation',
    title: 'Installation Professionnelle',
    icon: Wrench,
    description: [
      'Notre équipe de techniciens certifiés assure une installation précise et soignée de vos équipements domotiques, dans le respect des normes en vigueur.',
      'Nous coordonnons l\'ensemble des interventions pour minimiser l\'impact sur votre quotidien, avec un planning optimisé et respecté.',
      'Chaque installation fait l\'objet de tests approfondis pour garantir un fonctionnement optimal de l\'ensemble du système.',
    ],
    includes: [
      'Installation par des techniciens certifiés',
      'Respect des normes de sécurité',
      'Tests et vérifications approfondis',
      'Nettoyage du chantier',
      'Mise en service complète',
    ],
    steps: [
      { title: 'Préparation du Chantier', duration: '1/2 journée' },
      { title: 'Installation des Équipements', duration: '1-3 jours' },
      { title: 'Configuration du Système', duration: '1 journée' },
      { title: 'Tests et Validation', duration: '1/2 journée' },
    ],
    testimonial: {
      name: 'Thomas B.',
      location: 'Saint-Laurent-Blangy',
      text: 'Installation impeccable, équipe professionnelle et respectueuse. Excellent travail !',
      rating: 5,
    },
    image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e56a1?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'maintenance',
    title: 'Maintenance et SAV',
    icon: Headphones,
    description: [
      'Notre service après-vente assure un suivi régulier de vos installations et intervient rapidement en cas de besoin.',
      'Nous proposons une maintenance préventive pour garantir la durabilité et l\'efficacité de vos équipements.',
      'Notre équipe technique est disponible 7j/7 pour les urgences, avec une intervention garantie sous 24h.',
    ],
    includes: [
      'Maintenance préventive programmée',
      'Intervention d\'urgence 24h/24',
      'Mises à jour système régulières',
      'Diagnostic à distance',
      'Stock de pièces permanent',
    ],
    steps: [
      { title: 'Demande d\'Intervention', duration: 'Immédiat' },
      { title: 'Diagnostic à Distance', duration: '15-30 min' },
      { title: 'Intervention sur Site', duration: '2-4h' },
      { title: 'Suivi Post-Intervention', duration: '1 semaine' },
    ],
    testimonial: {
      name: 'Pierre D.',
      location: 'Beaurains',
      text: 'Service après-vente très réactif. Problème résolu en moins de 24h !',
      rating: 5,
    },
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'formation',
    title: 'Formation Utilisateur',
    icon: GraduationCap,
    description: [
      'Nous vous accompagnons dans la prise en main de votre système domotique avec des formations personnalisées et adaptées à votre niveau.',
      'Nos sessions de formation couvrent l\'utilisation quotidienne, la programmation des scénarios et la gestion des accès.',
      'Un support documentaire complet vous est fourni, incluant des guides pratiques et des tutoriels vidéo.',
    ],
    includes: [
      'Formation personnalisée sur site',
      'Support documentaire complet',
      'Accès aux tutoriels vidéo',
      'Assistance post-formation',
      'Sessions de rappel gratuites',
    ],
    steps: [
      { title: 'Formation Initiale', duration: '2-3h' },
      { title: 'Pratique Guidée', duration: '1-2h' },
      { title: 'Questions/Réponses', duration: '1h' },
      { title: 'Suivi à 1 Mois', duration: '1h' },
    ],
    testimonial: {
      name: 'Sophie M.',
      location: 'Arras',
      text: 'Formation claire et complète. Je maîtrise parfaitement mon installation.',
      rating: 5,
    },
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
  },
];

const packages = {
  headers: ['Prestations', 'Standard', 'Premium', 'Sur-Mesure'],
  rows: [
    {
      feature: 'Étude personnalisée',
      standard: true,
      premium: true,
      custom: true,
    },
    {
      feature: 'Installation professionnelle',
      standard: true,
      premium: true,
      custom: true,
    },
    {
      feature: 'Formation initiale',
      standard: true,
      premium: true,
      custom: true,
    },
    {
      feature: 'Maintenance préventive',
      standard: false,
      premium: true,
      custom: true,
    },
    {
      feature: 'Support prioritaire',
      standard: false,
      premium: true,
      custom: true,
    },
    {
      feature: 'Mises à jour premium',
      standard: false,
      premium: true,
      custom: true,
    },
    {
      feature: 'Solutions sur mesure',
      standard: false,
      premium: false,
      custom: true,
    },
  ],
};

export default function ServicesPage() {
  const [activeService, setActiveService] = useState('conseil');
  const [introRef, introInView] = useInView({ triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true });
  const [packagesRef, packagesInView] = useInView({ triggerOnce: true });

  const currentService = services.find((s) => s.id === activeService);

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
            Nos Services
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-12 font-open-sans">
            Une approche complète et personnalisée pour transformer votre habitat en un espace connecté et intelligent.
          </p>

          {/* Service Journey */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`p-6 rounded-lg transition-all ${
                      activeService === service.id
                        ? 'bg-[#003366] text-white'
                        : 'bg-[#f5f5f5] hover:bg-[#ff6600] hover:text-white'
                    }`}
                  >
                    <Icon className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-center font-montserrat">
                      {service.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Active Service Section */}
      {currentService && (
        <section ref={servicesRef} className="py-16 px-4 bg-[#f5f5f5]">
          <div className={`container mx-auto transform transition-all duration-500 ${
            servicesInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-[#003366] font-montserrat">
                  {currentService.title}
                </h2>
                <div className="space-y-4 mb-8">
                  {currentService.description.map((paragraph, index) => (
                    <p key={index} className="text-gray-600 font-open-sans">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                    Ce qui est inclus
                  </h3>
                  <ul className="space-y-3">
                    {currentService.includes.map((item, index) => (
                      <li key={index} className="flex items-center font-open-sans">
                        <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg mb-8"
                />
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                    Étapes du Service
                  </h3>
                  <div className="space-y-4">
                    {currentService.steps.map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#ff6600] text-white flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-[#003366] font-montserrat">
                            {step.title}
                          </p>
                          <p className="text-sm text-gray-500 font-open-sans">
                            Durée : {step.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex mb-4">
                {[...Array(currentService.testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#ff6600] fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic font-open-sans">
                "{currentService.testimonial.text}"
              </p>
              <p className="font-bold text-[#003366] font-montserrat">
                {currentService.testimonial.name}
              </p>
              <p className="text-gray-500 font-open-sans">
                {currentService.testimonial.location}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Service Packages */}
      <section ref={packagesRef} className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
            Nos Formules de Services
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {packages.headers.map((header, index) => (
                    <th
                      key={index}
                      className={`px-6 py-4 text-left text-[#003366] font-montserrat ${
                        index === 2 ? 'bg-[#f5f5f5]' : ''
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {packages.rows.map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-4 font-semibold font-montserrat">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4">
                      {row.standard ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-gray-300" />
                      )}
                    </td>
                    <td className={`px-6 py-4 ${index === 2 ? 'bg-[#f5f5f5]' : ''}`}>
                      {row.premium ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-gray-300" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {row.custom ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-gray-300" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
            Nos Garanties de Service
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Shield className="w-12 h-12 text-[#ff6600] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-[#003366] text-center font-montserrat">
                Garantie Produits
              </h3>
              <ul className="space-y-3 font-open-sans">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                  Garantie 2 ans pièces et main d'œuvre
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                  Extension de garantie disponible
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                  Remplacement sous 24h
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Clock className="w-12 h-12 text-[#ff6600] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-[#003366] text-center font-montserrat">
                Délais d'Intervention
              </h3>
              <ul className="space-y-3 font-open-sans">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                  Intervention sous 24h
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                  Service d'urgence 7j/7
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                  Support technique à distance
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Award className="w-12 h-12 text-[#ff6600] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-[#003366] text-center font-montserrat">
                Certifications
              </h3>
              <ul className="space-y-3 font-open-sans">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                  Techniciens certifiés
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                  Normes CE et NF
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                  Assurance décennale
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Service */}
      <section className="py-16 px-4 bg-[#003366]">
        <div className="container mx-auto text-center text-white">
          <Phone className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6 font-montserrat">
            Service d'Urgence 24/7
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-open-sans">
            Une urgence ? Notre équipe technique est disponible 24h/24 et 7j/7 pour intervenir rapidement.
          </p>
          <div className="bg-white text-[#003366] p-8 rounded-lg max-w-md mx-auto">
            <p className="text-2xl font-bold mb-4 font-montserrat">
              03 20 00 00 00
            </p>
            <p className="text-gray-600 font-open-sans">
              Intervention garantie sous 24h
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}