import { FirebaseError } from 'firebase/app';

export interface ErrorDetails {
  title: string;
  message: string;
  suggestion: string;
  code: string;
  critical: boolean;
  retryable: boolean;
}

// Mapping des codes d'erreur Firebase vers des messages utilisateur
const errorMap = new Map<string, ErrorDetails>([
  ['auth/invalid-api-key', {
    title: 'Configuration Firebase invalide',
    message: 'Clé API Firebase invalide',
    suggestion: 'Vérifiez la valeur de VITE_FIREBASE_API_KEY dans vos variables d\'environnement',
    code: 'AUTH001',
    critical: true,
    retryable: false
  }],
  ['auth/project-not-found', {
    title: 'Projet introuvable',
    message: 'Projet Firebase introuvable',
    suggestion: 'Vérifiez l\'ID du projet dans vos variables d\'environnement (VITE_FIREBASE_PROJECT_ID)',
    code: 'AUTH002',
    critical: true,
    retryable: false
  }],
  ['auth/user-not-found', {
    title: 'Utilisateur non trouvé',
    message: 'Utilisateur non trouvé',
    suggestion: 'Vérifiez vos identifiants ou créez un nouveau compte',
    code: 'AUTH003',
    critical: false,
    retryable: true
  }],
  ['auth/wrong-password', {
    title: 'Erreur d\'authentification',
    message: 'Mot de passe incorrect',
    suggestion: 'Vérifiez votre mot de passe ou utilisez la fonction de réinitialisation',
    code: 'AUTH004',
    critical: false,
    retryable: true
  }],
  ['auth/too-many-requests', {
    title: 'Limite de tentatives atteinte',
    message: 'Trop de tentatives de connexion',
    suggestion: 'Patientez quelques minutes avant de réessayer',
    code: 'AUTH005',
    critical: false,
    retryable: true
  }],
  ['auth/email-already-in-use', {
    title: 'Email déjà utilisé',
    message: 'Email déjà utilisé',
    suggestion: 'Utilisez une autre adresse email ou connectez-vous avec ce compte',
    code: 'AUTH006',
    critical: false,
    retryable: true
  }],
  ['storage/unauthorized', {
    title: 'Accès refusé',
    message: 'Accès au stockage non autorisé',
    suggestion: 'Vérifiez les règles de sécurité Firebase Storage',
    code: 'STORAGE001',
    critical: true,
    retryable: false
  }],
  ['storage/quota-exceeded', {
    title: 'Quota dépassé',
    message: 'Quota de stockage dépassé',
    suggestion: 'Vérifiez votre plan Firebase ou supprimez des fichiers inutiles',
    code: 'STORAGE002',
    critical: true,
    retryable: false
  }],
  ['firestore/permission-denied', {
    title: 'Accès refusé',
    message: 'Accès à la base de données refusé',
    suggestion: 'Vérifiez les règles de sécurité Firestore et vos droits d\'accès',
    code: 'DB001',
    critical: true,
    retryable: false
  }],
  ['firestore/unavailable', {
    title: 'Service indisponible',
    message: 'Service Firestore indisponible',
    suggestion: 'Vérifiez votre connexion internet ou réessayez plus tard',
    code: 'DB002',
    critical: true,
    retryable: true
  }],
  ['messaging/permission-blocked', {
    title: 'Notifications bloquées',
    message: 'Les notifications sont bloquées par le navigateur',
    suggestion: 'Autorisez les notifications dans les paramètres de votre navigateur',
    code: 'MSG001',
    critical: false,
    retryable: true
  }],
  ['functions/cancelled', {
    title: 'Opération annulée',
    message: 'L\'opération a été annulée',
    suggestion: 'Réessayez l\'opération. Si le problème persiste, contactez le support',
    code: 'FUNC001',
    critical: false,
    retryable: true
  }]
]);

export class FirebaseErrorHandler {
  private static instance: FirebaseErrorHandler;
  private errorCallback?: (error: ErrorDetails) => void;
  private retryAttempts: Map<string, number> = new Map();
  private readonly maxRetries = 3;

  private constructor() {}

  static getInstance(): FirebaseErrorHandler {
    if (!FirebaseErrorHandler.instance) {
      FirebaseErrorHandler.instance = new FirebaseErrorHandler();
    }
    return FirebaseErrorHandler.instance;
  }

  setErrorCallback(callback: (error: ErrorDetails) => void): void {
    this.errorCallback = callback;
  }

  handleError(error: unknown): ErrorDetails {
    // Extraire les informations d'erreur
    let errorCode = '';
    let originalError: Error | null = null;

    if (error instanceof FirebaseError) {
      errorCode = error.code;
      originalError = error;
    } else if (error instanceof Error) {
      errorCode = error.message;
      originalError = error;
    } else {
      errorCode = 'unknown';
    }

    // Obtenir les détails de l'erreur
    const errorDetails = errorMap.get(errorCode) || {
      title: 'Erreur inattendue',
      message: 'Erreur inattendue',
      suggestion: 'Contactez le support technique',
      code: 'UNKNOWN',
      critical: true,
      retryable: false
    };

    // Gérer les tentatives de réessai
    if (errorDetails.retryable) {
      const attempts = this.retryAttempts.get(errorDetails.code) || 0;
      if (attempts < this.maxRetries) {
        this.retryAttempts.set(errorDetails.code, attempts + 1);
        errorDetails.suggestion += ` (Tentative ${attempts + 1}/${this.maxRetries})`;
      } else {
        errorDetails.retryable = false;
        errorDetails.suggestion = 'Nombre maximum de tentatives atteint. Contactez le support.';
      }
    }

    // Logger l'erreur avec contexte
    console.error(`[${errorDetails.code}] ${errorDetails.title}: ${errorDetails.message}`, {
      error: originalError,
      details: errorDetails,
      timestamp: new Date().toISOString()
    });

    // Notifier le callback si défini
    if (this.errorCallback) {
      this.errorCallback(errorDetails);
    }

    // Réinitialiser le compteur de tentatives pour les erreurs critiques
    if (errorDetails.critical) {
      this.retryAttempts.delete(errorDetails.code);
    }

    return errorDetails;
  }

  // Réinitialiser le compteur de tentatives pour un code d'erreur
  resetRetryCount(errorCode: string): void {
    this.retryAttempts.delete(errorCode);
  }

  // Réinitialiser tous les compteurs de tentatives
  resetAllRetryCounts(): void {
    this.retryAttempts.clear();
  }

  // Vérifier la configuration Firebase
  async checkFirebaseConfig(): Promise<void> {
    const requiredEnvVars = [
      'VITE_FIREBASE_API_KEY',
      'VITE_FIREBASE_AUTH_DOMAIN',
      'VITE_FIREBASE_PROJECT_ID',
      'VITE_FIREBASE_STORAGE_BUCKET',
      'VITE_FIREBASE_MESSAGING_SENDER_ID',
      'VITE_FIREBASE_APP_ID'
    ];

    const missingVars = requiredEnvVars.filter(
      varName => !import.meta.env[varName]
    );

    if (missingVars.length > 0) {
      throw new Error(
        `Variables d'environnement Firebase manquantes : ${missingVars.join(', ')}`
      );
    }
  }

  // Vérifier si une erreur peut être réessayée
  canRetry(errorCode: string): boolean {
    const errorDetails = errorMap.get(errorCode);
    if (!errorDetails) return false;

    const attempts = this.retryAttempts.get(errorCode) || 0;
    return errorDetails.retryable && attempts < this.maxRetries;
  }

  // Obtenir le nombre de tentatives restantes
  getRemainingRetries(errorCode: string): number {
    const attempts = this.retryAttempts.get(errorCode) || 0;
    return Math.max(0, this.maxRetries - attempts);
  }
}

// Fonction utilitaire pour tester la connexion Firebase
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    const { getAuth, signInAnonymously } = await import('firebase/auth');
    const auth = getAuth();
    await signInAnonymously(auth);
    return true;
  } catch (error) {
    const errorHandler = FirebaseErrorHandler.getInstance();
    errorHandler.handleError(error);
    return false;
  }
}

// Fonction utilitaire pour vérifier la configuration Firebase
export async function validateFirebaseConfig(): Promise<boolean> {
  const errorHandler = FirebaseErrorHandler.getInstance();
  try {
    await errorHandler.checkFirebaseConfig();
    return true;
  } catch (error) {
    errorHandler.handleError(error);
    return false;
  }
}