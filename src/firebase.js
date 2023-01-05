// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDE-bpZK70SF8lCoBXzdkkkddqfUJmXUuk',
  authDomain: 'poc-oauth-github.firebaseapp.com',
  projectId: 'poc-oauth-github',
  storageBucket: 'poc-oauth-github.appspot.com',
  messagingSenderId: '134605171334',
  appId: '1:134605171334:web:6ec654638110976b4e7f07',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
