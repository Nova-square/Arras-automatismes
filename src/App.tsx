import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import PergolasPage from './pages/PergolasPage';
import ResourcesPage from './pages/ResourcesPage';
import QuotePage from './pages/QuotePage';
import AboutPage from './pages/AboutPage';
import PremiumArticlesPage from './pages/PremiumArticlesPage';
import PremiumArticleDetailPage from './pages/PremiumArticleDetailPage';
import AppointmentPage from './pages/AppointmentPage';

function App() {
  const path = window.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      <main className="flex-grow pt-20">
        {path === '/solutions' ? (
          <SolutionsPage />
        ) : path === '/services' ? (
          <ServicesPage />
        ) : path === '/contact' ? (
          <ContactPage />
        ) : path === '/pergolas' ? (
          <PergolasPage />
        ) : path === '/ressources' ? (
          <ResourcesPage />
        ) : path === '/portfolio' ? (
          <PortfolioPage />
        ) : path === '/devis' ? (
          <QuotePage />
        ) : path === '/about' ? (
          <AboutPage />
        ) : path === '/premium' ? (
          <PremiumArticlesPage />
        ) : path.startsWith('/premium/') ? (
          <PremiumArticleDetailPage slug={path.replace('/premium/', '')} />
        ) : path === '/rendez-vous' ? (
          <AppointmentPage />
        ) : (
          <HomePage />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;