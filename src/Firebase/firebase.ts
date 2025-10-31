import { initializeApp } from "firebase/app"
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth"

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrwzG0UbtGuC4hFZBGreN5nwwEWP26ndM",
  authDomain: "shineetrip-cbc33.firebaseapp.com",
  projectId: "shineetrip-cbc33",
  storageBucket: "shineetrip-cbc33.firebasestorage.app", // 🔹 fixed storage bucket URL
  messagingSenderId: "265250808943",
  appId: "1:265250808943:web:313fd00e039c74ce29999a",
  measurementId: "G-CDEB9KS3KD",
}

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig)

// 🔹 Authentication instance
export const auth = getAuth(app)
auth.useDeviceLanguage()

// 🔹 Social providers
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
export const appleProvider = new OAuthProvider("apple.com")

// 🔹 OTP helpers
export { RecaptchaVerifier, signInWithPhoneNumber }
