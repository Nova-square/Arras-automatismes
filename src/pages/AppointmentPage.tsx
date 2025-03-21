import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, MapPin, Phone, Mail, Users, PenTool as Tool, Wrench, AlertCircle, CheckCircle, Download, ChevronRight, Building } from 'lucide-react';

interface AppointmentFormData {
  step: number;
  type: string;
  date: string;
  time: string;
  location: 'showroom' | 'client';
  address?: string;
  directions?: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
  source: string;
  specialRequirements: string;
  emailConfirmation: boolean;
  smsReminder: boolean;
  gdpr: boolean;
}

const appointmentTypes = [
  {
    id: 'discovery',
    title: 'Découverte et conseil',
    description: 'Première rencontre pour discuter de vos projets domotiques',
    duration: '45 minutes',
    icon: Users,
  },
  {
    id: 'showroom',
    title: 'Démonstration showroom',
    description: 'Découvrez nos solutions en fonctionnement',
    duration: '1 heure',
    icon: Tool,
  },
  {
    id: 'technical',
    title: 'Visite technique à domicile',
    description: 'Évaluation détaillée et devis sur place',
    duration: '1 heure 30',
    icon: Wrench,
  },
  {
    id: 'support',
    title: 'Service après-vente',
    description: 'Assistance technique et maintenance',
    duration: '30 minutes',
    icon: Tool,
  },
];

const projectTypes = [
  'Maison neuve',
  'Rénovation',
  'Extension',
  'Mise à niveau',
  'Dépannage',
];

const timeSlots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
];

const initialFormData: AppointmentFormData = {
  step: 1,
  type: '',
  date: '',
  time: '',
  location: 'showroom',
  address: '',
  directions: '',
  name: '',
  email: '',
  phone: '',
  projectType: '',
  description: '',
  source: '',
  specialRequirements: '',
  emailConfirmation: true,
  smsReminder: false,
  gdpr: false,
};

export default function AppointmentPage() {
  const [formData, setFormData] = useState<AppointmentFormData>(initialFormData);
  const [formRef, formInView] = useInView({ triggerOnce: true });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const updateFormData = (field: keyof AppointmentFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    setFormData((prev) => ({
      ...prev,
      step: prev.step + 1,
    }));
  };

  const prevStep = () => {
    setFormData((prev) => ({
      ...prev,
      step: prev.step - 1,
    }));
  };

  const handleSubmit = () => {
    // Here you would handle the form submission
    setShowConfirmation(true);
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {['Type', 'Date & Heure', 'Lieu', 'Coordonnées'].map((step, index) => (
          <div
            key={step}
            className={`w-1/4 text-center ${
              formData.step === index + 1 ? 'text-[#ff6600]' : 'text-gray-400'
            } font-montserrat`}
          >
            {step}
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-[#ff6600] rounded-full transition-all duration-500"
          style={{ width: `${(formData.step / 4) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#003366] font-montserrat">
        Type de Rendez-vous
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointmentTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              className={`p-6 rounded-lg border text-left transition-all ${
                formData.type === type.id
                  ? 'border-[#ff6600] bg-[#fff4ed]'
                  : 'border-gray-300 hover:border-[#ff6600]'
              }`}
              onClick={() => updateFormData('type', type.id)}
            >
              <Icon className="w-8 h-8 text-[#ff6600] mb-4" />
              <h3 className="text-lg font-bold mb-2 font-montserrat">{type.title}</h3>
              <p className="text-gray-600 mb-4 font-open-sans">{type.description}</p>
              <div className="flex items-center text-sm text-gray-500 font-open-sans">
                <Clock className="w-4 h-4 mr-2" />
                {type.duration}
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[#ff6600] text-white px-8 py-3 rounded-lg hover:bg-[#e65c00] transition-colors font-open-sans disabled:opacity-50"
          onClick={nextStep}
          disabled={!formData.type}
        >
          Suivant
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => {
    const today = new Date();
    const availableDates = Array.from({ length: 14 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i + 1);
      return date;
    });

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#003366] font-montserrat">
          Date et Horaire
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 font-montserrat">
              Sélectionnez une date
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {availableDates.map((date) => (
                <button
                  key={date.toISOString()}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    formData.date === date.toISOString()
                      ? 'border-[#ff6600] bg-[#fff4ed]'
                      : 'border-gray-300 hover:border-[#ff6600]'
                  }`}
                  onClick={() => updateFormData('date', date.toISOString())}
                >
                  <div className="text-sm font-semibold">
                    {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                  </div>
                  <div className="text-lg font-bold">
                    {date.getDate()}
                  </div>
                  <div className="text-sm">
                    {date.toLocaleDateString('fr-FR', { month: 'short' })}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-montserrat">
              Sélectionnez un horaire
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    formData.time === time
                      ? 'border-[#ff6600] bg-[#fff4ed]'
                      : 'border-gray-300 hover:border-[#ff6600]'
                  }`}
                  onClick={() => updateFormData('time', time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            className="px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors font-open-sans"
            onClick={prevStep}
          >
            Précédent
          </button>
          <button
            className="bg-[#ff6600] text-white px-8 py-3 rounded-lg hover:bg-[#e65c00] transition-colors font-open-sans disabled:opacity-50"
            onClick={nextStep}
            disabled={!formData.date || !formData.time}
          >
            Suivant
          </button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#003366] font-montserrat">
        Lieu du Rendez-vous
      </h2>

      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            className={`flex-1 p-6 rounded-lg border text-center transition-all ${
              formData.location === 'showroom'
                ? 'border-[#ff6600] bg-[#fff4ed]'
                : 'border-gray-300 hover:border-[#ff6600]'
            }`}
            onClick={() => updateFormData('location', 'showroom')}
          >
            <Building className="w-8 h-8 text-[#ff6600] mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2 font-montserrat">Notre Showroom</h3>
            <p className="text-gray-600 font-open-sans">
              18 rue Raoul Briquet, Beaurains
            </p>
          </button>

          <button
            className={`flex-1 p-6 rounded-lg border text-center transition-all ${
              formData.location === 'client'
                ? 'border-[#ff6600] bg-[#fff4ed]'
                : 'border-gray-300 hover:border-[#ff6600]'
            }`}
            onClick={() => updateFormData('location', 'client')}
          >
            <MapPin className="w-8 h-8 text-[#ff6600] mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2 font-montserrat">À votre domicile</h3>
            <p className="text-gray-600 font-open-sans">
              Nous nous déplaçons chez vous
            </p>
          </button>
        </div>

        {formData.location === 'client' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 font-montserrat">
                Votre adresse
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="Numéro, rue, code postal, ville"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-montserrat">
                Instructions d'accès (optionnel)
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                rows={3}
                value={formData.directions}
                onChange={(e) => updateFormData('directions', e.target.value)}
                placeholder="Digicode, étage, particularités d'accès..."
              />
            </div>
          </div>
        )}

        {formData.location === 'showroom' && (
          <div className="mt-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2544.4755400767287!2d2.7641675!3d50.2721725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd4c8b8e7f0001%3A0x1a0c9c5c89e51b0!2s18%20Rue%20Raoul%20Briquet%2C%2062217%20Beaurains!5e0!3m2!1sfr!2sfr!4v1710835436789!5m2!1sfr!2sfr"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg mb-4"
            />
            <div className="space-y-2 text-sm text-gray-600 font-open-sans">
              <p>
                <span className="font-semibold">Parking :</span> Places gratuites disponibles devant nos locaux
              </p>
              <p>
                <span className="font-semibold">Transport en commun :</span> Bus ligne 1, arrêt "Briquet"
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          className="px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors font-open-sans"
          onClick={prevStep}
        >
          Précédent
        </button>
        <button
          className="bg-[#ff6600] text-white px-8 py-3 rounded-lg hover:bg-[#e65c00] transition-colors font-open-sans disabled:opacity-50"
          onClick={nextStep}
          disabled={formData.location === 'client' && !formData.address}
        >
          Suivant
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#003366] font-montserrat">
        Vos Informations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2 font-montserrat">
            Nom complet
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 font-montserrat">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
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
          onChange={(e) => updateFormData('phone', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Type de projet
        </label>
        <select
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
          value={formData.projectType}
          onChange={(e) => updateFormData('projectType', e.target.value)}
        >
          <option value="">Sélectionnez un type de projet</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Description du projet
        </label>
        <textarea
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
          rows={3}
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          placeholder="Décrivez brièvement votre projet..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Comment nous avez-vous connu ?
        </label>
        <select
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
          value={formData.source}
          onChange={(e) => updateFormData('source', e.target.value)}
        >
          <option value="">Sélectionnez une option</option>
          <option value="search">Moteur de recherche</option>
          <option value="social">Réseaux sociaux</option>
          <option value="recommendation">Recommandation</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Besoins particuliers
        </label>
        <textarea
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
          rows={2}
          value={formData.specialRequirements}
          onChange={(e) => updateFormData('specialRequirements', e.target.value)}
          placeholder="Accessibilité, langue, etc."
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={formData.emailConfirmation}
            onChange={(e) => updateFormData('emailConfirmation', e.target.checked)}
          />
          <span className="text-sm font-open-sans">
            Recevoir une confirmation par email
          </span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={formData.smsReminder}
            onChange={(e) => updateFormData('smsReminder', e.target.checked)}
          />
          <span className="text-sm font-open-sans">
            Recevoir un rappel par SMS
          </span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={formData.gdpr}
            onChange={(e) => updateFormData('gdpr', e.target.checked)}
          />
          <span className="text-sm font-open-sans">
            J'accepte que mes données soient utilisées pour traiter ma demande
          </span>
        </label>
      </div>

      <div className="flex justify-between">
        <button
          className="px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors font-open-sans"
          onClick={prevStep}
        >
          Précédent
        </button>
        <button
          className="bg-[#ff6600] text-white px-8 py-3 rounded-lg hover:bg-[#e65c00] transition-colors font-open-sans disabled:opacity-50"
          onClick={handleSubmit}
          disabled={!formData.name || !formData.email || !formData.phone || !formData.gdpr}
        >
          Confirmer le rendez-vous
        </button>
      </div>
    </div>
  );

  const renderConfirmation = () => {
    const appointmentType = appointmentTypes.find((t) => t.id === formData.type);
    const date = new Date(formData.date);

    return (
      <div className="space-y-8">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#003366] mb-4 font-montserrat">
            Rendez-vous Confirmé !
          </h2>
          <p className="text-gray-600 font-open-sans">
            Nous avons bien enregistré votre demande de rendez-vous.
            Une confirmation vous sera envoyée par email.
          </p>
        </div>

        <div className="bg-[#f5f5f5] p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-[#003366] font-montserrat">
            Récapitulatif
          </h3>
          <div className="space-y-4 font-open-sans">
            <p className="flex items-center">
              <Users className="w-5 h-5 text-[#ff6600] mr-3" />
              <span className="font-semibold">Type :</span>
              <span className="ml-2">{appointmentType?.title}</span>
            </p>
            <p className="flex items-center">
              <Calendar className="w-5 h-5 text-[#ff6600] mr-3" />
              <span className="font-semibold">Date :</span>
              <span className="ml-2">
                {date.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </p>
            <p className="flex items-center">
              <Clock className="w-5 h-5 text-[#ff6600] mr-3" />
              <span className="font-semibold">Heure :</span>
              <span className="ml-2">{formData.time}</span>
            </p>
            <p className="flex items-center">
              <MapPin className="w-5 h-5 text-[#ff6600] mr-3" />
              <span className="font-semibold">Lieu :</span>
              <span className="ml-2">
                {formData.location === 'showroom'
                  ? 'Notre showroom'
                  : 'À votre domicile'}
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#003366] font-montserrat">
            Prochaines étapes
          </h3>
          <ul className="space-y-3 font-open-sans">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
              Vous recevrez un email de confirmation
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
              Un rappel vous sera envoyé 24h avant le rendez-vous
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
              Préparez vos questions et documents éventuels
            </li>
          </ul>
        </div>

        <div className="flex justify-center space-x-4">
          <button className="flex items-center px-6 py-3 rounded-lg border border-[#ff6600] text-[#ff6600] hover:bg-[#fff4ed] transition-colors font-open-sans">
            <Download className="w-5 h-5 mr-2" />
            Ajouter au calendrier
          </button>
          <a
            href="/"
            className="flex items-center px-6 py-3 bg-[#ff6600] text-white rounded-lg hover:bg-[#e65c00] transition-colors font-open-sans"
          >
            Retour à l'accueil
            <ChevronRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-cover bg-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 51, 102, 0.7)), url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
              Prendre Rendez-vous
            </h1>
            <p className="text-xl font-open-sans">
              Planifiez une rencontre avec nos experts en domotique
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Form Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div ref={formRef} className={`bg-white rounded-lg shadow-lg p-8 transform transition-all duration-1000 ${
              formInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {showConfirmation ? (
                renderConfirmation()
              ) : (
                <>
                  {renderProgressBar()}
                  {formData.step === 1 && renderStep1()}
                  {formData.step === 2 && renderStep2()}
                  {formData.step === 3 && renderStep3()}
                  {formData.step === 4 && renderStep4()}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}