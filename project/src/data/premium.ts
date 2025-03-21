import { Project } from '../types';

export const premiumProjects: Project[] = [
  {
    id: 'villa-contemporaine-arras',
    title: 'Villa Contemporaine à Arras',
    description: 'Intégration domotique complète dans une villa d\'architecte de 450m²',
    category: 'Résidentiel Luxe',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687644-c7171b46f668?auto=format&fit=crop&q=80&w=1200',
    ],
    features: [
      'Système domotique KNX haute performance',
      'Éclairage architectural personnalisé',
      'Contrôle climatique multi-zones',
      'Sécurité périmétrique avancée'
    ],
    client_name: 'Confidentiel',
    completion_date: '2024-02',
    testimonial: {
      text: 'Une intégration parfaite qui sublime notre demeure. Le niveau d\'automatisation et de personnalisation dépasse nos attentes.',
      rating: 5
    }
  },
  {
    id: 'manoir-historique-beaurains',
    title: 'Manoir Historique à Beaurains',
    description: 'Modernisation discrète d\'une demeure du XIXe siècle',
    category: 'Patrimoine',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200',
    ],
    features: [
      'Intégration respectueuse du patrimoine',
      'Système audio multi-pièces Sonos',
      'Contrôle d\'accès biométrique',
      'Gestion énergétique intelligente'
    ],
    client_name: 'Confidentiel',
    completion_date: '2023-12',
    testimonial: {
      text: 'Un travail d\'orfèvre qui préserve l\'authenticité de notre demeure tout en y apportant le confort moderne.',
      rating: 5
    }
  },
  {
    id: 'residence-luxe-saint-laurent',
    title: 'Résidence de Luxe à Saint-Laurent',
    description: 'Solution domotique sur-mesure pour une propriété d\'exception',
    category: 'Résidentiel Luxe',
    images: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200',
    ],
    features: [
      'Contrôle vocal haute précision',
      'Système home-cinéma THX',
      'Pergola bioclimatique connectée',
      'Cave à vin climatisée intelligente'
    ],
    client_name: 'Confidentiel',
    completion_date: '2024-01',
    testimonial: {
      text: 'Une expertise rare et un service d\'exception. Chaque détail a été pensé pour notre confort.',
      rating: 5
    }
  }
];

export const luxuryServices = [
  {
    title: 'Consultation Privée',
    description: 'Rendez-vous personnalisé à votre domicile ou dans notre showroom privé',
    features: [
      'Analyse approfondie de vos besoins',
      'Présentation des solutions exclusives',
      'Démonstration sur-mesure',
      'Devis détaillé confidentiel'
    ]
  },
  {
    title: 'Installation d\'Exception',
    description: 'Mise en œuvre experte par nos techniciens certifiés',
    features: [
      'Équipe dédiée premium',
      'Installation discrète et soignée',
      'Tests approfondis',
      'Formation personnalisée'
    ]
  },
  {
    title: 'Service Conciergerie',
    description: 'Accompagnement privilégié 24/7',
    features: [
      'Assistance prioritaire',
      'Maintenance préventive',
      'Mises à jour exclusives',
      'Support technique dédié'
    ]
  }
];

export const premiumBlogPosts = [
  {
    title: 'L\'Art de Vivre Connecté',
    description: 'Quand la technologie sublime l\'élégance de votre demeure',
    content: `La domotique haut de gamme transcende la simple automatisation pour créer une expérience de vie unique, où technologie et raffinement se rencontrent...`,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Sécurité et Discrétion',
    description: 'Protection intelligente pour demeures d\'exception',
    content: `Découvrez comment les dernières innovations en matière de sécurité s\'intègrent invisiblement dans votre intérieur...`,
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'L\'Excellence Énergétique',
    description: 'Optimisation intelligente pour grandes propriétés',
    content: `Une gestion énergétique sophistiquée qui allie performance environnementale et confort absolu...`,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
  }
];