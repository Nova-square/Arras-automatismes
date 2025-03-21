import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Home, Building2, Building, CheckCircle, Euro, Calendar, Clock } from 'lucide-react';

interface FormData {
  step: number;
  buildingType: string;
  constructionType: string;
  squareFootage: string;
  currentAutomation: string[];
  selectedSolutions: string[];
  quantities: Record<string, string>;
  specificNeeds: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  availableTimes: string[];
  source: string;
  gdpr: boolean;
}

const initialFormData: FormData = {
  step: 1,
  buildingType: '',
  constructionType: '',
  squareFootage: '',
  currentAutomation: [],
  selectedSolutions: [],
  quantities: {},
  specificNeeds: '',
  budget: '5000',
  timeline: '',
  name: '',
  email: '',
  phone: '',
  contactMethod: '',
  availableTimes: [],
  source: '',
  gdpr: false,
};

const solutions = [
  {
    id: 'volets',
    title: 'Volets Roulants',
    icon: Home,
    description: 'Automatisation des volets pour un contrôle optimal de la luminosité',
    priceRange: '1500-3000€',
  },
  {
    id: 'portail',
    title: 'Portail Automatique',
    icon: Building2,
    description: 'Portail motorisé avec contrôle d\'accès intelligent',
    priceRange: '2500-5000€',
  },
  {
    id: 'garage',
    title: 'Porte de Garage',
    icon: Building,
    description: 'Motorisation de porte de garage avec commande à distance',
    priceRange: '1000-2500€',
  },
];

const timeSlots = [
  '9h00 - 11h00',
  '11h00 - 13h00',
  '14h00 - 16h00',
  '16h00 - 18h00',
];

export default function QuotePage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [estimatedPrice, setEstimatedPrice] = useState<string>('');
  const [formRef, formInView] = useInView({ triggerOnce: true });

  const updateFormData = (field: keyof FormData, value: any) => {
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

  const calculateEstimate = () => {
    // Simple estimation logic - would be more complex in production
    const basePrice = formData.selectedSolutions.length * 1500;
    const sizeMultiplier = parseInt(formData.squareFootage) / 100;
    const estimate = basePrice * (1 + sizeMultiplier * 0.1);
    setEstimatedPrice(`${estimate.toFixed(0)}€ - ${(estimate * 1.3).toFixed(0)}€`);
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-1/4 text-center ${
              formData.step === step ? 'text-[#ff6600]' : 'text-gray-400'
            }`}
          >
            Étape {step}
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
        Type de Projet
      </h2>
      
      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Type de bâtiment
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Maison', 'Appartement', 'Local Commercial'].map((type) => (
            <button
              key={type}
              className={`p-4 rounded-lg border ${
                formData.buildingType === type
                  ? 'border-[#ff6600] bg-[#fff4ed]'
                  : 'border-gray-300'
              }`}
              onClick={() => updateFormData('buildingType', type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Type de construction
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Neuf', 'Rénovation'].map((type) => (
            <button
              key={type}
              className={`p-4 rounded-lg border ${
                formData.constructionType === type
                  ? 'border-[#ff6600] bg-[#fff4ed]'
                  : 'border-gray-300'
              }`}
              onClick={() => updateFormData('constructionType', type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Surface (m²)
        </label>
        <input
          type="number"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
          value={formData.squareFootage}
          onChange={(e) => updateFormData('squareFootage', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Équipements automatisés existants
        </label>
        <div className="space-y-2">
          {['Volets', 'Portail', 'Porte de garage', 'Éclairage', 'Chauffage'].map((item) => (
            <label key={item} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.currentAutomation.includes(item)}
                onChange={(e) => {
                  const newAutomation = e.target.checked
                    ? [...formData.currentAutomation, item]
                    : formData.currentAutomation.filter((i) => i !== item);
                  updateFormData('currentAutomation', newAutomation);
                }}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="bg-[#ff6600] text-white px-8 py-3 rounded-lg hover:bg-[#e65c00] transition-colors"
          onClick={nextStep}
        >
          Suivant
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#003366] font-montserrat">
        Solutions Souhaitées
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {solutions.map((solution) => {
          const Icon = solution.icon;
          return (
            <div
              key={solution.id}
              className={`p-6 rounded-lg border cursor-pointer transition-all ${
                formData.selectedSolutions.includes(solution.id)
                  ? 'border-[#ff6600] bg-[#fff4ed]'
                  : 'border-gray-300 hover:border-[#ff6600]'
              }`}
              onClick={() => {
                const newSolutions = formData.selectedSolutions.includes(solution.id)
                  ? formData.selectedSolutions.filter((id) => id !== solution.id)
                  : [...formData.selectedSolutions, solution.id];
                updateFormData('selectedSolutions', newSolutions);
              }}
            >
              <Icon className="w-12 h-12 text-[#ff6600] mb-4" />
              <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{solution.description}</p>
              <p className="text-sm text-[#ff6600]">À partir de {solution.priceRange}</p>
            </div>
          );
        })}
      </div>

      {formData.selectedSolutions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold font-montserrat">Quantités</h3>
          {formData.selectedSolutions.map((solutionId) => {
            const solution = solutions.find((s) => s.id === solutionId);
            return (
              <div key={solutionId} className="flex items-center gap-4">
                <span className="w-40">{solution?.title}</span>
                <input
                  type="number"
                  min="1"
                  className="w-24 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                  value={formData.quantities[solutionId] || '1'}
                  onChange={(e) => {
                    const newQuantities = {
                      ...formData.quantities,
                      [solutionId]: e.target.value,
                    };
                    updateFormData('quantities', newQuantities);
                  }}
                />
                <span className="text-sm text-gray-600">unité(s)</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-between">
        <button
          className="px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
          onClick={prevStep}
        >
          Précédent
        </button>
        <button
          className="bg-[#ff6600] text-white px-8 py-3 rounded-lg hover:bg-[#e65c00] transition-colors"
          onClick={nextStep}
        >
          Suivant
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#003366] font-montserrat">
        Spécifications du Projet
      </h2>

      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Besoins spécifiques
        </label>
        <textarea
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600] h-32"
          value={formData.specificNeeds}
          onChange={(e) => updateFormData('specificNeeds', e.target.value)}
          placeholder="Décrivez vos besoins particuliers..."
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Budget estimé
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1000"
            max="20000"
            step="1000"
            className="w-full"
            value={formData.budget}
            onChange={(e) => updateFormData('budget', e.target.value)}
          />
          <span className="w-24 text-right">{formData.budget}€</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Délai souhaité
        </label>
        <select
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
          value={formData.timeline}
          onChange={(e) => updateFormData('timeline', e.target.value)}
        >
          <option value="">Sélectionnez un délai</option>
          <option value="urgent">Urgent (&lt; 1 mois)</option>
          <option value="normal">Normal (1-3 mois)</option>
          <option value="flexible">Flexible (&gt; 3 mois)</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          className="px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
          onClick={prevStep}
        >
          Précédent
        </button>
        <button
          className="bg-[#ff6600] text-white px-8 py-3 rounded-lg hover:bg-[#e65c00] transition-colors"
          onClick={nextStep}
        >
          Suivant
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#003366] font-montserrat">
        Vos Coordonnées
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2 font-montserrat">
            Nom complet
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
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
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
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
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Méthode de contact préférée
        </label>
        <div className="space-x-4">
          {['Téléphone', 'Email', 'SMS'].map((method) => (
            <label key={method} className="inline-flex items-center">
              <input
                type="radio"
                className="mr-2"
                checked={formData.contactMethod === method}
                onChange={() => updateFormData('contactMethod', method)}
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Disponibilités pour un rendez-vous
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {timeSlots.map((slot) => (
            <label key={slot} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.availableTimes.includes(slot)}
                onChange={(e) => {
                  const newTimes = e.target.checked
                    ? [...formData.availableTimes, slot]
                    : formData.availableTimes.filter((t) => t !== slot);
                  updateFormData('availableTimes', newTimes);
                }}
              />
              {slot}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 font-montserrat">
          Comment nous avez-vous connu ?
        </label>
        <select
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
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

      <div className="flex items-start">
        <input
          type="checkbox"
          className="mt-1 mr-2"
          checked={formData.gdpr}
          onChange={(e) => updateFormData('gdpr', e.target.checked)}
        />
        <label className="text-sm text-gray-600">
          J'accepte que mes données soient utilisées pour traiter ma demande conformément
          à la politique de confidentialité
        </label>
      </div>

      <div className="flex justify-between">
        <button
          className="px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
          onClick={prevStep}
        >
          Précédent
        </button>
        <button
          className="bg-[#ff6600] text-white px-8 py-3 rounded-lg hover:bg-[#e65c00] transition-colors"
          onClick={() => {
            calculateEstimate();
            // Handle form submission
          }}
        >
          Envoyer ma demande
        </button>
      </div>
    </div>
  );

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-cover bg-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 51, 102, 0.7)), url(https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
              Demande de Devis
            </h1>
            <p className="text-xl font-open-sans">
              Configurez votre projet d'automatisation sur mesure
            </p>
          </div>
        </div>
      </section>

      {/* Quick Estimate Calculator */}
      <section className="py-8 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            {estimatedPrice ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#003366] mb-4 font-montserrat">
                  Estimation Préliminaire
                </h2>
                <p className="text-4xl text-[#ff6600] mb-6 font-montserrat">
                  {estimatedPrice}
                </p>
                <p className="text-gray-600 mb-6 font-open-sans">
                  Cette estimation est donnée à titre indicatif. Le prix final dépendra
                  des spécificités de votre projet.
                </p>
                <div className="flex justify-center space-x-6">
                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-[#ff6600] mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Installation sous 2-3 semaines</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-[#ff6600] mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Devis détaillé sous 48h</p>
                  </div>
                  <div className="text-center">
                    <Euro className="w-8 h-8 text-[#ff6600] mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Financement possible</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {renderProgressBar()}
                <div ref={formRef} className={`transform transition-all duration-1000 ${
                  formInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  {formData.step === 1 && renderStep1()}
                  {formData.step === 2 && renderStep2()}
                  {formData.step === 3 && renderStep3()}
                  {formData.step === 4 && renderStep4()}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}