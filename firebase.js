import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB657_fhAADYyTP103_sJ5JROiWjJNq1_E",
  authDomain: "chatapp-333555.firebaseapp.com",
  projectId: "chatapp-333555",
  storageBucket: "chatapp-333555.appspot.com",
  messagingSenderId: "1048853799889",
  appId: "1:1048853799889:web:f0eefe56832619beeeb6f0"
}

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db };