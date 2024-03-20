import { collection, addDoc} from "firebase/firestore";
import {db} from '../utils/firebase_init.js';

export const createChallenger = async (id , lastName, firstName) => {
  try {
    const docRef = await addDoc(collection(db, "Challenger"), {
      id: id,
      lastName,
      firstName,
      challenges_success: [],
      challenges_created: [],
      level: 1
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

