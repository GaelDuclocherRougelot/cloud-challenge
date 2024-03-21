import { createContext, useEffect, useContext, useState } from "react";
import Loader from "../components/Loader/Loader.jsx";
import { auth } from "../utils/firebase_init.js";
import { getChallengerById } from "../api/challenger.js";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const challengerData = await getChallengerById(user.uid);
          setCurrentUser(challengerData);
        } catch (error) {
          console.error("Erreur lors de la récupération des données de l'utilisateur :", error.message);
        }
      }
      setIsLoading(false);
    });

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
