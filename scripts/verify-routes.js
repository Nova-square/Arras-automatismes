import fetch from 'node-fetch';

const routes = [
  '/',
  '/solutions',
  '/services',
  '/portfolio',
  '/contact',
  '/devis',
  '/about',
  '/rendez-vous',
  '/blog',
  '/ressources',
  '/pergolas'
];

async function verifyRoutes() {
  console.log('🔍 Vérification des routes...');
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:4173';

  const results = await Promise.allSettled(
    routes.map(async (route) => {
      try {
        const response = await fetch(`${baseUrl}${route}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return { route, status: 'success' };
      } catch (error) {
        return { route, status: 'error', error: error.message };
      }
    })
  );

  const failures = results.filter(
    (result) => result.status === 'rejected' || result.value.status === 'error'
  );

  if (failures.length > 0) {
    console.error('❌ Erreurs détectées sur les routes suivantes :');
    failures.forEach((failure) => {
      if (failure.status === 'rejected') {
        console.error(`  - ${failure.reason}`);
      } else {
        console.error(`  - ${failure.value.route}: ${failure.value.error}`);
      }
    });
    process.exit(1);
  }

  console.log('✅ Toutes les routes sont accessibles');
}