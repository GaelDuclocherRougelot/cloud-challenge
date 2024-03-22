import { useState } from 'react';
import {createChallenge} from "../../../api/challenge.js";
import { UseAuthContext } from '../../../hooks/UseAuthContext.jsx';
import { showMessage } from '../../../utils/messageUtils.js';
import { useNavigate } from "react-router-dom";
export default function FormCreateChallenge() {
  const [title, setTitle] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const { currentUser } = UseAuthContext(); // Récupérez currentUser depuis le contexte
  const navigate = useNavigate()
  console.log("Données de l'utilisateur :", currentUser);
  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!title || !githubLink || !description || !category) {
      showMessage({ content: 'Veuillez remplir tous les champs.', type: 'error' });
      console.log('hey')
      return; // Ajoutez un return ici pour sortir de la fonction si la condition est vraie
    }

    // const githubLinkRegex = /^https?://(www.)?github.com/\S+$/;
    // if (!githubLinkRegex.test(githubLink)) {
    //   console.error('Veuillez entrer un lien GitHub valide.');
    //   return;
    // }

    try {
      await createChallenge(title, githubLink, description, category, currentUser.lastName, currentUser.firstName );

      setTitle('');
      setGithubLink('');
      setDescription('');
      setCategory('');
      showMessage({ content: 'Challenge créer !', type: 'success' });
      navigate('/home')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='py-3 size-full'>
      <h1 className='text-3xl font-semibold'>Créer un challenge</h1>
      <form noValidate className='flex flex-col pt-20 items-center ' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label className='py-4 text-xl'>Titre du challenge:</label>
          <input
          className='border py-2 w-[40vw] bg-neutral-300'
            type="text"
            value={title}
            placeholder='Tapez votre titre de challenge...'
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col'>
          <label className='py-4 text-xl'>Lien GitHub:</label>
          <input
           className='border  py-2 w-[40vw] bg-neutral-300'
            type="text"
            value={githubLink}
            placeholder='URL...'
            onChange={(e) => setGithubLink(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col'>
          <label className='py-4 text-xl'>Description:</label>
          <textarea
           className='border  py-5 w-[40vw] bg-neutral-300'
            value={description}
            placeholder='Description du challenge...'
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className='flex flex-col'>
          <label className='py-4 text-xl'>Catégorie:</label>
          <input
           className='border py-2 w-[40vw] bg-neutral-300'
            type="text"
            value={category}
            placeholder='React, Laravel, Ruby...'
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='bg-bleue text-white w-[15vw] h-[5vh] mt-14'>Soumettre</button>
      </form>
    </div>
  );
}
