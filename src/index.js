import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import  'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW87Ylu6eZhIbHHsI_Lf0yl2-NizfF-X0",
  authDomain: "parentcart-65a54.firebaseapp.com",
  databaseURL: "https://parentcart-65a54.firebaseio.com",
  projectId: "parentcart-65a54",
  storageBucket: "parentcart-65a54.appspot.com",
  messagingSenderId: "523772103535",
  appId: "1:523772103535:web:5c7311f5a24e0109bdf69a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));