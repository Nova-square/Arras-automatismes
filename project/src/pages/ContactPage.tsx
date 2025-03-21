import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';

const openingHours = [
  { day: 'Lundi', hours: '8h30 - 18h00' },
  { day: 'Mardi', hours: '8h30 - 18h00' },
  { day: 'Mercredi', hours: '8h30 - 18h00' },
  { day: 'Jeudi', hours: '8h30 - 18h00' },
  { day: 'Vendredi', hours: '8h30 - 17h00' },
  { day: 'Samedi', hours: 'Sur rendez-vous' },
  { day: 'Dimanche', hours: 'Fermé' },
];

const contactMethods = [
  {
    type: 'Demande de devis',
    recommended: 'Formulaire en ligne',
    responseTime: '24-48h',
  },
  {
    type: 'Question technique',
    recommended: 'Téléphone',
    responseTime: 'Immédiat',
  },
  {
    type: 'Service après-vente',
    recommended: 'Email ou téléphone',
    responseTime: '24h',
  },
  {
    type: 'Urgence',
    recommended: 'Téléphone',
    responseTime: 'Immédiat',
  },
];

const faqs = [
  {
    question: 'Quels sont les délais d\'installation moyens ?',
    answer: 'Les délais varient selon le projet. Une installation standard prend généralement 1 à 2 jours. Un planning précis est établi lors du devis.',
  },
  {
    question: 'Proposez-vous une garantie sur vos installations ?',
    answer: 'Oui, nous offrons une garantie de 2 ans pièces et main d\'œuvre sur toutes nos installations, avec possibilité d\'extension.',
  },
  {
    question: 'Êtes-vous certifiés pour l\'installation de systèmes domotiques ?',
    answer: 'Oui, notre équipe est certifiée par les principaux fabricants et nous disposons de toutes les qualifications requises.',
  },
  {
    question: 'Intervenez-vous uniquement sur Arras ?',
    answer: 'Nous intervenons sur Arras et ses environs dans un rayon de 30km, incluant Beaurains, Saint-Laurent-Blangy, etc.',
  },
  {
    question: 'Peut-on intégrer des équipements existants ?',
    answer: 'Oui, nous étudions la compatibilité de vos équipements actuels et proposons des solutions d\'intégration adaptées.',
  },
];

const team = [
  {
    name: 'Thomas Martin',
    role: 'Expert Technique',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  },
  {
    name: 'Sophie Dubois',
    role: 'Conseillère Clientèle',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  },
  {
    name: 'Pierre Lambert',
    role: 'Responsable SAV',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    attachment: null as File | null,
    gdpr: false,
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [formRef, formInView] = useInView({ triggerOnce: true });
  const [teamRef, teamInView] = useInView({ triggerOnce: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        attachment: null,
        gdpr: false,
      });
    }, 1000);
  };

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
              Contactez votre expert en domotique à Arras
            </h1>
            <p className="text-xl md:text-2xl font-open-sans">
              Une équipe de professionnels à votre écoute pour concrétiser vos projets
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef} className={`transform transition-all duration-1000 ${
              formInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-[#003366] font-montserrat">
                  Formulaire de contact
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 font-montserrat">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 font-montserrat">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 font-montserrat">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 font-montserrat">
                      Sujet
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="devis">Demande de devis</option>
                      <option value="technique">Question technique</option>
                      <option value="sav">Service après-vente</option>
                      <option value="rdv">Prise de rendez-vous</option>
                      <option value="autre">Autre demande</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 font-montserrat">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 font-montserrat">
                      Pièce jointe (optionnel)
                    </label>
                    <input
                      type="file"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                      onChange={(e) => setFormData({ ...formData, attachment: e.target.files?.[0] || null })}
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 mr-2"
                      checked={formData.gdpr}
                      onChange={(e) => setFormData({ ...formData, gdpr: e.target.checked })}
                    />
                    <label className="text-sm text-gray-600 font-open-sans">
                      J'accepte que mes données soient utilisées pour traiter ma demande conformément à la politique de confidentialité
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ff6600] text-white px-8 py-3 rounded-lg hover:bg-[#e65c00] transition-colors font-open-sans"
                  >
                    Envoyer
                  </button>

                  {formStatus === 'success' && (
                    <div className="flex items-center text-green-600 font-open-sans">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Message envoyé avec succès !
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="flex items-center text-red-600 font-open-sans">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Une erreur est survenue. Veuillez réessayer.
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-bold mb-6 text-[#003366] font-montserrat">
                  Nos Coordonnées
                </h2>
                <div className="space-y-6 font-open-sans">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-[#ff6600] mr-4 mt-1" />
                    <div>
                      <p className="font-semibold">Adresse</p>
                      <p>18 rue Raoul Briquet</p>
                      <p>62217 Beaurains</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-[#ff6600] mr-4" />
                    <div>
                      <p className="font-semibold">Téléphone</p>
                      <a
                        href="tel:+33320000000"
                        className="hover:text-[#ff6600] transition-colors"
                      >
                        03 20 00 00 00
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-[#ff6600] mr-4" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a
                        href="mailto:contact@arras-automatismes.fr"
                        className="hover:text-[#ff6600] transition-colors"
                      >
                        contact@arras-automatismes.fr
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-[#ff6600] mr-4 mt-1" />
                    <div>
                      <p className="font-semibold mb-2">Horaires d'ouverture</p>
                      <table className="w-full">
                        <tbody>
                          {openingHours.map((item) => (
                            <tr key={item.day}>
                              <td className="py-1">{item.day}</td>
                              <td className="py-1 text-right">{item.hours}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <p className="font-semibold mb-4 font-montserrat">Suivez-nous</p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-[#1877f2] hover:opacity-80 transition-opacity"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
                      className="text-[#1da1f2] hover:opacity-80 transition-opacity"
                    >
                      <Twitter className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
                      className="text-[#0a66c2] hover:opacity-80 transition-opacity"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
                  Notre Localisation
                </h3>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2544.4755400767287!2d2.7641675!3d50.2721725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd4c8b8e7f0001%3A0x1a0c9c5c89e51b0!2s18%20Rue%20Raoul%20Briquet%2C%2062217%20Beaurains!5e0!3m2!1sfr!2sfr!4v1710835436789!5m2!1sfr!2sfr"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg mb-4"
                ></iframe>
                <div className="space-y-2 text-sm text-gray-600 font-open-sans">
                  <p>
                    <span className="font-semibold">Depuis Arras centre :</span> Prendre la D917 direction Beaurains, continuer sur 3km.
                  </p>
                  <p>
                    <span className="font-semibold">Parking :</span> Places gratuites disponibles devant nos locaux.
                  </p>
                  <p>
                    <span className="font-semibold">Transport en commun :</span> Bus ligne 1, arrêt "Briquet".
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods Comparison */}
      <section className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
            Comment nous contacter ?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-[#003366] font-montserrat">
                    Type de demande
                  </th>
                  <th className="px-6 py-4 text-left text-[#003366] font-montserrat">
                    Méthode recommandée
                  </th>
                  <th className="px-6 py-4 text-left text-[#003366] font-montserrat">
                    Délai de réponse
                  </th>
                </tr>
              </thead>
              <tbody>
                {contactMethods.map((method, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-4 font-semibold font-open-sans">
                      {method.type}
                    </td>
                    <td className="px-6 py-4 font-open-sans">{method.recommended}</td>
                    <td className="px-6 py-4 font-open-sans">{method.responseTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
            Questions Fréquentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#f5f5f5] rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => setActiveTab(activeTab === index ? null : index)}
                >
                  <span className="font-semibold text-[#003366] font-montserrat">
                    {faq.question}
                  </span>
                  <span
                    className={`transform transition-transform ${
                      activeTab === index ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`px-6 py-4 font-open-sans text-gray-600 transition-all duration-300 ${
                    activeTab === index ? 'block' : 'hidden'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/faq"
              className="text-[#ff6600] hover:text-[#e65c00] font-semibold font-open-sans"
            >
              Voir toutes les FAQ →
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
            Notre Équipe
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-1000 ${
            teamInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2 text-[#003366] font-montserrat">
                  {member.name}
                </h3>
                <p className="text-gray-600 font-open-sans">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/about"
              className="text-[#ff6600] hover:text-[#e65c00] font-semibold font-open-sans"
            >
              En savoir plus sur notre équipe →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}