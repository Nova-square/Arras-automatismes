import { readFile } from 'fs/promises';
import { join } from 'path';
import { config } from 'dotenv';
import fetch from 'node-fetch';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Charger les variables d'environnement
config();

const mainRoutes = [
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

async function checkDependencies() {
  console.log('🔍 Vérification des dépendances...');
  
  try {
    const packageJson = JSON.parse(
      await readFile(join(process.cwd(), 'package.json'), 'utf-8')
    );
    const packageLock = JSON.parse(
      await readFile(join(process.cwd(), 'package-lock.json'), 'utf-8')
    );

    // Vérifier les dépendances manquantes
    const missingDeps = [];
    for (const dep of [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.devDependencies || {})]) {
      if (!packageLock.packages['node_modules/' + dep]) {
        missingDeps.push(dep);
      }
    }

    if (missingDeps.length > 0) {
      throw new Error(`Dépendances manquantes : ${missingDeps.join(', ')}`);
    }

    // Vérifier les versions de dépendances critiques
    const criticalDeps = {
      'react': '^18.0.0',
      '@supabase/supabase-js': '^2.0.0',
      'firebase': '^10.0.0'
    };

    for (const [dep, minVersion] of Object.entries(criticalDeps)) {
      const currentVersion = packageJson.dependencies[dep];
      if (!currentVersion) {
        throw new Error(`Dépendance critique manquante : ${dep}`);
      }
      
      const current = currentVersion.replace(/[\^~]/, '');
      const min = minVersion.replace(/[\^~]/, '');
      if (current < min) {
        throw new Error(`Version de ${dep} (${current}) inférieure au minimum requis (${min})`);
      }
    }

    console.log('✅ Toutes les dépendances sont correctement installées');
  } catch (error) {
    console.error('❌ Erreur lors de la vérification des dépendances:', error);
    process.exit(1);
  }
}

async function checkFirebaseAccess() {
  console.log('🔍 Vérification de l\'accès Firebase...');

  try {
    // Vérifier les variables d'environnement Firebase
    const requiredEnvVars = [
      'VITE_FIREBASE_API_KEY',
      'VITE_FIREBASE_AUTH_DOMAIN',
      'VITE_FIREBASE_PROJECT_ID',
      'VITE_FIREBASE_STORAGE_BUCKET',
      'VITE_FIREBASE_MESSAGING_SENDER_ID',
      'VITE_FIREBASE_APP_ID'
    ];

    const missingEnvVars = requiredEnvVars.filter(
      varName => !process.env[varName]
    );

    if (missingEnvVars.length > 0) {
      throw new Error(`Variables d'environnement Firebase manquantes : ${missingEnvVars.join(', ')}`);
    }

    // Tester la connexion à Firebase
    const app = initializeApp({
      apiKey: process.env.VITE_FIREBASE_API_KEY,
      authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.VITE_FIREBASE_APP_ID
    });

    // Tester l'authentification anonyme
    const auth = getAuth(app);
    await signInAnonymously(auth);

    // Tester l'accès à Firestore
    const db = getFirestore(app);
    await getDocs(collection(db, 'projects'));

    console.log('✅ Connexion à Firebase établie avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de la vérification Firebase:', error);
    process.exit(1);
  }
}

async function checkSupabaseAccess() {
  console.log('🔍 Vérification de l\'accès Supabase...');

  try {
    // Vérifier les variables d'environnement Supabase
    if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
      throw new Error('Variables d\'environnement Supabase manquantes');
    }

    // Tester la connexion à Supabase
    const response = await fetch(`${process.env.VITE_SUPABASE_URL}/rest/v1/projects`, {
      headers: {
        'apikey': process.env.VITE_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur Supabase: ${response.status} ${response.statusText}`);
    }

    console.log('✅ Connexion à Supabase établie avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de la vérification Supabase:', error);
    process.exit(1);
  }
}

async function checkBuildOutput() {
  console.log('🔍 Vérification des fichiers de build...');

  try {
    const distDir = join(process.cwd(), 'dist');
    const indexHtml = await readFile(join(distDir, 'index.html'), 'utf-8');

    // Vérifier la présence des balises meta essentielles
    const requiredMeta = [
      '<meta charset="UTF-8"',
      '<meta name="viewport"',
      '<title>Arras Automatismes'
    ];

    const missingMeta = requiredMeta.filter(meta => !indexHtml.includes(meta));
    if (missingMeta.length > 0) {
      throw new Error(`Balises meta manquantes : ${missingMeta.join(', ')}`);
    }

    // Vérifier la présence des assets critiques
    const criticalAssets = [
      'assets/index',
      'assets/vendor',
      'assets/ui'
    ];

    const missingAssets = criticalAssets.filter(
      asset => !indexHtml.includes(asset)
    );

    if (missingAssets.length > 0) {
      throw new Error(`Assets critiques manquants : ${missingAssets.join(', ')}`);
    }

    console.log('✅ Fichiers de build validés avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de la vérification du build:', error);
    process.exit(1);
  }
}

// Exécuter toutes les vérifications
async function runAllChecks() {
  console.log('🚀 Démarrage des vérifications pré-déploiement...\n');

  try {
    await checkDependencies();
    console.log('');
    
    await checkFirebaseAccess();
    console.log('');
    
    await checkSupabaseAccess();
    console.log('');
    
    await checkBuildOutput();
    console.log('\n✨ Toutes les vérifications sont passées avec succès !');
  } catch (error) {
    console.error('\n❌ Les vérifications ont échoué :', error);
    process.exit(1);
  }
}

runAllChecks();