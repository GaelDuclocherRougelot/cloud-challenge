import { doc, setDoc, getDoc } from "firebase/firestore";
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

export const getChallengerById = async (userId) => {
  try {
    const challengerDocRef = doc(db, "Challenger", userId);
    const challengerSnapshot = await getDoc(challengerDocRef);
    if (challengerSnapshot.exists()) {
      console.log(challengerSnapshot.data())
      return challengerSnapshot.data();
    } else {
      console.log("Aucun challenger trouvé avec l'ID :", userId);
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du challenger :", error.message);
    return null;
  }
  
};