// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAboLUdxjhxjLhMD4HNgzgGSP1n9KVya7E',
  authDomain: 'bring-the-heat-tv.firebaseapp.com',
  projectId: 'bring-the-heat-tv',
  storageBucket: 'bring-the-heat-tv.appspot.com',
  messagingSenderId: '987515866349',
  appId: '1:987515866349:web:0bc88f363cd307d2de10e4',
  measurementId: 'G-668D029ERE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;
