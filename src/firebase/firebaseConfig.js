import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyCoUP7k3ep0T_Gst-JlcdgyQuWUJuOfXmY",
  authDomain: "reactnativeapp-test.firebaseapp.com",
  projectId: "reactnativeapp-test",
  storageBucket: "reactnativeapp-test.appspot.com",
  messagingSenderId: "74403574244",
  appId: "1:74403574244:web:aa9ba4a79586341cef17f1",
  measurementId: "G-EYERTHEPME"
});

// Initialize Firebase
export const auth = initializeAuth(firebaseConfig, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const storage = getStorage(firebaseConfig);
export const db = getFirestore(firebaseConfig);