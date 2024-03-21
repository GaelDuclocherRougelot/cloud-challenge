import React, { createContext, useEffect, useReducer, useContext, useState } from "react";
import Loader from "../components/Loader/Loader.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "../utils/firebase_init.js";
import { getChallengerById } from "../api/challenger.js";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Votre code de gestion de l'authentification ici, s'il y en a

    // Par exemple, si vous vérifiez si l'utilisateur est connecté, vous pouvez utiliser onAuthStateChanged :
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Récupérez les données de l'utilisateur après sa connexion
          const challengerData = await getChallengerById(user.uid);
          // Mettez à jour l'état currentUser avec les données de l'utilisateur
          setCurrentUser(challengerData);
        } catch (error) {
          console.error("Erreur lors de la récupération des données de l'utilisateur :", error.message);
        }
      }
      setIsLoading(false); // Mettez isLoading à false une fois que vous avez fini de vérifier l'authentification
    });

    // Nettoyez l'abonnement lorsque le composant est démonté
    return () => unsubscribe();
  }, []);



  return isLoading ? (
    <Loader />
  ) : (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
