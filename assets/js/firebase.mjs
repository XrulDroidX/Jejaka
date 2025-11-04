import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, setLogLevel } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

export async function initFirebase({ appId, firebaseConfig, initialAuthToken }) {
  try {
    setLogLevel('Debug'); // set 'Error' untuk produksi
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    if (initialAuthToken) await signInWithCustomToken(auth, initialAuthToken);
    else await signInAnonymously(auth);

    await new Promise((resolve) => {
      onAuthStateChanged(auth, () => resolve());
    });

    return { appId, db, auth };
  } catch (err) {
    console.error('Firebase init/auth gagal:', err);
    return { appId, db: null, auth: null };
  }
}
