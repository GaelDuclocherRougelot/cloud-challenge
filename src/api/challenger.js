import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../utils/firebase_init.js';

export const createChallenger = async (lastName, firstName) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("Utilisateur non authentifié");
      return;
    }

    const userDocRef = doc(db, "Challenger", user.uid);

    await setDoc(userDocRef, {
      lastName,
      firstName,
      challenges_success: [],
      challenges_created: [],
      level: 1
    });

    console.log("Document utilisateur créé avec succès.");
  } catch (e) {
    console.error("Erreur lors de la création du document utilisateur : ", e);
  }
}

export const getUser = async () => {
    try {
      const user = auth.currentUser.uid;
      console.log(user)
      if (user) {
        return user;
      }

  } catch (e) {
      console.error("Erreur lors de la recuperation de l'utilisateur :", e);}
}