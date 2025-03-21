import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Book, Video, FileText, MessageSquare } from 'lucide-react';
import ReactPlayer from 'react-player';
import GuideCard from '../components/GuideCard';
import VideoTutorial from '../components/VideoTutorial';
import DocumentCard from '../components/DocumentCard';
import FAQItem from '../components/FAQItem';
import ResourcesNavigation from '../components/ResourcesNavigation';
import SearchBar from '../components/SearchBar';
import CommunityPost from '../components/CommunityPost';
import NewsletterSignup from '../components/NewsletterSignup';

const guides = [
  {
    id: 'volets',
    title: 'Guide d\'installation des volets connectés',
    category: 'Installation',
    description: 'Instructions détaillées pour l\'installation et la configuration de vos volets roulants connectés.',
    pdfUrl: '/guides/volets-installation.pdf',
    thumbnail: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'portail',
    title: 'Manuel d\'utilisation du portail automatique',
    category: 'Utilisation',
    description: 'Guide complet pour tirer le meilleur parti de votre portail automatique.',
    pdfUrl: '/guides/portail-utilisation.pdf',
    thumbnail: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'maintenance',
    title: 'Guide de maintenance préventive',
    category: 'Maintenance',
    description: 'Conseils et procédures pour l\'entretien régulier de vos équipements.',
    pdfUrl: '/guides/maintenance-preventive.pdf',
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112c4e56a1?auto=format&fit=crop&q=80&w=800',
  },
];

const tutorials = [
  {
    id: 'config-volets',
    title: 'Configuration des scénarios pour volets',
    duration: '5:30',
    thumbnail: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=example1',
  },
  {
    id: 'portail-securite',
    title: 'Paramètres de sécurité du portail',
    duration: '4:15',
    thumbnail: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=example2',
  },
  {
    id: 'app-mobile',
    title: 'Utilisation de l\'application mobile',
    duration: '7:45',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=example3',
  },
];

const technicalDocs = [
  {
    title: 'Spécifications techniques - Volets',
    type: 'PDF',
    size: '2.4 MB',
    url: '/docs/specs-volets.pdf',
  },
  {
    title: 'Schémas de câblage - Portails',
    type: 'PDF',
    size: '1.8 MB',
    url: '/docs/schemas-portails.pdf',
  },
  {
    title: 'Certifications et normes',
    type: 'PDF',
    size: '3.1 MB',
    url: '/docs/certifications.pdf',
  },
];

const faqCategories = [
  {
    id: 'installation',
    name: 'Installation',
    icon: Book,
  },
  {
    id: 'utilisation',
    name: 'Utilisation',
    icon: Video,
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    icon: FileText,
  },
  {
    id: 'depannage',
    name: 'Dépannage',
    icon: MessageSquare,
  },
];

const faqs = [
  {
    id: 1,
    category: 'installation',
    question: 'Combien de temps dure une installation standard ?',
    answer: 'Une installation standard prend généralement entre 1 et 2 jours selon la complexité du projet. Ce délai comprend l\'installation physique des équipements, leur configuration et les tests de bon fonctionnement.',
  },
  {
    id: 2,
    category: 'utilisation',
    question: 'Comment programmer des scénarios automatisés ?',
    answer: 'La programmation des scénarios se fait via l\'application mobile. Vous pouvez créer des scénarios basés sur l\'heure, la météo ou votre localisation. Un guide détaillé est disponible dans la section tutoriels.',
  },
  {
    id: 3,
    category: 'maintenance',
    question: 'Quelle est la fréquence recommandée pour l\'entretien ?',
    answer: 'Nous recommandons une vérification complète tous les 6 mois pour garantir un fonctionnement optimal. Des contrôles plus fréquents peuvent être nécessaires selon l\'utilisation.',
  },
];

const communityPosts = [
  {
    id: 1,
    author: {
      name: 'Pierre M.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
    },
    title: 'Astuce : Optimisation de la batterie du portail',
    content: 'Voici comment j\'ai réussi à prolonger la durée de vie de la batterie de mon portail automatique...',
    likes: 24,
    comments: 8,
    date: '2024-03-15',
  },
  {
    id: 2,
    author: {
      name: 'Sophie L.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    },
    title: 'Retour d\'expérience : Installation volets connectés',
    content: 'Après 6 mois d\'utilisation, voici mon retour d\'expérience complet sur les volets connectés...',
    likes: 31,
    comments: 12,
    date: '2024-03-10',
  },
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('guides');
  const [activeFaqCategory, setActiveFaqCategory] = useState('installation');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [contentRef, contentInView] = useInView({ triggerOnce: true });

  const toggleFaq = (id: number) => {
    setExpandedFaqs(prev =>
      prev.includes(id) ? prev.filter(faqId => faqId !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[40vh] bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 51, 102, 0.7)), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
              Centre de Ressources
            </h1>
            <p className="text-xl font-open-sans">
              Guides, tutoriels et documentation pour maîtriser vos équipements connectés
            </p>
          </div>
        </div>
      </section>

      {/* Search and Navigation */}
      <section className="py-8 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Rechercher dans les ressources..."
            />
          </div>

          <ResourcesNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          {/* Guides */}
          {activeTab === 'guides' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {guides.map((guide) => <GuideCard key={guide.id} guide={guide} />)}
            </div>
          )}

          {/* Tutoriels */}
          {activeTab === 'tutoriels' && (
            <div>
              {selectedVideo ? (
                <div className="mb-8">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <ReactPlayer
                      url={selectedVideo}
                      width="100%"
                      height="100%"
                      controls
                    />
                  </div>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="text-[#ff6600] hover:text-[#e65c00] font-semibold"
                  >
                    ← Retour aux tutoriels
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {tutorials.map((tutorial) => (
                    <VideoTutorial
                      key={tutorial.id}
                      tutorial={tutorial}
                      onSelect={setSelectedVideo}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Documentation */}
          {activeTab === 'documentation' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-[#003366] font-montserrat">
                  Documentation Technique
                </h2>
                <div className="space-y-4">
                  {technicalDocs.map((doc, index) => (
                    <DocumentCard key={index} document={doc} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeTab === 'faq' && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Categories */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-[#003366] font-montserrat">
                    Catégories
                  </h3>
                  <div className="space-y-2">
                    {faqCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() => setActiveFaqCategory(category.id)}
                          className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                            activeFaqCategory === category.id
                              ? 'bg-[#003366] text-white'
                              : 'bg-white hover:bg-[#ff6600] hover:text-white'
                          }`}
                        >
                          <Icon className="w-5 h-5 mr-3" />
                          {category.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* FAQ List */}
                <div className="md:col-span-3">
                  <div className="space-y-4">
                    {faqs
                      .filter((faq) => faq.category === activeFaqCategory)
                      .map((faq) => (
                        <FAQItem
                          key={faq.id}
                          faq={faq}
                          isExpanded={expandedFaqs.includes(faq.id)}
                          onToggle={() => toggleFaq(faq.id)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Communauté */}
          {activeTab === 'communauté' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-[#003366] font-montserrat">
                  Forum Communautaire
                </h2>
                <div className="space-y-6">
                  {communityPosts.map((post) => <CommunityPost key={post.id} post={post} />)}
                </div>
              </div>

              {/* Create Post Button */}
              <div className="text-center">
                <button className="bg-[#ff6600] text-white px-8 py-3 rounded-lg hover:bg-[#e65c00] transition-colors font-open-sans">
                  Créer une nouvelle discussion
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSignup />
    </div>
  );
}