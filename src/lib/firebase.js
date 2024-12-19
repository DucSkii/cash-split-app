// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB8vMPJATxo1zB-o-8tsGvZSEMXymAk_Q8',
  authDomain: 'cash-split-app.firebaseapp.com',
  projectId: 'cash-split-app',
  storageBucket: 'cash-split-app.firebasestorage.app',
  messagingSenderId: '289079053468',
  appId: '1:289079053468:web:71432b6674ac9604f13159',
  measurementId: 'G-31MPGDZ0V6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
export const db = getFirestore(app)

export const auth = getAuth(app) // Authentication
