import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { FirebaseErrorHandler } from './firebase-errors';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app;
let analytics;
let db;
let auth;
let storage;

try {
  // Vérifier la configuration
  const errorHandler = FirebaseErrorHandler.getInstance();
  await errorHandler.checkFirebaseConfig();

  // Initialiser Firebase
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
} catch (error) {
  const errorHandler = FirebaseErrorHandler.getInstance();
  errorHandler.handleError(error);
}

// Firestore helpers
export const firestore = {
  // Projects
  async getProjects() {
    try {
      const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore');
      const projectsRef = collection(db, 'projects');
      const q = query(
        projectsRef,
        where('published', '==', true),
        orderBy('created_at', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      const errorHandler = FirebaseErrorHandler.getInstance();
      errorHandler.handleError(error);
      return [];
    }
  },

  // Blog posts
  async getBlogPosts() {
    try {
      const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore');
      const postsRef = collection(db, 'blog_posts');
      const q = query(
        postsRef,
        where('published', '==', true),
        orderBy('published_at', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      const errorHandler = FirebaseErrorHandler.getInstance();
      errorHandler.handleError(error);
      return [];
    }
  },

  // Contact form
  async submitContact(data: any) {
    try {
      const { collection, addDoc } = await import('firebase/firestore');
      const contactsRef = collection(db, 'contacts');
      return addDoc(contactsRef, {
        ...data,
        created_at: new Date()
      });
    } catch (error) {
      const errorHandler = FirebaseErrorHandler.getInstance();
      errorHandler.handleError(error);
      throw error;
    }
  }
};

// Storage helpers
export const storageHelpers = {
  async uploadImage(file: File, path: string) {
    try {
      const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      return getDownloadURL(snapshot.ref);
    } catch (error) {
      const errorHandler = FirebaseErrorHandler.getInstance();
      errorHandler.handleError(error);
      throw error;
    }
  }
};

// Auth helpers
export const authHelpers = {
  async signIn(email: string, password: string) {
    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorHandler = FirebaseErrorHandler.getInstance();
      errorHandler.handleError(error);
      throw error;
    }
  },

  async signOut() {
    try {
      const { signOut } = await import('firebase/auth');
      return signOut(auth);
    } catch (error) {
      const errorHandler = FirebaseErrorHandler.getInstance();
      errorHandler.handleError(error);
      throw error;
    }
  }
};
