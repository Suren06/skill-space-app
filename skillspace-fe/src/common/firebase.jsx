import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmNKx1OsbAzxuBadsNazieMo21m29JRD0",
  authDomain: "skill-space-19755.firebaseapp.com",
  projectId: "skill-space-19755",
  storageBucket: "skill-space-19755.appspot.com",
  messagingSenderId: "517840668985",
  appId: "1:517840668985:web:07b4a7a4de1b6d1f4900e8",
};

const app = initializeApp(firebaseConfig);

//google auth
const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;
  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((error) => {
      console.log(error);
    });

  return user;
};
