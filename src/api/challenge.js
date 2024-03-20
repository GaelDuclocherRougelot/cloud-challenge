import {addDoc, collection, doc, updateDoc, increment} from "firebase/firestore";
import {auth, db} from "../utils/firebase_init.js";

export const createChallenge = async (title, githubLink, description, category) => {

  try {
    const user = auth.currentUser;

    if (!user) {
      console.error("Utilisateur non connecté");
      return;
    }

    const docRef = await addDoc(collection(db, "challenges"), {
      title,
      githubLink,
      description,
      category,
      createdAt: new Date().toISOString(),
      createdBy: user.uid,
      level: 1
    });
    console.log("Document written with ID: ", docRef.id);

    const userDocRef = doc(db, "Challenger", user.uid);
    await updateDoc(userDocRef, {
      challenges_created: increment(1)
    })

    console.log("Nombre de challenges créés mis à jour pour l'utilisateur.");

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}