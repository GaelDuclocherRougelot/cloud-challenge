import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import {db} from '../utils/firebase_init.js';
import {useNavigate} from "react-router-dom";


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

export const login = async (email, password) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  try {
    const usersQuery = query(collection(db, "Challenger"), where("email", "==", email), where("password", "==", password));
    const userSnapshot = await getDocs(usersQuery);
    const userExists = !userSnapshot.empty;

    if (userExists) {
      navigate('/home');
    } else {
      console.error("Email ou mot de passe incorrect");
    }
  } catch (e) {
    console.error("Erreur lors de la connexion : ", e);
  }
}

