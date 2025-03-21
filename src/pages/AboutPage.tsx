import { useInView } from 'react-intersection-observer';
import { Award, Users, Heart, Lightbulb, Shield, Leaf, MapPin, Phone, Mail, Star, CheckCircle, Building, PenTool as Tool, Truck, GraduationCap, Clock } from 'lucide-react';

const milestones = [
  {
    year: '2005',
    title: 'Création d\'Arras Automatismes',
    description: 'Fondation de l\'entreprise par Thomas Martin, expert en domotique',
  },
  {
    year: '2010',
    title: 'Certification KNX Partner',
    description: 'Obtention de la certification internationale KNX',
  },
  {
    year: '2015',
    title: 'Ouverture du showroom',
    description: 'Inauguration de notre espace d\'exposition à Beaurains',
  },
  {
    year: '2020',
    title: 'Extension régionale',
    description: 'Développement de notre activité sur toute la région Hauts-de-France',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Excellence',
    description: 'Un engagement constant vers la qualité et la satisfaction client',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'À la pointe des dernières technologies domotiques',
  },
  {
    icon: Shield,
    title: 'Fiabilité',
    description: 'Des solutions robustes et un service après-vente réactif',
  },
  {
    icon: Leaf,
    title: 'Durabilité',
    description: 'Un engagement fort pour l\'efficacité énergétique',
  },
];

const team = [
  {
    name: 'Thomas Martin',
    role: 'Fondateur & Directeur',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    certifications: ['KNX Partner', 'Somfy Expert'],
    description: 'Expert en domotique avec plus de 20 ans d\'expérience',
  },
  {
    name: 'Sophie Dubois',
    role: 'Responsable Technique',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    certifications: ['KNX Advanced', 'Delta Dore Expert'],
    description: 'Spécialiste en intégration de systèmes complexes',
  },
  {
    name: 'Pierre Lambert',
    role: 'Chef de Projet',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    certifications: ['Project Management Pro', 'Smart Home Specialist'],
    description: 'Expert en gestion de projets domotiques d\'envergure',
  },
];

const testimonials = [
  {
    name: 'Marie L.',
    role: 'Propriétaire',
    text: 'Une équipe professionnelle qui a su parfaitement répondre à nos besoins.',
    rating: 5,
  },
  {
    name: 'Jean-Pierre D.',
    role: 'Architecte',
    text: 'Excellent travail d\'intégration, je recommande vivement leurs services.',
    rating: 5,
  },
];

const partnerships = [
  { name: 'KNX', type: 'certification' },
  { name: 'Somfy', type: 'partner' },
  { name: 'Delta Dore', type: 'partner' },
  { name: 'FFIE', type: 'association' },
];

export default function AboutPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [storyRef, storyInView] = useInView({ triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true });
  const [teamRef, teamInView] = useInView({ triggerOnce: true });
  const [facilitiesRef, facilitiesInView] = useInView({ triggerOnce: true });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 51, 102, 0.7)), url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920)',
        }}
      >
        <div className={`absolute inset-0 flex items-center justify-center transform transition-all duration-1000 ${
          heroInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-montserrat">
              Notre Histoire
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto font-open-sans">
              Depuis 2005, nous transformons l'habitat des Hauts-de-France avec des solutions domotiques innovantes
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className={`max-w-4xl mx-auto transform transition-all duration-1000 ${
            storyInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
              Notre Parcours
            </h2>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-start space-x-8 ${
                    index % 2 === 0 ? '' : 'md:flex-row-reverse md:space-x-reverse'
                  }`}
                >
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="text-2xl font-bold text-[#ff6600] font-montserrat">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-[#003366] font-montserrat">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 font-open-sans">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
            Nos Valeurs
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 transform transition-all duration-1000 ${
            valuesInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <Icon className="w-12 h-12 text-[#ff6600] mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-[#003366] font-montserrat">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 font-open-sans">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
            Notre Équipe
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-1000 ${
            teamInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {team.map((member) => (
              <div key={member.name} className="bg-[#f5f5f5] rounded-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#003366] font-montserrat">
                    {member.name}
                  </h3>
                  <p className="text-[#ff6600] mb-4 font-open-sans">{member.role}</p>
                  <p className="text-gray-600 mb-4 font-open-sans">{member.description}</p>
                  <div className="space-y-2">
                    {member.certifications.map((cert) => (
                      <div key={cert} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-[#ff6600] mr-2" />
                        <span className="text-sm font-open-sans">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section ref={facilitiesRef} className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
            Nos Installations
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 transform transition-all duration-1000 ${
            facilitiesInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200"
                alt="Showroom"
                className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
              />
              <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                Notre Showroom
              </h3>
              <p className="text-gray-600 font-open-sans">
                Un espace de 200m² dédié à la démonstration de nos solutions domotiques,
                où vous pourrez découvrir et tester nos installations en conditions réelles.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=1200"
                alt="Atelier"
                className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
              />
              <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                Notre Atelier
              </h3>
              <p className="text-gray-600 font-open-sans">
                Un atelier technique équipé des dernières technologies pour la préparation
                et la configuration de vos installations domotiques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-[#003366] font-montserrat">
            Certifications et Partenariats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partnerships.map((partner) => (
              <div
                key={partner.name}
                className="bg-[#f5f5f5] p-6 rounded-lg flex items-center justify-center"
              >
                <div>
                  <Award className="w-12 h-12 text-[#ff6600] mx-auto mb-4" />
                  <p className="font-semibold font-montserrat">{partner.name}</p>
                  <p className="text-sm text-gray-600 font-open-sans">
                    {partner.type === 'certification'
                      ? 'Certification'
                      : partner.type === 'partner'
                      ? 'Partenaire'
                      : 'Association'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 px-4 bg-[#003366] text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 font-montserrat">
            Rejoignez Notre Équipe
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-open-sans">
            Nous sommes toujours à la recherche de talents passionnés par la domotique
            et l'innovation. Découvrez nos opportunités de carrière.
          </p>
          <button className="bg-[#ff6600] text-white px-8 py-4 rounded-lg text-lg hover:bg-[#e65c00] transition-colors font-open-sans">
            Voir nos offres d'emploi
          </button>
        </div>
      </section>
    </div>
  );
}