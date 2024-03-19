import React from 'react';
import {Link} from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md w-full">
          <h2 className="text-center text-2xl mb-4">Inscription</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="prenom" className="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
              <input type="text" id="prenom" name="prenom" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
              <input type="text" id="nom" name="nom" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" autoComplete="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
              <input type="password" id="password" name="password" autoComplete="current-password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[80%]">S'inscrire</button>
            </div>
          </form>

          <Link to="/" className="flex justify-center mt-4 text-blue-500 hover:underline">Vous êtes déjà inscrit ? Cliquez ici !</Link>

        </div>
      </div>

    </>
  );
};

export default Register;