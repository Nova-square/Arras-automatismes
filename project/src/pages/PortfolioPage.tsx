import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Home,
  Building2,
  MapPin,
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
  Users,
  Shield,
  ArrowRight,
  X,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Types
interface Project {
  id: string;
  title: string;
  type: 'residential' | 'commercial';
  location: string;
  categories: string[];
  mainImage: string;
  gallery: {
    before: string;
    after: string;
  }[];
  challenge: string;
  solution: string;
  results: string[];
  specifications: string[];
  duration: string;
  testimonial: {
    name: string;
    role: string;
    text: string;
    rating: number;
  };
}

// Projects data
const projects: Project[] = [
  {
    id: 'villa-moderne',
    title: 'Villa Moderne Connectée',
    type: 'residential',
    location: 'Arras',
    categories: ['Intégration Complète', 'Portails', 'Éclairage'],
    mainImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      {
        before: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
        after: 'https://images.unsplash.com/photo-1600607687644-c7171b46f668?auto=format&fit=crop&q=80&w=1200',
      },
      {
        before: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
        after: 'https://images.unsplash.com/photo-1600607687644-c7171b46f668?auto=format&fit=crop&q=80&w=1200',
      },
    ],
    challenge: 'Modernisation complète d\'une villa de 250m² nécessitant une intégration harmonieuse des systèmes domotiques pour optimiser le confort et la sécurité.',
    solution: 'Installation d\'un écosystème connecté complet avec contrôle centralisé, incluant portail automatique, éclairage intelligent, volets roulants et système de sécurité.',
    results: [
      'Réduction de 30% de la consommation énergétique',
      'Amélioration significative du confort quotidien',
      'Contrôle centralisé via smartphone',
      'Sécurité renforcée avec surveillance 24/7',
    ],
    specifications: [
      'Portail coulissant motorisé avec contrôle d\'accès',
      'Système d\'éclairage LED connecté multi-zones',
      'Volets roulants automatisés avec détection météo',
      'Centrale domotique KNX dernière génération',
    ],
    duration: '3 semaines',
    testimonial: {
      name: 'Pierre Martin',
      role: 'Propriétaire',
      text: 'Une transformation remarquable de notre maison. L\'équipe a été professionnelle du début à la fin, avec une attention particulière aux détails et à nos besoins spécifiques.',
      rating: 5,
    },
  },
  {
    id: 'residence-moderne',
    title: 'Résidence Les Jardins',
    type: 'commercial',
    location: 'Beaurains',
    categories: ['Contrôle d\'Accès', 'Sécurité', 'Éclairage'],
    mainImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      {
        before: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
        after: 'https://images.unsplash.com/photo-1600607687644-c7171b46f668?auto=format&fit=crop&q=80&w=1200',
      },
    ],
    challenge: 'Sécurisation et modernisation d\'une résidence de 20 appartements avec des besoins spécifiques en contrôle d\'accès et surveillance.',
    solution: 'Mise en place d\'un système de contrôle d\'accès intelligent avec vidéophonie IP et gestion centralisée des accès.',
    results: [
      'Réduction de 40% des incidents de sécurité',
      'Gestion simplifiée des accès résidents',
      'Économies sur les coûts de maintenance',
      'Satisfaction client de 98%',
    ],
    specifications: [
      'Système de vidéophonie IP connecté',
      'Contrôle d\'accès biométrique',
      'Éclairage automatique des parties communes',
      'Surveillance vidéo HD',
    ],
    duration: '6 semaines',
    testimonial: {
      name: 'Marie Dubois',
      role: 'Syndic de copropriété',
      text: 'Un projet ambitieux parfaitement réalisé. La sécurité et le confort des résidents ont été considérablement améliorés.',
      rating: 5,
    },
  },
  {
    id: 'maison-intelligente',
    title: 'Maison Intelligente',
    type: 'residential',
    location: 'Saint-Laurent-Blangy',
    categories: ['Volets', 'Éclairage', 'Chauffage'],
    mainImage: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      {
        before: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
        after: 'https://images.unsplash.com/photo-1600607687644-c7171b46f668?auto=format&fit=crop&q=80&w=1200',
      },
    ],
    challenge: 'Création d\'un environnement domestique intelligent avec gestion automatisée du confort et de l\'énergie.',
    solution: 'Installation d\'un système domotique complet avec volets connectés, éclairage intelligent et régulation thermique.',
    results: [
      'Économies d\'énergie de 25%',
      'Confort optimisé toute l\'année',
      'Programmation personnalisée',
      'Contrôle à distance',
    ],
    specifications: [
      'Volets roulants motorisés',
      'Éclairage LED connecté',
      'Thermostat intelligent',
      'Application de contrôle personnalisée',
    ],
    duration: '2 semaines',
    testimonial: {
      name: 'Thomas Bernard',
      role: 'Propriétaire',
      text: 'Notre maison est devenue un véritable cocon technologique. Le confort au quotidien est incomparable.',
      rating: 5,
    },
  },
];

// Case studies
const caseStudies = [
  {
    title: 'Résidence Les Jardins',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    challenge: 'Complexe résidentiel de 20 appartements nécessitant une solution de contrôle d\'accès sécurisée et personnalisée.',
    solution: 'Système d\'interphonie connectée avec contrôle d\'accès biométrique et gestion centralisée pour chaque résident.',
    results: [
      'Réduction de 40% des incidents de sécurité',
      'Satisfaction client de 98%',
      'ROI atteint en 18 mois',
    ],
  },
  {
    title: 'Villa Contemporaine',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200',
    challenge: 'Intégration complète des systèmes domotiques dans une villa moderne avec des exigences esthétiques strictes.',
    solution: 'Solution sur mesure combinant automatisation invisible et interface utilisateur intuitive.',
    results: [
      'Économies d\'énergie de 30%',
      'Valorisation immobilière +15%',
      'Satisfaction client 100%',
    ],
  },
  {
    title: 'Complexe de Bureaux',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    challenge: 'Modernisation d\'un immeuble de bureaux de 1000m² avec contraintes de continuité d\'activité.',
    solution: 'Déploiement progressif d\'un système de gestion technique centralisée.',
    results: [
      'Réduction des coûts énergétiques de 35%',
      'Amélioration du confort des occupants',
      'Maintenance préventive optimisée',
    ],
  },
];

export default function PortfolioPage() {
  const [activeFilters, setActiveFilters] = useState({
    type: '',
    category: '',
    location: '',
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [introRef, introInView] = useInView({ triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true });
  const [caseStudiesRef, caseStudiesInView] = useInView({ triggerOnce: true });

  // Filter projects based on active filters
  const filteredProjects = projects.filter((project) => {
    if (activeFilters.type && project.type !== activeFilters.type) return false;
    if (activeFilters.category && !project.categories.includes(activeFilters.category)) return false;
    if (activeFilters.location && project.location !== activeFilters.location) return false;
    return true;
  });

  return (
    <div className="pt-20">
      {/* Introduction Section */}
      <section ref={introRef} className="py-16 px-4 bg-white">
        <div className={`container mx-auto transform transition-all duration-1000 ${
          introInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#003366] font-montserrat">
            Nos Réalisations
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-12 font-open-sans">
            Découvrez nos projets d'automatisation et de domotique réalisés dans la région d'Arras.
            Chaque installation est unique et adaptée aux besoins spécifiques de nos clients.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-[#003366] font-open-sans"
              onChange={(e) => setActiveFilters({ ...activeFilters, type: e.target.value })}
              value={activeFilters.type}
            >
              <option value="">Type de projet</option>
              <option value="residential">Résidentiel</option>
              <option value="commercial">Commercial</option>
            </select>

            <select
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-[#003366] font-open-sans"
              onChange={(e) => setActiveFilters({ ...activeFilters, category: e.target.value })}
              value={activeFilters.category}
            >
              <option value="">Catégorie</option>
              <option value="Portails">Portails</option>
              <option value="Volets">Volets</option>
              <option value="Garage">Garage</option>
              <option value="Pergolas">Pergolas</option>
              <option value="Éclairage">Éclairage</option>
              <option value="Intégration Complète">Intégration Complète</option>
            </select>

            <select
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-[#003366] font-open-sans"
              onChange={(e) => setActiveFilters({ ...activeFilters, location: e.target.value })}
              value={activeFilters.location}
            >
              <option value="">Localisation</option>
              <option value="Arras">Arras</option>
              <option value="Beaurains">Beaurains</option>
              <option value="Saint-Laurent-Blangy">Saint-Laurent-Blangy</option>
            </select>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transform transition-all duration-1000 ${
            projectsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-64">
                  <img
                    src={project.mainImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-open-sans text-white ${
                      project.type === 'residential' ? 'bg-[#003366]' : 'bg-[#ff6600]'
                    }`}>
                      {project.type === 'residential' ? 'Résidentiel' : 'Commercial'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#003366] font-montserrat">
                    {project.title}
                  </h3>
                  <p className="flex items-center text-gray-600 mb-4 font-open-sans">
                    <MapPin className="w-4 h-4 mr-2" />
                    {project.location}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.categories.map((category) => (
                      <span
                        key={category}
                        className="bg-[#f5f5f5] text-[#003366] px-3 py-1 rounded-full text-sm font-open-sans"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center text-[#ff6600] hover:text-[#e65c00] transition-colors font-semibold font-open-sans"
                  >
                    Voir le projet
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#003366] font-montserrat">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Gallery */}
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                className="mb-8 rounded-lg overflow-hidden"
              >
                {selectedProject.gallery.map((images, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-96">
                      <div className="absolute inset-0 flex">
                        <div className="w-1/2 h-full relative">
                          <img
                            src={images.before}
                            alt="Avant"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                            Avant
                          </div>
                        </div>
                        <div className="w-1/2 h-full relative">
                          <img
                            src={images.after}
                            alt="Après"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                            Après
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                    Problématique
                  </h3>
                  <p className="text-gray-600 mb-6 font-open-sans">
                    {selectedProject.challenge}
                  </p>

                  <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                    Notre Solution
                  </h3>
                  <p className="text-gray-600 mb-6 font-open-sans">
                    {selectedProject.solution}
                  </p>

                  <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                    Résultats
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {selectedProject.results.map((result, index) => (
                      <li key={index} className="flex items-center font-open-sans">
                        <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="bg-[#f5f5f5] p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                      Spécifications Techniques
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.specifications.map((spec, index) => (
                        <li key={index} className="flex items-center font-open-sans">
                          <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#f5f5f5] p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Clock className="w-6 h-6 text-[#ff6600] mr-3" />
                      <span className="font-semibold text-[#003366] font-montserrat">
                        Durée du projet: {selectedProject.duration}
                      </span>
                    </div>

                    <div className="border-t border-gray-300 pt-4 mt-4">
                      <div className="flex mb-4">
                        {[...Array(selectedProject.testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-[#ff6600] fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 italic mb-4 font-open-sans">
                        "{selectedProject.testimonial.text}"
                      </p>
                      <p className="font-bold text-[#003366] font-montserrat">
                        {selectedProject.testimonial.name}
                      </p>
                      <p className="text-gray-500 font-open-sans">
                        {selectedProject.testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Case Studies Section */}
      <section ref={caseStudiesRef} className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
            Études de Cas
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-1000 ${
            caseStudiesInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-[#f5f5f5] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                    {study.title}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#003366] mb-2 font-montserrat">
                        Problématique
                      </h4>
                      <p className="text-gray-600 font-open-sans">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#003366] mb-2 font-montserrat">
                        Solution
                      </h4>
                      <p className="text-gray-600 font-open-sans">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#003366] mb-2 font-montserrat">
                        Résultats
                      </h4>
                      <ul className="space-y-2">
                        {study.results.map((result, i) => (
                          <li key={i} className="flex items-center font-open-sans">
                            <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Insight */}
      <section className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-8 text-[#003366] font-montserrat">
                Notre Approche
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <Shield className="w-12 h-12 text-[#ff6600] mb-4" />
                  <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                    Standards de Qualité
                  </h3>
                  <ul className="space-y-3 font-open-sans">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                      Certification ISO 9001
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                      Techniciens certifiés
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                      Matériel haut de gamme
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <Users className="w-12 h-12 text-[#ff6600] mb-4" />
                  <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                    Expertise Technique
                  </h3>
                  <ul className="space-y-3 font-open-sans">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                      15+ ans d'expérience
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                      Formation continue
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                      Veille technologique
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-[#003366] font-montserrat">
                Vous avez un projet similaire ?
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                />
                <textarea
                  placeholder="Décrivez votre projet"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#ff6600] text-white px-6 py-3 rounded-lg hover:bg-[#e65c00] transition-colors font-open-sans"
                >
                  Demander un devis
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-[#003366]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white font-montserrat">
            Prêt à Transformer Votre Habitat ?
          </h2>
          <p className="text-xl mb-8 text-white font-open-sans">
            Nos experts sont là pour vous conseiller et créer la solution adaptée à vos besoins
          </p>
          <button className="bg-[#ff6600] text-white px-8 py-4 rounded-lg text-lg hover:bg-[#e65c00] transition-colors font-open-sans shadow-lg">
            Prendre Rendez-vous
          </button>
        </div>
      </section>
    </div>
  );
}