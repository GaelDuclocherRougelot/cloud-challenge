// useLogin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase_init";
import { getChallengerById } from "../api/challenger";
import { showMessage } from '../utils/messageUtils';
export function useLogin(email, password) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const challenger = await signInWithEmailAndPassword(auth, email, password);
      await getChallengerById(challenger.user.uid);
      navigate('/home');
    } catch (error) {
      console.error('Erreur lors de la connexion :', error.message);
      showMessage({ content: 'Identifiant ou mot de passe incorrecte !', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          navigate('/home');
          showMessage({ content: 'Connexion réussi !', type: 'success' });
        } catch (error) {
          console.error('Erreur lors de la configuration de la persistance :', error.message);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return { loading, error, handleSubmit };
}
