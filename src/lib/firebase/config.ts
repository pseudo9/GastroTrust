import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBgDNiJAmmHnKbEet5klfSG5O8BQ59WUYc",
  authDomain: "gastrotrust-17d83.firebaseapp.com",
  projectId: "gastrotrust-17d83",
  storageBucket: "gastrotrust-17d83.firebasestorage.app", // Updated to match your storage bucket
  messagingSenderId: "24827881625",
  appId: "1:24827881625:web:73c3246f59ce34207f3008",
  measurementId: "G-6CK5RQPBP2"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore with persistent cache
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

// Initialize Storage
const storage = getStorage(app);

export { app, db, storage };