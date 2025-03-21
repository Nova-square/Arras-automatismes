# Arras Automatismes - Site Web

## Description
Site web professionnel pour Arras Automatismes, expert en domotique et automatisation basé à Beaurains. Cette plateforme moderne présente nos solutions domotiques haut de gamme et permet aux clients de découvrir nos services d'excellence.

## Technologies Utilisées
- React 18 avec TypeScript
- Tailwind CSS pour le style
- Supabase pour la base de données
- Vite pour le build et le développement
- Framer Motion pour les animations
- React Markdown pour le contenu formaté
- Lucide React pour les icônes

## Prérequis
- Node.js (version LTS recommandée)
- Visual Studio Code
- Compte GitHub
- Compte Supabase
- Compte Vercel

### Extensions VS Code Recommandées
- ESLint
- Prettier
- GitLens
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

### Extensions Navigateur Recommandées
- React Developer Tools
- Lighthouse
- Web Vitals

## Installation et Configuration

### 1. Cloner le Projet
```bash
git clone [URL_DU_REPO]
cd arras-automatismes
```

### 2. Installer les Dépendances
```bash
npm install
```

### 3. Configuration de l'Environnement
Créer un fichier `.env` à partir du modèle :
```bash
cp .env.example .env
```

Remplir les variables d'environnement :
```
# Firebase - À configurer dans l'interface Vercel :
# 1. Allez dans les paramètres du projet
# 2. Sélectionnez "Environment Variables"
# 3. Ajoutez chaque variable avec le préfixe VITE_
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre_auth_domain
VITE_FIREBASE_PROJECT_ID=votre_project_id
VITE_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
VITE_FIREBASE_APP_ID=votre_app_id
VITE_FIREBASE_MEASUREMENT_ID=votre_measurement_id

# Supabase
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

### 4. Lancer le Serveur de Développement
```bash
npm run dev
```

## Structure du Projet

```
arras-automatismes/
├── src/
│   ├── components/     # Composants React réutilisables
│   ├── pages/         # Pages de l'application
│   ├── lib/           # Utilitaires et configurations
│   ├── types/         # Types TypeScript
│   ├── utils/         # Fonctions utilitaires
│   └── data/          # Données statiques
├── public/            # Assets statiques
└── supabase/         # Migrations et configurations Supabase
```

## Configuration de Supabase

### 1. Création du Projet
1. Se connecter à [Supabase](https://supabase.com)
2. Créer un nouveau projet
3. Noter l'URL et la clé anon

### 2. Migrations
Exécuter les migrations dans l'ordre :
```bash
cd supabase/migrations
```

Les fichiers de migration créeront :
- Tables pour les projets et articles
- Tables pour les services premium
- Configurations de sécurité (RLS)
- Indexes pour la recherche

### 3. Politiques de Sécurité
Vérifier que les politiques RLS sont correctement appliquées :
- Lecture publique pour les contenus publiés
- Protection des données sensibles
- Authentification requise pour les actions administratives

## Déploiement sur Vercel

### 1. Préparation
```bash
npm run build
```

### 2. Configuration Vercel
1. Connecter le repository GitHub
2. Configurer les variables d'environnement :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### 3. Déploiement
```bash
vercel deploy --prod
```

## Optimisation

### Performance
- Utiliser Lighthouse pour analyser les performances
- Optimiser les images avec des formats modernes
- Mettre en cache les assets statiques

### SEO
- Vérifier les meta tags
- Optimiser les titres et descriptions
- Générer un sitemap

## Maintenance

### Mises à Jour du Contenu
1. Se connecter à l'interface d'administration
2. Mettre à jour les articles et projets
3. Gérer les médias et ressources

### Mises à Jour Techniques
```bash
# Mettre à jour les dépendances
npm update

# Vérifier les vulnérabilités
npm audit

# Lancer les tests
npm test
```

## Support et Contact

### Équipe Technique
- Email : autonomie.systeme@gmail.com
- Téléphone : 0628426401

### Adresse
Arras Automatismes  
18 rue Raoul Briquet  
62217 Beaurains  
France

## Licence
Tous droits réservés - Arras Automatismes © 2024