import { Shield, Home as HomeIcon, Lightbulb, Settings, PenTool as Tool, Star, MapPin, Phone, Mail, Lock, Zap, Cloud } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AnimatedSection from '../components/AnimatedSection';
import ImageWithFallback from '../components/ImageWithFallback';
import { fadeIn, staggerContainer, cardHover } from '../utils/animations';

const solutions = [
  {
    title: 'Volets Connectés',
    description: 'Pilotez vos volets à distance et programmez-les selon vos besoins.',
    icon: 'HomeIcon',
    imageUrl: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Portails Automatiques',
    description: 'Sécurité et confort avec nos solutions de portails motorisés.',
    icon: 'Shield',
    imageUrl: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Portes de Garage',
    description: 'Automatisez votre porte de garage pour plus de praticité.',
    icon: 'Lock',
    imageUrl: 'https://images.unsplash.com/photo-1520516363406-5a73210f3e59?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Pergolas Bioclimatiques',
    description: 'Profitez de votre extérieur en toute saison.',
    icon: 'Cloud',
    imageUrl: 'https://images.unsplash.com/photo-1621624666561-84d0107001dc?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Éclairage Connecté',
    description: 'Créez l\'ambiance parfaite avec notre système d\'éclairage intelligent.',
    icon: 'Lightbulb',
    imageUrl: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Sécurité Intégrée',
    description: 'Protégez votre maison avec nos solutions de sécurité connectées.',
    icon: 'Shield',
    imageUrl: 'https://images.unsplash.com/photo-1557063673-0493e05da49f?auto=format&fit=crop&q=80&w=800',
  },
];

const benefits = [
  {
    title: 'Expertise Certifiée',
    description: 'Plus de 15 ans d\'expérience en domotique',
    icon: 'Settings',
  },
  {
    title: 'Installation Professionnelle',
    description: 'Équipe qualifiée et matériel haut de gamme',
    icon: 'Tool',
  },
  {
    title: 'SAV Réactif',
    description: 'Intervention sous 24h en cas de besoin',
    icon: 'Zap',
  },
  {
    title: 'Écosystème Compatible',
    description: 'Solutions compatibles avec les principaux assistants',
    icon: 'Cloud',
  },
];

const testimonials = [
  {
    name: 'Pierre D.',
    location: 'Arras',
    rating: 5,
    text: 'Installation impeccable de notre système domotique. Un vrai plus pour notre quotidien !',
  },
  {
    name: 'Marie L.',
    location: 'Beaurains',
    rating: 5,
    text: 'Équipe professionnelle et à l\'écoute. Résultat au-delà de nos attentes.',
  },
  {
    name: 'Thomas B.',
    location: 'Saint-Laurent-Blangy',
    rating: 5,
    text: 'Service client exemplaire et solutions parfaitement adaptées à nos besoins.',
  },
];

const iconComponents = {
  HomeIcon,
  Shield,
  Lightbulb,
  Settings,
  Tool,
  Lock,
  Zap,
  Cloud,
};

export default function HomePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [solutionsRef, solutionsInView] = useInView({ triggerOnce: true });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-cover bg-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 51, 102, 0.7)), url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1920)',
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-montserrat">
              L'excellence de l'automatisation pour votre demeure d'exception
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-open-sans">
              Solutions domotiques haut de gamme personnalisées pour votre art de vivre
            </p>
            <motion.button 
              className="bg-[#ff6600] text-white px-8 py-4 rounded-md text-lg hover:bg-[#e65c00] transition-colors font-open-sans shadow-lg tracking-wide"
              variants={fadeIn}
              whileHover={cardHover}
            >
              Découvrir nos services d'exception
            </motion.button>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section ref={solutionsRef} className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat"
            variants={fadeIn}
            initial="hidden"
            animate={solutionsInView ? "visible" : "hidden"}
          >
            Nos Solutions
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={solutionsInView ? "visible" : "hidden"}
          >
            {solutions.map((solution) => {
              const IconComponent = iconComponents[solution.icon as keyof typeof iconComponents];
              return (
                <motion.div
                  key={solution.title}
                  className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  variants={fadeIn}
                  whileHover={cardHover}
                >
                  <ImageWithFallback
                    src={solution.imageUrl}
                    alt={solution.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <IconComponent className="w-6 h-6 text-[#ff6600] mr-2" />
                      <h3 className="text-xl font-bold text-[#003366] font-montserrat">
                        {solution.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 font-open-sans">
                      {solution.description}
                    </p>
                    <a href="#" className="inline-block mt-4 text-[#ff6600] hover:text-[#e65c00] font-semibold">
                      En savoir plus →
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-16 px-4 bg-[#003366]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white font-montserrat">
            Pourquoi Nous Choisir
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 transform transition-all duration-1000 ${benefitsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {benefits.map((benefit) => {
              const IconComponent = iconComponents[benefit.icon as keyof typeof iconComponents];
              return (
                <div
                  key={benefit.title}
                  className="bg-white rounded-lg p-6 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-12 h-12 text-[#ff6600]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 font-open-sans">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-12 text-center text-white">
            <p className="max-w-3xl mx-auto font-open-sans">
              Notre approche intégrée de la domotique vous garantit une solution complète et harmonieuse.
              Nous sélectionnons les meilleures technologies pour créer un écosystème connecté qui simplifie votre quotidien.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Ils Nous Font Confiance
          </motion.h2>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div 
                  className="bg-[#f5f5f5] p-6 rounded-lg shadow-lg"
                  whileHover={cardHover}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#ff6600] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 font-open-sans">{testimonial.text}</p>
                  <div className="font-montserrat">
                    <p className="font-bold text-[#003366]">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.location}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Contact Section */}
      <AnimatedSection className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-[#003366] font-montserrat">
                Contactez-nous
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Nom"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Téléphone"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                />
                <select className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600]">
                  <option value="">Type de projet</option>
                  <option value="volets">Volets connectés</option>
                  <option value="portail">Portail automatique</option>
                  <option value="garage">Porte de garage</option>
                  <option value="pergola">Pergola bioclimatique</option>
                  <option value="eclairage">Éclairage connecté</option>
                  <option value="securite">Sécurité</option>
                </select>
                <textarea
                  placeholder="Votre message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#ff6600] text-white px-8 py-3 rounded-md hover:bg-[#e65c00] transition-colors font-open-sans"
                >
                  Envoyer
                </button>
              </form>
            </div>
            <div>
              <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-bold mb-6 text-[#003366] font-montserrat">
                  Nos Coordonnées
                </h3>
                <div className="space-y-4 font-open-sans">
                  <p className="flex items-center">
                    <MapPin className="w-5 h-5 text-[#ff6600] mr-3" />
                    18 rue Raoul Briquet, Beaurains
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-5 h-5 text-[#ff6600] mr-3" />
                    <a href="tel:+33320000000" className="hover:text-[#ff6600]">
                      03 20 00 00 00
                    </a>
                  </p>
                  <p className="flex items-center">
                    <Mail className="w-5 h-5 text-[#ff6600] mr-3" />
                    <a
                      href="mailto:contact@arras-automatismes.fr"
                      className="hover:text-[#ff6600]"
                    >
                      contact@arras-automatismes.fr
                    </a>
                  </p>
                </div>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2544.4755400767287!2d2.7641675!3d50.2721725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd4c8b8e7f0001%3A0x1a0c9c5c89e51b0!2s18%20Rue%20Raoul%20Briquet%2C%2062217%20Beaurains!5e0!3m2!1sfr!2sfr!4v1710835436789!5m2!1sfr!2sfr"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#003366] font-montserrat">
            Prêt à Transformer Votre Habitat ?
          </h2>
          <p className="text-xl mb-8 text-gray-600 font-open-sans">
            Découvrez le confort et la modernité avec nos solutions connectées
          </p>
          <button className="bg-[#ff6600] text-white px-8 py-3 rounded-md text-lg hover:bg-[#e65c00] transition-colors font-open-sans">
            Demander un devis gratuit
          </button>
        </div>
      </section>
    </div>
  );
}