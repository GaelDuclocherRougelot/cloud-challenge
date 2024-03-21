import {addDoc, collection, doc, updateDoc, arrayUnion} from "firebase/firestore";
import {auth, db} from "../utils/firebase_init.js";

export const createChallenge = async (title, githubLink, description, category, firstName, lastName  ) => {

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
      createdBy: {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
      },
      level: 1
    });
    console.log("Document written with ID: ", docRef.id);

    const userDocRef = doc(db, "Challenger", user.uid);
    await updateDoc(userDocRef, {
      challenges_created: arrayUnion({
        id: docRef.id,
      })
    })

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
