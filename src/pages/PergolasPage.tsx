import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Sun, Cloud, Droplets, Wind, CheckCircle, Star, ArrowRight, Settings, Shield, Award, PenTool as Tool } from 'lucide-react';

const pergolas = {
  toile: [
    {
      id: 'skyshade',
      name: 'SkyShade',
      description: 'Pergola toile idéale pour les petites et moyennes terrasses',
      features: [
        'Surface jusqu\'à 25m²',
        'Protection solaire optimale',
        'Toile imperméable haute résistance',
        'Motorisation silencieuse',
        'Capteur vent et pluie',
        'Éclairage LED intégré'
      ],
      specs: {
        dimensions: 'Largeur max : 5m, Avancée max : 5m',
        materiaux: 'Structure aluminium, toile Dickson',
        motorisation: 'Moteur tubulaire radio',
        options: ['Éclairage LED', 'Stores verticaux', 'Capteurs météo']
      },
      image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'skyshade-pro',
      name: 'SkyShade Pro',
      description: 'Pergola toile haut de gamme pour grandes terrasses',
      features: [
        'Surface jusqu\'à 36m²',
        'Double toile pour isolation renforcée',
        'Système anti-flapping',
        'Motorisation intelligente',
        'Station météo intégrée',
        'Éclairage LED RGB'
      ],
      specs: {
        dimensions: 'Largeur max : 6m, Avancée max : 6m',
        materiaux: 'Structure aluminium renforcé, double toile Dickson',
        motorisation: 'Moteur intelligent avec retour d\'information',
        options: ['Éclairage LED RGB', 'Stores verticaux zip', 'Station météo']
      },
      image: 'https://images.unsplash.com/photo-1621624666561-84d0107001dc?auto=format&fit=crop&q=80&w=1200'
    }
  ],
  bioclimatique: [
    {
      id: 'climapro-120',
      name: 'ClimaPro 120',
      description: 'Pergola bioclimatique compacte et performante',
      features: [
        'Lames orientables 120mm',
        'Surface jusqu\'à 25m²',
        'Gestion climatique intelligente',
        'Évacuation des eaux intégrée',
        'Motorisation silencieuse',
        'Éclairage LED périmétral'
      ],
      specs: {
        dimensions: 'Largeur max : 5m, Avancée max : 5m',
        materiaux: 'Structure et lames en aluminium extrudé',
        motorisation: 'Moteur Somfy io-homecontrol',
        options: ['Éclairage LED', 'Stores screens', 'Capteurs météo']
      },
      image: 'https://images.unsplash.com/photo-1621624666561-84d0107001dc?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'climapro-150',
      name: 'ClimaPro 150',
      description: 'Pergola bioclimatique haut de gamme grand format',
      features: [
        'Lames orientables 150mm',
        'Surface jusqu\'à 36m²',
        'Double motorisation',
        'Système anti-goutte',
        'Station météo connectée',
        'Éclairage LED RGB intégré'
      ],
      specs: {
        dimensions: 'Largeur max : 6m, Avancée max : 6m',
        materiaux: 'Structure et lames en aluminium haute résistance',
        motorisation: 'Double moteur Somfy io avec retour d\'information',
        options: ['Éclairage LED RGB', 'Stores screens zip', 'Station météo pro']
      },
      image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80&w=1200'
    }
  ]
};

const benefits = [
  {
    icon: Sun,
    title: 'Protection Solaire',
    description: 'Contrôle optimal de l\'ensoleillement en toute saison'
  },
  {
    icon: Cloud,
    title: 'Confort Thermique',
    description: 'Régulation naturelle de la température'
  },
  {
    icon: Droplets,
    title: 'Protection Pluie',
    description: 'Étanchéité parfaite par temps de pluie'
  },
  {
    icon: Wind,
    title: 'Ventilation Naturelle',
    description: 'Circulation d\'air optimisée'
  }
];

const testimonials = [
  {
    name: 'Pierre D.',
    location: 'Arras',
    text: 'Installation impeccable de notre pergola bioclimatique. Un vrai plus pour notre terrasse !',
    rating: 5
  },
  {
    name: 'Marie L.',
    location: 'Beaurains',
    text: 'Excellent conseil dans le choix du modèle. Le résultat est à la hauteur de nos attentes.',
    rating: 5
  }
];

const faqs = [
  {
    question: 'Quelle est la durée d\'installation d\'une pergola ?',
    answer: 'L\'installation d\'une pergola prend généralement entre 1 et 2 jours selon le modèle et la configuration.'
  },
  {
    question: 'Les pergolas sont-elles garanties ?',
    answer: 'Oui, nos pergolas bénéficient d\'une garantie de 5 ans sur la structure et 2 ans sur la motorisation.'
  },
  {
    question: 'Peut-on intégrer des stores verticaux ?',
    answer: 'Oui, tous nos modèles sont compatibles avec l\'ajout de stores verticaux pour une protection latérale.'
  }
];

interface ConfiguratorState {
  type: 'toile' | 'bioclimatique' | '';
  model: string;
  width: number;
  depth: number;
  options: string[];
}

export default function PergolasPage() {
  const [activeTab, setActiveTab] = useState<'toile' | 'bioclimatique'>('bioclimatique');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [configurator, setConfigurator] = useState<ConfiguratorState>({
    type: '',
    model: '',
    width: 3,
    depth: 3,
    options: []
  });

  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [modelsRef, modelsInView] = useInView({ triggerOnce: true });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 51, 102, 0.7)), url(https://images.unsplash.com/photo-1621624666561-84d0107001dc?auto=format&fit=crop&q=80&w=1920)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-montserrat">
              Pergolas Intelligentes
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 font-open-sans">
              Confort et élégance pour votre extérieur avec nos solutions connectées
            </p>
            <button className="bg-[#ff6600] text-white px-8 py-4 rounded-lg text-lg hover:bg-[#e65c00] transition-colors font-open-sans shadow-lg">
              Configurez votre pergola
            </button>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section ref={modelsRef} className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-gray-200">
              <button
                className={`px-8 py-3 rounded-l-lg ${
                  activeTab === 'toile'
                    ? 'bg-[#003366] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('toile')}
              >
                Pergolas Toile
              </button>
              <button
                className={`px-8 py-3 rounded-r-lg ${
                  activeTab === 'bioclimatique'
                    ? 'bg-[#003366] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('bioclimatique')}
              >
                Pergolas Bioclimatiques
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pergolas[activeTab].map((model) => (
              <div
                key={model.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
                  selectedModel === model.id ? 'ring-2 ring-[#ff6600]' : ''
                }`}
              >
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-[#003366] font-montserrat">
                    {model.name}
                  </h3>
                  <p className="text-gray-600 mb-6 font-open-sans">
                    {model.description}
                  </p>
                  <div className="space-y-4 mb-6">
                    {model.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-[#ff6600] mr-3" />
                        <span className="font-open-sans">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      className="bg-[#ff6600] text-white px-6 py-3 rounded-lg hover:bg-[#e65c00] transition-colors font-open-sans"
                      onClick={() => {
                        setSelectedModel(model.id);
                        setConfigurator({
                          ...configurator,
                          type: activeTab,
                          model: model.id
                        });
                      }}
                    >
                      Configurer
                    </button>
                    <a
                      href="#"
                      className="text-[#003366] hover:text-[#ff6600] font-semibold font-open-sans"
                    >
                      En savoir plus
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
            Pourquoi choisir nos pergolas ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                    <Icon className="w-12 h-12 text-[#ff6600] mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-[#003366] font-montserrat">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 font-open-sans">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Configurator Section */}
      {configurator.type && (
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
              Configurez votre pergola
            </h2>
            <div className="max-w-4xl mx-auto bg-[#f5f5f5] rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6 text-[#003366] font-montserrat">
                    Dimensions
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 font-montserrat">
                        Largeur (en mètres)
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="6"
                        step="0.5"
                        value={configurator.width}
                        onChange={(e) =>
                          setConfigurator({
                            ...configurator,
                            width: parseFloat(e.target.value)
                          })
                        }
                        className="w-full"
                      />
                      <div className="text-center mt-2 font-open-sans">
                        {configurator.width}m
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 font-montserrat">
                        Avancée (en mètres)
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="6"
                        step="0.5"
                        value={configurator.depth}
                        onChange={(e) =>
                          setConfigurator({
                            ...configurator,
                            depth: parseFloat(e.target.value)
                          })
                        }
                        className="w-full"
                      />
                      <div className="text-center mt-2 font-open-sans">
                        {configurator.depth}m
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-6 text-[#003366] font-montserrat">
                    Options
                  </h3>
                  <div className="space-y-3">
                    {['Éclairage LED', 'Stores verticaux', 'Capteurs météo'].map(
                      (option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-3"
                            checked={configurator.options.includes(option)}
                            onChange={(e) => {
                              const newOptions = e.target.checked
                                ? [...configurator.options, option]
                                : configurator.options.filter((o) => o !== option);
                              setConfigurator({
                                ...configurator,
                                options: newOptions
                              });
                            }}
                          />
                          <span className="font-open-sans">{option}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <button className="bg-[#ff6600] text-white px-8 py-4 rounded-lg text-lg hover:bg-[#e65c00] transition-colors font-open-sans">
                  Demander un devis personnalisé
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
            Ils nous font confiance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#ff6600] fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic font-open-sans">
                  "{testimonial.text}"
                </p>
                <p className="font-bold text-[#003366] font-montserrat">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 font-open-sans">
                  {testimonial.location}
                </p>
              </div>
            ))}
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
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-[#003366] font-montserrat">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 font-open-sans">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#003366]">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6 font-montserrat">
            Transformez votre extérieur
          </h2>
          <p className="text-xl mb-8 font-open-sans">
            Demandez votre étude personnalisée gratuite
          </p>
          <button className="bg-[#ff6600] text-white px-8 py-4 rounded-lg text-lg hover:bg-[#e65c00] transition-colors font-open-sans shadow-lg">
            Prendre rendez-vous
          </button>
        </div>
      </section>
    </div>
  );
}