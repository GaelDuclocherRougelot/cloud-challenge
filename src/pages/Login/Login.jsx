import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth, app} from "../../utils/firebase_init.js";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await auth.setPersistence(app.auth.Auth.Persistence.SESSION);
      navigate('/home');
    } catch (error) {
      console.error('Erreur lors de la connexion :', error.message);
    }

  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          navigate('/home');
        } catch (error) {
          console.error('Erreur lors de la configuration de la persistance :', error.message);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
      <div className="flex items-center justify-center h-screen bg-bleue">
        <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md w-full">
          <h2 className="text-2xl mb-4">Connexion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" autoComplete="username" value={email} onChange={handleEmailChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
              <input type="password" id="password" name="password" autoComplete="current-password" value={password} onChange={handlePasswordChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex flex-col items-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Se connecter
              </button>
              <Link to="/register" className="mt-4 text-blue-500 hover:underline">Si vous n'êtes pas inscrit, cliquez ici !</Link>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Login;
