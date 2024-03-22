import {addDoc, collection, getDocs, doc, updateDoc, query, where} from "firebase/firestore";
import {auth, db} from "../utils/firebase_init.js";

export const createSolution = async (challengeData, githubLink, currentUser ) => {

  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("Utilisateur non connecté");
      return;
    }

    const docRef = await addDoc(collection(db, "Solutions"), {
      challengeData,
      githubLink,
      createdAt: new Date().toISOString(),
      createdBy: {
        uid: user.uid,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName
      },
      level: currentUser.level,
      status: 'En cours',
    });
    console.log("Document written with ID: ", docRef.id);

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getAllSolutions = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("Utilisateur non connecté");
      return;
    }
    const solutionsSnapshot = await getDocs(collection(db, "Solutions"));
    const solutions = [];

    solutionsSnapshot.forEach((doc) => {
      const solutionData = { id: doc.id, ...doc.data() };
      if (solutionData.createdBy.uid !== user.uid && solutionData.status === 'En cours') {
        solutions.push(solutionData);
      }
    });
    return solutions;
  } catch (e) {
    console.error("Erreur lors de la récupération des solutions :", e);
    return [];
  }
};

export const validateSolution = async (solutionId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("Utilisateur non connecté");
      return;
    }

    const solutionRef = doc(db, "Solutions", solutionId);
    await updateDoc(solutionRef, {
      status: 'Valide'
    });
  } catch (e) {
    console.error("Erreur lors de la validation :", e);
  }
}

export const failedSolution = async (solutionId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("Utilisateur non connecté");
      return;
    }

    const solutionRef = doc(db, "Solutions", solutionId);
    await updateDoc(solutionRef, {
      status: 'Refus'
    });
  } catch (e) {
    console.error("Erreur lors de la validation :", e);
  }
}

export const getValidatedSolutions= async (userId) => {
  try {
    const q = query(collection(db, 'Solutions'), where('createdBy.uid', '==', userId), where('status', '==', 'Valide'));
    const querySnapshot = await getDocs(q);
    const createSolutions = [];

    querySnapshot.forEach((doc) => {
      createSolutions.push({ key: doc.id, ...doc.data() });
    });

    return createSolutions;
  } catch (error) {
    console.error('Erreur lors de la récupération des challenges créés :', error);
    return [];
  }
};

export const getFailedSolutions= async (userId) => {
  try {
    const q = query(collection(db, 'Solutions'), where('createdBy.uid', '==', userId), where('status', '==', 'Refus'));
    const querySnapshot = await getDocs(q);
    const createSolutions = [];

    querySnapshot.forEach((doc) => {
      createSolutions.push({ key: doc.id, ...doc.data() });
    });

    return createSolutions;
  } catch (error) {
    console.error('Erreur lors de la récupération des challenges créés :', error);
    return [];
  }
};

